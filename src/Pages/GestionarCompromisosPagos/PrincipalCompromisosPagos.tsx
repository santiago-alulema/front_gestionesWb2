import BasePage from '@/components/BasePage'
import CompromisosPagoComponentes from '@/Pages/GestionarCompromisosPagos/components/CompromisosPagoComponentes'
import React from 'react'

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
            <CompromisosPagoComponentes />
        </BasePage>
    )
}

export default PrincipalCompromisosPagos