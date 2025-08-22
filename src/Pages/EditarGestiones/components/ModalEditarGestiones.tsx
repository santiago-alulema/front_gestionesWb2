import { Box, Button, Grid, InputAdornment, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { TipoContactoGestionInDTO } from '@/model/Dtos/In/TipoContactoGestionInDTO';
import { acercamientoDeudorServicioWeb, respuestasServicioWeb, resultadosServicioWeb, tipoContactoServicioWeb } from '@/services/Service';
import { SeleccionGeneral } from '@/model/Dtos/In/SeleccionGeneral';
import CustomAutocompleteFormTs from '@/components/DataGridCommon/CustomAutocompleteFormTs';
import CustomTextFieldFormTs from '@/components/DataGridCommon/CustomTextFieldFormTs';
import { useFormGestionarDeuda } from '@/Pages/DeudoresGestionPage/useForms/useFormGestionarDeuda';
import { UseFormGestionesEditar } from '@/Pages/EditarGestiones/UseFormEditarGestiones/UseFormGestionesEditar';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { useLoading } from '@/components/LoadingContext';

const ModalEditarGestiones = () => {

    const { control, errors, onSubmit, rules, iniciarGestion } = UseFormGestionesEditar();
    const {
        setAbrirModalEditarGestiones, gestionSeleccionada } = useEditarGestiones();
    const [formasContactoCliente, setFormasContactoCliente] = useState<TipoContactoGestionInDTO[]>([])
    const [resultados, setResultados] = useState<SeleccionGeneral[]>([])
    const [tiposContacto, setTiposContacto] = useState<SeleccionGeneral[]>([])
    const [respuestas, setRespuestas] = useState<SeleccionGeneral[]>([])
    const { startLoading, stopLoading } = useLoading();

    const [tipoContactoSeleccionado, setTipoContactoSeleccionado] = useState<any>(null); // nuevo estado

    const onInit = async () => {
        const respuesta = await acercamientoDeudorServicioWeb();
        setFormasContactoCliente(respuesta);
    }

    useEffect(() => {
        startLoading();
        onInit();
        cargarResultado()
        iniciarGestion();
    }, []);

    const cargarResultado = async () => {
        startLoading();
        const respuesta = await resultadosServicioWeb();
        setResultados(respuesta)
        await cargarTipoContacto(gestionSeleccionada.idTipoResultado);
        await cargarRespuestas(gestionSeleccionada.idTipoContactoResultado);
        stopLoading();
    }

    const cargarTipoContacto = async (value: any) => {
        if (!value) {
            setRespuestas([]);
            setTipoContactoSeleccionado(null)
            setTiposContacto([])
            return
        }
        setRespuestas([]);
        const respuesta = await tipoContactoServicioWeb(value);
        setTiposContacto(respuesta)
    }

    const cargarRespuestas = async (value: any) => {
        if (!value) {
            setRespuestas([]);
            setTipoContactoSeleccionado(null)
            return
        }
        setTipoContactoSeleccionado(value)
        const respuesta = await respuestasServicioWeb(value);
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
                        handleChange={(e, value: any) => cargarTipoContacto(value?.id)}
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
                        handleChange={(e, value: any) => cargarRespuestas(value?.id)}
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
                        <Button color='inherit' onClick={() => setAbrirModalEditarGestiones(false)} variant='contained'>Cancelar</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default ModalEditarGestiones