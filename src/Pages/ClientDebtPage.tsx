import BasePage from "@/components/BasePage"
import CustomModalTs from "@/components/CustomModalTs"
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs"
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig"
import { useLoading } from "@/components/LoadingContext"
import { ClientesInfoPaginacion } from "@/model/Dtos/In/ClientesInfoPaginacion"
import ClientInfo from "@/model/Dtos/In/ClientInfo"
import { DetalleDeudasClientes } from "@/Pages/componentsClientDebt/DetalleDeudasClientes"
import { useConfigClientDebt } from "@/Pages/ConfigColums/useConfigClientDebt"
import { allDeuodoresServiceWeb } from "@/services/Service"
import { useEffect, useState } from "react"

const ClientDebtPage = () => {
    const [open, setOpen] = useState(false)
    const [clientDebt, setClientDebt] = useState<ClientInfo[]>([]);
    const [clientSelected, setClientSelected] = useState<ClientInfo>(null);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        onInit();
    }, [])

    const onInit = async () => {
        startLoading();
        const response = await allDeuodoresServiceWeb("TODOS", "")
        setClientDebt(response)
        stopLoading();
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
                <div className="custom-data-grid-container">
                    {/* <CustomDataGridTs
                        rows={clientDebt.items}
                        columns={useConfigClientDebt()}
                        gridId="gidChartOfAccounts"
                        columsHide={['id']}
                        hiddenFilterColumn={['actions']}
                        actions={actionsConfig}
                        iconDirectionFilter="end"
                        searchLabel={"Buscar"}
                        pagination={{
                            totalItems: clientDebt.totalItems,
                            pageNumber: clientDebt.pageNumber,
                            pageSize: clientDebt.pageSize,
                        }}
                        onPaginationChange={(pageNumber, pageSize) => {
                            // aquí llamas a tu API: ?page=pageNumber&cantidadItem=pageSize
                            // fetchData(pageNumber, pageSize);
                        }}
                    /> */}
                </div>
            </BasePage>
            <CustomModalTs open={open} positionLeft="23%" width={1060} handleClose={() => setOpen(false)}>
                <DetalleDeudasClientes client={clientSelected} />
            </CustomModalTs>
        </>
    )
}

export default ClientDebtPage