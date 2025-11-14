import { CapaniaCrecosEndPoint } from "@/Pages/SubirPorPartesCrecos/services/CapaniaCrecosEndPoint";
import { request } from "@/utils/AxiosUtils";

export const subirCampaniaServiceWeb = (campania: any) =>
    request<string>(
        'post',
        `${CapaniaCrecosEndPoint.SUBIR_CAMPANIA_CRECOS}`,
        campania
    );