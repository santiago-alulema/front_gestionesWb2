export interface ICompromisoPagoOutDTO {
    idDeuda?: string;
    fechaCompromiso: string;
    montoComprometido: number;
    estado?: boolean;
    observaciones?: string;
    formaPagoId: string;
}
