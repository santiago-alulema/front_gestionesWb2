import { useState } from "react";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { ConfiguracionCrudAdministracionUsuario } from "@/Pages/AdministracionUsuario/configs/ConfiguracionCrudAdministracionUsuario";
import { useCrudUsuarios } from "@/Pages/AdministracionUsuario/hooks/useCrudUsuarios";
import EditarUsuarioForm from "@/Pages/AdministracionUsuario/components/EditarUsuarioForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import { UsuarioDto } from "@/Pages/AdministracionUsuario/models/UsuarioDto";
import CustomModalTs from "@/components/DataGridCommon/CustomModalTs";
import { crearUsuarioServiceWeb } from "@/Pages/AdministracionUsuario/services/ServiciosWebCrudUsuario";
import SaveIcon from '@mui/icons-material/Save';
import { useLoading } from "@/components/LoadingContext";
import { showAlert } from "@/utils/modalAlerts";
import { Button, Grid } from "@mui/material";
const CrudUsuarios = () => {
    const {
        rows,
        loading,
        actualizarUsuario,
        inactivarUsuario,
        esEditar,
        setEsEditar,
        cargarUsuarios
    } = useCrudUsuarios();
    const { startLoading, stopLoading } = useLoading();

    const [abrirModalEditar, setAbrirModalEditar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioDto | null>(null);

    const handleAbrirModalEditar = (row: UsuarioDto) => {
        setUsuarioSeleccionado(row);
        setAbrirModalEditar(true);
        setEsEditar(true)
    };

    const handleAbrirModalCrear = () => {
        const usuarioVacio: UsuarioDto = {
            idUsuario: "",
            nombreUsuario: "",
            rol: "",
            contrasena: "",
            email: "",
            telefono: "",
            nombreCompleto: "",
            codigoUsuario: "",
            estaActivo: true
        };
        setUsuarioSeleccionado(usuarioVacio);
        setAbrirModalEditar(true);
        setEsEditar(false)
    };


    const handleCerrarModalEditar = () => {
        setAbrirModalEditar(false);
        setUsuarioSeleccionado(null);
    };

    const handleGuardarCambios = async (data: UsuarioDto) => {
        await actualizarUsuario(data.idUsuario, data);
        handleCerrarModalEditar();
    };

    const handleGuardarCambiosCrear = async (data: UsuarioDto) => {
        startLoading();
        await crearUsuarioServiceWeb(data);
        handleCerrarModalEditar();
        stopLoading();
        const configAlert = {
            title: "Correcto",
            message: "Se registro correctamente.",
            type: 'success',
            callBackFunction: true,
            onCloseFunction: cargarUsuarios
        };
        showAlert(configAlert);
    };



    const actionsConfig: IActionConfig<UsuarioDto>[] = [
        {
            icon: <EditIcon />,
            tooltip: "Editar usuario",
            onClick: handleAbrirModalEditar,
            sizeIcon: "large"
        },
        {
            icon: <DeleteIcon />,
            tooltip: "Inactivar usuario",
            onClick: inactivarUsuario,
            sizeIcon: "large"

        }
    ];


    return (
        <>
            <Grid container spacing={3} justifySelf={'end'}>
                <Grid size={{ lg: 12 }} mb={2}>
                    <Button variant="contained" sx={{ borderRadius: 5 }} onClick={handleAbrirModalCrear}>+ Agregar usuario</Button>
                </Grid>
            </Grid>
            <CustomDataGridTs
                gridId="CrudUsuarioTabla"
                rows={rows}
                columns={ConfiguracionCrudAdministracionUsuario()}
                actions={actionsConfig}
                searchLabel="Buscar"
            />

            <CustomModalTs
                open={abrirModalEditar}
                width={800}
                handleClose={handleCerrarModalEditar}
            >
                <EditarUsuarioForm
                    usuario={usuarioSeleccionado}
                    loading={loading}
                    onCancel={handleCerrarModalEditar}
                    onSubmit={esEditar ? handleGuardarCambios : handleGuardarCambiosCrear}
                    editar={esEditar}
                />
            </CustomModalTs>
        </>
    );
};

export default CrudUsuarios;
