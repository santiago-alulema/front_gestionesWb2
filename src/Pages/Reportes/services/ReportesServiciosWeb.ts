import END_POINT_REPORTES from "@/Pages/Reportes/services/EndpointReportes";
import { request } from "@/utils/AxiosUtils";

export const descargarReporteServicioWeb = (fechaInicio: string,
    fechaFin: string,
    tipoReporte: string,
    cliente: string
) =>
    request<Blob>(
        'get',
        `${END_POINT_REPORTES.DESCARGAR_REPORTE_EXCEL}/${fechaInicio}/${fechaFin}/${tipoReporte}/${cliente}`,
        null,
        null,
        true
    );