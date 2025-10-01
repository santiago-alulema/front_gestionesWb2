import BasePage from "@/components/BasePage";
import { useLoading } from "@/components/LoadingContext";
import { useLogin } from "@/context/LoginContext";
import { StatusWhatsapp } from "@/Pages/WhatsappConfiguracion/models/StatusWhatsapp";
import { enviarMensajeWhatsapp, statusWhatsappServicioWeb } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
import { showAlert } from "@/utils/modalAlerts";
import { useInterval } from "@/utils/useInterval";
import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const WhatsappConfiguraionIndex = () => {
    const [statusWhatsapp, setStatusWhatsapp] = useState<StatusWhatsapp | null>(null);
    const { userData } = useLogin();
    const { startLoading, stopLoading } = useLoading();

    const routes = [{ text: "Configuracion Whatsapp" }];

    const statusWhatsappInit = async () => {
        startLoading();
        try {
            const respuesta = await statusWhatsappServicioWeb(userData.name);
            setStatusWhatsapp(respuesta);
        } catch (e) {
            console.error(e);
        } finally {
            stopLoading();
        }
    };

    useInterval(statusWhatsappInit, 600000, true);

    useEffect(() => {
        statusWhatsappInit();
    }, []);

    const enviarMensajePrueba = async () => {
        startLoading();
        try {
            await enviarMensajeWhatsapp(userData.name, userData.telefono, "hola 👋 mundo, es un mensaje de test");
            const configAlert = {
                title: "Correcto",
                message: `Mensaje de prueba enviado a <strong>${userData.telefono}</strong>.`,
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
        } catch (e) {
            console.error(e);
        } finally {
            stopLoading();
        }
    };

    return (
        <BasePage routers={routes} title="Configuracion de whatsapp">
            {!statusWhatsapp && "OBTENIENDO DATOS DEL SERVIDOR"}

            <Grid container spacing={2} alignItems="center">
                {!statusWhatsapp?.ready ? (
                    <>
                        <Grid size={{ xs: 12, lg: 12 }}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Card sx={{ width: 345 }}>
                                <CardMedia
                                    component="img"
                                    image={statusWhatsapp?.qrDataUrl || ""}
                                    alt="Imagen en base64"
                                    sx={{ height: 300, objectFit: "cover" }}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography fontWeight="bold" variant="h6">
                                        ESCANEE EL CÓDIGO QR PARA ENLAZAR CON SU WHATSAPP
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                ) : (
                    <Grid size={{ xs: 12, lg: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
                        <Card
                            sx={{
                                width: 345,
                                textAlign: "center",
                                bgcolor: "success.light",
                                color: "white",
                                boxShadow: 5,
                                borderRadius: 3,
                                p: 2,
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold">
                                    ✅ WhatsApp conectado
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    La sesión de <b>WhatsApp Web</b> está activa y lista para enviar mensajes.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* <Grid size={{ xs: 12, lg: 6 }} >
                    <TextField
                        multiline
                        rows={12}
                        label="Configure el mensaje de whatsapp.."
                        fullWidth
                    />
                </Grid> */}

                <Grid size={{ xs: 12, lg: 12 }}>
                    <Stack direction="column" spacing={1}>
                        {/* <Button fullWidth variant="contained">Guardar configuracion</Button> */}
                        <Button disabled={!statusWhatsapp?.ready} fullWidth onClick={enviarMensajePrueba} variant="contained">
                            Enviar Mensaje de prueba
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </BasePage>
    );
};

export default WhatsappConfiguraionIndex;
