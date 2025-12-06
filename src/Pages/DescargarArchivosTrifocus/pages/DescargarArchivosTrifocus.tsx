import { useLoading } from "@/components/LoadingContext";
import { descargarArchivosTrifocus } from "@/Pages/DescargarArchivosTrifocus/Services/ArchivosTrifocusServiciosWeb";
import { Button } from "@mui/material"

const DescargarArchivosTrifocus = () => {
    const { startLoading, stopLoading } = useLoading();
    const descargarArchivos = async () => {
        try {
            startLoading();
            await descargarArchivosTrifocus();
        } finally {
            stopLoading();
        }
    }
    return (
        <>
            <Button fullWidth
                variant="contained"
                sx={{ borderRadius: 5 }}
                onClick={descargarArchivos}
            >DESCARGAR ARCHVOS TRIFOCUS</Button>
        </>
    )
}

export default DescargarArchivosTrifocus