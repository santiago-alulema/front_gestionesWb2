import { useCallback, useEffect, useState } from "react";
import {
    listarUsuariosServiceWeb,
    crearUsuarioServiceWeb,
    actualizarUsuarioServiceWeb,
    inactivarUsuarioServiceWeb
} from "../services/ServiciosWebCrudUsuario";
import { ActualizarUsuarioDto, CrearUsuarioDto, UsuarioDto, UsuarioRow } from "@/Pages/AdministracionUsuario/models/UsuarioDto";
import { useLoading } from "@/components/LoadingContext";
import { showAlert, showAlertConfirm } from "@/utils/modalAlerts";

const mapToRow = (u: UsuarioDto): UsuarioRow => ({
    ...u,
    estado: u.estaActivo ? "ACTIVO" : "INACTIVO"
});

export const useCrudUsuarios = () => {
    const [rows, setRows] = useState<UsuarioDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { startLoading, stopLoading } = useLoading();
    const [esEditar, setEsEditar] = useState<boolean>(true);

    const cargarUsuarios = useCallback(async () => {
        try {
            startLoading();
            setError(null);
            const data = await listarUsuariosServiceWeb(); // UsuarioDto[]
            setRows(data);
        } finally {
            stopLoading();
        }
    }, []);

    useEffect(() => {
        cargarUsuarios();
    }, [cargarUsuarios]);

    const crearUsuario = useCallback(
        async (nuevo: CrearUsuarioDto) => {
            try {
                startLoading();
                const creado = await crearUsuarioServiceWeb(nuevo); // UsuarioDto
                setRows(prev => [...prev, mapToRow(creado)]);
                const configAlert = {
                    title: "Correcto",
                    message: "Se creo correctamente.",
                    type: 'success',
                    callBackFunction: false
                };
                showAlert(configAlert);
                cargarUsuarios();
                return creado;
            } finally {
                stopLoading();
            }
        },
        []
    );

    const actualizarUsuario = useCallback(
        async (idUsuario: string, usuario: ActualizarUsuarioDto) => {
            try {
                const configAlertConfirmacion = {
                    title: "Advertencia",
                    message: "Esta seguro que desea actualizar?.",
                    type: 'warning',
                    callBackFunction: false
                };
                const confirmar = await showAlertConfirm(configAlertConfirmacion);
                if (!confirmar) {
                    return
                }
                startLoading();
                await actualizarUsuarioServiceWeb(idUsuario, usuario);
                const configAlert = {
                    title: "Correcto",
                    message: "Se actualizo correctamente.",
                    type: 'success',
                    callBackFunction: false
                };
                showAlert(configAlert);
                cargarUsuarios();
                setRows(prev =>
                    prev.map(r =>
                        r.idUsuario === idUsuario
                            ? mapToRow({ ...r, ...usuario }) // mantiene estaActivo
                            : r
                    )
                );
            } finally {
                stopLoading();
            }
        },
        []
    );

    const inactivarUsuario = useCallback(
        async (idUsuario: UsuarioDto) => {
            try {
                const configAlertConfirmacion = {
                    title: "Advertencia",
                    message: "Esta seguro que desea eliminar?.",
                    type: 'warning',
                    callBackFunction: false
                };
                const confirmar = await showAlertConfirm(configAlertConfirmacion);
                if (!confirmar) {
                    return
                }
                startLoading();
                await inactivarUsuarioServiceWeb(idUsuario.idUsuario);
                const configAlert = {
                    title: "Correcto",
                    message: "Se elimino correctamente.",
                    type: 'success',
                    callBackFunction: false
                };
                showAlert(configAlert);
                cargarUsuarios();
                setRows(prev =>
                    prev.map(r =>
                        r.idUsuario === idUsuario.idUsuario
                            ? { ...r, estaActivo: false, estado: "INACTIVO" }
                            : r
                    )
                );
            } finally {
                stopLoading();
            }
        },
        []
    );

    return {
        rows,
        loading,
        error,
        recargar: cargarUsuarios,
        crearUsuario,
        actualizarUsuario,
        inactivarUsuario,
        esEditar,
        setEsEditar,
        cargarUsuarios
    };
};

export default useCrudUsuarios;
