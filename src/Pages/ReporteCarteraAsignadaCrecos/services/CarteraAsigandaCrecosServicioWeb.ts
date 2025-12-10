import { EndPointCarteraAsigandaCrecos } from "@/Pages/ReporteCarteraAsignadaCrecos/services/EndPointCarteraAsigandaCrecos";
import { request } from "@/utils/AxiosUtils";

export const descargarCarteraAsignadaCrecos = () =>
    request<string>(
        "get",
        EndPointCarteraAsigandaCrecos.DESCARGAR_CARTERA_ASIGNADA_CRECOS,
        null,
        null,
        true
    );