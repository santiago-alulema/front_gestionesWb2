import CustomModalTs from '@/components/CustomModalTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs';
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import ModalEditarTareas from '@/Pages/EditarGestiones/components/ModalEditarTareas';
import { ConfiguracionColumnasTareas } from '@/Pages/EditarGestiones/configurations/ConfiguracionColumnasTareas';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { TareaDto } from '@/Pages/EditarGestiones/models/TareaDto';
import { eliminarTareaServicioWeb } from '@/Pages/EditarGestiones/services/ServiciosWebEditarGestiones';
import { compromisoPagoServiceWeb } from '@/services/Service';
import { showAlert, showAlertConfirm } from '@/utils/modalAlerts';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';

const ListarTareas = () => {

    const {
        obtenerTareasAEditar,
        tareasAEditar, setTareaSeleccionada, setAbrirModalEditarTareas, abrirModalEditarTareas } = useEditarGestiones();
    const {
        setTareasPendientes
    } = useGestionarDeudas();

    const editarTarea = (item: TareaDto) => {
        setTareaSeleccionada(item);
        setAbrirModalEditarTareas(true)
    }

    const eliminarTarea = async (item: TareaDto) => {
        const configAlert = {
            title: "Advertencia",
            message: "¿Desea eliminar la <strong>TAREA</strong>?",
            type: 'warning',
            callBackFunction: false
        };
        const respuesta = await showAlertConfirm(configAlert);
        if (respuesta) {
            await eliminarTareaServicioWeb(item.idCompromiso);
            buscarTareasPendientes();
            const configAlert = {
                title: "Infomacion",
                message: "El <strong>PAGO</strong> se elimino exitosamente!",
                type: 'info',
                callBackFunction: true,
                onCloseFunction: obtenerTareasAEditar
            };
            showAlert(configAlert)
        }
    }

    const buscarTareasPendientes = async () => {
        const respuesta = await compromisoPagoServiceWeb(true)
        setTareasPendientes(respuesta)
    }


    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: editarTarea,
            icon: <BorderColorIcon />,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'icon',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        },
        {
            tooltip: "Eliminar",
            onClick: eliminarTarea,
            icon: <DeleteIcon />,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'icon',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    useEffect(() => {
        obtenerTareasAEditar();
    }, [])

    return (
        <>
            <CustomDataGridTs
                rows={tareasAEditar}
                columns={ConfiguracionColumnasTareas()}
                gridId="gidChartOfAccounts"
                columsHide={['id']}
                hiddenFilterColumn={['actions']}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel={"Buscar"}
            />
            <CustomModalTs open={abrirModalEditarTareas} handleClose={() => setAbrirModalEditarTareas(false)} >
                <ModalEditarTareas />
            </CustomModalTs>
        </>
    )
}

export default ListarTareas