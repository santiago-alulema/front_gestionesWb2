import BasePage from '@/components/BasePage'
import TabMantenimientoGestiones from '@/Pages/EditarGestiones/Pages/TabMantenimientoGestiones'
import React from 'react'

const EditarGestionesIndex = () => {
    return (
        <>
            <BasePage title='Administrar Gestiones'>
                <TabMantenimientoGestiones />
            </BasePage>
        </>
    )
}

export default EditarGestionesIndex