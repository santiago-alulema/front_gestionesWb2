import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, grabarCompromisoPago, grabarGestionServicioWeb, grabarPagosServicioWeb } from '@/services/Service';
import dayjs from "dayjs"
import { PagoGrabarOutDTO } from '@/model/Dtos/Out/PagoGrabarOutDTO';
import { ICompromisoPagoOutDTO } from '@/model/Dtos/Out/ICompromisoPagoOutDTO';
import { useState } from 'react';
import TiposTareaInDTO from '@/Pages/DeudoresGestionPage/models/TiposTareaInDTO';
import { useNavigate, useSearchParams } from 'react-router';

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


    const {
        deudaSeleccionada, setAbrirModalGestionarDeuda, setTareasPendientes, telefonoSeleccionado
    } = useGestionarDeudas();

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
        setSeleccionTipoTarea
    };
};