import TabInformacionDeuda from '@/Pages/DeudoresGestionPage/components/TabInformacionDeuda';
import TabsGestionarDeudas from '@/Pages/DeudoresGestionPage/components/TabsGestionarDeudas';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { buscarDeudaPorIdServicioWeb, buscarDeudorPorIdServicioWeb } from '@/services/Service';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Tabs, Tab, Box, Paper } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const NuevaVentanaGestionarDeuda = () => {
    const { setDeudaSeleccionada, setDeudorSeleccionado } = useGestionarDeudas();
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [searchParams] = useSearchParams();
    const deudaId = searchParams.get("deudaId");
    const deudorId = searchParams.get("deudorId");

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const initLlenarDeudorSeleccionado = async () => {
        if (deudaId && deudorId) {
            try {
                const response = await buscarDeudaPorIdServicioWeb(deudaId);
                setDeudaSeleccionada(response);

                const responseDeudor = await buscarDeudorPorIdServicioWeb(deudorId);
                setDeudorSeleccionado(responseDeudor);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initLlenarDeudorSeleccionado();
    }, [deudaId, deudorId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3">Cargando datos...</span>
            </div>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%",
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Información de Deuda" />
                    <Tab label="Gestionar Deudas" />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <TabInformacionDeuda />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabsGestionarDeudas />
            </TabPanel>
        </Paper>
    );
};

export default NuevaVentanaGestionarDeuda;
