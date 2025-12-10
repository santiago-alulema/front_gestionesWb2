import { useLoading } from "@/components/LoadingContext"
import { descargarCarteraAsignadaCrecos } from "@/Pages/ReporteCarteraAsignadaCrecos/services/CarteraAsigandaCrecosServicioWeb"
import { Button } from "@mui/material"

const ReporteCarteraCrecosasignada = () => {
    const { startLoading, stopLoading } = useLoading();
    const descargar = async () => {
        try {
            startLoading();
            await descargarCarteraAsignadaCrecos()
        } finally {
            stopLoading();
        }
    }

    return (
        <Button sx={{ borderRadius: 5 }}
            variant="contained"
            fullWidth
            onClick={descargar} > Descargar Reporte</Button>
    )
}

export default ReporteCarteraCrecosasignada