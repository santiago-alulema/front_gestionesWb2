import BasePage from '@/components/BasePage'
import HistorialGestionesPorCliente from '@/Pages/HistorialGestionesCliente/pages/HistorialGestionesPorCliente'
import React from 'react'

const HistorialGestionesClienteIndex = () => {
    return (
        <BasePage title='Historial de gestiones por cliente'>
            <HistorialGestionesPorCliente />
        </BasePage>
    )
}

export default HistorialGestionesClienteIndex