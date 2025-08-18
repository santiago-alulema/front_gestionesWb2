import ListaEmpresasInDto from "@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto";
import TiposTareaInDTO from "@/Pages/DeudoresGestionPage/models/TiposTareaInDTO";
import EndpointGestionDeuda from "@/Pages/DeudoresGestionPage/services/EndpointGestionDeuda";
import { request } from "@/utils/AxiosUtils";

export const movimientoDeudasPorDeuda = (deudaId: string) =>
    request<MovimientosDeudaInDTO[]>(
        'get',
        `${EndpointGestionDeuda.MOVIMIENTOS_DEUDA}/${deudaId}`
    );


export const tiposTareasServicioWeb = () =>
    request<TiposTareaInDTO[]>(
        'get',
        EndpointGestionDeuda.TIPOS_TAREA
    );

export const empresasServicioWeb = () =>
    request<ListaEmpresasInDto[]>(
        'get',
        EndpointGestionDeuda.LISTA_EMPRESAS
    );