export interface DeudasInDTO {
  montoOriginal: number;        // Podría ser "deudaCapital" o "saldoDeuda"
  saldoActual: number;         // "saldoDeuda": 2861.39
  fechaVenta: string;    // No está en el JSON, ¿quizás "fechaVenta"?
  fechaAsignacion: string;     // No está en el JSON
  descripcion: string;         // No está en el JSON
  cedulaCliente: string;       // "idDeudor": "0102307857"
  idDeuda: string;             // "idDeuda": "078578fc-3847-46b7-bdae-af206f1017f0"
  numeroFactura: string;       // "numeroFactura": "14314867"
  numeroCouta: number;         // No está claro en el JSON (¿"creditos": 3?)
  totalCuotas: number;         // "numeroCuotas": 30
  saldoDeuda: number;         // "valorCuota": 84.31
  compromisoPagoId: string;    // No está en el JSON
  empresa: string;             // "empresa": "MARCIMEX"
  // Campos faltantes:
  interes?: number | null;
  gastosCobranzas?: number | null;
  descuento?: number;
  montoCobrar?: number;
  fechaUltimoPago?: string;
  estado?: string;
  diasMora?: number;
  clasificacion?: string;
  creditos?: number;
  tipoDocumento?: string;
  tramo?: string;
  ultimoPago?: number | null;
  valorCuota?: number | null;
  numeroCuotas?: number | null;

}
export default DeudasInDTO;