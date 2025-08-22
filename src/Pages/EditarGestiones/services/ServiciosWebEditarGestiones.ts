

import { GestionDto } from "@/Pages/EditarGestiones/models/GestionDto";
import { PagoDto } from "@/Pages/EditarGestiones/models/PagoDto";
import { TareaDto } from "@/Pages/EditarGestiones/models/TareaDto";
import { UpdateGestionDto } from "@/Pages/EditarGestiones/models/UpdateGestionDto";
import { UpdatePagoDto } from "@/Pages/EditarGestiones/models/UpdatePagoDto ";
import { UpdateTareaDto } from "@/Pages/EditarGestiones/models/UpdateTareaDto";
import EndPointEditarGestiones from "@/Pages/EditarGestiones/services/EndPointEditarGestiones";
import { request } from "@/utils/AxiosUtils";

export const obtenerPagosServicioWeb = () =>
    request<PagoDto[]>(
        'get',
        `${EndPointEditarGestiones.OBTENER_TODAS_PAGOS}`
    );

export const editarPagoServicioWeb = (idPago: string, editarPago: UpdatePagoDto) =>
    request<PagoDto>(
        'put',
        `${EndPointEditarGestiones.EDITAR_PAGO}/${idPago}`,
        editarPago
    );

export const eliminarPagoServicioWeb = (idPago: string) =>
    request<boolean>(
        'delete',
        `${EndPointEditarGestiones.ELIMINAR_PAGO}/${idPago}`
    );

export const obtenerGestionesServicioWeb = () =>
    request<GestionDto[]>(
        'get',
        `${EndPointEditarGestiones.OBTENER_TODAS_GESTIONES}`
    );

export const editarGestionServicioWeb = (idGestion: string, editarGestion: UpdateGestionDto) =>
    request<GestionDto>(
        'put',
        `${EndPointEditarGestiones.EDITAR_GESTION}/${idGestion}`,
        editarGestion
    );

export const eliminarGestionServicioWeb = (idGestion: string) =>
    request<boolean>(
        'delete',
        `${EndPointEditarGestiones.ELIMINAR_GESTION}/${idGestion}`
    );



export const obtenerTareasServicioWeb = () =>
    request<TareaDto[]>(
        'get',
        `${EndPointEditarGestiones.OBTENER_TODAS_TAREAS}`
    );

export const editarTareaServicioWeb = (idTarea: string, editarTarea: UpdateTareaDto) =>
    request<TareaDto>(
        'put',
        `${EndPointEditarGestiones.EDITAR_TAREA}/${idTarea}`,
        editarTarea
    );

export const eliminarTareaServicioWeb = (idTarea: string) =>
    request<boolean>(
        'delete',
        `${EndPointEditarGestiones.ELIMINAR_TAREA}/${idTarea}`
    );