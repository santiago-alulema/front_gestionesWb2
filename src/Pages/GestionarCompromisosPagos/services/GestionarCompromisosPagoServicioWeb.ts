import END_POINT_GESTIONES_COMPOROMISOS_PAGO from "@/Pages/GestionarCompromisosPagos/services/EndPointGestionesComporomisosPago";
import { request } from "@/utils/AxiosUtils";

export const INCUMPLIO_COMPROMISO_PAGO = (compromisoPagoId: string) =>
    request<string>(
        'get',
        `${END_POINT_GESTIONES_COMPOROMISOS_PAGO.INCUMPLIO_COMPROMISO_PAGO}/${compromisoPagoId}`
    );

export const DESACTIVAR_COMPROMISO_PAGO = (compromisoPagoId: string) =>
    request<string>(
        'get',
        `${END_POINT_GESTIONES_COMPOROMISOS_PAGO.DESACTIVAR_COMPROMISO_PAGO}/${compromisoPagoId}`
    );