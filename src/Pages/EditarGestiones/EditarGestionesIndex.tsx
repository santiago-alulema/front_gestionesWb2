import BasePage from '@/components/BasePage'
import { EditarGestionesProvider } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext'
import TabMantenimientoGestiones from '@/Pages/EditarGestiones/Pages/TabMantenimientoGestiones'

const EditarGestionesIndex = () => {
    return (
        <>
            <EditarGestionesProvider>
                <BasePage title='Administrar Gestiones'>
                    <TabMantenimientoGestiones />
                </BasePage>
            </EditarGestionesProvider>
        </>
    )
}

export default EditarGestionesIndex