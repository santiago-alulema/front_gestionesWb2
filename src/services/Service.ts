import ClientInfo from "@/model/Dtos/In/ClientInfo";
import { CompromisosPagoPorUsuarioInDTO } from "@/model/Dtos/In/CompromisosPagoPorUsuarioInDTO";
import DebstByClientInfoInDTO from "@/model/Dtos/In/DeudasInDTO";
import { FormaPagoInDTO } from "@/model/Dtos/In/FormaPagoInDTO";
import { GestionesPagoPorUsuarioInDTO } from "@/model/Dtos/In/GestionesPagoPorUsuarioInDTO";
import { GestionesPorUsuarioInDTO } from "@/model/Dtos/In/GestionesPorUsuarioInDTO";
import LoginIn from "@/model/Dtos/In/LoginIn";
import { ReporteEmpresaDto } from "@/model/Dtos/In/ReporteEmpresaDto";
import { SeleccionGeneral } from "@/model/Dtos/In/SeleccionGeneral";
import TelefonosClientesActivos from "@/model/Dtos/In/TelefonosClientesActivos";
import { TipoContactoGestionInDTO } from "@/model/Dtos/In/TipoContactoGestionInDTO";
import TipoGestioneOutDTO from "@/model/Dtos/In/TipoGestioneOutDTO";
import VerificarEstadoTelefonoCliente from "@/model/Dtos/In/VerificarEstadoTelefonoCliente";
import { ICompromisoPagoOutDTO } from "@/model/Dtos/Out/ICompromisoPagoOutDTO";
import { IGestionInDTO } from "@/model/Dtos/Out/IGestionOutDTO";
import { PagoGrabarOutDTO } from "@/model/Dtos/Out/PagoGrabarOutDTO";
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

export const formaPagosServicioWeb = () =>
  request<FormaPagoInDTO[]>(
    'get',
    END_POINT.OBTENER_FORMAS_PAGO_ACTIVOS,
  );

export const gestionesXUsuarioServicioWeb = () =>
  request<GestionesPorUsuarioInDTO[]>(
    'get',
    END_POINT.GESTIONES_POR_USUARIO,
  );

export const compromisosPagosXUsuarioServicioWeb = () =>
  request<CompromisosPagoPorUsuarioInDTO[]>(
    'get',
    END_POINT.COMPROMISOS_DE_PAGO_POR_USUARIO,
  );

export const PagosXUsuarioServicioWeb = () =>
  request<GestionesPagoPorUsuarioInDTO[]>(
    'get',
    END_POINT.PAGOS_POR_USUARIO,
  );

export const gestionesPorEmperesaServicioWeb = () =>
  request<ReporteEmpresaDto[]>(
    'get',
    END_POINT.PAGOS_COMPROMISOS_GESTION_POR_USUARIO,
  );


export const bancosServicioWeb = () =>
  request<SeleccionGeneral[]>(
    'get',
    END_POINT.BANCOS_ACTIVOS,
  );

export const cuentasServicioWeb = () =>
  request<SeleccionGeneral[]>(
    'get',
    END_POINT.CUENTAS_ACTIVAS,
  );

export const tipoTransaccionesServicioWeb = () =>
  request<SeleccionGeneral[]>(
    'get',
    END_POINT.TRANSACCIONES_ACTIVAS,
  );

export const abonoLiquidacionesServicioWeb = () =>
  request<SeleccionGeneral[]>(
    'get',
    END_POINT.ABONO_LIQUIDACIONES_ACTIVAS,
  );


export const resultadosServicioWeb = () =>
  request<SeleccionGeneral[]>(
    'get',
    END_POINT.OBTENER_RESULTADOS,
  );

export const tipoContactoServicioWeb = (idRespuesta: string) =>
  request<SeleccionGeneral[]>(
    'get',
    `${END_POINT.OBTENER_TIPO_CONTACTO}/${idRespuesta}`,
  );

export const respuestasServicioWeb = (idTipoContacto: string) =>
  request<SeleccionGeneral[]>(
    'get',
    `${END_POINT.OBTENER_RESPUESTA}/${idTipoContacto}`,
  );

export const acercamientoDeudorServicioWeb = () =>
  request<TipoContactoGestionInDTO[]>(
    'get',
    END_POINT.OBTENER_TODOS_TIPOS_ACERCAMIENTO_DEUDORES,
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

export const grabarPagosServicioWeb = (compromisoPago: PagoGrabarOutDTO) =>
  request<string>(
    'post',
    `${END_POINT.GRABAR_PAGO}`,
    compromisoPago
  );


export const grabarGestionServicioWeb = (gestion: IGestionInDTO) =>
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






