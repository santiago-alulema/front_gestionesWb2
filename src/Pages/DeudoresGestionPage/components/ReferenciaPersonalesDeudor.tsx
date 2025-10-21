import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import NotFound from "@/components/DataGridCommon/NotFound";
import { useLoading } from "@/components/LoadingContext";
import { ConfigColumnasReferenciasPersonales } from "@/Pages/DeudoresGestionPage/config/ConfigColumnasReferenciasPersonales";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";
import { IReferenciaDeudor } from "@/Pages/DeudoresGestionPage/models/IReferenciasDeudor";
import { refereciasDeudorServicioWeb } from "@/Pages/DeudoresGestionPage/services/GestionDeudaServicios";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const ReferenciaPersonalesDeudor = () => {
    const { startLoading, stopLoading } = useLoading();
    const { deudorSeleccionado } = useGestionarDeudas();
    const [referenciasDeudor, setReferenciaDeudor] = useState<IReferenciaDeudor[]>([]);

    const cargarReferencias = async () => {
        startLoading();
        const respuesta = await refereciasDeudorServicioWeb(deudorSeleccionado.cedula);
        setReferenciaDeudor(respuesta);
        stopLoading();
    }
    useEffect(() => {
        cargarReferencias();
    }, [])

    return (
        <>
            {
                !!referenciasDeudor ? (<CustomDataGridTs
                    gridId="referenciasDeudor"
                    columns={ConfigColumnasReferenciasPersonales()}
                    rows={referenciasDeudor}
                    searchLabel='Buscar'
                />) : (
                    <Box sx={{ height: '100%' }}>
                        <NotFound hiddenButton={true} title="NO EXISTEN DATOS" text="NO EXISTEN REFERECIAS PARA EL DEUDOR" />
                    </Box>
                )
            }

        </>
    )
}

export default ReferenciaPersonalesDeudor