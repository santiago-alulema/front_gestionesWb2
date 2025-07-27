export interface DebstByClientInfoInDTO {
  montoOriginal: number;
  saldoActual: number;
  fechaVencimiento: string; // o Date si vas a parsearlo
  fechaAsignacion: string;  // o Date si vas a parsearlo
  descripcion: string;
  cedulaCliente: string;
  deudaId: string;
  numeroFactura: string;
  numeroCouta: number;
  totalCuotas: number;
  valorCuotas: number;

  compromisoPagoId: string;


}

export default DebstByClientInfoInDTO;