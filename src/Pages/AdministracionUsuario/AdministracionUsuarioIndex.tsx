import BasePage from '@/components/BasePage'
import CrudUsuarios from '@/Pages/AdministracionUsuario/pages/CrudUsuarios'

const AdministracionUsuarioIndex = () => {
    return (
        <BasePage title='Administracion de usuarios'>
            <CrudUsuarios />
        </BasePage>
    )
}

export default AdministracionUsuarioIndex