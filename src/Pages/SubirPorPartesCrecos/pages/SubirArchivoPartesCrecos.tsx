import { useLoading } from "@/components/LoadingContext";
import UploadExcel from "@/components/UploadExcel"
import { actualizarDeudasCampaniasServicioWeb, subirCampaniaServiceWeb } from "@/Pages/SubirPorPartesCrecos/services/CampaniaCrecosServiceWeb";
import { showAlert, showAlertConfirm } from "@/utils/modalAlerts";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";

const SubirArchivoPartesCrecos = () => {
    const [eliminarAnteriores, setEliminarAnteriores] = useState<boolean>(false);
    const { startLoading, stopLoading } = useLoading();

    const subirPorPartes = async (item: any) => {
        try {
            const mensajeAlerta = eliminarAnteriores ? "Se eliminara los anteriores y se agregaran los nuevos" : "Se agregaran nuevos registros"
            const respuesta = await showAlertConfirm(retornarAlerta("Advertencia", `<strong>${mensajeAlerta}</strong> ¿Desea continuar?`, "warning"))
            if (respuesta) {
                startLoading();
                await subirCampaniaServiceWeb(item, eliminarAnteriores);
                showAlert(retornarAlerta("Correcto", "Se insertó correctamente", "success"));
            }
        } finally {
            stopLoading();
        }
    }

    const retornarAlerta = (titulo: string, mensaje: string, type: string) => {
        const configAlert = {
            title: titulo,
            message: mensaje,
            type: type,
            callBackFunction: false
        };
        return configAlert;
    };

    const enlazarDeudasCampaniaCrecos = async () => {
        const respuesta = await showAlertConfirm(retornarAlerta("Advertencia", "¿Desea actualizar las deduas Crecos con Campañia?", "warning"))
        if (respuesta) {
            startLoading();
            await actualizarDeudasCampaniasServicioWeb();
            stopLoading();
            showAlert(retornarAlerta("Correcto", "Se actualizo correctamente", "success"));
        }
    }

    return (
        <>
            <Grid container spacing={2} mb={3}>
                <Grid size={{ lg: 6 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="eliminarCampanias"
                                color="primary"
                                size="large"
                                onChange={(e) => setEliminarAnteriores(prev => !prev)}
                            />
                        }
                        label={
                            <span style={{ fontSize: "1.1rem", textDecoration: "underline" }}>
                                ¿Desea eliminar todas las campañas anteriores?
                            </span>
                        }
                    />
                </Grid>
                <Grid size={{ lg: 6 }}>
                    <Button fullWidth
                        variant="contained"
                        onClick={enlazarDeudasCampaniaCrecos}>Enlazar con Deudas de CRECOS</Button>
                </Grid>
            </Grid>
            <UploadExcel
                legend="Subir telefonos en formato Excel"
                requiredColumns={{
                    'codOperacion': 'string',
                    'valorLiquidacion': 'number',
                    'valorLiquidacionParte': 'number',
                    'valorPonteAlDia': 'number',
                }}
                onFileProcessed={subirPorPartes}
                maxFileSize={10}
            />
        </>
    )
}

export default SubirArchivoPartesCrecos