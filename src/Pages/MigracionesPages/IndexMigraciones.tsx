import BasePage from '@/components/BasePage'
import { useLoading } from '@/components/LoadingContext';
import UploadExcel from '@/components/UploadExcel'
import { migracionesComprimosGestiones } from '@/Pages/MigracionesPages/services/ServiciosMigraciones';
import { showAlert } from '@/utils/modalAlerts';

const IndexMigraciones = () => {
    const { startLoading, stopLoading } = useLoading();

    const handleFileProcessed = async (data: any[]) => {
        startLoading();
        try {
            await migracionesComprimosGestiones(data);
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
            text: "Migrar Compromisos-Gestiones"
        }
    ]
    return (
        <>
            <BasePage routers={routes}
                title="Subir excel deudas clientes">
                <UploadExcel
                    legend="Subir migraciones Compromisos-Gestiones formato Excel"
                    requiredColumns={{
                        'user_name': 'string',
                        'malla?': 'string',
                        'cedula': 'string',
                        'nombre': 'string',
                        'ciudad': 'string',
                        'agencia': 'string',
                        'direccion?': 'string',
                        'operacion_cxc?': 'string',
                        'creditos?': 'number',
                        'sueldo?': 'number',
                        'dias_en_mora?': 'number',
                        'dias_en_mora_actual?': 'number',
                        'tramo': 'string',
                        'valor_vencido?': 'number',
                        'interes_gastos_de_cobranza?': 'number',
                        'deuda_total?': 'number',
                        'descuento?': 'string',                // si viene como texto/%, cámbialo a 'string'
                        'monto_a_cobrar?': 'number',
                        'valor_cuota?': 'number',
                        'cuotas_convenio?': 'number',
                        'cestadotarjeta?': 'string',
                        'cestadooperacion?': 'string',
                        'calificacion?': 'string',
                        'pagos_vencidos?': 'number',
                        'pago_minimo?': 'number',
                        'valor_vencido_actual?': 'number',
                        'capital_provision?': 'number',
                        'cupo_utilizado?': 'string',
                        'cupo_utilizado_actual?': 'string',
                        'int_rec?': 'string',
                        'producto?': 'string',
                        'fecha_tope_pago?': 'string',          // ISO o dd/MM/yyyy según tu parser
                        'fecha_ultimo_pago?': 'string',
                        'condonacion_castigada?': 'string',
                        'condonacion_vencida?': 'string',
                        'cao?': 'string',
                        'credito?': 'string',
                        'coactivas?': 'string',
                        'ULTIMA-GESTION:?': 'string',          // clave con guion y dos puntos → siempre entre comillas
                        'usuario?': 'string',
                        'resulted?': 'string',
                        'typeresulted?': 'string',
                        'responsed?': 'string',
                        'typecodephone?': 'string',
                        'codephone?': 'string',
                        'phone?': 'string',
                        'email?': 'string',
                        'comment?': 'string',
                        'created?': 'string',
                        'compromiso?': 'string',
                        'monto?': 'number',
                        'fecha?': 'string'
                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}
                />
            </BasePage>
        </>
    )
}

export default IndexMigraciones