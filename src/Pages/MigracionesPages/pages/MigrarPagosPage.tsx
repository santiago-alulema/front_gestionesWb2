import BasePage from "@/components/BasePage"
import { useLoading } from "@/components/LoadingContext";
import UploadExcel from "@/components/UploadExcel";
import { migracionesPagos } from "@/Pages/MigracionesPages/services/ServiciosMigraciones";
import { showAlert } from "@/utils/modalAlerts";

const MigrarPagosPage = () => {
    const { startLoading, stopLoading } = useLoading();

    const handleFileProcessed = async (data: any[]) => {
        startLoading();
        try {
            await migracionesPagos(data);
            const configAlert = {
                title: "Correcto",
                message: "Todas las migraciones se grabaron exitosamente.",
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
            text: "Migraciones Pagos"
        }
    ]

    return (
        <>
            <BasePage routers={routes}
                title="Subir excel deudas clientes">
                <UploadExcel
                    legend="Subir migraciones pagos formato Excel"
                    requiredColumns={{
                        'usuario': 'string',
                        'cedente?': 'string',
                        'archivo?': 'string',
                        'calificacion?': 'string',
                        'malla?': 'string',
                        'tramo?': 'string',
                        'cxc?': 'string',
                        'nombreDeudor?': 'string',
                        'cedulaDeudor?': 'string',
                        'fecha_Pago?': 'date',
                        'monto?': 'number',
                        'nroControl?': 'string',
                        'nro_Documento?': 'string',
                        'banco?': 'string',
                        'abonoLiquidacion?': 'string',
                        'verificado?': 'boolean'
                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}
                />
            </BasePage>
        </>
    )
}

export default MigrarPagosPage