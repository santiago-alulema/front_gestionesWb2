// src/Pages/MensajesWhatsapp/Hooks/useFormMensajesWhatsapp.ts
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { showAlert } from "@/utils/modalAlerts";
import { useMensajesWhatsapp } from "../Contexts/MensajesWhatsappContext";
import { MensajeWhatsappCreateOutDto } from "@/Pages/ConfigurarMensajeria/models/Out/MensajeWhatsappCreateOutDto";
import { actualizarMensajeWhatsappServicioWeb, grabarMensajeWhatsappServicioWeb } from "@/Pages/ConfigurarMensajeria/services/MensajesWhatsappServiciosWeb";

type FormValues = {
    mensaje: string;
    tipoMensaje: string;
    mensajeCorreo: string;
};

export const useFormMensajesWhatsapp = () => {
    const {
        esEditar,
        setAbrirModal,
        seleccionado,
        obtenerMensajes,
    } = useMensajesWhatsapp();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormValues>({
        defaultValues: { mensaje: "", tipoMensaje: "", mensajeCorreo: "" },
    });

    const rules = {
        mensaje: { required: "El mensaje es obligatorio" },
        tipoMensaje: { required: "El tipo es obligatorio" },
        // mensajeCorreo: opcional
    };

    const onSubmit = handleSubmit(async (data) => {
        const payload: MensajeWhatsappCreateOutDto = {
            mensaje: data.mensaje.trim(),
            tipoMensaje: data.tipoMensaje.trim(),
            mensajeCorreo: data.mensajeCorreo?.trim() || null,
        };

        if (!esEditar) {
            await grabarMensajeWhatsappServicioWeb(payload);
        } else if (seleccionado) {
            await actualizarMensajeWhatsappServicioWeb(seleccionado.id, payload);
        }

        showAlert({
            title: "Correcto",
            message: `Se <strong>${esEditar ? "actualizó" : "grabó"}</strong> correctamente el mensaje.`,
            type: "success",
            callBackFunction: true,
            onCloseFunction: obtenerMensajes,
        });

        setAbrirModal(false);
    });

    useEffect(() => {
        if (esEditar && seleccionado) {
            setValue("mensaje", seleccionado.mensaje ?? "");
            setValue("tipoMensaje", seleccionado.tipoMensaje ?? "");
            setValue("mensajeCorreo", seleccionado.mensajeCorreo ?? "");
        }
    }, [esEditar, seleccionado, setValue]);

    return { control, errors, rules, watch, onSubmit };
};
