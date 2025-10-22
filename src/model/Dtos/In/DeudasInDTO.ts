export interface DeudasInDTO {
  montoOriginal: number;
  saldoActual: number;
  fechaVenta: string;
  fechaAsignacion: string;
  cedulaCliente: string;
  idDeuda: string;
  numeroFactura: string;
  numeroCouta: number;
  totalCuotas: number;
  montoCobrarPartes?: number;
  saldoDeuda: number;
  compromisoPagoId: string;
  empresa: string;
  interes?: number | null;
  gastosCobranzas?: number | null;
  descuento?: number;
  montoCobrar?: number;
  fechaUltimoPago?: string;
  gestorUltimaGestion?: string;
  estado?: string;
  diasMora?: number;
  clasificacion?: string;
  creditos?: number;
  tipoDocumento?: string;
  tramo?: string;
  ultimoPago?: number | null;
  valorCuota?: number | null;
  numeroCuotas?: number | null;
  tipoTarea?: string | null;
  valorCompromisoPago?: string;
  idDeudor?: string,
  ciudad?: string
  agencia?: string
  productoDescripcion?: string,
  nombre?: string,
  nombreCompleto?: string


}
export default DeudasInDTO;