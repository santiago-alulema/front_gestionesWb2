import { CapaniaCrecosEndPoint } from "@/Pages/SubirPorPartesCrecos/services/CapaniaCrecosEndPoint";
import { request } from "@/utils/AxiosUtils";

export const subirCampaniaServiceWeb = (campania: any, eliminarAnteriores: boolean) =>
    request<string>(
        'post',
        `${CapaniaCrecosEndPoint.SUBIR_CAMPANIA_CRECOS}?borrarTodo=${eliminarAnteriores}`,
        campania
    );

export const actualizarDeudasCampaniasServicioWeb = () =>
    request<string>(
        'get',
        `${CapaniaCrecosEndPoint.ACTUALIZAR_CRECOS_DEUDAS_CAMPANIA}`,
    );