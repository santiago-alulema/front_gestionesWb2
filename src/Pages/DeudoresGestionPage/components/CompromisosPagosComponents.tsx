import CustomDatePickerForm from '@/components/CustomDatePickerForm'
import CustomTextFieldMoney from '@/components/CustomTextFieldMoney'
import CustomTextFieldMoneyForm from '@/components/CustomTextFieldMoneyForm'
import CustomAutocompleteFormTs from '@/components/DataGridCommon/CustomAutocompleteFormTs'
import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs'
import CustomDatePicker from '@/components/DataGridCommon/CustomDatePicker'
import CustomTextFieldFormTs from '@/components/DataGridCommon/CustomTextFieldFormTs'
import { TipoContactoGestionInDTO } from '@/model/Dtos/In/TipoContactoGestionInDTO'
import { ICompromisoPagoOutDTO } from '@/model/Dtos/Out/ICompromisoPagoOutDTO'
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores'
import TiposTareaInDTO from '@/Pages/DeudoresGestionPage/models/TiposTareaInDTO'
import { tiposTareasServicioWeb } from '@/Pages/DeudoresGestionPage/services/GestionDeudaServicios'
import { useFormCompromisoPago } from '@/Pages/DeudoresGestionPage/useForms/useFormCompromisoPago'
import { acercamientoDeudorServicioWeb } from '@/services/Service'
import { Box, Button, Grid } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const CompromisosPagosComponents = () => {
    const fechaActual = dayjs().format('YYYY-MM-DD')
    const [tiposTareas, setTiposTareas] = useState<TiposTareaInDTO[]>([]);
    const onInit = async () => {
        const respuesta = await tiposTareasServicioWeb();
        setTiposTareas(respuesta)
    }

    const { control, errors, rules, onSubmit } = useFormCompromisoPago();
    const { setAbrirModalGestionarDeuda } = useGestionarDeudas();

    useEffect(() => {
        onInit()
    }, [])

    const horarioRecordatorio = [
        { "id": "8:00 AM", "name": "8:00 AM" },
        { "id": "9:00 AM", "name": "9:00 AM" },
        { "id": "10:00 AM", "name": "10:00 AM" },
        { "id": "11:00 AM", "name": "11:00 AM" },
        { "id": "12:00 PM", "name": "12:00 PM" },
        { "id": "13:00 PM", "name": "1:00 PM" },
        { "id": "14:00 PM", "name": "2:00 PM" },
        { "id": "15:00 PM", "name": "3:00 PM" },
        { "id": "16:00 PM", "name": "4:00 PM" },
        { "id": "17:00 PM", "name": "5:00 PM" },
        { "id": "18:00 PM", "name": "6:00 PM" },
        { "id": "19:00 PM", "name": "7:00 PM" },
        { "id": "20:00 PM", "name": "8:00 PM" }
    ]
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 6 }}>
                    <CustomDatePickerForm
                        name='fechaCompromiso'
                        label="Fecha recordatorio"
                        requiredField
                        defaultValue={fechaActual}
                        control={control}
                        errors={errors}
                        rules={rules.fechaCompromiso}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <CustomAutocompleteFormTs
                        name='horaRecordatorio'
                        options={horarioRecordatorio}
                        label="Hora recordatorio"
                        labelFullField="Seleccione Hora Recordatorio"
                        control={control}
                        errors={errors}
                        rules={rules.campoObligatorio}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <CustomTextFieldMoneyForm
                        name='valorCompromiso'
                        label="Valor en dólares"
                        fullWidth
                        control={control}
                        errors={errors}
                        rules={rules.valorCompromiso}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <CustomAutocompleteFormTs
                        name='tipoTarea'
                        options={tiposTareas}
                        label="Tipo de tarea"
                        labelFullField="Tipo de tarea"
                        optionLabel='nombre'
                        control={control}
                        errors={errors}
                        rules={rules.campoObligatorio}
                    />
                </Grid>
                <Grid size={{ lg: 12 }} >
                    <CustomTextFieldFormTs
                        name="observaciones"
                        control={control}
                        errors={errors}
                        rules={rules.observaciones}
                        label="Observaciones"
                        labelFullField="Observaciones"
                        requiredField={true}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid size={{ lg: 12 }} >
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onSubmit} variant='contained'>Grabar</Button>
                        <Button color='inherit' onClick={() => setAbrirModalGestionarDeuda(false)} variant='contained'>Cancelar</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default CompromisosPagosComponents