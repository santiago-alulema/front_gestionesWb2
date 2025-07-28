import CustomAutocompleteTs from '@/components/DataGridCommon/CustomAutocompleteTs'
import { Button, Grid, TextField } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from 'react';
import PhoneNumbersInput from '@/components/PhoneNumbersInput';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { TipoContactoGestionInDTO } from '@/model/Dtos/In/TipoContactoGestionInDTO';
import { acercamientoDeudorServicioWeb } from '@/services/Service';
import { IGestionInDTO } from '@/model/Dtos/Out/IGestionOutDTO';

const GestionarDeudaComponents = () => {

    const [verTelefonos, setVerTelefonos] = useState<boolean>(false)
    const { deudorSeleccionado, telefonosActivos, setTelefonosActivos, obtenerTelefonosCliente, setGrabarGestion, grabarGestion } = useGestionarDeudas();
    const [formasContactoCliente, setFormasContactoCliente] = useState<TipoContactoGestionInDTO[]>([])


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
    }, []);

    const actualizarCampoGestion = (campo: keyof IGestionInDTO, valor: string) => {
        setGrabarGestion({
            ...grabarGestion,
            [campo]: valor
        });
    };


    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteTs
                        options={formasContactoCliente}
                        label="Tipo de contacto Cliente"
                        labelFullField="Contacto Cliente"
                        optionLabel='nombre'
                        optionValue='tipoContactoGestionId'
                        handleChange={(e, value: TipoContactoGestionInDTO) => actualizarCampoGestion("idTipoContactoDeudor", value.tipoContactoGestionId.toString())}
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
            </Grid>
        </>
    )
}

export default GestionarDeudaComponents