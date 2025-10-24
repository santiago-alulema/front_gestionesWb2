export interface MensajeWhatsappUpdateOutDto {
    mensaje: string;
    tipoMensaje: string;
    mensajeCorreo?: string | null;
}