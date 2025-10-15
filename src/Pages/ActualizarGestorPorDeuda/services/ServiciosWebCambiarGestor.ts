import { request } from "@/utils/AxiosUtils";
import EndPointCambiarGestor from './EndPointCambiarGestor';
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import ListasGenericas from "@/Pages/ActualizarGestorPorDeuda/models/ListasGenericas";

export const usuariosVigentesGestiones = () =>
    request<ListasGenericas[]>(
        'get',
        EndPointCambiarGestor.OBTENER_USUARIOS,
    );




export const deudasPorClienteBuscardorServiceWeb = (codigoCliente: String, empresa: string) =>
    request<DebstByClientInfoInDTO[]>(
        'get',
        `${EndPointCambiarGestor.BUSCAR_DEUDAS_EMPRESA_DEUDOR}/${codigoCliente}?empresa=${empresa}`,
    );


export const actualizarNuevoGestorServiceWeb = (deudaId: string, gestor: string) =>
    request<string>(
        'put',
        `${EndPointCambiarGestor.ACTUALIZAR_GESTOR_DEUDA}/${deudaId}?nuevoGestor=${gestor}`,
    );