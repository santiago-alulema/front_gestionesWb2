import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useLogin } from '@/context/LoginContext';
import { compromisoPagoServiceWeb } from '@/services/Service';
import { showAlert } from '@/utils/modalAlerts';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const Index = () => {
    const { logout, userData } = useLogin();
    const cargarCompromisos = async () => {
        const respuesta = await compromisoPagoServiceWeb(true);
        if (respuesta.length > 0) {
            const configAlert = {
                title: "Correcto",
                message: "Ud tiene " + respuesta.length + " compromisos de pago para el dia de hoy",
                type: 'info',
                callBackFunction: false
            };
            showAlert(configAlert);
        }
    }

    useEffect(() => {
        cargarCompromisos()
    }, [])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar userName={userData.name} onLogout={() => logout()} />
            <Box mt={10}>
                <Sidebar userRole={'admin'} />
            </Box>
        </Box>
    );
};

export default Index;