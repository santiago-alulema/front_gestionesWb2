export interface ICompromisoPagoOutDTO {
    idDeuda?: string; // Guid -> string (opcional porque es Guid?)
    fechaCompromiso: string; // DateOnly -> ISO string
    montoComprometido: number; // decimal -> number
    estado?: string;
    observaciones?: string;
}
