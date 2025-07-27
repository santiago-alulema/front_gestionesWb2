import BasePage from "@/components/BasePage";
import UploadExcel from "@/components/UploadExcel"
import { uploadDeudasServiceWeb } from "@/services/Service";
import { showAlert } from "@/utils/modalAlerts";

const UploadDeudasPage = () => {

    const handleFileProcessed = async (data: any[]) => {
        await uploadDeudasServiceWeb(data);
        const configAlert = {
            title: "Correcto",
            message: "Todas las deudas se grabaron exitosamente.",
            type: 'success',
            callBackFunction: false
        };
        showAlert(configAlert);
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
                        'CedulaDeudor': 'string',
                        'MontoOriginal': 'number',
                        'SaldoActual': 'number',
                        'FechaVencimiento': 'string',
                        'FechaAsignacion': 'string',
                        'Estado': 'string',
                        'Descripcion': 'string',

                        'NumeroFactura': 'string',
                        'TotalFactura': 'string',
                        'NumeroAutorizacion': 'string',


                        'SaldoDeuda': 'number',
                        'NumeroCuotas': 'number',
                        'CuotaActual': 'number',
                        'ValorCuota': 'number',
                        'Tramo': 'string',
                        'UltimoPago': 'number',
                        'Empresa': 'string',

                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}
                />
            </BasePage>

        </>
    )
}

export default UploadDeudasPage