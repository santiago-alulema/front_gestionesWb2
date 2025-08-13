import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs'
import { Box, Button, Grid, InputAdornment, Stack, TextField } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from 'react';
import PhoneNumbersInput from '@/components/PhoneNumbersInput';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { TipoContactoGestionInDTO } from '@/model/Dtos/In/TipoContactoGestionInDTO';
import { acercamientoDeudorServicioWeb, respuestasServicioWeb, resultadosServicioWeb, tipoContactoServicioWeb } from '@/services/Service';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';
import { SeleccionGeneral } from '@/model/Dtos/In/SeleccionGeneral';
import CustomAutocompleteFormTs from '@/components/DataGridCommon/CustomAutocompleteFormTs';
import CustomTextFieldFormTs from '@/components/DataGridCommon/CustomTextFieldFormTs';
import { useFormGestionarDeuda } from '@/Pages/DeudoresGestionPage/useForms/useFormGestionarDeuda';

const GestionarDeudaComponents = () => {

    const { control, errors, onSubmit, rules } = useFormGestionarDeuda();

    const [verTelefonos, setVerTelefonos] = useState<boolean>(false)
    const { deudorSeleccionado, telefonosActivos, setTelefonosActivos, obtenerTelefonosCliente, setGrabarGestion, grabarGestion, setAbrirModalGestionarDeuda } = useGestionarDeudas();
    const [formasContactoCliente, setFormasContactoCliente] = useState<TipoContactoGestionInDTO[]>([])
    const [resultados, setResultados] = useState<SeleccionGeneral[]>([])
    const [tiposContacto, setTiposContacto] = useState<SeleccionGeneral[]>([])
    const [respuestas, setRespuestas] = useState<SeleccionGeneral[]>([])


    const accionBotonVerTelefono = () => {
        setVerTelefonos(prev => !prev)
    }

    const onInit = async () => {
        const respuesta = await acercamientoDeudorServicioWeb();
        setFormasContactoCliente(respuesta);
    }

    useEffect(() => {
        onInit();
        obtenerTelefonosCliente(deudorSeleccionado.cedula);
        cargarResultado()
    }, []);

    const actualizarCampoGestion = (campo: keyof IGestionInDTO, valor: string) => {
        setGrabarGestion({
            ...grabarGestion,
            [campo]: valor
        });
    };

    const cargarResultado = async () => {
        const respuesta = await resultadosServicioWeb();
        setResultados(respuesta)
    }


    const cargarTipoContacto = async (value: any) => {
        const respuesta = await tipoContactoServicioWeb(value.id);
        actualizarCampoGestion("idTipoContactoDeudor", value?.id || "")
        setTiposContacto(respuesta)
    }

    const cargarRespuestas = async (value: any) => {
        const respuesta = await respuestasServicioWeb(value.id);
        actualizarCampoGestion("idRespuesta", value?.id || "")
        setRespuestas(respuesta)
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteFormTs
                        name='tipoContacto'
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
                        name='tipoContactoCliente'
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
                        name='respuesta'
                        options={respuestas}
                        label="Respuesta"
                        labelFullField="Respuesta"
                        optionLabel='nombre'
                        optionValue='id'
                        control={control}
                        errors={errors}
                        rules={rules.respuesta}
                        requiredField={true}

                    />
                </Grid>
                <Grid size={{ lg: 6 }} >
                    <CustomTextFieldFormTs
                        name='email'
                        control={control}
                        errors={errors}
                        rules={rules.email}
                        requiredField={true}
                        label="Email"
                        labelFullField="Email"
                    />
                </Grid>
                <Grid size={{ lg: 6 }} alignContent='center'>
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
                <Grid size={{ lg: 6 }} alignContent='center'>
                    <Button sx={{ borderRadius: 5 }}
                        startIcon={verTelefonos ? <RemoveRedEyeIcon /> : < VisibilityOffIcon />}
                        variant='contained'
                        fullWidth
                        onClick={accionBotonVerTelefono}>  Ver Telefonos</Button>
                </Grid>
                <Grid size={{ lg: 12 }}>
                    {verTelefonos ? (<PhoneNumbersInput cedula={deudorSeleccionado.cedula} phones={telefonosActivos} setPhones={setTelefonosActivos} />) : null}
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