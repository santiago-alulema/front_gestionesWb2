export interface UpdatePagoDto {
    fechaPago?: string;
    montoPagado: number;
    medioPago?: string;
    numeroDocumenro?: string;
    observaciones?: string;
    idBanco?: string;
    idCuenta?: string;
    idTipoTransaccion?: string;
    idAbonoLiquidacion?: string;
}