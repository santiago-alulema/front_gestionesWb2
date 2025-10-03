import CustomDatePicker from "@/components/DataGridCommon/CustomDatePicker"
import { useLoading } from "@/components/LoadingContext";
import { descargarReporteDeudasSubidasServicioWeb } from "@/Pages/Reportes/services/ReportesServiciosWeb";
import { showAlert } from "@/utils/modalAlerts";
import { Button, Grid } from "@mui/material"
import dayjs from "dayjs";
import { useState } from "react";

const DeudasSubidasReporteComponent = () => {
    const [startDate, setStartDate] = useState<string>(dayjs().subtract(5, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const { startLoading, stopLoading } = useLoading();

    const descargarReporte = async () => {
        try {
            startLoading()
            await descargarReporteDeudasSubidasServicioWeb(startDate, endDate)
            const configAlert = {
                title: "Infomacion",
                message: "El reporte <strong>DEUDAS SUBIDAS</strong> descargado exitosamente.",
                type: 'info',
                callBackFunction: false,
            };
            showAlert(configAlert)
        } catch (error) {
            const configAlert = {
                title: "Error",
                message: error,
                type: 'error',
                callBackFunction: false,
            };
            showAlert(configAlert)
        } finally {
            stopLoading();
        }
    }

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid size={{ xs: 12, md: 3, lg: 6 }} sx={{ display: 'none' }}>
                    <CustomDatePicker
                        label="Fecha Inicio"
                        defaultValue={startDate}
                        onChangeValue={setStartDate}
                        maxDate={endDate}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3, lg: 6 }} sx={{ display: 'none' }}>
                    <CustomDatePicker
                        label="Fecha Fin"
                        defaultValue={endDate}
                        onChangeValue={setEndDate}
                        minDate={startDate}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <Button fullWidth variant="contained" onClick={descargarReporte}>Descargar Reporte</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default DeudasSubidasReporteComponent