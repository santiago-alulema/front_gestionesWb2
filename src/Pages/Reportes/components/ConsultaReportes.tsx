import CustomDatePicker from "@/components/DataGridCommon/CustomDatePicker";
import { useLoading } from "@/components/LoadingContext";
import { descargarReporteServicioWeb } from "@/Pages/Reportes/services/ReportesServiciosWeb";
import { showAlert } from "@/utils/modalAlerts";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import dayjs from "dayjs";
import { useState } from "react";

const ConsultaReportes = () => {
    type ReportType = 'gestiones' | 'compromisos' | 'deudas';
    const [reportType, setReportType] = useState<ReportType>('gestiones');
    const [startDate, setStartDate] = useState<string>(dayjs().subtract(5, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [clienteParametroBuscar, setClienteParametroBuscar] = useState<string>("")
    const { startLoading, stopLoading } = useLoading();
    const descargarReporte = async () => {
        try {
            startLoading()
            await descargarReporteServicioWeb(startDate, endDate, reportType, !clienteParametroBuscar ? "-SP-" : clienteParametroBuscar);
            const configAlert = {
                title: "Infomacion",
                message: "El reporte <strong>REPORTE GENERAL</strong> descargado exitosamente.",
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
                <Grid size={{ xs: 12, md: 3, lg: 12 }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>
                        Seleccione el tipo de gestión:
                    </div>
                    <Select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value as ReportType)}
                        fullWidth
                        size="small"
                    >
                        <MenuItem value="gestiones">Gestiones</MenuItem>
                        <MenuItem value="compromisos">Tareas</MenuItem>
                        <MenuItem value="pagos">Pagos</MenuItem>
                    </Select>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>
                        Seleccione el rango de Fecha:
                    </div>
                </Grid>
                <Grid size={{ xs: 12, md: 3, lg: 6 }}>
                    <CustomDatePicker
                        label="Fecha Inicio"
                        defaultValue={startDate}
                        onChangeValue={setStartDate}
                        maxDate={endDate}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3, lg: 6 }}>
                    <CustomDatePicker
                        label="Fecha Fin"
                        defaultValue={endDate}
                        onChangeValue={setEndDate}
                        minDate={startDate}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3, lg: 12 }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>
                        Buscar por nombre de cliente:
                    </div>
                    <TextField
                        label="Nombre de Cliente"
                        fullWidth
                        onChange={(e) => setClienteParametroBuscar(e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3, lg: 12 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ borderRadius: 5 }}
                        color="success"
                        onClick={descargarReporte}>Descargar Excel</Button>
                </Grid>
            </Grid>

        </>
    )
}

export default ConsultaReportes