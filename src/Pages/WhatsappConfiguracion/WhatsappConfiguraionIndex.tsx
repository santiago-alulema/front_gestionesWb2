import BasePage from "@/components/BasePage";
import { useLoading } from "@/components/LoadingContext";
import { useLogin } from "@/context/LoginContext";
import { StatusWhatsapp } from "@/Pages/WhatsappConfiguracion/models/StatusWhatsapp";
import WhatsappSessionsPage from "@/Pages/WhatsappConfiguracion/pages/WhatsappSessionsPage";
import { enviarMensajeWhatsapp, statusWhatsappServicioWeb } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
import { request } from "@/utils/AxiosUtils";
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

    async function ensureAndPoll(user: string) {
        statusWhatsappInit();
        statusWhatsappInit();
        // 1) Dispara ensure (no-bloqueante)
        // const respuesta = await request('get', `session/${user}/ensure`, null, null, null, true);
        // setStatusWhatsapp(respuesta);
        //2) Polling del QR
        // const timer = setInterval(async () => {
        //     statusWhatsappInit();
        // }, 2000);
    }

    // useInterval(statusWhatsappInit, 600000, true);

    useEffect(() => {
        ensureAndPoll(userData.name);
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
        <WhatsappSessionsPage />
    );
};

export default WhatsappConfiguraionIndex;
