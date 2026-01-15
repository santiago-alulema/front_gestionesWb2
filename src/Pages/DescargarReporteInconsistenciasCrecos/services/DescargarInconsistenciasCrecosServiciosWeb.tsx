import { DescargarInconsistenciasCrecosEndPoint } from "@/Pages/DescargarReporteInconsistenciasCrecos/services/DescargarInconsistenciasCrecosEndPoint";
import { request } from "@/utils/AxiosUtils";

export const descargarInconsistenciasCrecos = () =>
    request<String>("get",
        `${DescargarInconsistenciasCrecosEndPoint.DESCARGAR_REPORTE_INCONSISTENCIAS}`,
        null,
        null,
        true);