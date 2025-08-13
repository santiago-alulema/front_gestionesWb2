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

const Deudas = () => {
    const navigate = useNavigate();
    const { deudorSeleccionado, setDeudaSeleccionada, abrirModalGestionarDeuda, setAbrirModalGestionarDeuda } = useGestionarDeudas();
    const [deudasDeudor, setDeudasDeudor] = useState<DebstByClientInfoInDTO[]>([]);


    const seleccionarDeudaFuncion = (item: DebstByClientInfoInDTO) => {
        setDeudaSeleccionada(item)
        setAbrirModalGestionarDeuda(true)
    }

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: seleccionarDeudaFuncion,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'button',
            label: 'Gestionar',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    const onInit = async () => {
        const response = await deudasPorClienteServiceWeb(deudorSeleccionado.cedula);
        setDeudasDeudor(response)
    }


    useEffect(() => {
        onInit()
    }, [])


    const routes = [
        {
            text: "Deudores",
            link: () => { console.log("") }
        },
        {
            text: "Deudas"
        }
    ]

    return (
        <>
            <BasePage routers={routes}
                title="Lista de Deudores">
                <Box >
                    <div >
                        <Card sx={{ maxWidth: 600, width: "100%", p: 1, boxShadow: 0 }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                                        <PersonIcon />
                                    </Avatar>
                                    <Typography variant="h5" fontWeight="bold">
                                        {deudorSeleccionado.nombre}
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid >
                                        <Box display="flex" alignItems="center">
                                            <LocationOnIcon color="action" sx={{ mr: 1 }} />
                                            <Typography variant="body1">{deudorSeleccionado.direccion}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid >
                                        <Box display="flex" alignItems="center">
                                            <PhoneIcon color="action" sx={{ mr: 1 }} />
                                            <Typography variant="body1">{deudorSeleccionado.telefono}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid >
                                        <Box display="flex" alignItems="center">
                                            <EmailIcon color="action" sx={{ mr: 1 }} />
                                            <Typography variant="body1">{deudorSeleccionado.correo}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <CustomDataGridTs
                            rows={deudasDeudor}
                            columns={ConfigurarColumnasDeudas()}
                            gridId="gidChartOfAccounts"
                            columsHide={['id']}
                            hiddenFilterColumn={['actions']}
                            actions={actionsConfig}
                            iconDirectionFilter="end"
                            searchLabel={"Buscar"}
                        />
                    </div>
                </Box >
            </BasePage>
            <CustomModalTs positionTop="2px" open={abrirModalGestionarDeuda}
                handleClose={() => setAbrirModalGestionarDeuda(!abrirModalGestionarDeuda)} width={800}>
                <GestionarDeuda />
            </CustomModalTs>
        </>
    )
}

export default Deudas