import EndpointGestionDeuda from "@/Pages/DeudoresGestionPage/services/EndpointGestionDeuda";
import { request } from "@/utils/AxiosUtils";

export const movimientoDeudasPorDeuda = (deudaId: string) =>
    request<MovimientosDeudaInDTO[]>(
        'get',
        `${EndpointGestionDeuda.MOVIMIENTOS_DEUDA}/${deudaId}`
    );