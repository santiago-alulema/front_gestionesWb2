import BasePage from '@/components/BasePage'
import CompromisosPagoComponentes from '@/Pages/GestionarCompromisosPagos/components/CompromisosPagoComponentes'
import { GestionarCompromisoPagoProvider } from '@/Pages/GestionarCompromisosPagos/contexts/GestionarCompromisoPagoContext'

const PrincipalCompromisosPagos = () => {
    const routes = [
        {
            text: "Compromisos"
        }
    ]

    return (
        <BasePage
            routers={routes}
            title="Gestionar Compromisos de Pago"
        >
            <GestionarCompromisoPagoProvider>
                <CompromisosPagoComponentes />
            </GestionarCompromisoPagoProvider>
        </BasePage>
    )
}

export default PrincipalCompromisosPagos