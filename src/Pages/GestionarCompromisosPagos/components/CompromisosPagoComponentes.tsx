import CustomModalTs from '@/components/CustomModalTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import GestionarCompromisoPago from '@/Pages/GestionarCompromisosPagos/components/GestionarCompromisoPago';
import { ConfiguracionColumnasCompromisosPago } from '@/Pages/GestionarCompromisosPagos/config/ConfiguracionColumnasCompromisosPago'
import { useGestionarCompromisoPago } from '@/Pages/GestionarCompromisosPagos/contexts/GestionarCompromisoPagoContext';
import { compromisoPagoServiceWeb } from '@/services/Service';
import { useEffect } from 'react'

const CompromisosPagoComponentes = () => {

    const { setCompromisoPagoSeleccionado,
        cargarCompromisos,
        compromisosPago,
        setAbrirModalGestionarCompromiso,
        abrirModalGestionarCompromiso } = useGestionarCompromisoPago();


    const selectDebt = (row: DebstByClientInfoInDTO) => {
        setCompromisoPagoSeleccionado(row)
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
                    handleClose={() => setAbrirModalGestionarCompromiso(false)}>
                    <GestionarCompromisoPago />
                </CustomModalTs>
            </div>

        </>
    )
}

export default CompromisosPagoComponentes