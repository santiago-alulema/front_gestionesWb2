export interface ICompromisoPagoOutDTO {
    idDeuda?: string;
    fechaCompromiso: string;
    montoComprometido: number;
    estado?: string;
    observaciones?: string;
    formaPagoId: string;
}
