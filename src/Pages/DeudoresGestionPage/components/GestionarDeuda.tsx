import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs";
import TipoGestioneOutDTO from "@/model/Dtos/In/TipoGestioneOutDTO";
import GestionarDeudaComponents from "@/Pages/DeudoresGestionPage/components/GestionarDeudaComponents";
import PagosComponents from "@/Pages/DeudoresGestionPage/components/PagosComponents";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { mt } from 'date-fns/locale';
import CompromisosPagosComponents from "@/Pages/DeudoresGestionPage/components/CompromisosPagosComponents";
import { IGestionInDTO } from "@/model/Dtos/Out/IGestionOutDTO";
import { grabarCompromisoPago, grabarGestionServicioWeb, grabarPagosServicioWeb } from "@/services/Service";
import { showAlert } from "@/utils/modalAlerts";
import { ICompromisoPagoOutDTO } from "@/model/Dtos/Out/ICompromisoPagoOutDTO";
import { PagoGrabarOutDTO } from "@/model/Dtos/Out/PagoGrabarOutDTO";

const GestionarDeuda = () => {
    const { gestionesPadre,
        gestionHijo,
        LlenarGestionesHijo,
        setGestionHijo,
        deudorSeleccionado,
        deudaSeleccionada,
        grabarGestion,
        setGrabarGestion,
        grabarCompromiso,
        grabarPago } = useGestionarDeudas();
    const [selectedPadre, setSelectedPadre] = useState<any>(null);
    const [selectedHijo, setSelectedHijo] = useState<any>(null);
    const [observaciones, setObservaciones] = useState<string>("");


    const seleccionarPadre = (value: TipoGestioneOutDTO) => {
        setSelectedPadre(value);
        setSelectedHijo(null)
        setGestionHijo(null);
        LlenarGestionesHijo(value?.idTipoGestion ?? "");
    };

    const seleccionarHijo = (value: TipoGestioneOutDTO) => {
        setSelectedHijo(null)
        setSelectedHijo(value)
        actualizarCampoGestion("idDeuda", deudaSeleccionada.deudaId)
        grabarGestion.idTipoGestion = "";
    }

    useEffect(() => {
        const nuevaGestion: IGestionInDTO = {
            idDeuda: '',
            idTipoGestion: '',
            descripcion: '',
            idTipoContactoDeudor: ''
        }
        setGrabarGestion(nuevaGestion)
    }, [])

    const actualizarCampoGestion = (campo: keyof IGestionInDTO, valor: string) => {
        setGrabarGestion({
            ...grabarGestion,
            [campo]: valor
        });
    };



    const grabarGestionesApi = () => {
        if (selectedHijo?.tipoGestion === 'G') {
            grabarTipoGestionApi();
        }
        if (selectedHijo?.tipoGestion === 'CP') {
            grabarCompromisosPagosApi();
        }
        if (selectedHijo?.tipoGestion === 'P') {
            grabarPagosApi();
        }
    }

    const grabarTipoGestionApi = async () => {
        const enviagrabar: IGestionInDTO = {
            idDeuda: grabarGestion.idDeuda,
            idTipoGestion: selectedHijo.idTipoGestion,
            descripcion: observaciones,
            idTipoContactoDeudor: grabarGestion.idTipoContactoDeudor
        }
        await grabarGestionServicioWeb(enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente la Gestion",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
    }



    const grabarCompromisosPagosApi = async () => {
        const enviagrabar: ICompromisoPagoOutDTO = {
            idDeuda: grabarGestion.idDeuda,
            fechaCompromiso: grabarCompromiso.fechaCompromiso,
            montoComprometido: grabarCompromiso.montoComprometido,
            estado: "C",
            observaciones: observaciones,
            formaPagoId: grabarCompromiso.formaPagoId
        }
        await grabarCompromisoPago(enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente la Gestion",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
    }

    const grabarPagosApi = async () => {
        const enviagrabar: PagoGrabarOutDTO = {
            idDeuda: grabarGestion.idDeuda,
            fechaPago: grabarPago.fechaPago,
            montoPagado: grabarPago.montoPagado,
            medioPago: '0.0',
            observaciones: observaciones,
            formaPagoId: grabarPago.formaPagoId
        }
        await grabarPagosServicioWeb(enviagrabar);
        const configAlert = {
            title: "Correcto",
            message: "Se grabo correctamente la Gestion",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
    }

    return (
        <>
            <Stack mb={2}>
                <Typography variant="h5" fontWeight='bold' textAlign='center' mb={2}>GESTIONAR DEUDA</Typography>
                <Typography textAlign='left'><strong>Nombre Cliente: </strong> {deudorSeleccionado.nombre}</Typography>
                <Typography textAlign='left'><strong>Factura: </strong>{deudaSeleccionada.numeroFactura}</Typography>
            </Stack>

            <Grid container spacing={2}>
                <Grid size={{ lg: 6 }} >
                    <CustomAutocompleteTs
                        options={gestionesPadre}
                        optionLabel="nombre"
                        optionValue="idTipoGestion"
                        label="Seleccione el tipo de Gestion Padre"
                        labelFullField="Tipo de Gestion Padre"
                        handleChange={(event, value: TipoGestioneOutDTO) => seleccionarPadre(value)}
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <CustomAutocompleteTs
                        key={`hijo_${selectedPadre?.idTipoGestion || 'empty'}`}
                        options={gestionHijo}
                        optionLabel="nombre"
                        optionValue="idTipoGestion"
                        label="Seleccione el tipo de Gestion Hijo"
                        labelFullField="Tipo de Gestion Hijo"
                        defaultValue={null}
                        handleChange={(event, value: TipoGestioneOutDTO) => seleccionarHijo(value)}
                    />
                </Grid>
                <Grid size={{ lg: 12 }}>
                    {selectedHijo?.tipoGestion === 'P' && (<PagosComponents />)}
                    {selectedHijo?.tipoGestion === 'G' && (<GestionarDeudaComponents />)}
                    {selectedHijo?.tipoGestion === 'CP' && (<CompromisosPagosComponents />)}
                </Grid>
                <Grid size={{ lg: 12 }}>
                    <TextField variant="outlined"
                        label="Escribir Observacion"
                        fullWidth
                        multiline
                        rows={5}
                        onChange={(e) => setObservaciones(e.target.value)} />
                </Grid>
            </Grid>
            <Stack direction='row' justifyContent='right' mt={2} spacing={2}>
                <Button variant="contained"
                    style={{ width: 120, borderRadius: 15 }}
                    color="success"
                    onClick={grabarGestionesApi}>
                    Grabar
                </Button>
                <Button variant="contained" style={{ width: 120, borderRadius: 15 }}>
                    Cancelar
                </Button>
            </Stack>
        </>
    )
}

export default GestionarDeuda