import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import ClientInfo from '@/model/Dtos/In/ClientInfo';
import { ConfigurarColumnaDeudores } from '@/Pages/DeudoresGestionPage/config/ConfigurarColumnaDeudores';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import ListaEmpresasInDto from '@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto';
import { empresasServicioWeb } from '@/Pages/DeudoresGestionPage/services/GestionDeudaServicios';
import { allDeuodoresServiceWeb } from '@/services/Service';
import { Box, Checkbox, FormControlLabel, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Deudores = () => {
    const [clientDebt, setClientDebt] = useState<ClientInfo[]>([]);
    const [empresas, setEmpresas] = useState<ListaEmpresasInDto[]>([{ id: "TODOS", nombre: "Todos" }]);
    const { setDeudorSeleccionado, sinGestionar, setSinGestionar, empresaSeleccionada, setEmpresaSeleccionada } = useGestionarDeudas();
    const navigate = useNavigate();

    useEffect(() => {
        onInit();
    }, [])

    const onInit = async () => {
        const listaEmpresaRespuesta = await empresasServicioWeb();
        setEmpresas(prev => [...prev, ...listaEmpresaRespuesta]);
        const response = await allDeuodoresServiceWeb(empresaSeleccionada, sinGestionar)
        setClientDebt(response)
    }

    const viewDebtsClient = (row: ClientInfo) => {
        setDeudorSeleccionado(row)
        navigate("/gestion/dudas-por-clientes");
    }

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: viewDebtsClient,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'button',
            label: 'Ver',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClientDebt([]);
        setSinGestionar(event.target.checked);
    };

    const consultarDeudasPorEmpresa = async (value: string) => {
        setEmpresaSeleccionada(value);
        setClientDebt([]);
        const response = await allDeuodoresServiceWeb(value, sinGestionar);
        setClientDebt(response);
    }

    useEffect(() => {
        consultarDeudasPorEmpresa(empresaSeleccionada);
    }, [empresaSeleccionada, sinGestionar]);

    return (
        <>
            <Grid container mb={2} spacing={2}>
                <Grid size={{ lg: 6 }}>
                    <CustomAutocompleteTs
                        options={empresas}
                        label='Seleccione Empresa'
                        labelFullField='Empresa'
                        optionLabel='nombre'
                        defaultValue={empresas.find(e => e.id === empresaSeleccionada) || null}
                        handleChange={(e, value) => consultarDeudasPorEmpresa(value.id.toString())}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <div className={`sin-gestionar-container ${sinGestionar ? 'active' : ''}`}>
                        <FormControlLabel
                            className="sin-gestionar-label"
                            control={
                                <Checkbox
                                    className="sin-gestionar-checkbox"
                                    checked={sinGestionar}
                                    onChange={handleFilterChange}
                                    name="sinGestionar"
                                    color="primary"
                                />
                            }
                            label="Sin gestionar"
                        />
                    </div>
                </Grid>
            </Grid>
            <Paper elevation={3} >
                <CustomDataGridTs
                    key={`grid-${empresaSeleccionada}-${sinGestionar}`}
                    rows={clientDebt}
                    columns={ConfigurarColumnaDeudores()}
                    gridId="gidChartOfAccounts"
                    actions={actionsConfig}
                    iconDirectionFilter="end"
                    searchLabel={"Buscar"}
                    titleEmptyTable='Tabla sin datos'
                />
            </Paper>

        </>
    )
}

export default Deudores