import { SubirDeudasCrecosEndPoint } from "@/Pages/SubirDeudasCrecosMasivoManual/services/SubirDeudasCrecosEndPoint";
import { request } from "@/utils/AxiosUtils";

export const SubirDeudasCrecosManualSW = (migraciones: any[]) =>
    request<String>(
        'post',
        SubirDeudasCrecosEndPoint.SUBIR_DEUDAS_CRECOS_MANUAL,
        migraciones
    );