import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import { useLoading } from '@/components/LoadingContext';
import ClientInfo from '@/model/Dtos/In/ClientInfo';
import { ConfigurarColumnaDeudores } from '@/Pages/DeudoresGestionPage/config/ConfigurarColumnaDeudores';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import ListaEmpresasInDto from '@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto';
import { empresasServicioWeb } from '@/Pages/DeudoresGestionPage/services/GestionDeudaServicios';
import { allDeuodoresServiceWeb } from '@/services/Service';
import { Box, Checkbox, FormControlLabel, Grid, Paper } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const Deudores = () => {
    const [clientDebt, setClientDebt] = useState<ClientInfo[]>([]);
    const [empresas, setEmpresas] = useState<ListaEmpresasInDto[]>([{ id: "TODOS", nombre: "Todos" }]);
    const {
        setDeudorSeleccionado,
        empresaSeleccionada,
        setEmpresaSeleccionada,
        opcionGestion,
        setOpcionGestion } = useGestionarDeudas();
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        onInit();
    }, [])

    const onInit = async () => {
        startLoading()
        const listaEmpresaRespuesta = await empresasServicioWeb();
        setEmpresas(listaEmpresaRespuesta);
        const response = await allDeuodoresServiceWeb(empresaSeleccionada, opcionGestion)
        setClientDebt(response)
        stopLoading();
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

    const consultarDeudasPorEmpresa = useCallback(async (value: string) => {
        startLoading();
        setEmpresaSeleccionada(value);
        setClientDebt([]);
        const response = await allDeuodoresServiceWeb(value, opcionGestion);
        setClientDebt(response);
        stopLoading();
    }, [setEmpresaSeleccionada, opcionGestion]);

    useEffect(() => {
        consultarDeudasPorEmpresa(empresaSeleccionada);
    }, [empresaSeleccionada, opcionGestion, consultarDeudasPorEmpresa]);

    const opcionesFiltro = [
        {
            id: 'G',
            name: 'GESTIONADOS'
        },
        {
            id: 'SG',
            name: 'SIN GESTIONAR'
        },
        {
            id: 'IN',
            name: 'INCUMPLIDOS'
        }
    ]

    const consultarPorFiltro = (value: any) => {
        setOpcionGestion(!value?.id ? "" : value?.id)
    }

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
                        handleChange={(e, value) => consultarDeudasPorEmpresa(!value?.id ? "TODOS" : value.id.toString())}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <CustomAutocompleteTs
                        options={opcionesFiltro}
                        label='Seleccione Filtro'
                        labelFullField='Filtro'
                        handleChange={(e, value: any) => consultarPorFiltro(value)}
                    />
                </Grid>
            </Grid>
            <Paper elevation={3} >
                <CustomDataGridTs
                    getRowId={(row) => row.cedula}
                    key={`grid-${empresaSeleccionada}`}
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

export default Deudores;