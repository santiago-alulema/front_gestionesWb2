import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, grabarGestionServicioWeb } from '@/services/Service';
import { DESACTIVAR_COMPROMISO_PAGO } from '@/Pages/GestionarCompromisosPagos/services/GestionarCompromisosPagoServicioWeb';
import { useGestionarCompromisoPago } from '@/Pages/GestionarCompromisosPagos/contexts/GestionarCompromisoPagoContext';

export const useFormTareasLLamadas = () => {

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

    const {
        deudaSeleccionada, setAbrirModalGestionarDeuda, setTareasPendientes
    } = useGestionarDeudas();

    const {
        compromisoPagoSeleccionado, setAbrirModalGestionarCompromiso, cargarCompromisos
    } = useGestionarCompromisoPago();

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
        const enviagrabar: IGestionInDTO = {
            idDeuda: deudaSeleccionada.idDeuda,
            idTipoGestion: '3',
            descripcion: data.observaciones,
            IdResultado: data.idResultado,
            idTipoContactoCliente: data.idTipoContactoCliente,
            IdRespuesta: data.idRespuesta,
            email: data.email
        }
        await grabarGestionServicioWeb(enviagrabar);
        await DESACTIVAR_COMPROMISO_PAGO(compromisoPagoSeleccionado.compromisoPagoId)
        buscarTareasPendientes();
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente la Gestion",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        cargarCompromisos();
        setAbrirModalGestionarCompromiso(false)
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