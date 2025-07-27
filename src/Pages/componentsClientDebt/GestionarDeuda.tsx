import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Tooltip,
    Typography,
    useTheme,
    Divider,
    TextField,
    Button,
    Stack,
    Paper
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DebstByClientInfoInDTO from "@/model/Dtos/In/DebstByClientInfoInDTO";
import { format } from "date-fns";
import { es, mt } from "date-fns/locale";
import PhoneNumbersInput from "@/components/PhoneNumbersInput";
import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs";
import GestionDeudasHook from "@/Pages/componentsClientDebt/hook/GestionDeudasHook";
import { useEffect, useState } from 'react';
import CustomDatePicker from "@/components/DataGridCommon/CustomDatePicker";
import TipoGestioneOutDTO from "@/model/Dtos/In/TipoGestioneOutDTO";
import { ICompromisoPagoOutDTO } from "@/model/Dtos/Out/ICompromisoPagoOutDTO";
import { actualizarCompromisoServicioWeb, grabarCompromisoPago, grabarGestion } from "@/services/Service";
import { IGestionInDTO } from "@/model/Dtos/Out/IGestionOutDTO";
import { showAlert } from "@/utils/modalAlerts";

interface GestionarDeudaProps {
    debt: DebstByClientInfoInDTO;
    setIsVisible: (status: boolean) => void;
}

const GestionarDeuda = ({ debt, setIsVisible }: GestionarDeudaProps) => {
    const theme = useTheme();
    const {
        gestionesPadre,
        gestionHijo,
        LlenarGestionesHijo,
        obtenerTelefonosCliente,
        telefonosActivos,
        setTelefonosActivos } = GestionDeudasHook();
    const [gestionSeleccionada, setGestionSeleccionada] = useState<TipoGestioneOutDTO>();
    const [fechaSeleccionada, setFechaSeleccionada] = useState("")
    const [observaciones, setObservaciones] = useState("")

    const [monto, setMonto] = useState("")

    const formatDate = (dateString: string) =>
        format(new Date(dateString), "dd MMM yyyy", { locale: es });

    const daysRemaining = () => {
        const today = new Date();
        const dueDate = new Date(debt.fechaVencimiento);
        const diffTime = dueDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const isOverdue = daysRemaining() <= 0;

    const verificartipoGestion = (value: any) => {
        setGestionSeleccionada(value)
    }

    const grabarGestionOPagos = async () => {
        if (gestionSeleccionada?.tipoGestion === 'CP') {
            const compromisoPago: ICompromisoPagoOutDTO = {
                fechaCompromiso: fechaSeleccionada,
                montoComprometido: Number.parseFloat(monto),
                estado: 'C',
                idDeuda: debt.deudaId,
                observaciones: observaciones
            }
            await grabarCompromisoPago(compromisoPago)
        }

        if (gestionSeleccionada?.tipoGestion === 'G') {
            const gestion: IGestionInDTO = {
                idDeuda: debt.deudaId,
                descripcion: observaciones,
                idTipoGestion: gestionSeleccionada.idTipoGestion
            }
            await grabarGestion(gestion)
        }


        await actualizarCompromisoServicioWeb({
            IdCompromiso: debt.compromisoPagoId,
            NuevoEstado: "G"
        })

        const configAlert = {
            title: "Informacion",
            message: "TIENE COMPROMISOS DE PAGO PARA HOY",
            type: 'info',
            callBackFunction: false
        };
        showAlert(configAlert);
        setIsVisible(false);
    }

    useEffect(() => {
        obtenerTelefonosCliente(debt.cedulaCliente);
    }, [debt.cedulaCliente]);



    return (
        <Box sx={{ minHeight: "100%" }}>
            <Tooltip title="Regresar">
                <IconButton
                    onClick={() => setIsVisible(false)}
                    sx={{
                        color: theme.palette.grey[700],
                        position: 'relative',
                        top: -43,
                        left: 0,
                    }}
                >
                    <ArrowBackIcon />
                    <Typography sx={{ fontSize: 18, marginLeft: 1 }}>
                        Regresar
                    </Typography>
                </IconButton>
            </Tooltip>
            <Grid container spacing={2} justifyContent="left" sx={{
                color: theme.palette.grey[700],
                position: 'relative',
                top: -37,
                left: 0,
            }}>

                <Grid size={{ xs: 12, md: 10, lg: 12 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: "#ffffff",
                            width: '100%'
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ textAlign: "center", color: theme.palette.grey[800], fontWeight: 600 }}
                            >
                                Detalle de Deuda
                            </Typography>

                            <Typography
                                variant="h5"
                                textAlign="center"
                                sx={{ fontWeight: 500, mb: 2, color: theme.palette.primary.main }}
                            >
                                {/* {debt.descripcion} */}
                            </Typography>

                            <Grid container spacing={2} >
                                <Grid size={{ xs: 6, md: 6, lg: 6 }} sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <Chip
                                        label={`Monto original: $${debt.montoOriginal.toLocaleString()}`}
                                        sx={{
                                            fontSize: 14,
                                            backgroundColor: theme.palette.grey[100],
                                            color: theme.palette.grey[800],
                                            height: 36,

                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 6, md: 6, lg: 6 }} sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <Chip
                                        label={`Saldo actual: $${debt.saldoActual.toLocaleString()}`}
                                        sx={{
                                            fontSize: 14,
                                            backgroundColor: isOverdue
                                                ? theme.palette.error.light
                                                : theme.palette.success.light,
                                            color: isOverdue
                                                ? theme.palette.error.dark
                                                : theme.palette.primary.contrastText,
                                            px: 2,
                                            height: 36,
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2} textAlign={'center'}>
                                <Grid size={{ xs: 12, md: 10, lg: 6 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Fecha de asignación
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {formatDate(debt.fechaAsignacion)}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 10, lg: 6 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Fecha de vencimiento
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 500,
                                            color: isOverdue
                                                ? theme.palette.error.main
                                                : theme.palette.success.main,
                                        }}
                                    >
                                        {formatDate(debt.fechaVencimiento)}{" "}
                                        {/* {isOverdue
                                            ? "(Vencido)"
                                            : `(${daysRemaining()} días restantes)`} */}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ lg: 12 }}>
                    <Card elevation={3}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: "#ffffff",
                            width: '100%'
                        }}>

                        <CardContent>
                            <Typography textAlign='center' variant="h6">Grabar Gestion</Typography>
                            <Grid container>
                                <Grid size={{ lg: 5 }}>
                                    <PhoneNumbersInput phones={telefonosActivos} setPhones={setTelefonosActivos} cedula={debt.cedulaCliente} />
                                </Grid>
                                <Grid size={{ lg: 7 }}>
                                    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4, }}>
                                        <Grid container>
                                            <Grid size={{ lg: 12 }}>
                                                <Typography textAlign='center' variant="h6">Datos Gestion</Typography>
                                            </Grid>
                                            <Grid size={{ lg: 12 }}>
                                                <CustomAutocompleteTs
                                                    options={gestionesPadre}
                                                    optionLabel="nombre"
                                                    optionValue="idTipoGestion"
                                                    label="Seleccione el tipo de Gestion Padre"
                                                    labelFullField="Tipo de Gestion Padre"
                                                    handleChange={(event, value) => LlenarGestionesHijo(value?.idTipoGestion ?? "")}
                                                />
                                            </Grid>
                                            {!!gestionHijo.length && (
                                                <Grid size={{ lg: 12 }} mt={2}>
                                                    <CustomAutocompleteTs
                                                        options={gestionHijo}
                                                        optionLabel="nombre"
                                                        optionValue="idTipoGestion"
                                                        label="Seleccione el tipo de Gestion"
                                                        labelFullField="Tipo de Gestion"
                                                        handleChange={(event, value) => verificartipoGestion(value)}
                                                    />
                                                </Grid>
                                            )}
                                            {gestionSeleccionada?.tipoGestion === 'CP' && (
                                                <>
                                                    <Grid size={{ lg: 7 }} mt={2}>
                                                        <CustomDatePicker
                                                            label="Fecha de Compromiso de Pago"
                                                            onChangeValue={(date) => setFechaSeleccionada(date)}
                                                            requiredField
                                                        />
                                                    </Grid>
                                                    <Grid size={{ lg: 4 }} mt={2}>
                                                        <TextField
                                                            label="Monto compromiso"
                                                            fullWidth
                                                            sx={{ ml: 2 }}
                                                            onChange={(e) => setMonto(e.target.value)}
                                                        />
                                                    </Grid>
                                                </>
                                            )
                                            }
                                            <Grid size={{ lg: 12 }}>
                                                <TextField sx={{ mt: 2 }} fullWidth label='Observaciones..' onChange={(e) => setObservaciones(e.target.value)} multiline={true} rows={5}></TextField>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ lg: 12 }} >
                    <Stack direction='row' justifyContent='end' spacing={2}>
                        <Button variant="contained" sx={{ borderRadius: 50 }} onClick={grabarGestionOPagos}>Guardar</Button>
                        <Button variant="contained" sx={{ borderRadius: 50, background: '#9b9b9b' }} >Cancelar</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GestionarDeuda;
