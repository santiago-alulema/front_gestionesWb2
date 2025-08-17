import BasePage from "@/components/BasePage";
import Deudores from "@/Pages/DeudoresGestionPage/components/Deudores";
import { useNavigate } from "react-router";

const Index = () => {
    const navigate = useNavigate();

    const routes = [
        {
            text: "Deudores",
            link: () => { navigate("/") },
            function: () => { navigate("/") }
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