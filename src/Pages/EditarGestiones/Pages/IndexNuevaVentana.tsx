import { EditarGestionesProvider } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext'
import NuevaVentanaGestionarDeuda from '@/Pages/EditarGestiones/Pages/NuevaVentanaGestionarDeuda'
import React from 'react'

const IndexNuevaVentana = () => {
    return (
        <EditarGestionesProvider>
            <NuevaVentanaGestionarDeuda />
        </EditarGestionesProvider>

    )
}

export default IndexNuevaVentana