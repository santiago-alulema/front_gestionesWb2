import { useLoading } from "@/components/LoadingContext";
import UploadExcel from "@/components/UploadExcel"
import { subirCampaniaServiceWeb } from "@/Pages/SubirPorPartesCrecos/services/CampaniaCrecosServiceWeb";
import { enviarMensajeWhatsapp } from "@/Pages/WhatsappConfiguracion/services/ServiciosWebWhatsapp";
import { showAlert } from "@/utils/modalAlerts";

const SubirArchivoPartesCrecos = () => {

    const { startLoading, stopLoading } = useLoading();

    const subirPorPartes = async (item: any) => {
        try {
            startLoading();
            await subirCampaniaServiceWeb(item);
            const configAlert = {
                title: "Correcto",
                message: "Se inserto correctamente",
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    }

    return (
        <>
            <UploadExcel
                legend="Subir telefonos en formato Excel"
                requiredColumns={{
                    'codOperacion': 'string',
                    'valorLiquidacion': 'number',
                    'valorLiquidacionParte': 'number',
                }}
                onFileProcessed={subirPorPartes}
                maxFileSize={10}
            />
        </>
    )
}

export default SubirArchivoPartesCrecos