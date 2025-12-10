import CustomAutocompleteTs from "@/components/DataGridCommon/CustomAutocompleteTs";
import { useLoading } from "@/components/LoadingContext";
import { NombreArchivosCrecos } from "@/Pages/DescargarArchivosTrifocus/models/NombreArchivosCrecos";
import { descargarArchivosTrifocus, nombresArchivosCrecos } from "@/Pages/DescargarArchivosTrifocus/Services/ArchivosTrifocusServiciosWeb";
import { Button, Grid } from "@mui/material"
import { useEffect, useState } from "react";

const DescargarArchivosTrifocus = () => {
    const { startLoading, stopLoading } = useLoading();
    const [nombreArchivo, setNombrearchivo] = useState<string>("")
    const [nombresArchivoCrecos, setNombresArchivoCrecos] = useState<NombreArchivosCrecos[]>([])
    const descargarArchivos = async () => {
        try {
            startLoading();
            await descargarArchivosTrifocus(nombreArchivo);
        } finally {
            stopLoading();
        }
    }

    const obtenerNombres = async () => {
        try {
            startLoading();
            const respuesta = await nombresArchivosCrecos();
            setNombresArchivoCrecos(respuesta)
        } finally {
            stopLoading();
        }

    }

    useEffect(() => {
        obtenerNombres()
    }, [])


    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ lg: 12 }}>
                    <CustomAutocompleteTs options={nombresArchivoCrecos}
                        label="Seleccionar Archivos"
                        labelFullField="Archivo"
                        handleChange={(e, value: any) => setNombrearchivo(value.id)} />
                </Grid>
                <Grid size={{ lg: 12 }}>
                    <Button fullWidth
                        variant="contained"
                        sx={{ borderRadius: 5 }}
                        onClick={descargarArchivos}
                    >DESCARGAR ARCHVOS TRIFOCUS</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default DescargarArchivosTrifocus