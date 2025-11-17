// src/Pages/InformacionCrecos/components/RecibosDetalleCrecosGrid.tsx

import { useEffect, useState } from "react";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import { ReciboDetalleCrecos } from "../models/InformacionCrecosModels";
import { DESCARGAR_EXCEL_RECIBOS_DETALLE, GET_RECIBOS_DETALLE_CRECOS } from "../services/ServiciosWebInformacionCrecos";
import { ConfiguracionColumnasRecibosDetalleCrecos } from "@/Pages/InformacionCrecos/config/ConfiguracionColumnasRecibosDetalleCrecos ";
import { useLoading } from "@/components/LoadingContext";
import { Button, Grid } from "@mui/material";

const RecibosDetalleCrecosGrid = () => {
    const [rows, setRows] = useState<ReciboDetalleCrecos[]>([]);
    const { startLoading, stopLoading } = useLoading();


    const actionsConfig: IActionConfig[] = [];

    useEffect(() => {
        const cargar = async () => {
            try {
                startLoading();
                const resp = await GET_RECIBOS_DETALLE_CRECOS();
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
            await DESCARGAR_EXCEL_RECIBOS_DETALLE();
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
                columns={ConfiguracionColumnasRecibosDetalleCrecos()}
                gridId="gidRecibosDetalleCrecos"
                columsHide={["id"]}
                hiddenFilterColumn={["actions"]}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel="Buscar"
            />
        </>

    );
};

export default RecibosDetalleCrecosGrid;
