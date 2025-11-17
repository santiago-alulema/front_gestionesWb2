// src/Pages/InformacionCrecos/components/SaldosCrecosGrid.tsx

import { useEffect, useState } from "react";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import { SaldoClienteCrecos } from "../models/InformacionCrecosModels";
import { DESCARGAR_EXCEL_SALDO, GET_SALDOS_CRECOS } from "../services/ServiciosWebInformacionCrecos";
import { ConfiguracionColumnasSaldosCrecos } from "@/Pages/InformacionCrecos/config/ConfiguracionColumnasSaldosCrecos ";
import { useLoading } from "@/components/LoadingContext";
import { Button, Grid } from "@mui/material";

const SaldosCrecosGrid = () => {
    const [rows, setRows] = useState<SaldoClienteCrecos[]>([]);
    const { startLoading, stopLoading } = useLoading();
    const actionsConfig: IActionConfig[] = [];

    useEffect(() => {
        const cargar = async () => {
            try {
                startLoading();
                const resp = await GET_SALDOS_CRECOS();
                setRows(resp || []);
            } finally {
                stopLoading();
            }
        };
        cargar();
    }, []);

    const descargarExcel = async () => {
        try {
            startLoading();
            await DESCARGAR_EXCEL_SALDO();
        } finally {
            stopLoading();
        }
    }

    return (
        <>
            <Grid container mb={3} justifyContent="flex-end">
                <Grid>
                    <Button variant="contained" onClick={descargarExcel}>
                        Descargar EXCEL
                    </Button>
                </Grid>
            </Grid>
            <CustomDataGridTs
                rows={rows}
                columns={ConfiguracionColumnasSaldosCrecos()}
                gridId="gidSaldosCrecos"
                hiddenFilterColumn={["actions"]}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel="Buscar"
            />
        </>

    );
};

export default SaldosCrecosGrid;
