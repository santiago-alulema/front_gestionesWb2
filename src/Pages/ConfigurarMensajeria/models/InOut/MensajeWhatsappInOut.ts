// src/Pages/MensajesWhatsapp/Models/InOut/MensajeWhatsappInOut.ts
export interface MensajeWhatsappInOut {
    id: string;
    mensaje: string | null;
    tipoMensaje: string | null;
    mensajeCorreo: string | null;
}