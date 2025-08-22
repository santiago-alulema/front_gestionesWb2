import { useForm } from 'react-hook-form';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { showAlert } from '@/utils/modalAlerts';
import { compromisoPagoServiceWeb, grabarPagosServicioWeb } from '@/services/Service';
import dayjs from "dayjs"
import { PagoGrabarOutDTO } from '@/model/Dtos/Out/PagoGrabarOutDTO';
import { useEffect, useState } from 'react';
import { PagoDto } from '@/Pages/EditarGestiones/models/PagoDto';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { UpdatePagoDto } from '@/Pages/EditarGestiones/models/UpdatePagoDto ';
import { editarPagoServicioWeb } from '@/Pages/EditarGestiones/services/ServiciosWebEditarGestiones';

export const UseFormPagoEditar = () => {

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

    const { setAbrirModalEditarPagos, obtenerPagosAEditar, pagosSeleccionadoEditar } = useEditarGestiones();
    const {
        setTareasPendientes
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

    useEffect(() => {
        setValue("fechaPago", pagosSeleccionadoEditar.fechaPago)
        setValue("valorPago", pagosSeleccionadoEditar.montoPagado)
        setValue("banco", pagosSeleccionadoEditar.idBanco)
        setValue("cuenta", pagosSeleccionadoEditar.idCuenta)
        setValue("tipoTransaccion", pagosSeleccionadoEditar.idTipoTransaccion)
        setValue("abonoLiquidacion", pagosSeleccionadoEditar.idAbonoLiquidacion)
        setValue("numeroDocumento", pagosSeleccionadoEditar.numeroDocumenro)
        setValue("observaciones", pagosSeleccionadoEditar.observaciones)
    }, [])


    const onSubmit = handleSubmit(async (data) => {
        const enviagrabar: UpdatePagoDto = {
            fechaPago: data.fechaPago,
            montoPagado: data.valorPago,
            idBanco: data.banco,
            idCuenta: data.cuenta,
            idTipoTransaccion: data.tipoTransaccion,
            idAbonoLiquidacion: data.abonoLiquidacion,
            numeroDocumenro: data.numeroDocumento,
            observaciones: data.observaciones
        }
        await editarPagoServicioWeb(pagosSeleccionadoEditar.idPago, enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "El <strong> PAGO </strong> se actualizo correctamente",
            type: 'success',
            callBackFunction: false
        };
        obtenerPagosAEditar();
        buscarTareasPendientes();
        showAlert(configAlert);
        setAbrirModalEditarPagos(false);
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