// src/Pages/InformacionCrecos/components/InformacionCrecosTabs.tsx

import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import CarteraCrecosGrid from "./CarteraCrecosGrid";
import SaldosCrecosGrid from "./SaldosCrecosGrid";
import RecibosCrecosGrid from "./RecibosCrecosGrid";
import RecibosDetalleCrecosGrid from "./RecibosDetalleCrecosGrid";
import CuotasCrecosGrid from "./CuotasCrecosGrid";

const InformacionCrecosTabs = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            <Tabs value={tab} onChange={handleChange} variant="scrollable">
                <Tab label="Cartera asignada" />
                <Tab label="Saldos cliente" />
                <Tab label="Recibos" />
                <Tab label="Detalle recibos" />
                <Tab label="Cuotas" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
                {tab === 0 && <CarteraCrecosGrid />}
                {tab === 1 && <SaldosCrecosGrid />}
                {tab === 2 && <RecibosCrecosGrid />}
                {tab === 3 && <RecibosDetalleCrecosGrid />}
                {tab === 4 && <CuotasCrecosGrid />}
            </Box>
        </Box>
    );
};

export default InformacionCrecosTabs;
