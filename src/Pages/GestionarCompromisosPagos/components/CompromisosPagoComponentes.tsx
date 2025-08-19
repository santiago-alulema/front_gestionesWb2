import CustomModalTs from '@/components/CustomModalTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import GestionarCompromisoPago from '@/Pages/GestionarCompromisosPagos/components/GestionarCompromisoPago';
import TabsGestionarTareas from '@/Pages/GestionarCompromisosPagos/components/TabsGestionarTareas';
import { ConfiguracionColumnasCompromisosPago } from '@/Pages/GestionarCompromisosPagos/config/ConfiguracionColumnasCompromisosPago'
import { useGestionarCompromisoPago } from '@/Pages/GestionarCompromisosPagos/contexts/GestionarCompromisoPagoContext';
import { compromisoPagoServiceWeb } from '@/services/Service';
import { useEffect, useState } from 'react'

const CompromisosPagoComponentes = () => {

    const { setCompromisoPagoSeleccionado,
        cargarCompromisos,
        compromisosPago,
        setAbrirModalGestionarCompromiso,
        abrirModalGestionarCompromiso } = useGestionarCompromisoPago();
    const { deudorSeleccionado, setDeudaSeleccionada } = useGestionarDeudas();

    const selectDebt = (row: DebstByClientInfoInDTO) => {
        setCompromisoPagoSeleccionado(row)
        setDeudaSeleccionada(row)
        setAbrirModalGestionarCompromiso(true)
    }

    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: selectDebt,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'button',
            label: 'Gestionar',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    useEffect(() => {
        cargarCompromisos()
    }, [])

    const [autoRefresh, setAutoRefresh] = useState(true);

    useEffect(() => {
        if (!autoRefresh) return;

        const intervalId = setInterval(() => {
            cargarCompromisos();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [autoRefresh, cargarCompromisos]);


    return (
        <>
            <div className="custom-data-grid-container">
                <CustomDataGridTs
                    rows={compromisosPago}
                    columns={ConfiguracionColumnasCompromisosPago()}
                    gridId="gidChartOfAccounts"
                    columsHide={['id']}
                    hiddenFilterColumn={['actions']}
                    actions={actionsConfig}
                    iconDirectionFilter="end"
                    searchLabel={"Buscar"}
                />
                <CustomModalTs open={abrirModalGestionarCompromiso}
                    positionLeft="23%"
                    width={1060}
                    height={'70%'}
                    handleClose={() => setAbrirModalGestionarCompromiso(false)}>
                    {/* <GestionarCompromisoPago /> */}
                    <TabsGestionarTareas />
                </CustomModalTs>
            </div>

        </>
    )
}

export default CompromisosPagoComponentes