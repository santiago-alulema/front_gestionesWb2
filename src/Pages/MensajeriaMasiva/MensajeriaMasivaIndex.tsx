import BasePage from "@/components/BasePage"
import EnviarMensajeriaMasiva from "@/Pages/MensajeriaMasiva/pages/EnviarMensajeriaMasiva"

const MensajeriaMasivaIndex = () => {
    const routes = [{
        text: "mensajeria masiva"
    }]
    return (
        <BasePage title="Mensajeria masiva" routers={routes}>
            <EnviarMensajeriaMasiva />
        </BasePage>
    )
}

export default MensajeriaMasivaIndex