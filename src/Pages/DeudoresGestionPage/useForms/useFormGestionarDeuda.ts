import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, EnviarCorreoClienteServicioWeb, grabarGestionServicioWeb } from '@/services/Service';
import { useNavigate, useSearchParams } from 'react-router';
import { normalizarTelefono } from '@/utils/MetodosAuxiliares';
import { enviarMensajeWhatsapp } from '@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp';
import { useLogin } from '@/context/LoginContext';
import { useState } from 'react';
import { MensajeriaInDto } from '@/Pages/DeudoresGestionPage/models/MensajeriaInDto';
import { useLoading } from '@/components/LoadingContext';
import dayjs from 'dayjs';
import { EnviarCorreoOutDto } from '@/model/Dtos/Out/EnviarCorreoOutDto';
import { EnviarMensajeWhatasappRamdon } from '@/utils/EnvioMensajeWhatsapp';

export const useFormGestionarDeuda = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        getValues
    } = useForm({
        defaultValues: {
            idResultado: '',
            idRespuesta: '',
            idTipoContactoCliente: '',
            email: '',
            tipoContacto: '',
            observaciones: ''
        }
    });

    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [searchParams] = useSearchParams();
    const deudaId = searchParams.get("deudaId");
    const navigate = useNavigate();
    const { userData } = useLogin();
    const [mensajeGestion, setMensajeGestion] = useState<MensajeriaInDto>(null)
    const { startLoading, stopLoading } = useLoading();
    const {
        deudaSeleccionada,
        setAbrirModalGestionarDeuda,
        setTareasPendientes,
        telefonoSeleccionado,
        deudorSeleccionado
    } = useGestionarDeudas();


    const rules = {
        email: {
            required: 'El email es obligatorio',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
            }
        },
        tipoCliente: {
            required: 'El tipo de cliente es obligatorio'
        },
        respuesta: {
            required: 'La respuesta es obligatoria'
        },
        tipoContacto: {
            required: 'El tipo de contacto es obligatorio'
        },
        observaciones: {
            required: 'La observacion es obligatorio'
        }
    };

    const handleAutocompleteChange = (field: keyof IGestionInDTO, value: any, returnObject = false) => {
        const val = returnObject ? value : value?.id || '';
        return value;
    };

    const handleTextChange = (field: keyof IGestionInDTO) => (e: React.ChangeEvent<HTMLInputElement>) => {
    };

    const onSubmit = handleSubmit(async (data) => {
        if (!telefonoSeleccionado) {
            const configAlert = {
                title: "Correcto",
                message: "Debe seleccionar un telefono antes de grabar",
                type: 'warning',
                callBackFunction: false
            };
            showAlert(configAlert);
            return
        }
        const enviagrabar: IGestionInDTO = {
            idDeuda: deudaSeleccionada.idDeuda,
            idTipoGestion: '3',
            descripcion: data.observaciones,
            IdResultado: data.idResultado,
            idTipoContactoCliente: data.idTipoContactoCliente,
            IdRespuesta: data.idRespuesta,
            email: data.email,
            telefono: telefonoSeleccionado
        }
        await grabarGestionServicioWeb(enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente la Gestion",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        buscarTareasPendientes();
        if (!!deudaId) {
            navigate("/gestion/dudas-por-clientes")
        }
        setAbrirModalGestionarDeuda(false)
    });

    const buscarTareasPendientes = async () => {
        const respuesta = await compromisoPagoServiceWeb(true)
        setTareasPendientes(respuesta)
    }

    const enviarMensajeWhatsappServicioWeb = async () => {
        try {
            startLoading();
            if (!telefonoSeleccionado) {
                const configAlert = {
                    title: "Advertencia",
                    message: "Debe seleccionar un telefono antes de enviar el mensaje",
                    type: 'warning',
                    callBackFunction: false
                };
                showAlert(configAlert);
                return
            }
            const telefonoNormalizado = normalizarTelefono(telefonoSeleccionado);
            dayjs.locale("es"); // establecer idioma global
            const fechaPago = dayjs(deudaSeleccionada.fechaUltimoPago)
                .add(1, "month")
                .format("D [de] MMMM [del] YYYY");
            const fechaActual = dayjs().format("D [de] MMMM [del] YYYY");
            const productoFormateado = deudaSeleccionada.productoDescripcion.replaceAll("||", "\n-")
                .replaceAll("<strong>", "*")
                .replaceAll("</strong>", "*");
            const mensajeEnviar = mensajeGestion.mensaje.replace("{{cedula}}", `*${deudorSeleccionado.cedula}*`)
                .replace("{{nombre}}", `*${deudorSeleccionado.nombre}*`)
                .replace("{{producto}}", `*${productoFormateado}*`)
                .replace("{{telefono}}", `*${userData.telefono}*`)
                .replace("{{fecha}}", `*${fechaActual}*`)
                .replace("{{empresa}}", `*${deudaSeleccionada.empresa}*`)
                .replace("{{deuda}}", `*${deudaSeleccionada.saldoDeuda}*`)
                .replace("{{fechaPago}}", `*${fechaPago}*`)
                .replace("{{pagoUnico}}", `*${deudaSeleccionada.montoCobrar}*`)
                .replaceAll("{{fechaLimite}}", `${endDate}`)

            // await enviarMensajeWhatsapp(userData.name, telefonoNormalizado, mensajeEnviar)
            EnviarMensajeWhatasappRamdon(telefonoNormalizado, mensajeEnviar);
            // const configAlert = {
            //     title: "Correcto",
            //     message: `Mensaje de whatsapp enviado correctamente <strong>${telefonoNormalizado}</strong> `,
            //     type: 'success',
            //     callBackFunction: false
            // };
            // showAlert(configAlert);
        } catch (error) {
            const configAlert = {
                title: "Error",
                message: ` <strong>${error}</strong> `,
                type: 'error',
                callBackFunction: false
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    }

    const enviarCorreoCliente = async () => {
        try {
            startLoading();

            const telefonoNormalizado = normalizarTelefono(telefonoSeleccionado);
            dayjs.locale("es"); // establecer idioma global
            const fechaPago = dayjs(deudaSeleccionada.fechaUltimoPago)
                .add(1, "month")
                .format("D [de] MMMM [del] YYYY");
            const fechaActual = dayjs().format("D [de] MMMM [del] YYYY");
            const productoFormateado = productosToTableHtml(deudaSeleccionada.productoDescripcion);
            const mensajeEnviar = mensajeGestion.mensajeCorreo.replace("{{cedula}}", `${deudorSeleccionado.cedula}`)
                .replaceAll("{{nombre}}", `${deudorSeleccionado.nombre}*`)
                .replaceAll("{{producto}}", `${productoFormateado}`)
                .replaceAll("{{telefono}}", `${telefonoNormalizado}`)
                .replaceAll("{{fecha}}", `${fechaActual}*`)
                .replaceAll("{{empresa}}", `${deudaSeleccionada.empresa}`)
                .replaceAll("{{deuda}}", `*${deudaSeleccionada.saldoDeuda}`)
                .replaceAll("{{fechaPago}}", `${fechaPago}*`)
                .replaceAll("{{telefonoGestor}}", `${userData.telefono}*`)
                .replaceAll("{{pagoUnico}}", `${deudaSeleccionada.montoCobrar}`)
                .replaceAll("{{fechaLimite}}", `${endDate}`)
            if (!deudorSeleccionado.correo) {
                const configAlert = {
                    title: "Error",
                    message: `${deudorSeleccionado.nombre} <strong>NO TIENE CORREO ELECTRONICO</strong> `,
                    type: 'error',
                    callBackFunction: false
                };
                showAlert(configAlert);
                return
            }
            const htmlBody: EnviarCorreoOutDto = {
                htmlBody: mensajeEnviar,
                subject: mensajeGestion.tipoMensaje,
                to: deudorSeleccionado.correo
            }
            await EnviarCorreoClienteServicioWeb(htmlBody);
            const configAlert = {
                title: "Correcto",
                message: `Mensaje al correo <strong>${deudorSeleccionado.correo}</strong> enviado correctamente  `,
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
        } catch (error) {
            const configAlert = {
                title: "Error",
                message: ` <strong>${error}</strong> `,
                type: 'error',
                callBackFunction: false
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    }

    function escapeHtml(s: string = ""): string {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function productosToTableHtml(productoDescripcion: string): string {
        const items = (productoDescripcion ?? "")
            .split("||")
            .map(s => s.trim())
            .filter(Boolean);

        if (items.length === 0) return "";

        const rows = items
            .map(p => `
                <tr>
                    <td style="padding:8px; border:1px solid #e5e7eb; font-size:14px;">
                    ${escapeHtml(p)}
                    </td>
                </tr>`)
            .join("");

        return `
                <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                    style="width:100%; border-collapse:collapse; margin:0px 0 0px; border:1px solid #e5e7eb;">
                <thead>
                    <tr>
                    <th style="text-align:left; padding:8px; background:#f9fafb; border:1px solid #e5e7eb; font-size:14px;">
                        Producto
                    </th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
                </table>`;
    }



    return {
        control,
        errors,
        watch,
        getValues,
        setValue,
        handleAutocompleteChange,
        handleTextChange,
        onSubmit,
        formValues: watch(),
        rules,
        enviarMensajeWhatsappServicioWeb,
        setMensajeGestion,
        enviarCorreoCliente,
        endDate,
        setEndDate
    };
};