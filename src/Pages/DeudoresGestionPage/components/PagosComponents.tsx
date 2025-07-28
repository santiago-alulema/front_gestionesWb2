import CustomTextFieldMoney from "@/components/CustomTextFieldMoney"
import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs"
import CustomDatePicker from "@/components/DataGridCommon/CustomDatePicker"
import { FormaPagoInDTO } from "@/model/Dtos/In/FormaPagoInDTO"
import { PagoGrabarOutDTO } from "@/model/Dtos/Out/PagoGrabarOutDTO"
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores"
import { formaPagosServicioWeb } from "@/services/Service"
import { Autocomplete, Grid, InputAdornment, TextField } from "@mui/material"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

const PagosComponents = () => {
    const [valorPago, setValorPago] = useState<string>("0.0")
    const [formasDePago, setFormasDePago] = useState<FormaPagoInDTO[]>([])
    const [fechaPago, setFechaPago] = useState<Date | null>(new Date())
    const fechaActual = dayjs().format('YYYY-MM-DD')

    const { grabarPago,
        setGrabarPago
    } = useGestionarDeudas();
    const onInit = async () => {
        const respuesta = await formaPagosServicioWeb();
        setFormasDePago(respuesta)
    }

    useEffect(() => {
        onInit()
    }, [])

    const actualizarCampoPagos = (campo: keyof PagoGrabarOutDTO, valor: string) => {
        setGrabarPago({
            ...grabarPago,
            [campo]: valor
        });
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 12 }}>
                    <CustomDatePicker
                        label="Fecha de pago"
                        requiredField
                        defaultValue={fechaActual}
                        onChangeValue={(value) => actualizarCampoPagos('fechaPago', value)}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomTextFieldMoney
                        label="Valor en dólares"
                        fullWidth
                        value={grabarPago.montoPagado.toString()}
                        onChange={(value) => actualizarCampoPagos("montoPagado", value)}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteTs
                        options={formasDePago}
                        label="Forma de Pago"
                        labelFullField="Forma de Pago"
                        optionLabel="nombre"
                        optionValue="formaPagoId"
                        handleChange={(e, value: PagoGrabarOutDTO) => actualizarCampoPagos("formaPagoId", value.formaPagoId.toString())}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default PagosComponents