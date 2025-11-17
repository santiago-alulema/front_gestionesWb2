import { request } from "@/utils/AxiosUtils";
import EndPointCrudUsuario from "./EndPointCrudUsuario";
import { ActualizarUsuarioDto, CrearUsuarioDto, UsuarioDto } from "@/Pages/AdministracionUsuario/models/UsuarioDto";


export const listarUsuariosServiceWeb = () =>
    request<UsuarioDto[]>(
        "get",
        EndPointCrudUsuario.LISTAR
    );

export const crearUsuarioServiceWeb = (nuevoUsuario: CrearUsuarioDto) =>
    request<UsuarioDto>(
        "post",
        EndPointCrudUsuario.CREAR,
        nuevoUsuario
    );

export const actualizarUsuarioServiceWeb = (
    idUsuario: string,
    usuarioActualizado: ActualizarUsuarioDto
) =>
    request<void>(
        "put",
        `${EndPointCrudUsuario.ACTUALIZAR}/${idUsuario}`,
        usuarioActualizado
    );

export const inactivarUsuarioServiceWeb = (idUsuario: string) =>
    request<void>(
        "delete",
        `${EndPointCrudUsuario.ELIMINAR}/${idUsuario}`
    );
