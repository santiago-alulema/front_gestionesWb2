import BasePage from "@/components/BasePage";
import UploadExcel from "@/components/UploadExcel";
import { uploadTelefonosDeudoresServiceWeb } from "@/services/Service";
import { showAlert } from "@/utils/modalAlerts";

const UploadPhonesPage = () => {

    const handleFileProcessed = async (data: any[]) => {
        await uploadTelefonosDeudoresServiceWeb(data);
        const configAlert = {
            title: "Correcto",
            message: "Los telefonos se grabaron exitosamente.",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
    };

    const routes = [
        {
            text: "Subir telefonos deudores"
        }
    ]

    return (
        <>
            <BasePage routers={routes}
                title="Subir Excel Deudores">
                <UploadExcel
                    legend="Subir telefonos en formato Excel"
                    requiredColumns={{ 'cedula': 'string', 'telefono': 'string', 'valido': 'boolean', 'origen': 'string' }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}
                />
            </BasePage>

        </>
    )
}

export default UploadPhonesPage