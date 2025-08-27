import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, grabarPagosServicioWeb } from '@/services/Service';
import dayjs from "dayjs"
import { PagoGrabarOutDTO } from '@/model/Dtos/Out/PagoGrabarOutDTO';

export const useFormPagos = () => {

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
            observaciones: ''
        }
    });

    const {
        deudaSeleccionada, setAbrirModalGestionarDeuda, setTareasPendientes, telefonoSeleccionado
    } = useGestionarDeudas();

    const rules = {
        fechaPago: {
            required: 'La fecha de pago es obligatorio',
        },
        valorPago: {
            required: 'El valor a pagar es obligatorio'
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
        const enviagrabar: PagoGrabarOutDTO = {
            fechaPago: data.fechaPago,
            montoPagado: data.valorPago,
            bancoId: data.banco,
            cuentaId: data.cuenta,
            tipoTransaccionId: data.tipoTransaccion,
            abonoLiquidacionId: data.abonoLiquidacion,
            numeroDocumento: data.numeroDocumento,
            idDeuda: deudaSeleccionada.idDeuda,
            observaciones: data.observaciones,
            telefono: telefonoSeleccionado
        }
        await grabarPagosServicioWeb(enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente el PAGO",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        setAbrirModalGestionarDeuda(false);
    });

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
        rules
    };
};