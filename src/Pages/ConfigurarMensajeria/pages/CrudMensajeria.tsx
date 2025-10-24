import { MensajesWhatsappProvider } from '@/Pages/ConfigurarMensajeria/Contexts/MensajesWhatsappContext'
import CrudMensajesWhatsappComponent from '@/Pages/ConfigurarMensajeria/pages/CrudMensajesWhatsappComponent'

const CrudMensajeria = () => {
    return (
        <MensajesWhatsappProvider>
            <CrudMensajesWhatsappComponent />
        </MensajesWhatsappProvider>
    )
}

export default CrudMensajeria