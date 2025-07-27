import BasePage from "@/components/BasePage"
import CustomModalTs from "@/components/CustomModalTs"
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs"
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig"
import ClientInfo from "@/model/Dtos/In/ClientInfo"
import { DetalleDeudasClientes } from "@/Pages/componentsClientDebt/DetalleDeudasClientes"
import { useConfigClientDebt } from "@/Pages/ConfigColums/useConfigClientDebt"
import { allDeuodoresServiceWeb } from "@/services/Service"
import { useEffect, useState } from "react"

const ClientDebtPage = () => {
    const [open, setOpen] = useState(false)
    const [clientDebt, setClientDebt] = useState<ClientInfo[]>([]);
    const [clientSelected, setClientSelected] = useState<ClientInfo>(null);
    useEffect(() => {
        onInit();
    }, [])

    const onInit = async () => {
        const response = await allDeuodoresServiceWeb()
        setClientDebt(response)
    }
    const viewDebtsClient = (row: ClientInfo) => {
        setClientSelected(row)
        setOpen(true)
    }
    const actionsConfig: IActionConfig[] = [
        {
            tooltip: "Ver",
            onClick: viewDebtsClient,
            hidden: false,
            sizeIcon: 'small',
            typeInput: 'button',
            label: 'Ver',
            inputSize: 'clamp(20px, 0.264rem + 1.229vw, 1.75rem)'
        }
    ];

    const routes = [
        {
            text: "Deudores"
        }
    ]

    return (
        <>
            <BasePage routers={routes}
                title="Lista de Deudores">
                <CustomDataGridTs
                    rows={clientDebt}
                    columns={useConfigClientDebt()}
                    gridId="gidChartOfAccounts"
                    columsHide={['id']}
                    hiddenFilterColumn={['actions']}
                    actions={actionsConfig}
                    iconDirectionFilter="end"
                    searchLabel={"Buscar"}
                />
            </BasePage>
            <CustomModalTs open={open} positionLeft="23%" width={1060} handleClose={() => setOpen(false)}>
                <DetalleDeudasClientes client={clientSelected} />
            </CustomModalTs>
        </>
    )
}

export default ClientDebtPage