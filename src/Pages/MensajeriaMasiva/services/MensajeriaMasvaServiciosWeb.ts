import MensajeriaMasivaEndPoint from "@/Pages/MensajeriaMasiva/services/MensajeriaMasivaEndPoint";
import { request } from "@/utils/AxiosUtils";
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';



export const obtenerDeudasMensajeriaServicioWeb = (empresa: string, opcionFiltro: string) =>
    request<DebstByClientInfoInDTO[]>(
        'get',
        `${MensajeriaMasivaEndPoint.OBTENER_DEUDAS_MENSAJERIA}?empresa=${empresa}&opcionFiltro=${opcionFiltro}`,
    );

export const enviarMensajeEncolado = (mensaje: BulkItem) =>
    request<any>(
        'post',
        `${MensajeriaMasivaEndPoint.ENVIAR_MENSAJE_ENCOLADO}`,
        mensaje,
        null,
        null,
        true
    );

export const guardarMensajesEnviados = (idCliente: string, idUsuario: string, telefono: string) =>
    request<any>(
        'post',
        `${MensajeriaMasivaEndPoint.GUARDAR_MENSAJES_ENVIADOS}`,
        {
            "IdCliente": idCliente,
            "IdUsuario": idUsuario,
            "TelefonoEnviado": telefono
        },
        null,
        null,
        false
    );

// export const obtenerDeudasMensajeriaServicioWeb = (empresa: string, opcionFiltro: string) =>
//     request<DebstByClientInfoInDTO[]>(
//         'get',
//         `${MensajeriaMasivaEndPoint.OBTENER_DEUDAS_MENSAJERIA}?empresa=${empresa}&opcionFiltro=${opcionFiltro}`,
//     );