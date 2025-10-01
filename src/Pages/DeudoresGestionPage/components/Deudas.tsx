import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { ConfigurarColumnasDeudas } from "@/Pages/DeudoresGestionPage/config/ConfigurarColumnasDeudas";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import BasePage from "@/components/BasePage";
import { useNavigate } from "react-router-dom";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";
import { deudasPorClienteServiceWeb } from "@/services/Service";
import { useEffect, useState } from "react";
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import CustomModalTs from "@/components/CustomModalTs";
import GestionarDeuda from "@/Pages/DeudoresGestionPage/components/GestionarDeuda";
import TabInformacionDeuda from "@/Pages/DeudoresGestionPage/components/TabInformacionDeuda";
import InfoIcon from '@mui/icons-material/Info';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import FiberNewIcon from '@mui/icons-material/FiberNew';

const Deudas = () => {
    const navigate = useNavigate();
    const { deudorSeleccionado,
        setDeudaSeleccionada,
        abrirModalGestionarDeuda,
        setAbrirModalGestionarDeuda,
        setAbrirModalInformacionDeuda,
        abrirModalInformacionDeuda,
        opcionGestion,
        empresaSeleccionada } = useGestionarDeudas();
    const [deudasDeudor, setDeudasDeudor] = useState<DebstByClientInfoInDTO[]>([]);

    useEffect(() => {
        if (!deudorSeleccionado) {
            navigate("/gestion/ver-deudores");
            return;
        }
    }, [deudorSeleccionado, navigate]);

    const seleccionarDeudaFuncion = (item: DebstByClientInfoInDTO) => {
        setDeudaSeleccionada(item)
        setAbrirModalGestionarDeuda(true)
    }

    const abrirModalInformacion = (item: DebstByClientInfoInDTO) => {
        setDeudaSeleccionada(item)
        setAbrirModalInformacionDeuda(true)
    }

    const abrirNuevaVentanaDeuda = (item: DebstByClientInfoInDTO) => {
        const nuevaVentana = window.open(`/gestionar-deuda-nuevo?deudaId=${item.idDeuda}&deudorId=${item.idDeudor}`, '_blank');
        if (nuevaVentana) {
            nuevaVentana.focus();
        }
    }

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: abrirModalInformacion,
            icon: <InfoIcon />,
            hidden: false,
            sizeIcon: 'small',
            label: 'Info',
            typeInput: 'button',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        },
        {
            tooltip: "Nueva Ventana",
            onClick: abrirNuevaVentanaDeuda,
            icon: <FiberNewIcon />,
            hidden: false,
            sizeIcon: 'small',
            label: 'Vnt',

            typeInput: 'button',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }

    ];

    const onInit = async () => {
        if (!deudorSeleccionado) return;
        const response = await deudasPorClienteServiceWeb(deudorSeleccionado.cedula, empresaSeleccionada, opcionGestion);
        setDeudasDeudor(response)
    }

    useEffect(() => {
        onInit()
    }, [])

    const routes = [
        {
            text: "Deudores",
            link: () => { navigate("/gestion/ver-deudores") },
            function: () => { navigate("/gestion/ver-deudores") },
        },
        {
            text: "Deudas"
        }
    ]

    if (!deudorSeleccionado) {
        return null;
    }

    return (
        <>
            <BasePage routers={routes}
                title="Lista de Deudas">
                <Box >
                    <Card sx={{ width: "100%", boxShadow: 0, mb: 2 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Avatar sx={{ bgcolor: "primary.main", mr: 1, width: 25, height: 25 }}>
                                    <PersonIcon sx={{ width: 20 }} />
                                </Avatar>
                                <Typography variant="body1" fontWeight="bold">
                                    {deudorSeleccionado?.nombre ?? ""}
                                </Typography>
                            </Box>

                            <Grid container spacing={1}>
                                <Grid size={{ lg: 6 }}>
                                    <Box display="flex" alignItems="center">
                                        <LocationOnIcon color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{deudorSeleccionado.direccion}</Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ lg: 6 }}  >
                                    <Box display="flex" alignItems="center">
                                        <PhoneIcon color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{deudorSeleccionado.telefono}</Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ lg: 6 }} >
                                    <Box display="flex" alignItems="center">
                                        <EmailIcon color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{deudorSeleccionado.correo}</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ lg: 6 }}>
                                    <Box display="flex" alignItems="center">
                                        <FingerprintIcon color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body2"><strong>DNI:</strong> {deudorSeleccionado.cedula}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <CustomDataGridTs
                        getRowId={(row) => row.numeroFactura}
                        rows={deudasDeudor}
                        columns={ConfigurarColumnasDeudas()}
                        gridId="gidChartOfAccounts"
                        columsHide={['id']}
                        hiddenFilterColumn={['actions']}
                        actions={actionsConfig}
                        iconDirectionFilter="end"
                        searchLabel={"Buscar"}
                    />
                </Box >
            </BasePage>
            <CustomModalTs positionTop="2px" open={abrirModalGestionarDeuda} height={'80%'}
                handleClose={() => setAbrirModalGestionarDeuda(!abrirModalGestionarDeuda)} width={800}>
                <GestionarDeuda />
            </CustomModalTs>

            <CustomModalTs positionTop="2px" open={abrirModalInformacionDeuda} height={'90%'}
                handleClose={() => setAbrirModalInformacionDeuda(!abrirModalInformacionDeuda)} width={800}>
                <TabInformacionDeuda></TabInformacionDeuda>
            </CustomModalTs>
        </>
    )
}

export default Deudas