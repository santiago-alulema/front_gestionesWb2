import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, EnviarCorreoClienteServicioWeb, grabarCompromisoPago, grabarGestionServicioWeb, grabarPagosServicioWeb } from '@/services/Service';
import dayjs from "dayjs"
import { PagoGrabarOutDTO } from '@/model/Dtos/Out/PagoGrabarOutDTO';
import { ICompromisoPagoOutDTO } from '@/model/Dtos/Out/ICompromisoPagoOutDTO';
import { useState } from 'react';
import TiposTareaInDTO from '@/Pages/DeudoresGestionPage/models/TiposTareaInDTO';
import { useNavigate, useSearchParams } from 'react-router';
import { MensajeriaInDto } from '@/Pages/DeudoresGestionPage/models/MensajeriaInDto';
import { mensajesTareasServicioWeb } from '@/Pages/DeudoresGestionPage/services/GestionDeudaServicios';
import { enviarMensajeWhatsapp } from '@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp';
import { useLogin } from '@/context/LoginContext';
import { normalizarTelefono } from '@/utils/MetodosAuxiliares';
import { useLoading } from '@/components/LoadingContext';
import { EnviarCorreoOutDto } from '@/model/Dtos/Out/EnviarCorreoOutDto';

export const useFormCompromisoPago = () => {

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
            fechaCompromiso: dayjs().format('YYYY-MM-DD'),
            valorCompromiso: 0.0,
            observaciones: '',
            horaRecordatorio: '',
            tipoTarea: ''
        }
    });

    const [seleccionTipoTarea, setSeleccionTipoTarea] = useState<TiposTareaInDTO>({
        id: '',
        nombre: ''
    });
    const [searchParams] = useSearchParams();
    const deudaId = searchParams.get("deudaId");
    const navigate = useNavigate();
    const [mensajesTarea, setMensajesTarea] = useState<MensajeriaInDto[]>([])
    const [mensaje, setMensaje] = useState<MensajeriaInDto>(null)
    const { userData } = useLogin();
    const { startLoading, stopLoading } = useLoading();
    const {
        deudaSeleccionada,
        setAbrirModalGestionarDeuda,
        setTareasPendientes,
        telefonoSeleccionado,
        deudorSeleccionado
    } = useGestionarDeudas();
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

    const rules = {
        fechaCompromiso: {
            required: 'La fecha de pago es obligatorio',
        },
        valorCompromiso: {
            required: seleccionTipoTarea.nombre !== "VOLVER A LLAMAR"
                ? 'El valor a pagar es obligatorio'
                : false
        },
        campoObligatorio: {
            required: 'El campo es obligatoria'
        },
        observaciones: {
            required: 'Las observaciones es obligatoria'
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
        const enviagrabar: ICompromisoPagoOutDTO = {
            idDeuda: deudaSeleccionada.idDeuda,
            fechaCompromiso: data.fechaCompromiso,
            montoComprometido: data.valorCompromiso,
            estado: true,
            observaciones: data.observaciones,
            HoraRecordatorio: data.horaRecordatorio,
            TipoTarea: data.tipoTarea,
            telefono: telefonoSeleccionado
        }
        await grabarCompromisoPago(enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente el <strong >COMPROMISO DE PAGO </strong>",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        buscarTareasPendientes();
        setAbrirModalGestionarDeuda(false)
        if (!!deudaId) {
            navigate("/gestion/dudas-por-clientes")
        }
    });

    const buscarTareasPendientes = async () => {
        const respuesta = await compromisoPagoServiceWeb(true)
        setTareasPendientes(respuesta)
    }

    const cargarMensajesTareas = async () => {
        const respuesta = await mensajesTareasServicioWeb();
        setMensajesTarea(respuesta);
    }

    const seleccionarMensaje = (item: any) => {
        setMensaje(item)
    }

    const valorPago = watch("valorCompromiso");
    const fechaCompromiso = watch("fechaCompromiso");

    const enviarMensajeWhatsappTareas = async () => {
        try {
            startLoading();
            if (!valorPago) {
                const configAlert = {
                    title: "Advertencia",
                    message: "El valor del <strong>COMPROMISO NO PUEDE SER CERO</strong>",
                    type: 'warning',
                    callBackFunction: false
                };
                showAlert(configAlert);
                return
            }
            if (!mensaje) {
                const configAlert = {
                    title: "Advertencia",
                    message: "Debe seleccionar un <strong>TIPO DE MENSAJE</strong>",
                    type: 'warning',
                    callBackFunction: false
                };
                showAlert(configAlert);
                return
            }

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
            const fechaPago = dayjs(fechaCompromiso)
                .add(1, "month")
                .format("D [de] MMMM [del] YYYY");

            const mensajeEnviar = mensaje.mensaje
                .replace("{{cedula}}", ` - *${deudorSeleccionado.cedula}*`)
                .replace("{{nombre}}", `*${deudorSeleccionado.nombre}*`)
                .replace("{{cliente}}", `*${deudorSeleccionado.nombre}*`)
                .replace("{{recordatorio}}", ` *${deudaSeleccionada.numeroFactura}*`)
                .replace("{{contrato}}", ` *${deudaSeleccionada.numeroFactura}*`)
                .replace("{{valorDeuda}}", `*${deudaSeleccionada.saldoDeuda}*`)
                .replace("{{empresa}}", `*${deudaSeleccionada.empresa}*`)
                .replace("{{valorPago}}", `*${valorPago}*`)
                .replace("{{fechaAbono}}", ` *${fechaPago}*`)
                .replace("{{fechaLimite}}", ` *${endDate}*`);

            await enviarMensajeWhatsapp(userData.name, telefonoNormalizado, mensajeEnviar)
            const configAlert = {
                title: "Correcto",
                message: `Mensaje de whatsapp enviado correctamente < strong > ${telefonoNormalizado} </strong> `,
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


    const enviarCorreoCliente = async () => {
        try {
            startLoading();
            if (!valorPago) {
                const configAlert = {
                    title: "Advertencia",
                    message: "El valor del <strong>COMPROMISO NO PUEDE SER CERO</strong>",
                    type: 'warning',
                    callBackFunction: false
                };
                showAlert(configAlert);
                return
            }
            if (!mensaje) {
                const configAlert = {
                    title: "Advertencia",
                    message: "Debe seleccionar un <strong>TIPO DE MENSAJE</strong>",
                    type: 'warning',
                    callBackFunction: false
                };
                showAlert(configAlert);
                return
            }


            dayjs.locale("es"); // establecer idioma global
            const fechaPago = dayjs(fechaCompromiso)
                .add(1, "month")
                .format("D [de] MMMM [del] YYYY");

            const mensajeEnviar = mensaje.mensajeCorreo
                .replace("{{cedula}}", ` - ${deudorSeleccionado.cedula}`)
                .replace("{{nombre}}", `${deudorSeleccionado.nombre}`)
                .replace("{{cliente}}", `${deudorSeleccionado.nombre}`)
                .replace("{{recordatorio}}", ` ${deudaSeleccionada.numeroFactura} `)
                .replaceAll("{{contrato}}", ` ${deudaSeleccionada.numeroFactura} `)
                .replaceAll("{{valorDeuda}}", ` ${deudaSeleccionada.saldoDeuda} `)
                .replaceAll("{{empresa}}", ` ${deudaSeleccionada.empresa}* `)
                .replace("{{valorPago}}", `${valorPago}`)
                .replace("{{fechaAbono}}", `${fechaPago}`)
                .replace("{{contrato}}", `${fechaPago}`)
                .replace("{{telefonoGestor}}", `${userData.telefono}`)
                .replace("{{fechaLimite}}", ` *${endDate}*`);;


            const htmlBody: EnviarCorreoOutDto = {
                htmlBody: mensajeEnviar,
                subject: mensaje.tipoMensaje,
                to: deudorSeleccionado.correo
            }
            await EnviarCorreoClienteServicioWeb(htmlBody);

            const configAlert = {
                title: "Correcto",
                message: `El correo fue enviado correctamente <strong>${deudorSeleccionado.correo}</strong> `,
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
        seleccionTipoTarea,
        setSeleccionTipoTarea,
        cargarMensajesTareas,
        mensajesTarea,
        seleccionarMensaje,
        enviarMensajeWhatsappTareas,
        enviarCorreoCliente,
        endDate, setEndDate
    };
};