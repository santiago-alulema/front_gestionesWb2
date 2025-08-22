import CustomModalTs from '@/components/CustomModalTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs';
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import ModalEditarGestiones from '@/Pages/EditarGestiones/components/ModalEditarGestiones';
import { ConfiguracionColumnasGestiones } from '@/Pages/EditarGestiones/configurations/ConfiguracionColumnasGestiones';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { GestionDto } from '@/Pages/EditarGestiones/models/GestionDto';
import { eliminarGestionServicioWeb, obtenerGestionesServicioWeb } from '@/Pages/EditarGestiones/services/ServiciosWebEditarGestiones';
import { UseFormGestionesEditar } from '@/Pages/EditarGestiones/UseFormEditarGestiones/UseFormGestionesEditar';
import { showAlert, showAlertConfirm } from '@/utils/modalAlerts';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';

const ListasGestiones = () => {

    const {
        setAbrirModalEditarGestiones,
        abrirModalEditarGestiones,
        setGestionesAEditar,
        gestionesAEditar,
        setgestionSeleccionada } = useEditarGestiones();

    const obtenerTodasLasGestiones = async () => {
        const respuesta = await obtenerGestionesServicioWeb();
        setGestionesAEditar(respuesta);
    }

    useEffect(() => {
        obtenerTodasLasGestiones();
    }, [])

    const seleccionarGestion = (item: GestionDto) => {
        setgestionSeleccionada(item)
        setAbrirModalEditarGestiones(true)
    }

    const eliminarGestion = async (item: GestionDto) => {
        const configAlert = {
            title: "Advertencia",
            message: "¿Desea eliminar la gestion?",
            type: 'warning',
            callBackFunction: false
        };
        const respuesta = await showAlertConfirm(configAlert);
        if (respuesta) {
            await eliminarGestionServicioWeb(item.idGestion);
            const configAlert = {
                title: "Infomacion",
                message: "La gestion se elimino exitosamente!",
                type: 'info',
                callBackFunction: true,
                onCloseFunction: obtenerTodasLasGestiones
            };
            showAlert(configAlert)
        }
    }

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: seleccionarGestion,
            icon: <BorderColorIcon />,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'icon',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        },
        {
            tooltip: "Eliminar",
            onClick: eliminarGestion,
            icon: <DeleteIcon />,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'icon',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    return (
        <>
            <CustomDataGridTs
                rows={gestionesAEditar}
                columns={ConfiguracionColumnasGestiones()}
                gridId="gidChartOfAccounts"
                columsHide={['id']}
                hiddenFilterColumn={['actions']}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel={"Buscar"}
            />
            <CustomModalTs open={abrirModalEditarGestiones} handleClose={() => setAbrirModalEditarGestiones(false)} >
                <ModalEditarGestiones />
            </CustomModalTs>
        </>
    )
}

export default ListasGestiones