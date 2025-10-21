import { IReferenciaDeudor } from "@/Pages/DeudoresGestionPage/models/IReferenciasDeudor";
import ListaEmpresasInDto from "@/Pages/DeudoresGestionPage/models/ListaEmpresasInDto";
import { MensajeriaInDto } from "@/Pages/DeudoresGestionPage/models/MensajeriaInDto";
import TiposTareaInDTO from "@/Pages/DeudoresGestionPage/models/TiposTareaInDTO";
import EndpointGestionDeuda from "@/Pages/DeudoresGestionPage/services/EndpointGestionDeuda";
import { request } from "@/utils/AxiosUtils";

export const movimientoDeudasPorDeuda = (deudaId: string) =>
    request<MovimientosDeudaInDTO[]>(
        'get',
        `${EndpointGestionDeuda.MOVIMIENTOS_DEUDA}/${deudaId}`
    );

export const refereciasDeudorServicioWeb = (deudaId: string) =>
    request<IReferenciaDeudor[]>(
        'get',
        `${EndpointGestionDeuda.REFERENCIAS_DEUDOR}/${deudaId}`
    );


export const tiposTareasServicioWeb = () =>
    request<TiposTareaInDTO[]>(
        'get',
        EndpointGestionDeuda.TIPOS_TAREA
    );

export const mensajesGestionesServicioWeb = () =>
    request<MensajeriaInDto>(
        'get',
        EndpointGestionDeuda.MENSAJES_GESTIONES
    );

export const mensajesTareasServicioWeb = () =>
    request<MensajeriaInDto[]>(
        'get',
        EndpointGestionDeuda.MENSAJES_TAREAS
    );

export const empresasServicioWeb = () =>
    request<ListaEmpresasInDto[]>(
        'get',
        EndpointGestionDeuda.LISTA_EMPRESAS
    );