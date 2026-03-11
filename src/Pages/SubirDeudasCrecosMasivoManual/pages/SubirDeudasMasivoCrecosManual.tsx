import UploadExcel from "@/components/UploadExcel"
import { listarUsuariosServiceWeb } from "@/Pages/AdministracionUsuario/services/ServiciosWebCrudUsuario"
import { SubirDeudasCrecosManualSW } from "@/Pages/SubirDeudasCrecosMasivoManual/services/SubirDeudasCrecosServiciosWeb";

const SubirDeudasMasivoCrecosManual = () => {

    const subirDeudasC = async (list: any[]) => {
        await SubirDeudasCrecosManualSW(list);
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