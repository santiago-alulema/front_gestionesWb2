import CustomModalTs from '@/components/CustomModalTs';
import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import GestionarDeuda from '@/Pages/componentsClientDebt/GestionarDeuda';
import { ConfiguracionColumnasCompromisosPago } from '@/Pages/GestionarCompromisosPagos/config/ConfiguracionColumnasCompromisosPago'
import { compromisoPagoServiceWeb } from '@/services/Service';
import React, { useEffect, useState } from 'react'

const CompromisosPagoComponentes = () => {

    const [compromisosPago, setCompromisosPago] = useState<DebstByClientInfoInDTO[]>([]);

    const [debts, setDebts] = useState<DebstByClientInfoInDTO[]>([])
    const [debt, setDebt] = useState<DebstByClientInfoInDTO>()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [open, setOpen] = useState(false)

    const selectDebt = (row: DebstByClientInfoInDTO) => {

        setDebt(row)
        setIsVisible(true)
        setOpen(true)
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

    const cargarCompromisos = async () => {
        const respuesta = await compromisoPagoServiceWeb();
        setCompromisosPago(respuesta);
    }

    useEffect(() => {
        cargarCompromisos()
        setOpen(false)
    }, [isVisible])

    useEffect(() => {
        cargarCompromisos()
    }, [])

    return (
        <>
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
            <CustomModalTs open={open} positionLeft="23%" width={1060} handleClose={() => setOpen(false)}>
                <GestionarDeuda debt={debt} setIsVisible={setIsVisible} />
            </CustomModalTs>
        </>
    )
}

export default CompromisosPagoComponentes