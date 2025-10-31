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

    return (
        <BasePage title="Sesiones de WhatsApp">
            <WhatsappSessionsPage />

        </BasePage>
    );
};

export default WhatsappConfiguraionIndex;
