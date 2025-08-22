import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, grabarCompromisoPago, grabarGestionServicioWeb, grabarPagosServicioWeb } from '@/services/Service';
import dayjs from "dayjs"
import { PagoGrabarOutDTO } from '@/model/Dtos/Out/PagoGrabarOutDTO';
import { ICompromisoPagoOutDTO } from '@/model/Dtos/Out/ICompromisoPagoOutDTO';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { UpdateTareaDto } from '@/Pages/EditarGestiones/models/UpdateTareaDto';
import { editarTareaServicioWeb } from '@/Pages/EditarGestiones/services/ServiciosWebEditarGestiones';

export const UseFormTareasEditar = () => {

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


    const {
        tareaSeleccionada, setAbrirModalEditarTareas, obtenerTareasAEditar } = useEditarGestiones();

    const {
        setTareasPendientes
    } = useGestionarDeudas();



    const rules = {
        fechaCompromiso: {
            required: 'La fecha de pago es obligatorio',
        },
        valorCompromiso: {
            required: 'El valor a pagar es obligatorio'
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
        const enviagrabar: UpdateTareaDto = {
            fechaCompromiso: data.fechaCompromiso,
            montoComprometido: data.valorCompromiso,
            observaciones: data.observaciones,
            horaRecordatorio: data.horaRecordatorio
        }
        await editarTareaServicioWeb(tareaSeleccionada.idCompromiso, enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se actualizo correctamente la <strong> TAREA </strong>",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
        setAbrirModalEditarTareas(false);
        buscarTareasPendientes();
        obtenerTareasAEditar();
    });

    const buscarTareasPendientes = async () => {
        const respuesta = await compromisoPagoServiceWeb(true)
        setTareasPendientes(respuesta)
    }

    const cargarDatos = () => {
        setValue("fechaCompromiso", tareaSeleccionada.fechaCompromiso);
        setValue("horaRecordatorio", tareaSeleccionada.horaRecordatorio);
        setValue("valorCompromiso", tareaSeleccionada.montoComprometido);
        setValue("tipoTarea", tareaSeleccionada.idTipoTarea);
        setValue("observaciones", tareaSeleccionada.observaciones);
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
        cargarDatos
    };
};