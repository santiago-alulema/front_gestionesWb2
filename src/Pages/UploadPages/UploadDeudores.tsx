import BasePage from '@/components/BasePage';
import UploadExcel from '@/components/UploadExcel'
import { uploadDeudoresServiceWeb } from '@/services/Service';
import { showAlert } from '@/utils/modalAlerts';

const UploadDeudores = () => {

    const handleFileProcessed = async (data: any[]) => {
        await uploadDeudoresServiceWeb(data);
        const configAlert = {
            title: "Correcto",
            message: "Los Deudores se grabaron exitosamente.",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
    };

    const routes = [
        {
            text: "Subir Deudores"
        }
    ]

    return (
        <>
            <BasePage routers={routes}
                title="Subir Excel Deudores">
                <UploadExcel
                    legend="Subir Deudores en formato Excel"
                    requiredColumns={{
                        'Cedula': 'string',
                        'Nombre': 'string',
                        'Direccion?': 'string?',
                        'Telefono?': 'string?',
                        'Correo?': 'string?',
                        'Descripcion?': 'string?',
                        'Usuario': 'string'
                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}
                />
            </BasePage>

        </>
    )
}

export default UploadDeudores