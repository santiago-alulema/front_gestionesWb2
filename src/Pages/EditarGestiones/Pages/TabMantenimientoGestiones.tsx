import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabMantenimientoGestiones = () => {
    const [value, setValue] = useState(0);
    const { deudorSeleccionado, telefonosActivos, deudaSeleccionada, setTelefonosActivos } = useGestionarDeudas();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Gestionar Tarea" {...a11yProps(0)} />
                        <Tab label="Movimientos Deuda" {...a11yProps(1)} />
                        <Tab label="Telefonos Deudor" {...a11yProps(2)} />

                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <p>tab Gestiones</p>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <p>tab Pagos</p>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <p>tab Tareas</p>
                </CustomTabPanel>
            </Box>
        </>
    )
}

export default TabMantenimientoGestiones