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
import TabsGestionarDeudas from "@/Pages/DeudoresGestionPage/components/TabsGestionarDeudas";

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
        setAbrirModalGestionarDeuda } = useGestionarDeudas();
    const [selectedPadre, setSelectedPadre] = useState<any>(null);
    const [selectedHijo, setSelectedHijo] = useState<any>(null);
    const [observaciones, setObservaciones] = useState<string>("");
    const [numeroDocumentoPago, setNumeroDocumentoPago] = useState<string>("");


    const [pagosGrabar, setPagosGrabar] = useState<PagoGrabarOutDTO>({
        idDeuda: '',
        fechaPago: '',
        montoPagado: 0,
        medioPago: '',
        observaciones: '',
        numeroDocumento: '',
        bancoId: 'sa',
        cuentaId: '',
        tipoTransaccionId: '',
        abonoLiquidacionId: ''
    });



    const seleccionarPadre = (value: TipoGestioneOutDTO) => {
        setSelectedPadre(value);
        setSelectedHijo(null)
        setGestionHijo(null);
        LlenarGestionesHijo(value?.idTipoGestion ?? "");
    };

    const seleccionarHijo = (value: TipoGestioneOutDTO) => {
        setSelectedHijo(null)
        setSelectedHijo(value)
        actualizarCampoGestion("idDeuda", deudaSeleccionada.idDeuda)
        grabarGestion.idTipoGestion = "";
    }

    // useEffect(() => {
    //     const nuevaGestion: IGestionInDTO = {
    //         idDeuda: '',
    //         idTipoGestion: '',
    //         descripcion: '',
    //         idTipoContactoDeudor: ''
    //     }
    //     setGrabarGestion(nuevaGestion)
    // }, [])

    const actualizarCampoGestion = (campo: keyof IGestionInDTO, valor: string) => {
        setGrabarGestion({
            ...grabarGestion,
            [campo]: valor
        });
    };



    // const grabarGestionesApi = () => {
    //     if (selectedHijo?.tipoGestion === 'G') {
    //         grabarTipoGestionApi();
    //     }
    //     if (selectedHijo?.tipoGestion === 'C') {
    //         grabarCompromisosPagosApi();
    //     }
    //     if (selectedHijo?.tipoGestion === 'P') {
    //         grabarPagosApi();
    //     }
    //     setAbrirModalGestionarDeuda(false)
    // }

    // const grabarTipoGestionApi = async () => {
    //     const enviagrabar: IGestionInDTO = {
    //         idDeuda: grabarGestion.idDeuda,
    //         idTipoGestion: selectedHijo.idTipoGestion,
    //         descripcion: observaciones,
    //         idTipoContactoDeudor: grabarGestion.idTipoContactoDeudor,
    //         idRespuesta: grabarGestion.idRespuesta,
    //         email: grabarGestion.email
    //     }
    //     await grabarGestionServicioWeb(enviagrabar);
    //     const configAlert = {
    //         title: "Correcto",
    //         message: "Se grabo correctamente la Gestion",
    //         type: 'success',
    //         callBackFunction: false
    //     };
    //     showAlert(configAlert);
    // }



    // const grabarCompromisosPagosApi = async () => {
    //     const enviagrabar: ICompromisoPagoOutDTO = {
    //         idDeuda: grabarGestion.idDeuda,
    //         fechaCompromiso: grabarCompromiso.fechaCompromiso,
    //         montoComprometido: grabarCompromiso.montoComprometido,
    //         estado: true,
    //         observaciones: observaciones,
    //         formaPagoId: grabarCompromiso.formaPagoId
    //     }
    //     await grabarCompromisoPago(enviagrabar);
    //     const configAlert = {
    //         title: "Correcto",
    //         message: "Se grabo correctamente la Gestion",
    //         type: 'success',
    //         callBackFunction: false
    //     };
    //     showAlert(configAlert);
    // }

    const grabarPagosApi = async () => {
        const enviagrabar: PagoGrabarOutDTO = {
            ...pagosGrabar,
            numeroDocumento: numeroDocumentoPago,
            idDeuda: deudaSeleccionada.idDeuda,
            observaciones: observaciones
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
            <TabsGestionarDeudas></TabsGestionarDeudas>
        </>
    )
}

export default GestionarDeuda