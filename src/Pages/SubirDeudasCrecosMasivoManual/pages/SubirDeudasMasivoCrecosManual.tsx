import { useLoading } from "@/components/LoadingContext";
import UploadExcel from "@/components/UploadExcel"
import { listarUsuariosServiceWeb } from "@/Pages/AdministracionUsuario/services/ServiciosWebCrudUsuario"
import { SubirDeudasCrecosManualSW } from "@/Pages/SubirDeudasCrecosMasivoManual/services/SubirDeudasCrecosServiciosWeb";
import { showAlert } from "@/utils/modalAlerts";

const SubirDeudasMasivoCrecosManual = () => {

    const { startLoading, stopLoading } = useLoading();
    const subirDeudasC = async (list: any[]) => {
        try {
            startLoading()
            await SubirDeudasCrecosManualSW(list);
            const configAlert = {
                title: "Correcto",
                message: "Se actualizo correctamente",
                type: 'success',
                callBackFunction: false
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    }
    return (
        <UploadExcel
            legend="Subir deudas de clientes mensual en formato Excel"
            requiredColumns={{
                'idDeudor': 'string',
                'saldoDeuda?': 'number',
                'diasMora?': 'number',
                'tramo?': 'string',
                'ultimoPago?': 'number',
                'empresa?': 'string',
                'calificacion?': 'string',
                'creditos?': 'number',
                'descuento?': 'percent?',
                'fechaUltimoPago?': 'date?',
                'montoCobrar?': 'number',
                'tipoDeDocumento?': 'string',
                'agencia?': 'string',
                'ciudad?': 'string',
                'codigoEmpresa?': 'string',
                'codigoOperacion?': 'string',
                'montoCobrarPartes?': 'number?',
                'montoPonteAlDia?': 'number',
                'gestor?': 'string',
            }}
            onFileProcessed={subirDeudasC}
            maxFileSize={10}
        />
    )
}

export default SubirDeudasMasivoCrecosManual