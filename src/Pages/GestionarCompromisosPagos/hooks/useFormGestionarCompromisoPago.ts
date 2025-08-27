import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { compromisoPagoServiceWeb, grabarPagosServicioWeb } from '@/services/Service';
import dayjs from "dayjs"
import { PagoGrabarOutDTO } from '@/model/Dtos/Out/PagoGrabarOutDTO';
import { useEffect, useState } from 'react';
import { DESACTIVAR_COMPROMISO_PAGO, INCUMPLIO_COMPROMISO_PAGO } from '@/Pages/GestionarCompromisosPagos/services/GestionarCompromisosPagoServicioWeb';
import { useGestionarCompromisoPago } from '@/Pages/GestionarCompromisosPagos/contexts/GestionarCompromisoPagoContext';
import { showAlert } from '@/utils/modalAlerts';

const useFormGestionarCompromisoPago = () => {
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
            fechaPago: dayjs().format('YYYY-MM-DD'),
            valorPago: 0.0,
            banco: '',
            cuenta: '',
            tipoTransaccion: '',
            abonoLiquidacion: '',
            numeroDocumento: '',
            observaciones: '',
            incumplioCompromisoPago: false
        }
    });

    const {
        deudaSeleccionada, setAbrirModalGestionarDeuda, setTareasPendientes, telefonoSeleccionado
    } = useGestionarDeudas();
    const [incumplioCompromisoPago, setIncumplioCompromisoPago] = useState(false);
    const {
        compromisoPagoSeleccionado,
        cargarCompromisos,
        setCompromisosPago,
        setAbrirModalGestionarCompromiso
    } = useGestionarCompromisoPago();

    // Función para obtener reglas condicionales
    const getRules = (fieldName: keyof typeof rules) => {
        return incumplioCompromisoPago ? {} : rules[fieldName];
    }

    useEffect(() => {
        if (incumplioCompromisoPago) {
            // Resetear valores cuando se marca como incumplido
            setValue("valorPago", 0);
            setValue("banco", '');
            setValue("cuenta", '');
            setValue("tipoTransaccion", '');
            setValue("abonoLiquidacion", '');
            setValue("numeroDocumento", '');
            setValue("observaciones", '');
        }
    }, [incumplioCompromisoPago, setValue]);

    // Reglas base de validación
    const rules = {
        fechaPago: {
            required: 'La fecha de pago es obligatorio',
        },
        valorPago: {
            required: 'El valor a pagar es obligatorio',
            validate: (value: any) => {
                const numericValue = parseFloat(value);
                if (isNaN(numericValue)) {
                    return "Debe ser un número válido";
                }
                if (numericValue <= 0) {
                    return "El valor debe ser mayor a cero";
                }
                return true;
            }
        },
        banco: {
            required: 'El banco es obligatoria'
        },
        cuenta: {
            required: 'La cuenta es obligatorio'
        },
        tipoTransaccion: {
            required: 'El tipo de transaccion es obligatorio'
        },
        abonoLiquidacion: {
            required: 'El abono y liquidacion es obligatorio'
        },
        numeroDocumento: {
            required: 'Numero de documento es obligatorio'
        },
        observaciones: {
            required: 'La observacion es obligatorio'
        },
        campoObligatorio: {
            required: 'El campo es obligatorio'
        }
    };

    const handleAutocompleteChange = (field: keyof IGestionInDTO, value: any, returnObject = false) => {
        const val = returnObject ? value : value?.id || '';
        return value;
    };

    const handleTextChange = (field: keyof IGestionInDTO) => (e: React.ChangeEvent<HTMLInputElement>) => {
    };

    interface FormValues {
        fechaPago: string;
        valorPago: number;
        banco: string;
        cuenta: string;
        tipoTransaccion: string;
        abonoLiquidacion: string;
        numeroDocumento: string;
        observaciones: string;
        incumplioCompromisoPago: boolean;
    }

    const onSubmit = handleSubmit((data: FormValues) => {
        console.log("@entra aquiii")
        actualizacionCopromisoPago(data)
        try {
            actualizacionCopromisoPago(data);
        } catch (error) {
            console.error('Submission error:', error);
            // Show error message to user
        }
    });

    const mensajeCorrecto = () => {
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente el PAGO",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        setAbrirModalGestionarDeuda(false);
    }

    const actualizacionCopromisoPago = async (data: FormValues) => {
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
        if (incumplioCompromisoPago) {
            await INCUMPLIO_COMPROMISO_PAGO(compromisoPagoSeleccionado.compromisoPagoId);
            buscarTareasPendientes();
            mensajeCorrecto();
        } else {
            const enviagrabar: PagoGrabarOutDTO = {
                fechaPago: data.fechaPago,
                montoPagado: data.valorPago,
                bancoId: data.banco,
                cuentaId: data.cuenta,
                tipoTransaccionId: data.tipoTransaccion,
                abonoLiquidacionId: data.abonoLiquidacion,
                numeroDocumento: data.numeroDocumento,
                idDeuda: compromisoPagoSeleccionado.idDeuda,
                observaciones: data.observaciones,
                telefono: telefonoSeleccionado
            }
            await grabarPagosServicioWeb(enviagrabar);
            await DESACTIVAR_COMPROMISO_PAGO(compromisoPagoSeleccionado.compromisoPagoId)
            buscarTareasPendientes();
            mensajeCorrecto();
        }
        cargarCompromisos();
        setAbrirModalGestionarCompromiso(false)
    }

    const buscarTareasPendientes = async () => {
        const respuesta = await compromisoPagoServiceWeb(true)
        setTareasPendientes(respuesta)
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
        getRules, // Añadimos la nueva función al return
        incumplioCompromisoPago,
        setIncumplioCompromisoPago,
        actualizacionCopromisoPago,
    };
}

export default useFormGestionarCompromisoPago;