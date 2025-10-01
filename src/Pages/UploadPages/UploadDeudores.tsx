import BasePage from '@/components/BasePage';
import { LoadingContext, useLoading } from '@/components/LoadingContext';
import UploadExcel from '@/components/UploadExcel'
import { uploadDeudoresServiceWeb } from '@/services/Service';
import { showAlert } from '@/utils/modalAlerts';
import { useContext } from 'react';

const UploadDeudores = () => {
    const { startLoading, stopLoading } = useLoading();

    const handleFileProcessed = async (data: any[]) => {
        startLoading();
        try {
            await uploadDeudoresServiceWeb(data);
            const configAlert = {
                title: "Correcto",
                message: "Los Deudores se grabaron exitosamente.",
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
        } catch (error) {
            const configAlert = {
                title: "Error",
                message: "Ocurrió un error al grabar los Deudores.",
                type: 'error',
                callBackFunction: false
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
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
                        'Descripcion?': 'string?'
                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}
                />
            </BasePage>

        </>
    )
}

export default UploadDeudores