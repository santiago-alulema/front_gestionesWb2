import ClientInfo from "@/model/Dtos/In/ClientInfo";
import DebstByClientInfoInDTO from "@/model/Dtos/In/DebstByClientInfoInDTO";
import LoginIn from "@/model/Dtos/In/LoginIn";
import TelefonosClientesActivos from "@/model/Dtos/In/TelefonosClientesActivos";
import TipoGestioneOutDTO from "@/model/Dtos/In/TipoGestioneOutDTO";
import VerificarEstadoTelefonoCliente from "@/model/Dtos/In/VerificarEstadoTelefonoCliente";
import { ICompromisoPagoOutDTO } from "@/model/Dtos/Out/ICompromisoPagoOutDTO";
import { IGestionInDTO } from "@/model/Dtos/Out/IGestionOutDTO";
import PhonesClientsOutDTO from "@/model/Dtos/Out/PhonesClientsOutDTO";
import UserLogin from "@/model/Dtos/Out/UserLogin";
import { ActualizarEstadoCompromisoDTO } from "@/Pages/GestionarCompromisosPagos/models/ActualizarEstadoCompromisoDTO";
import END_POINT from "@/services/EndPoint";
import { request } from "@/utils/AxiosUtils";

export const LoginUser = (userLogin: UserLogin) =>
  request<LoginIn>(
    'post',
    END_POINT.LOGIN,
    userLogin
  );

export const uploadDeudoresServiceWeb = (dataDeudores: any) =>
  request<string>(
    'post',
    END_POINT.UPLOAD_DEUDORES_EXCEL,
    dataDeudores
  );

export const uploadTelefonosDeudoresServiceWeb = (dataDeudores: any) =>
  request<string>(
    'post',
    END_POINT.UPLOAD_TELEFONOS_DEUDORES,
    dataDeudores
  );

export const uploadDeudasServiceWeb = (dataDeudas: any) =>
  request<string>(
    'post',
    END_POINT.UPLOAD_DEUDAS_EXCEL,
    dataDeudas
  );

export const allDeuodoresServiceWeb = () =>
  request<ClientInfo[]>(
    'get',
    END_POINT.LISTAR_DEUDORES,
  );

export const tipoGestionPadre = () =>
  request<TipoGestioneOutDTO[]>(
    'get',
    END_POINT.TIPO_GESTIONES_PADRE,
  );

export const tipoGestionHijosPorPadreId = (padreId: string) =>
  request<TipoGestioneOutDTO[]>(
    'get',
    `${END_POINT.TIPO_GESTIONES_HIJO_POR_PADRE_ID}/${padreId}`,
  );

export const telefonosActivosClientes = (numeroCedula: string) =>
  request<TelefonosClientesActivos[]>(
    'get',
    `${END_POINT.TELEFONOS_ACTIVOS_CLIENTE}/${numeroCedula}`,
  );

export const verificarEstadoTelefonoCliente = (telefono: string) =>
  request<VerificarEstadoTelefonoCliente>(
    'get',
    `${END_POINT.VERIFICAR_ESTADO_TELEFONO_CLIENTE}/${telefono}`,
  );

export const grabarTelefonoCliente = (nuevoTelefnocliente: PhonesClientsOutDTO) =>
  request<VerificarEstadoTelefonoCliente>(
    'post',
    `${END_POINT.GRABAR_TELEFONO_CLIENTE}`,
    nuevoTelefnocliente
  );


export const actualizarCompromisoServicioWeb = (nuevoTelefnocliente: ActualizarEstadoCompromisoDTO) =>
  request<VerificarEstadoTelefonoCliente>(
    'put',
    `${END_POINT.ACTUALIZAR_COMPROMISO_PAGO}`,
    nuevoTelefnocliente
  );

export const desactivarTelefonoCliente = (desactivarTelefono: DesactivarTelefonoDTO) =>
  request<VerificarEstadoTelefonoCliente>(
    'delete',
    `${END_POINT.DESACTIVAR_TELEFONO}`,
    desactivarTelefono
  );

export const deudasPorClienteServiceWeb = (codigoCliente: String) =>
  request<DebstByClientInfoInDTO[]>(
    'get',
    `${END_POINT.LISTAR_DEUDAS_POR_CLIENTE}/${codigoCliente}`,
  );

export const compromisoPagoServiceWeb = (esHoy: boolean = false) =>
  request<DebstByClientInfoInDTO[]>(
    'get',
    `${END_POINT.COMPROMISO_PAGO}/${esHoy}`,
  );



export const grabarCompromisoPago = (compromisoPago: ICompromisoPagoOutDTO) =>
  request<string>(
    'post',
    `${END_POINT.GRABAR_COMPROMISO_PAGO}`,
    compromisoPago
  );


export const grabarGestion = (gestion: IGestionInDTO) =>
  request<string>(
    'post',
    `${END_POINT.GRABAR_GESTION}`,
    gestion
  );


interface ReportFilter {
  startDate: string;
  endDate: string;
  deudorName?: string;
}

export const getGestiones = (filters: ReportFilter) =>
  request<any[]>(
    'get',
    END_POINT.GESTIONES_REPORTE,
    null,
    {
      startDate: filters.startDate,
      endDate: filters.endDate,
      deudorName: filters.deudorName
    }
  );

export const getCompromisos = (filters: ReportFilter) =>
  request<any[]>(
    'get',
    END_POINT.COMPROMISOS_REPORTE,
    undefined,
    {
      startDate: filters.startDate,
      endDate: filters.endDate,
      deudorName: filters.deudorName
    }
  );






