import PhoneNumbersInput from '@/components/PhoneNumbersInput';
import CompromisosPagosComponents from '@/Pages/DeudoresGestionPage/components/CompromisosPagosComponents';
import GestionarDeudaComponents from '@/Pages/DeudoresGestionPage/components/GestionarDeudaComponents';
import PagosComponents from '@/Pages/DeudoresGestionPage/components/PagosComponents';
import { useGestionarDeudas } from '@/Pages/DeudoresGestionPage/context/GestionarDeudasDeudores';
import { Box, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react';

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

const TabsGestionarDeudas = () => {
    const [value, setValue] = useState(0);
    const { deudorSeleccionado, telefonosActivos, setTelefonosActivos, setTelefonoSeleccionado } = useGestionarDeudas();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        return () => {
            setTelefonoSeleccionado('');
        };
    }, [setTelefonoSeleccionado]);
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Gestionar" {...a11yProps(0)} />
                    <Tab label="Pagos" {...a11yProps(1)} />
                    <Tab label="Tareas" {...a11yProps(2)} />
                    <Tab label="Telefonos Deudor" {...a11yProps(3)} />

                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <GestionarDeudaComponents></GestionarDeudaComponents>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PagosComponents ></PagosComponents>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <CompromisosPagosComponents></CompromisosPagosComponents>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <PhoneNumbersInput cedula={deudorSeleccionado.cedula} phones={telefonosActivos} setPhones={setTelefonosActivos} />
            </CustomTabPanel>
        </Box>
    )
}

export default TabsGestionarDeudas