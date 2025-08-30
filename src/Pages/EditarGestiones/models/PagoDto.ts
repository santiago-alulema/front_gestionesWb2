export interface PagoDto {
    idPago: string;
    idDeuda: string; // Guid → string
    fechaPago?: string; // DateOnly → string ISO (ej: "2025-08-19")
    montoPagado: number;
    medioPago?: string;
    numeroDocumenro?: string;
    observaciones?: string;
    cedula?: string;
    nombre?: string;
    banco?: string;
    cuenta?: string;
    tipoTransaccion?: string;
    abonoLiquidacion?: string;
    idBanco?: string;
    idCuenta?: string;
    idTipoTransaccion?: string;
    idAbonoLiquidacion?: string;
    gestor: string;
}