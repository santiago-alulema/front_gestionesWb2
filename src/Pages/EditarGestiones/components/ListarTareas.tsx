import CustomModalTs from '@/components/CustomModalTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs';
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import ModalEditarTareas from '@/Pages/EditarGestiones/components/ModalEditarTareas';
import { ConfiguracionColumnasTareas } from '@/Pages/EditarGestiones/configurations/ConfiguracionColumnasTareas';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { TareaDto } from '@/Pages/EditarGestiones/models/TareaDto';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';

const ListarTareas = () => {

    const {
        obtenerTareasAEditar,
        tareasAEditar, setTareaSeleccionada, setAbrirModalEditarTareas, abrirModalEditarTareas } = useEditarGestiones();

    const editarTarea = (item: TareaDto) => {
        setTareaSeleccionada(item);
        setAbrirModalEditarTareas(true)
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
            onClick: () => { },
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