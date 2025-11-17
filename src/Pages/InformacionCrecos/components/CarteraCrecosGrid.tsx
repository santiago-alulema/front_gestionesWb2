// src/Pages/InformacionCrecos/components/CarteraCrecosGrid.tsx

import { useEffect, useState } from "react";
import CustomDataGridTs from "@/components/DataGridCommon/CustomDataGridTs";
import { IActionConfig } from "@/components/DataGridCommon/IActionConfig";
import { CarteraAsignadaCrecos } from "../models/InformacionCrecosModels";
import { DESCARGAR_EXCEL_CARTERA, GET_CARTERA_CRECOS } from "../services/ServiciosWebInformacionCrecos";
import { ConfiguracionColumnasCarteraCrecos } from "@/Pages/InformacionCrecos/config/ConfiguracionColumnasCarteraCrecos ";
import { useLoading } from "@/components/LoadingContext";
import { Button, Grid } from "@mui/material";

const CarteraCrecosGrid = () => {
    const [rows, setRows] = useState<CarteraAsignadaCrecos[]>([]);
    const { startLoading, stopLoading } = useLoading();

    const actionsConfig: IActionConfig[] = []; // solo lectura

    useEffect(() => {
        const cargar = async () => {
            try {
                startLoading();
                const resp = await GET_CARTERA_CRECOS();
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
            await DESCARGAR_EXCEL_CARTERA();
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
                columns={ConfiguracionColumnasCarteraCrecos()}
                gridId="gidCarteraCrecos"
                columsHide={["id"]}
                hiddenFilterColumn={["actions"]}
                actions={actionsConfig}
                iconDirectionFilter="end"
                searchLabel="Buscar"
            />
        </>

    );
};

export default CarteraCrecosGrid;
