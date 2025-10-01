import { StatusWhatsapp } from "@/Pages/WhatsappConfiguracion/models/StatusWhatsapp";
import EndpointWhatsapp from "@/Pages/WhatsappConfiguracion/services/EndpointWhatsapp";
import { request } from "@/utils/AxiosUtils";

export const statusWhatsappServicioWeb = (usuario: string) =>
    request<StatusWhatsapp>(
        'get',
        `${EndpointWhatsapp.INICIAR_SESSION_WHATSAPP.replace("{usuario}", usuario)}`,
        null,
        null,
        null,
        true
    );

export const enviarMensajeWhatsapp = (usuario: string,
    destinatario: string,
    message: string
) =>
    request<any>(
        'post',
        `${EndpointWhatsapp.ENVIAR_MENSAJE}`,
        {
            user: usuario,
            to: destinatario,
            message: message
        },
        null,
        null,
        true
    );