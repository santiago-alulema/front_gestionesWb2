import MensajeriaMasivaEndPoint from "@/Pages/MensajeriaMasiva/services/MensajeriaMasivaEndPoint";
import { request } from "@/utils/AxiosUtils";
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';



export const obtenerDeudasMensajeriaServicioWeb = (empresa: string, opcionFiltro: string) =>
    request<DebstByClientInfoInDTO[]>(
        'get',
        `${MensajeriaMasivaEndPoint.OBTENER_DEUDAS_MENSAJERIA}?empresa=${empresa}&opcionFiltro=${opcionFiltro}`,
    );