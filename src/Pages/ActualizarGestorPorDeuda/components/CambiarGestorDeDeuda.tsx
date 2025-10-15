import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { ConfigColumnasCambioGestorDeuda } from "@/Pages/ActualizarGestorPorDeuda/configs/ConfigColumnasCambioGestorDeuda";
import {
    actualizarNuevoGestorServiceWeb,
    deudasPorClienteBuscardorServiceWeb,
    usuariosVigentesGestiones,
} from "@/Pages/ActualizarGestorPorDeuda/services/ServiciosWebCambiarGestor";
import ListaEmpresasInDto from "@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto";
import { empresasServicioWeb } from "@/Pages/DeudoresGestionPage/services/GestionDeudaServicios";
import { deudasPorClienteServiceWeb } from "@/services/Service";
import DebstByClientInfoInDTO from "@/model/Dtos/In/DeudasInDTO";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import { useLoading } from "@/components/LoadingContext";
import { showAlert, showAlertConfirm } from "@/utils/modalAlerts";
import ListasGenericas from "@/Pages/ActualizarGestorPorDeuda/models/ListasGenericas";

const CambiarGestorDeDeuda = () => {
    const [empresas, setEmpresas] = useState<ListaEmpresasInDto[]>([]);
    const [usuarios, setUsuarios] = useState<ListasGenericas[]>([]);
    const [deudasDeudor, setDeudasDeudor] = useState<DebstByClientInfoInDTO[]>([]);
    const [clienteBusqueda, setClienteBusqueda] = useState<string>("");
    const [gestorSeleccionado, setGestorSeleccionado] = useState<string>("");

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<string>("");
    const { startLoading, stopLoading } = useLoading();
    const cargarEmpresas = async () => {
        startLoading();
        const listaEmpresaRespuesta = await empresasServicioWeb();
        setEmpresas(listaEmpresaRespuesta);
        const respuesta = await usuariosVigentesGestiones();
        setUsuarios(respuesta);
        stopLoading();
    };

    useEffect(() => {
        cargarEmpresas();
    }, []);

    const BuscarDeudaDelCliente = async () => {
        startLoading();
        const respuesta = await deudasPorClienteBuscardorServiceWeb(
            clienteBusqueda,
            empresaSeleccionada
        );
        setDeudasDeudor(respuesta);
        stopLoading();
    };

    const cambiarGestor = async (item: DebstByClientInfoInDTO) => {
        if (gestorSeleccionado) {
            const configAlert = {
                title: "Error",
                message: ` <strong>NO SE A SELECCIONADO UN NUEVO GESTOR</strong>`,
                type: 'error',
                callBackFunction: false
            };
            showAlert(configAlert);
        }
        const configAlert = {
            title: "Alerta",
            message: `Esta seguro que desea cambiar el gestor de <strong>${item.nombreCompleto}</strong> a gestor con cedula <strong>${gestorSeleccionado}</strong>`,
            type: 'warning',
            callBackFunction: false
        };
        const respuesta = await showAlertConfirm(configAlert);
        if (respuesta) {
            startLoading();
            await actualizarNuevoGestorServiceWeb(item.idDeuda, gestorSeleccionado);
            stopLoading();
            const configAlert = {
                title: "Correcto",
                message: `Se actualizo<strong> correctamente.</strong>`,
                type: 'success',
                callBackFunction: true,
                onCloseFunction: BuscarDeudaDelCliente
            };
            showAlert(configAlert);
        }
    }

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "cambiar",
            onClick: cambiarGestor,
            icon: <ChangeCircleIcon />,
            hidden: false,
            sizeIcon: "large",
            label: "",
            typeInput: "icon",
            inputSize: "clamp(20px, 0.264rem + 1.229vw, 1.75rem)",
        },
    ];




    const puedeBuscar = !!empresaSeleccionada && clienteBusqueda.trim().length >= 1; // solo UI

    return (
        <Box  >
            <Card variant="outlined" className="rounded-2xl" sx={{ padding: 5 }}>
                <CardContent>
                    <Grid container spacing={2} mb={1}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <CustomAutocompleteTs
                                options={empresas}
                                label="Seleccione Empresa deuda"
                                labelFullField="Seleccione empresa"
                                optionLabel="nombre"
                                handleChange={(e: any, value: ListaEmpresasInDto) =>
                                    setEmpresaSeleccionada(value?.id ?? "")
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Buscar Nombre o Cédula del Deudor"
                                placeholder="Ej.: 0105… o Juan Pérez"
                                value={clienteBusqueda}
                                onChange={(e: any) => setClienteBusqueda(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={BuscarDeudaDelCliente}
                                                disabled={!puedeBuscar}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={!empresaSeleccionada ? "Seleccione una empresa para habilitar la búsqueda" : "Ingrese nombre o cédula"}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }} display="flex" alignItems="stretch">
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={BuscarDeudaDelCliente}
                                disabled={!puedeBuscar}
                                startIcon={<SearchIcon />}
                            >
                                Buscar Cliente
                            </Button>
                        </Grid>
                        {/* Nuevo gestor */}
                        <Grid size={{ xs: 12, md: 12 }}>
                            <CustomAutocompleteTs
                                options={usuarios}
                                label="Seleccione nuevo gestor"
                                labelFullField="Nuevo gestor"
                                optionLabel="nombre"
                                handleChange={(e: any, value: ListasGenericas) =>
                                    setGestorSeleccionado(value?.id ?? "")
                                }
                            />
                        </Grid>

                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Tabla de resultados (misma lógica) */}
                    <Grid container>
                        <Grid size={{ xs: 12 }}>
                            <CustomDataGridTs
                                getRowId={(row: any) => row.numeroFactura}
                                rows={deudasDeudor}
                                columns={ConfigColumnasCambioGestorDeuda()}
                                gridId="gidChartOfAccounts"
                                columsHide={["id"]}
                                hiddenFilterColumn={["actions"]}
                                actions={actionsConfig}
                                iconDirectionFilter="end"
                                searchLabel={"Buscar"}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CambiarGestorDeDeuda;
