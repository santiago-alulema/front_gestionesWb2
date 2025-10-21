import CustomModalTs from '@/components/CustomModalTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs';
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import ModalEditarPagos from '@/Pages/EditarGestiones/components/ModalEditarPagos';
import { ConfiguraracionColumnasPagos } from '@/Pages/EditarGestiones/configurations/ConfiguraracionColumnasPagos';
import { useEditarGestiones } from '@/Pages/EditarGestiones/contexts/EditarGestionesContext';
import { PagoDto } from '@/Pages/EditarGestiones/models/PagoDto';
import { eliminarPagoServicioWeb, obtenerPagosServicioWeb } from '@/Pages/EditarGestiones/services/ServiciosWebEditarGestiones';
import { showAlert, showAlertConfirm } from '@/utils/modalAlerts';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import VizualizarImagen from '@/components/VizualizarImagen';
import { useLoading } from '@/components/LoadingContext';

const ListarPagos = () => {
    const { setAbrirModalEditarPagos,
        abrirModalEditarPagos,
        setPagosSeleccionadoEditar,
        pagosAEditar,
        obtenerPagosAEditar } = useEditarGestiones();
    const [urlImagen, setUrlImagen] = useState<string>("");

    const seleccionarPago = (item: PagoDto) => {
        setPagosSeleccionadoEditar(item);
        setAbrirModalEditarPagos(true)
    }

    useEffect(() => {
        obtenerPagosAEditar()
    }, [])

    const eliminarGestion = async (item: PagoDto) => {
        const configAlert = {
            title: "Advertencia",
            message: "¿Desea eliminar el <strong>PAGO</strong>?",
            type: 'warning',
            callBackFunction: false
        };
        const respuesta = await showAlertConfirm(configAlert);
        if (respuesta) {
            await eliminarPagoServicioWeb(item.idPago);
            const configAlert = {
                title: "Infomacion",
                message: "El <strong>PAGO</strong> se elimino exitosamente!",
                type: 'info',
                callBackFunction: true,
                onCloseFunction: obtenerPagosAEditar
            };
            showAlert(configAlert)
        }
    }

    const verImagen = (item: PagoDto) => {
        if (!item.imagenUrl) {
            const configAlert = {
                title: "Error",
                message: "El <strong>PAGO</strong> no tiene imagen",
                type: 'warning',
                callBackFunction: false,
            };
            showAlert(configAlert)
            return;
        }
        setUrlImagen(item.imagenUrl)
    }
    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: seleccionarPago,
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
        },
        {
            tooltip: "Ver Imagen",
            label: "ss",
            onClick: verImagen,
            icon: <ImageSearchIcon />,
            sizeIcon: 'small',
            typeInput: 'icon',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    return (
        <>
            <CustomDataGridTs
                rows={pagosAEditar}
                columns={ConfiguraracionColumnasPagos()}
                gridId="gidChartOfAccounts"
                columsHide={['id']}
                hiddenFilterColumn={['actions']}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel={"Buscar"}
            />
            <CustomModalTs open={abrirModalEditarPagos} handleClose={() => setAbrirModalEditarPagos(false)} >
                <ModalEditarPagos />
            </CustomModalTs>
            <VizualizarImagen previewUrl={urlImagen} onClose={() => setUrlImagen("")} />
        </>
    )
}

export default ListarPagos