import BasePage from "@/components/BasePage";
import { useLoading } from "@/components/LoadingContext";
import UploadExcel from "@/components/UploadExcel"
import { uploadDeudasServiceWeb } from "@/services/Service";
import { showAlert } from "@/utils/modalAlerts";

const UploadDeudasPage = () => {

    const { startLoading, stopLoading } = useLoading();

    const handleFileProcessed = async (data: any[]) => {
        startLoading();
        try {
            await uploadDeudasServiceWeb(data);
            const configAlert = {
                title: "Correcto",
                message: "Todas las deudas se grabaron exitosamente.",
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    }

    const routes = [
        {
            text: "Subir Deudas"
        }
    ]

    return (
        <>
            <BasePage routers={routes}
                title="Subir excel deudas clientes">
                <UploadExcel
                    legend="Subir deudas de clientes mensual en formato Excel"
                    requiredColumns={{
                        'cedulaDeudor': 'string',
                        'deudaCapital?': 'number',
                        'interes?': 'number',
                        'gastosCobranza?': 'number',
                        'saldoDeuda': 'number',
                        'descuento': 'string',
                        'montoCobrar': 'number',
                        'fechaVenta': 'string',
                        'fechaUltimoPago?': 'string',
                        'estado?': 'string',
                        'diasMora?': 'number',
                        'numeroFactura?': 'string',
                        'calificacion?': 'string',
                        'creditos?': 'number',
                        'numeroCuotas?': 'number',
                        'tipoDeDocumento?': 'string',
                        'valorCuota?': 'number',
                        'tramo': 'string',
                        'ultimoPago?': 'number',
                        'empresa': 'string',
                        'productoDescripcion': 'string',
                        'agencia': 'string',
                        'ciudad': 'string'
                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}
                />
            </BasePage>

        </>
    )
}

export default UploadDeudasPage