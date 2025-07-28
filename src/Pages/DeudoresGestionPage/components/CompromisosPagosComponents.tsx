import CustomTextFieldMoney from '@/components/CustomTextFieldMoney'
import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs'
import CustomDatePicker from '@/components/DataGridCommon/CustomDatePicker'
import { TipoContactoGestionInDTO } from '@/model/Dtos/In/TipoContactoGestionInDTO'
import { ICompromisoPagoOutDTO } from '@/model/Dtos/Out/ICompromisoPagoOutDTO'
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores'
import { acercamientoDeudorServicioWeb } from '@/services/Service'
import { Grid } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const CompromisosPagosComponents = () => {
    const [valorPago, setValorPago] = useState<string>("0.0")
    const fechaActual = dayjs().format('YYYY-MM-DD')
    const [formasContactoCliente, setFormasContactoCliente] = useState<TipoContactoGestionInDTO[]>([])
    const {
        grabarCompromiso,
        setGrabarCompromiso } = useGestionarDeudas();
    const onInit = async () => {
        const respuesta = await acercamientoDeudorServicioWeb();
        setFormasContactoCliente(respuesta);
    }

    useEffect(() => {
        onInit()
    }, [])

    const actualizarCampoCompromisoPago = (campo: keyof ICompromisoPagoOutDTO, valor: string | number) => {
        setGrabarCompromiso({
            ...grabarCompromiso,
            [campo]: valor
        });
    };


    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 6 }}>
                    <CustomDatePicker
                        label="Fecha de pago"
                        requiredField
                        defaultValue={fechaActual}
                        onChangeValue={(value) => actualizarCampoCompromisoPago('fechaCompromiso', value)}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <CustomTextFieldMoney
                        label="Valor en dólares"
                        fullWidth
                        value={grabarCompromiso.montoComprometido.toString()}
                        onChange={(value) => actualizarCampoCompromisoPago("montoComprometido", value)}
                    />
                </Grid>
                <Grid size={{ lg: 12 }}>
                    <CustomAutocompleteTs
                        options={formasContactoCliente}
                        label="Tipo de contacto Cliente"
                        labelFullField="Contacto Cliente"
                        optionLabel='nombre'
                        optionValue='tipoContactoGestionId'
                        handleChange={(e, value: ICompromisoPagoOutDTO) => actualizarCampoCompromisoPago("formaPagoId", value.formaPagoId.toString())}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default CompromisosPagosComponents