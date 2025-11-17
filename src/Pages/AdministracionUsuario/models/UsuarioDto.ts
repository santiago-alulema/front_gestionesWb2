export interface UsuarioDto {
    idUsuario: string;
    nombreUsuario: string;
    rol: string;
    contrasena: string;
    email: string;
    telefono: string;
    nombreCompleto: string;
    codigoUsuario: string;
    estaActivo: boolean;
}

// Para crear no necesitas idUsuario ni estaActivo
export type CrearUsuarioDto = Omit<UsuarioDto, 'idUsuario' | 'estaActivo'>;

// Para editar no modificas estaActivo desde aquí (solo datos)
export type ActualizarUsuarioDto = Omit<UsuarioDto, 'estaActivo'>;

// Lo que va al grid, con la columna calculada "estado"
export interface UsuarioRow extends UsuarioDto {
    estado: 'ACTIVO' | 'INACTIVO';
}