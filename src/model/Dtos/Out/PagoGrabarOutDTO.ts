export interface PagoGrabarOutDTO {
    idDeuda: string;
    fechaPago: string;
    montoPagado: number;
    medioPago?: string;
    observaciones?: string;
    formaPagoId: string;
}
