import { useLoading } from "@/components/LoadingContext"
import { descargarInconsistenciasCrecos } from "@/Pages/DescargarReporteInconsistenciasCrecos/services/DescargarInconsistenciasCrecosServiciosWeb"
import { Button } from "@mui/material"

const DescargarReporteInconsistenciasCrecos = () => {
    const { startLoading, stopLoading } = useLoading();
    const descargarArchivoCrecosInconsistencias = async () => {
        try {
            startLoading();
            await descargarInconsistenciasCrecos()
        } finally {
            stopLoading();
        }
    }

    return (
        <>
            <Button variant="contained" fullWidth onClick={descargarArchivoCrecosInconsistencias}>DESCARGAR REPORTE INCONSISTENCIAS</Button>
        </>
    )
}

export default DescargarReporteInconsistenciasCrecos