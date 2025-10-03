import CustomCheckboxGroup from '@/components/CustomCheckboxGroup'
import CustomDatePickerForm from '@/components/CustomDatePickerForm'
import CustomTextFieldMoneyForm from '@/components/CustomTextFieldMoneyForm'
import CustomAutocompleteFormTs from '@/components/DataGridCommon/CustomAutocompleteFormTs'
import CustomTextFieldFormTs from '@/components/DataGridCommon/CustomTextFieldFormTs'
import { SeleccionGeneral } from '@/model/Dtos/In/SeleccionGeneral'
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores'
import useFormGestionarCompromisoPago from '@/Pages/GestionarCompromisosPagos/hooks/useFormGestionarCompromisoPago'
import { abonoLiquidacionesServicioWeb, bancosServicioWeb, cuentasServicioWeb, tipoTransaccionesServicioWeb } from '@/services/Service'
import { Box, Button, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const GestionarCompromisoPago = () => {

    const fechaActual = dayjs().format('YYYY-MM-DD')

    const [bancos, setBancos] = useState<SeleccionGeneral[]>([])
    const [cuentas, setCuentas] = useState<SeleccionGeneral[]>([])
    const [tiposTransaccion, setTiposTransaccion] = useState<SeleccionGeneral[]>([])
    const [abonosLiquidaciones, setAbonosLiquidaciones] = useState<SeleccionGeneral[]>([])
    const { deudaSeleccionada } = useGestionarDeudas();

    const { control,
        errors,
        rules,
        onSubmit,
        setIncumplioCompromisoPago,
        incumplioCompromisoPago } = useFormGestionarCompromisoPago();

    useEffect(() => {
        cargarBancos();
        cargarCuentas();
        cargarTransacciones();
        cargarAbonoLiquidacion();
    }, [])

    const cargarBancos = async () => {
        const respuesta = await bancosServicioWeb();
        setBancos(respuesta)
    }

    const cargarCuentas = async () => {
        const respuesta = await cuentasServicioWeb();
        setCuentas(respuesta)
    }
    const cargarTransacciones = async () => {
        const respuesta = await tipoTransaccionesServicioWeb();
        setTiposTransaccion(respuesta)
    }
    const cargarAbonoLiquidacion = async () => {
        const respuesta = await abonoLiquidacionesServicioWeb();
        setAbonosLiquidaciones(respuesta)
    }

    return (
        <>
            <Grid size={{ lg: 12 }} mb={2}>
                <CustomCheckboxGroup
                    name="incumplioCompromisoPago"
                    control={control}
                    options={[
                        { label: "Incumplio Compromiso de Pago", value: "true" },
                    ]}
                    required={false}
                    onChangeItem={() => setIncumplioCompromisoPago(prev => !prev)}

                />

            </Grid>
            <Grid container spacing={2}>
                <Grid size={{ lg: 12 }}>
                    <CustomDatePickerForm
                        name="fechaPago"
                        label="Fecha de pago"
                        requiredField={incumplioCompromisoPago ? true : false}
                        defaultValue={fechaActual}
                        control={control}
                        errors={errors}
                        disabled={incumplioCompromisoPago}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomTextFieldMoneyForm
                        name="valorPago"
                        label="Valor en dólares"
                        fullWidth
                        control={control}
                        errors={errors}
                        disabled={incumplioCompromisoPago}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name="banco"
                        options={bancos}
                        label="Bancos"
                        labelFullField="Seleccione banco"
                        optionLabel="nombre"
                        optionValue="id"
                        control={control}
                        errors={errors}
                        disabled={incumplioCompromisoPago}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name="cuenta"
                        options={cuentas}
                        label="Cuentas"
                        labelFullField="Seleccione Cuenta"
                        optionLabel="nombre"
                        optionValue="id"
                        control={control}
                        errors={errors}
                        requiredField={true}
                        disabled={incumplioCompromisoPago}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name="tipoTransaccion"
                        options={tiposTransaccion}
                        label="tipo Transaccion"
                        labelFullField="Seleccione Tipo Transaccion"
                        optionLabel="nombre"
                        optionValue="id"
                        control={control}
                        errors={errors}
                        requiredField={true}
                        disabled={incumplioCompromisoPago}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name="abonoLiquidacion"
                        options={abonosLiquidaciones}
                        label="Abono/Liquidacion"
                        labelFullField="Seleccione Abono/Liquidacion"
                        optionLabel="nombre"
                        optionValue="id"
                        control={control}
                        errors={errors}
                        requiredField={true}
                        disabled={incumplioCompromisoPago}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomTextFieldFormTs
                        name="numeroDocumento"
                        control={control}
                        errors={errors}
                        label="Numero de Documento"
                        labelFullField="Numero de Documento"
                        requiredField={!incumplioCompromisoPago && !!rules.observaciones?.required}
                        disabled={incumplioCompromisoPago}
                    />
                </Grid>
                <Grid size={{ lg: 12 }} >
                    <CustomTextFieldFormTs
                        name="observaciones"
                        control={control}
                        errors={errors}
                        label="Observaciones"
                        labelFullField="Observaciones"
                        requiredField={!incumplioCompromisoPago} // Esto controla el asterisco visual
                        disabled={incumplioCompromisoPago}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid size={{ lg: 12 }} >
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onSubmit} type="submit" variant='contained' >Grabar</Button>
                        <Button color='inherit' variant='contained'>Cancelar</Button>
                    </Box>
                </Grid>

            </Grid>
        </>
    )
}

export default GestionarCompromisoPago