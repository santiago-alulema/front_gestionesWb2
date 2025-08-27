import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, grabarGestionServicioWeb } from '@/services/Service';

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

    const {
        deudaSeleccionada, setAbrirModalGestionarDeuda, setTareasPendientes, telefonoSeleccionado
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
        setAbrirModalGestionarDeuda(false)
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