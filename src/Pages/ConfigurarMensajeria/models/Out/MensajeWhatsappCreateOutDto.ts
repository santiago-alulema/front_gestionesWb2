// src/Pages/MensajesWhatsapp/Models/Out/MensajeWhatsappCreateOutDto.ts
export interface MensajeWhatsappCreateOutDto {
    mensaje: string;
    tipoMensaje: string;
    mensajeCorreo?: string | null;
}