export interface TareaDto {
    idCompromiso: string;
    idDeuda: string | null;
    fechaCompromiso: string;
    fechaRegistro: Date;
    montoComprometido: number;
    montoComprometidoString: string;
    estado: boolean | null;
    incumplioCompromisoPago: boolean | null;
    fechaCumplimientoReal: string | null;
    observaciones: string | null;
    idUsuario: string;
    idTipoTarea: string;
    horaRecordatorio: string;
    tipoTarea: string;
    cedula: string;
    nombre: string;
    gestor: string;
}