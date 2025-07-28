import BasePage from "@/components/BasePage";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import ClientInfo from "@/model/Dtos/In/ClientInfo";
import Deudores from "@/Pages/DeudoresGestionPage/components/Deudores";
import { ConfigurarColumnaDeudores } from "@/Pages/DeudoresGestionPage/config/ConfigurarColumnaDeudores";
import { allDeuodoresServiceWeb } from "@/services/Service";
import { useEffect, useState } from "react";

const Index = () => {

    const routes = [
        {
            text: "Deudores"
        }
    ]

    return (
        <BasePage routers={routes}
            title="Lista de Deudores">
            <Deudores />
        </BasePage>
    )
}

export default Index