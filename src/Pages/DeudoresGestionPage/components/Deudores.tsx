import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs'
import { IActionConfig } from '@/components/DataGridCommon/IActionConfig';
import ClientInfo from '@/model/Dtos/In/ClientInfo';
import { ConfigurarColumnaDeudores } from '@/Pages/DeudoresGestionPage/config/ConfigurarColumnaDeudores';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { allDeuodoresServiceWeb } from '@/services/Service';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Deudores = () => {
    const [clientDebt, setClientDebt] = useState<ClientInfo[]>([]);
    const { setDeudorSeleccionado } = useGestionarDeudas();
    const navigate = useNavigate();


    useEffect(() => {
        onInit();
    }, [])

    const onInit = async () => {
        const response = await allDeuodoresServiceWeb()
        setClientDebt(response)
    }
    const viewDebtsClient = (row: ClientInfo) => {
        console.log(row)
        setDeudorSeleccionado(row)
        navigate("/gestion/dudas-por-clientes");
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
    return (
        <>
            <CustomDataGridTs
                rows={clientDebt}
                columns={ConfigurarColumnaDeudores()}
                gridId="gidChartOfAccounts"
                columsHide={['id']}
                hiddenFilterColumn={['actions']}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel={"Buscar"}
            />
        </>
    )
}

export default Deudores