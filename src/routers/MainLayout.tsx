import { useEffect, useState } from "react";
import { useLogin } from "@/context/LoginContext";
import Sidebar from "@/components/Sidebar";
import AppRoutes from "./AppRoutes";
import Navbar from "@/components/Navbar";
import { Alert, Button, Stack } from "@mui/material";
import { compromisoPagoServiceWeb } from "@/services/Service";
import DebstByClientInfoInDTO from '@/model/Dtos/In/DeudasInDTO';
import { useNavigate } from "react-router";
import { useGestionarDeudas } from "@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores";

const MainLayout = () => {
    const { userData, logout } = useLogin();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { tareasPendientes, setTareasPendientes } = useGestionarDeudas();
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    useEffect(() => {
        buscarTareasPendientes();
    }, [])

    const buscarTareasPendientes = async () => {
        const respuesta = await compromisoPagoServiceWeb(true)
        setTareasPendientes(respuesta)
    }

    const irTareasPendientes = () => {
        navigate("/gestion/compromisos-pagos")
    }

    if (!userData) return null;

    return (
        <div style={{ display: "flex" }}>
            {sidebarOpen && <Sidebar userRole={userData.role} />}
            <div style={{ flex: 1 }}>
                <Navbar
                    userName={userData.fullName}
                    onLogout={logout}
                    onToggleSidebar={handleToggleSidebar}
                />
                <div style={{ paddingLeft: "4rem", paddingTop: 30, marginTop: 50 }}>
                    {!!tareasPendientes.length && (<Stack sx={{ width: '100%' }} spacing={2} mb={2}>
                        <Alert severity="info">Tiene {tareasPendientes.length} tareas pendientes. <Button onClick={irTareasPendientes}> presione aqui para atender</Button></Alert>
                    </Stack>)}
                    <AppRoutes />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
