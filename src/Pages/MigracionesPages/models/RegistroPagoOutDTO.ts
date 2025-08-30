export interface RegistroPagoOutDTO {
    usuario: string;
    cedente: string;
    archivo: string;
    calificacion: string;
    malla: string;
    tramo: string;
    cxc: string;
    nombreDeudor: string;
    cedulaDeudor: string;
    fechaPago: string | null;
    monto: number | null;
    nroControl: string;
    nroDocumento: string;
    banco: string;
    abonoLiquidacion: string;
    verificado: boolean | null;
}
