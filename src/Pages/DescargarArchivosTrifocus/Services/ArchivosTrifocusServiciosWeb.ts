import { EndPointArchivosTrifocus } from "@/Pages/DescargarArchivosTrifocus/Services/EndPointArchivosTrifocus";
import { request } from "@/utils/AxiosUtils";

export const descargarArchivosTrifocus = () =>
    request<String>("get",
        `${EndPointArchivosTrifocus.DESCARGAR_ARCHIVOS_TRIFOCUS}`,
        null,
        null,
        true);
