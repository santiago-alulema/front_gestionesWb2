// src/Pages/MensajesWhatsapp/Components/CrudMensajesWhatsappComponent.tsx
import CustomModalTs from "@/components/CustomModalTs";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Grid, Paper, Typography, Divider } from "@mui/material";
import { useEffect, useMemo } from "react";
import { showAlert, showAlertConfirm } from "@/utils/modalAlerts";
import { useLoading } from "@/components/LoadingContext";
import { useMensajesWhatsapp } from "../Contexts/MensajesWhatsappContext";
import CrearActualizarMensajeWhatsappComponente from "./CrearActualizarMensajeWhatsappComponente";
import CustomTextFieldFormTs from "@/components/DataGridCommon/CustomTextFieldFormTs";
import { MensajeWhatsappInOut } from "@/Pages/ConfigurarMensajeria/models/InOut/MensajeWhatsappInOut";
import { eliminarMensajeWhatsappServicioWeb } from "@/Pages/ConfigurarMensajeria/services/MensajesWhatsappServiciosWeb";
import { ConfiguracionColumnasMensajesWhatsapp } from "@/Pages/ConfigurarMensajeria/configs/ConfiguracionColumnasMensajesWhatsapp";
import { useFormMensajesWhatsapp } from "@/Pages/ConfigurarMensajeria/Hooks/useFormMensajesWhatsapp";

const CrudMensajesWhatsappComponent = () => {
    const {
        abrirModal,
        setAbrirModal,
        esEditar,
        setEsEditar,
        seleccionado,
        setSeleccionado,
        obtenerMensajes,
        mensajes,
        filtroTexto,
        setFiltroTexto,
        filtroTipo,
        setFiltroTipo,
    } = useMensajesWhatsapp();

    const { control } = useFormMensajesWhatsapp();
    const { startLoading, stopLoading } = useLoading();

    const actualizar = (row: MensajeWhatsappInOut) => {
        setEsEditar(true);
        setSeleccionado(row);
        setAbrirModal(true);
    };

    const eliminar = async (row: MensajeWhatsappInOut) => {
        const cfg = {
            title: "Advertencia",
            message: `¿Desea eliminar el mensaje <strong>${row.mensaje ?? "(sin texto)"} </strong>?`,
            type: "warning",
            callBackFunction: false,
        };
        const ok = await showAlertConfirm(cfg);
        if (ok) {
            startLoading();
            await eliminarMensajeWhatsappServicioWeb(row.id);
            showAlert({
                title: "Información",
                message: `El mensaje se eliminó correctamente.`,
                type: "info",
                callBackFunction: true,
                onCloseFunction: obtenerMensajes,
            });
            stopLoading();
        }
    };

    const crear = () => {
        setEsEditar(false);
        setSeleccionado(null);
        setAbrirModal(true);
    };

    const buscar = async () => {
        startLoading();
        await obtenerMensajes();
        stopLoading();
    };

    const limpiarFiltros = async () => {
        setFiltroTexto("");
        setFiltroTipo("");
        startLoading();
        await obtenerMensajes();
        stopLoading();
    };

    const actionsConfig: IActionConfig[] = useMemo(
        () => [
            {
                tooltip: "Editar solo el mensaje WhatsApp",
                onClick: actualizar,
                icon: <BorderColorIcon fontSize="small" />,
                hidden: false,
                sizeIcon: "small",
                typeInput: "icon",
                inputSize: "clamp(20px, 0.264rem + 1.229vw, 1.75rem)",
            },
            // {
            //     tooltip: "Eliminar",
            //     onClick: eliminar,
            //     icon: <DeleteIcon fontSize="small" />,
            //     hidden: false,
            //     sizeIcon: "small",
            //     typeInput: "icon",
            //     inputSize: "clamp(20px, 0.264rem + 1.229vw, 1.75rem)",
            // },
        ],
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        obtenerMensajes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 2.5,
                        py: 2,
                        background:
                            "linear-gradient(135deg, rgba(7,94,84,0.12) 0%, rgba(7,94,84,0.06) 100%)",
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                >

                    <Divider sx={{ my: 2 }} />

                    {/* Grid */}
                    <CustomDataGridTs
                        rows={mensajes}
                        columns={ConfiguracionColumnasMensajesWhatsapp()}
                        gridId="gidMensajesWhatsapp"
                        columsHide={["id"]}
                        hiddenFilterColumn={["actions"]}
                        actions={actionsConfig}
                        iconDirectionFilter="end"
                        searchLabel="Buscar"
                    />
                </Box>
            </Paper>

            {/* Modal: pasa el modo para bloquear todo excepto el mensaje */}
            <CustomModalTs
                open={abrirModal}
                positionTop="30%"
                handleClose={() => setAbrirModal(false)}
            >
                <CrearActualizarMensajeWhatsappComponente
                />
            </CustomModalTs>
        </>
    );
};

export default CrudMensajesWhatsappComponent;
