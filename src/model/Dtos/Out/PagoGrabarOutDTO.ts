export interface PagoGrabarOutDTO {
    idDeuda: string;
    fechaPago: string;
    montoPagado: number;
    medioPago?: string;
    observaciones?: string;

    numeroDocumento?: string;
    bancoId?: string;
    cuentaId?: string;
    tipoTransaccionId?: string;
    abonoLiquidacionId?: string;

}
