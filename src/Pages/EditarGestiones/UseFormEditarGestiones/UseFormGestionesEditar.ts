import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, grabarGestionServicioWeb } from '@/services/Service';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { editarGestionServicioWeb, eliminarGestionServicioWeb, obtenerGestionesServicioWeb } from '@/Pages/EditarGestiones/services/ServiciosWebEditarGestiones';
import { UpdateGestionDto } from '@/Pages/EditarGestiones/models/UpdateGestionDto';

export const UseFormGestionesEditar = () => {

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

    // const {
    //     deudaSeleccionada, setAbrirModalGestionarDeuda, setTareasPendientes
    // } = useGestionarDeudas();


    const {
        setAbrirModalEditarGestiones,
        setGestionesAEditar,
        gestionSeleccionada } = useEditarGestiones();

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
        const enviagrabar: UpdateGestionDto = {
            Descripcion: data.observaciones,
            Email: data.email,
            IdTipoContactoResultado: data.idTipoContactoCliente,
            IdTipoResultado: data.idResultado,
            IdRespuestaTipoContacto: data.idRespuesta
        }
        await editarGestionServicioWeb(gestionSeleccionada.idGestion, enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se actualizo correctamente la Gestion",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        obtenerTodasLasGestiones();
        setAbrirModalEditarGestiones(false)
    });

    const obtenerTodasLasGestiones = async () => {
        const respuesta = await obtenerGestionesServicioWeb();
        setGestionesAEditar(respuesta);
    }


    const iniciarGestion = () => {
        setValue("idResultado", gestionSeleccionada.idTipoResultado)
        setValue("idTipoContactoCliente", gestionSeleccionada.idTipoContactoResultado)
        setValue("idRespuesta", gestionSeleccionada.idRespuestaTipoContacto)
        setValue("email", gestionSeleccionada.email)
        setValue("observaciones", gestionSeleccionada.descripcion)
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
        iniciarGestion
    };
};