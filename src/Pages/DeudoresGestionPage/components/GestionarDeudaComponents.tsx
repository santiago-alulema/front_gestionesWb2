import { Box, Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { TipoContactoGestionInDTO } from '@/model/Dtos/In/TipoContactoGestionInDTO';
import { acercamientoDeudorServicioWeb, respuestasServicioWeb, resultadosServicioWeb, tipoContactoServicioWeb } from '@/services/Service';
import { SeleccionGeneral } from '@/model/Dtos/In/SeleccionGeneral';
import CustomAutocompleteFormTs from '@/components/DataGridCommon/CustomAutocompleteFormTs';
import CustomTextFieldFormTs from '@/components/DataGridCommon/CustomTextFieldFormTs';
import { useFormGestionarDeuda } from '@/Pages/DeudoresGestionPage/useForms/useFormGestionarDeuda';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { MensajeriaInDto } from '@/Pages/DeudoresGestionPage/models/MensajeriaInDto';
import { mensajesGestionesServicioWeb } from '@/Pages/DeudoresGestionPage/services/GestionDeudaServicios';
import { enviarMensajeWhatsapp } from '@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp';
import CustomDatePicker from '@/components/DataGridCommon/CustomDatePicker';

const GestionarDeudaComponents = () => {

    const { control,
        errors,
        onSubmit,
        rules,
        enviarMensajeWhatsappServicioWeb,
        enviarCorreoCliente,
        endDate,
        setEndDate,
        setMensajeGestion } = useFormGestionarDeuda();

    const {
        deudorSeleccionado,
        obtenerTelefonosCliente,
        setAbrirModalGestionarDeuda } = useGestionarDeudas();
    const [formasContactoCliente, setFormasContactoCliente] = useState<TipoContactoGestionInDTO[]>([])
    const [resultados, setResultados] = useState<SeleccionGeneral[]>([])
    const [tiposContacto, setTiposContacto] = useState<SeleccionGeneral[]>([])
    const [respuestas, setRespuestas] = useState<SeleccionGeneral[]>([])
    const [tipoContactoSeleccionado, setTipoContactoSeleccionado] = useState<any>(null); // nuevo estado

    const onInit = async () => {
        const respuesta = await acercamientoDeudorServicioWeb();
        setFormasContactoCliente(respuesta);
    }

    useEffect(() => {
        onInit();
        cargarMensaje();
        obtenerTelefonosCliente(deudorSeleccionado.cedula);
        cargarResultado()
    }, []);

    const cargarResultado = async () => {
        const respuesta = await resultadosServicioWeb();
        setResultados(respuesta)
    }

    const cargarMensaje = async () => {
        const respuesta = await mensajesGestionesServicioWeb();
        setMensajeGestion(respuesta);
    }

    const cargarTipoContacto = async (value: any) => {
        if (!value) {
            setRespuestas([]);
            setTipoContactoSeleccionado(null)
            setTiposContacto([])
            return
        }
        const respuesta = await tipoContactoServicioWeb(value.id);
        setTiposContacto(respuesta)
        setRespuestas([]);

    }

    const cargarRespuestas = async (value: any) => {
        if (!value) {
            setRespuestas([]);
            setTipoContactoSeleccionado(null)
            return
        }
        setTipoContactoSeleccionado(value.id)
        const respuesta = await respuestasServicioWeb(value.id);
        setRespuestas(respuesta)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name='idResultado'
                        options={resultados}
                        label="Resultado"
                        labelFullField="Resultado"
                        optionLabel='nombre'
                        optionValue='id'
                        control={control}
                        errors={errors}
                        requiredField={true}
                        rules={rules.tipoContacto}
                        handleChange={(e, value) => cargarTipoContacto(value)}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name='idTipoContactoCliente'
                        options={tiposContacto}
                        label="Tipo de contacto Cliente"
                        labelFullField="Tipo de contacto Cliente"
                        optionLabel='nombre'
                        optionValue='id'
                        control={control}
                        errors={errors}
                        rules={rules.tipoCliente}
                        handleChange={(e, value) => cargarRespuestas(value)}
                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name='idRespuesta'
                        options={respuestas}
                        label="Respuesta"
                        labelFullField="Respuesta"
                        optionLabel='nombre'
                        optionValue='id'
                        control={control}
                        errors={errors}
                        rules={rules.respuesta}
                        requiredField={true}
                        disabled={!tipoContactoSeleccionado}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderColor: !tipoContactoSeleccionado ? 'red' : undefined
                            }
                        }}
                    />
                    <p style={{ fontSize: 10, color: 'red' }}>{!tipoContactoSeleccionado ? "Primero seleccione un Tipo de contacto Cliente" : ""}</p>
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomTextFieldFormTs
                        name='email'
                        control={control}
                        errors={errors}
                        requiredField={false}
                        label="Email"
                        labelFullField="Email"
                    />
                </Grid>

                <Grid size={{ lg: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <Typography variant='body2'>Envia Mensaje por:</Typography>
                        <CustomDatePicker
                            label="Fecha maxima de pago"
                            defaultValue={endDate}
                            onChangeValue={(value) => setEndDate(value || '')}
                        />
                        <IconButton onClick={enviarMensajeWhatsappServicioWeb}
                            sx={{
                                backgroundColor: '#25D366',
                                color: 'white',
                                width: 32,
                                height: 32,
                                ml: 1,
                                '&:hover': {
                                    backgroundColor: '#1EBE5C'
                                }
                            }}
                        >
                            <WhatsAppIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={enviarCorreoCliente} sx={{
                            backgroundColor: '#0078d4',
                            color: 'white',
                            width: 32,
                            height: 32,
                            ml: 1,
                            '&:hover': {
                                backgroundColor: '#006bb3'
                            }
                        }}
                        >
                            <EmailIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Grid>

                <Grid size={{ lg: 12 }} alignContent='center'>
                    <CustomTextFieldFormTs
                        name='observaciones'
                        control={control}
                        errors={errors}
                        rules={rules.observaciones}
                        requiredField={true}
                        label="Observaciones"
                        labelFullField="Observaciones"
                        multiline={true}
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

export default GestionarDeudaComponents