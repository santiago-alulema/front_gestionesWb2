// src/Pages/InformacionCrecos/components/CuotasCrecosGrid.tsx

import { useEffect, useState } from "react";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import { CuotaOperacionCrecos } from "../models/InformacionCrecosModels";
import { DESCARGAR_EXCEL_CUOTAS, GET_CUOTAS_CRECOS } from "../services/ServiciosWebInformacionCrecos";
import { ConfiguracionColumnasCuotasCrecos } from "@/Pages/InformacionCrecos/config/ConfiguracionColumnasCuotasCrecos ";
import { useLoading } from "@/components/LoadingContext";
import { Button, Grid } from "@mui/material";

const CuotasCrecosGrid = () => {
    const [rows, setRows] = useState<CuotaOperacionCrecos[]>([]);
    const { startLoading, stopLoading } = useLoading();

    const actionsConfig: IActionConfig[] = [];

    useEffect(() => {
        const cargar = async () => {
            try {
                startLoading();
                const resp = await GET_CUOTAS_CRECOS();
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
            await DESCARGAR_EXCEL_CUOTAS();
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
                columns={ConfiguracionColumnasCuotasCrecos()}
                gridId="gidCuotasCrecos"
                columsHide={["id"]}
                hiddenFilterColumn={["actions"]}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel="Buscar"
            />
        </>

    );
};

export default CuotasCrecosGrid;
