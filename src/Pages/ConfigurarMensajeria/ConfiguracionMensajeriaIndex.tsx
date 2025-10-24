import BasePage from "@/components/BasePage"
import CrudMensajeria from "@/Pages/ConfigurarMensajeria/pages/CrudMensajeria"

const ConfiguracionMensajeriaIndex = () => {
    return (
        <BasePage title="Administracion de mensajeria">
            <CrudMensajeria />
        </BasePage>
    )
}

export default ConfiguracionMensajeriaIndex