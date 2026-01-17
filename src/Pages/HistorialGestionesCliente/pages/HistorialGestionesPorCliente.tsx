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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { ConfigColumnasCambioGestorDeuda } from "@/Pages/ActualizarGestorPorDeuda/configs/ConfigColumnasCambioGestorDeuda";
import {
    deudasPorClienteBuscardorServiceWeb,
    usuariosVigentesGestiones,
} from "@/Pages/ActualizarGestorPorDeuda/services/ServiciosWebCambiarGestor";
import ListaEmpresasInDto from "@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto";
import { empresasServicioWeb } from "@/Pages/DeudoresGestionPage/services/GestionDeudaServicios";
import DebstByClientInfoInDTO from "@/model/Dtos/In/DeudasInDTO";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import { useLoading } from "@/components/LoadingContext";
import ListasGenericas from "@/Pages/ActualizarGestorPorDeuda/models/ListasGenericas";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";
import CustomModalTs from "@/components/CustomModalTs";
import MovimientosDeuda from "@/Pages/DeudoresGestionPage/components/MovimientosDeuda";
import { HistorialGestionesConfigColums } from "@/Pages/HistorialGestionesCliente/configs/HistorialGestionesConfigColums";
import { DetailItem } from "@/components/DataGridCommon/DetailItem";

const HistorialGestionesPorCliente = () => {
    const [empresas, setEmpresas] = useState<ListaEmpresasInDto[]>([]);
    const [deudasDeudor, setDeudasDeudor] = useState<DebstByClientInfoInDTO[]>([]);
    const [clienteBusqueda, setClienteBusqueda] = useState<string>("");


    const { setDeudaSeleccionada, abrirModalInformacionDeuda, setAbrirModalInformacionDeuda, deudaSeleccionada } = useGestionarDeudas();

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<string>("");
    const { startLoading, stopLoading } = useLoading();
    const cargarEmpresas = async () => {
        startLoading();
        const listaEmpresaRespuesta = await empresasServicioWeb();
        setEmpresas([{ id: "TODOS", nombre: "TODOS" }, ...listaEmpresaRespuesta]);
        stopLoading();
    };

    useEffect(() => {
        cargarEmpresas();
    }, []);

    const BuscarDeudaDelCliente = async () => {
        try {
            startLoading();
            const respuesta = await deudasPorClienteBuscardorServiceWeb(
                clienteBusqueda,
                empresaSeleccionada
            );
            setDeudasDeudor(respuesta);
        } finally {
            stopLoading();
        }
    };

    const verHistorialGestionCliente = async (item: DebstByClientInfoInDTO) => {
        setDeudaSeleccionada(item)
        setAbrirModalInformacionDeuda(true)
    }

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "cambiar",
            onClick: verHistorialGestionCliente,
            icon: <RemoveRedEyeIcon />,
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

                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Grid container>
                        <Grid size={{ xs: 12 }}>
                            <CustomDataGridTs
                                getRowId={(row: any) => row.numeroFactura}
                                rows={deudasDeudor}
                                columns={HistorialGestionesConfigColums()}
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
            <CustomModalTs open={abrirModalInformacionDeuda}
                handleClose={() => setAbrirModalInformacionDeuda(false)}
                width={"80%"}
            >
                <DetailItem title="Producto" value={deudaSeleccionada?.productoDescripcion ?? "SIN DESCRIPCION"} />
                <MovimientosDeuda />
            </CustomModalTs>
        </Box>
    );
};

export default HistorialGestionesPorCliente;
