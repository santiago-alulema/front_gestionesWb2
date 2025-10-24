// src/Pages/MensajesWhatsapp/Services/MensajesWhatsappServiciosWeb.ts

import { MensajeWhatsappInOut } from "@/Pages/ConfigurarMensajeria/models/InOut/MensajeWhatsappInOut";
import { MensajeWhatsappCreateOutDto } from "@/Pages/ConfigurarMensajeria/models/Out/MensajeWhatsappCreateOutDto";
import { MensajeWhatsappUpdateOutDto } from "@/Pages/ConfigurarMensajeria/models/Out/MensajeWhatsappUpdateOutDto";
import MensajeriaWhatsappEndPoint from "@/Pages/ConfigurarMensajeria/services/MensajeriaWhatsappEndPoint";
import EndPointMigraciones from "@/Pages/MigracionesPages/services/EndPointMigraciones";
import { request } from "@/utils/AxiosUtils";

export const obtenerMensajesWhatsappServicioWeb = (q?: string, tipo?: string) => {
    const params = new URLSearchParams();
    if (q?.trim()) params.append("q", q.trim());
    if (tipo?.trim()) params.append("tipo", tipo.trim());
    const qs = params.toString();
    const url = qs
        ? `${MensajeriaWhatsappEndPoint.OBTENER_MENSAJES}?${qs}`
        : `${MensajeriaWhatsappEndPoint.OBTENER_MENSAJES}`;

    return request<MensajeWhatsappInOut[]>("get", url);
};

export const grabarMensajeWhatsappServicioWeb = (dto: MensajeWhatsappCreateOutDto) =>
    request<MensajeWhatsappInOut>("post", `${MensajeriaWhatsappEndPoint.CREAR_MENSAJE}`, dto);

export const actualizarMensajeWhatsappServicioWeb = (
    id: string,
    dto: MensajeWhatsappUpdateOutDto
) => request<MensajeWhatsappInOut>("put", `${MensajeriaWhatsappEndPoint.ACTUALIZAR_MENSAJE}/${id}`, dto);

export const eliminarMensajeWhatsappServicioWeb = (id: string) =>
    request<void>("delete", `${MensajeriaWhatsappEndPoint.ELIMINAR_MENSAJE}/${id}`);
