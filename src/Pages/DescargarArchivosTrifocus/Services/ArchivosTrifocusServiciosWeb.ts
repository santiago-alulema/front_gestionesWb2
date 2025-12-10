import { NombreArchivosCrecos } from "@/Pages/DescargarArchivosTrifocus/models/NombreArchivosCrecos";
import { EndPointArchivosTrifocus } from "@/Pages/DescargarArchivosTrifocus/Services/EndPointArchivosTrifocus";
import { request } from "@/utils/AxiosUtils";

export const descargarArchivosTrifocus = (nombreArchivo: string) =>
    request<String>("get",
        `${EndPointArchivosTrifocus.DESCARGAR_ARCHIVOS_TRIFOCUS}?nombreEspecifico=${nombreArchivo}`,
        null,
        null,
        true);

export const nombresArchivosCrecos = () =>
    request<NombreArchivosCrecos[]>("get",
        `${EndPointArchivosTrifocus.OBTENER_NOMBRE_ARCHIVOS_CRECOC}`);
