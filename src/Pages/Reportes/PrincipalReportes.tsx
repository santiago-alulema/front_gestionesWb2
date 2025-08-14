import BasePage from '@/components/BasePage'
import ConsultaReportesVisual from '@/Pages/Reportes/components/ConsultaReportes'

const PrincipalReportes = () => {

    const routes = [
        {
            text: "Deudores"
        }
    ]
    return (
        <BasePage
            routers={routes}
            title="Lista de Deudores"
        >
            {/* <ConsultaReportesVisual /> */}
        </BasePage>
    )
}

export default PrincipalReportes