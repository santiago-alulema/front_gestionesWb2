import BasePage from '@/components/BasePage'
import ReporteGeneralGestiones from '@/Pages/InformacionGeneralGestiones/components/ReporteGeneralGestiones'

const InformacionGeneralGestionesIndex = () => {
    const routes = [
        {
            text: "Compromisos"
        }
    ]

    return (
        <BasePage
            routers={routes}
            title="Reporte general de gestiones"
        >
            <ReporteGeneralGestiones />
        </BasePage>
    )
}

export default InformacionGeneralGestionesIndex