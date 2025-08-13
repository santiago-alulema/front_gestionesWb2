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
import { useFormCompromisoPago } from '@/Pages/DeudoresGestionPage/useForms/useFormCompromisoPago'
import { acercamientoDeudorServicioWeb } from '@/services/Service'
import { Box, Button, Grid } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const CompromisosPagosComponents = () => {
    const [valorPago, setValorPago] = useState<string>("0.0")
    const fechaActual = dayjs().format('YYYY-MM-DD')
    const [formasContactoCliente, setFormasContactoCliente] = useState<TipoContactoGestionInDTO[]>([])

    const onInit = async () => {
        const respuesta = await acercamientoDeudorServicioWeb();
        setFormasContactoCliente(respuesta);
    }

    const { control, errors, rules, onSubmit } = useFormCompromisoPago();
    const { setAbrirModalGestionarDeuda } = useGestionarDeudas();

    useEffect(() => {
        onInit()
    }, [])

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 6 }}>
                    <CustomDatePickerForm
                        name='fechaCompromiso'
                        label="Fecha de pago"
                        requiredField
                        defaultValue={fechaActual}
                        control={control}
                        errors={errors}
                        rules={rules.fechaCompromiso}
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
                <Grid size={{ lg: 12 }}>
                    <CustomAutocompleteFormTs
                        name='tipoContactoCliente'
                        options={formasContactoCliente}
                        label="Tipo de contacto Cliente"
                        labelFullField="Contacto Cliente"
                        optionLabel='nombre'
                        control={control}
                        errors={errors}
                        rules={rules.tipoContactoCliente}
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