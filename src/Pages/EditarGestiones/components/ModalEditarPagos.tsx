import CustomDatePickerForm from "@/components/CustomDatePickerForm"
import CustomTextFieldMoneyForm from "@/components/CustomTextFieldMoneyForm"
import CustomAutocompleteFormTs from "@/components/DataGridCommon/CustomAutocompleteFormTs"
import CustomTextFieldFormTs from "@/components/DataGridCommon/CustomTextFieldFormTs"
import { SeleccionGeneral } from "@/model/Dtos/In/SeleccionGeneral"
import { useEditarGestiones } from "@/Pages/EditarGestiones/contexts/EditarGestionesContext"
import { UseFormPagoEditar } from "@/Pages/EditarGestiones/UseFormEditarGestiones/UseFormPagoEditar"
import { abonoLiquidacionesServicioWeb, bancosServicioWeb, cuentasServicioWeb, tipoTransaccionesServicioWeb } from "@/services/Service"
import { Box, Button, Grid } from "@mui/material"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

const ModalEditarPagos = () => {
    const fechaActual = dayjs().format('YYYY-MM-DD')
    const [bancos, setBancos] = useState<SeleccionGeneral[]>([])
    const [cuentas, setCuentas] = useState<SeleccionGeneral[]>([])
    const [tiposTransaccion, setTiposTransaccion] = useState<SeleccionGeneral[]>([])
    const [abonosLiquidaciones, setAbonosLiquidaciones] = useState<SeleccionGeneral[]>([])

    const { control, errors, rules, onSubmit } = UseFormPagoEditar();
    const { setAbrirModalEditarPagos } = useEditarGestiones();

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
            <Grid container spacing={2}>
                <Grid size={{ lg: 12 }}>
                    <CustomDatePickerForm
                        name="fechaPago"
                        label="Fecha de pago"
                        requiredField
                        defaultValue={fechaActual}
                        control={control}
                        errors={errors}
                        rules={rules.fechaPago}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomTextFieldMoneyForm
                        name="valorPago"
                        label="Valor en dólares"
                        fullWidth
                        control={control}
                        errors={errors}
                        rules={rules.valorPago}
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
                        rules={rules.banco}
                        requiredField={true}
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
                        rules={rules.cuenta}
                        requiredField={true}

                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name="tipoTransaccion"
                        options={tiposTransaccion}
                        label="Tipo Transaccion"
                        labelFullField="Seleccione Tipo Transaccion"
                        optionLabel="nombre"
                        optionValue="id"
                        control={control}
                        errors={errors}
                        rules={rules.tipoTransaccion}
                        requiredField={true}

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
                        rules={rules.abonoLiquidacion}
                        requiredField={true}

                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomTextFieldFormTs
                        name="numeroDocumento"
                        control={control}
                        errors={errors}
                        rules={rules.numeroDocumento}
                        label="Numero de Documento"
                        labelFullField="Numero de Documento"
                        requiredField={true}
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
                        <Button color='inherit' onClick={() => setAbrirModalEditarPagos(false)} variant='contained'>Cancelar</Button>
                    </Box>
                </Grid>

            </Grid>
        </>
    )
}

export default ModalEditarPagos