import BasePage from "@/components/BasePage"
import DeudasSubidasReporteComponent from "@/Pages/Reportes/components/DeudasSubidasReporteComponent"

const ReporteDeudasSubidas = () => {
    const routes = [
        {
            text: "Reportes Deudas"
        }
    ]
    return (
        <BasePage
            routers={routes}
            title="Reportes de Deudas Subidas"
        >
            <DeudasSubidasReporteComponent />
        </BasePage>
    )
}

export default ReporteDeudasSubidas