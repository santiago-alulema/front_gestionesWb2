// import { useState, useEffect } from 'react';
// import dayjs from 'dayjs';
// import {
//     Button,
//     Box,
//     Typography,
//     Select,
//     MenuItem,
//     TextField,
//     Grid,
//     Card,
//     CardContent,
//     Divider,
//     IconButton,
//     useTheme,
//     CircularProgress,
//     Alert,
//     Snackbar
// } from '@mui/material';
// import {
//     Search as SearchIcon,
//     Refresh as RefreshIcon,
//     Download as DownloadIcon,
//     FilterAlt as FilterIcon
// } from '@mui/icons-material';
// import CustomDatePicker from '@/components/DataGridCommon/CustomDatePicker';
// import { getCompromisos, getGestiones } from '@/services/Service';
// import CustomDataGridTs from '@/components/DataGridCommon/CustomDataGridTs';


// type ReportType = 'gestiones' | 'compromisos' | 'deudas';

// interface ReportSummary {
//     total: number;
//     exitosas?: number;
//     cumplidos?: number;
//     pendientes?: number;
//     vencidos?: number;
//     recuperado?: number;
//     pendiente?: number;
// }

// const ConsultaReportesVisual = () => {
//     const theme = useTheme();
//     const [reportType, setReportType] = useState<ReportType>('gestiones');
//     const [startDate, setStartDate] = useState<string>(dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
//     const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
//     const [deudorName, setDeudorName] = useState<string>('');
//     const [filtersExpanded, setFiltersExpanded] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [data, setData] = useState<any[]>([]);
//     const [summaryData, setSummaryData] = useState<Record<ReportType, ReportSummary>>({
//         gestiones: { total: 0, exitosas: 0, pendientes: 0 },
//         compromisos: { total: 0, cumplidos: 0, vencidos: 0 },
//         deudas: { total: 0, recuperado: 0, pendiente: 0 }
//     });

//     const convertColumns = (type: ReportType): any[] => {
//         switch (type) {
//             case 'gestiones':
//                 return [
//                     { name: 'fechaGestion', title: 'Fecha Gestión', width: "15%" },
//                     { name: 'deudor', title: 'Deudor G.', width: "22%" },
//                     { name: 'tipoGestion', title: 'Tipo Gestión', width: "16%" },
//                     { name: 'descripcion', title: 'Descripción', width: "32%" },
//                     { name: 'usuario', title: 'Usuario', width: "15%" }
//                 ];
//             case 'compromisos':
//                 return [
//                     { name: 'fechaCompromiso', title: 'Fecha Compromiso', width: "15%" },
//                     { name: 'deudor', title: 'Deudor', width: "24%" },
//                     { name: 'montoComprometido', title: 'Monto', width: "15%" },
//                     { name: 'estado', title: 'Estado', width: "15%" },
//                     { name: 'fechaCumplimientoReal', title: 'Cumplimiento', width: "15%" },
//                     { name: 'observaciones', title: 'Observaciones', width: "16%" }
//                 ];
//             case 'deudas':
//                 return [
//                     { name: 'numeroFactura', title: 'Factura', width: 120 },
//                     { name: 'deudor', title: 'Deudor', width: 200 },
//                     { name: 'montoOriginal', title: 'Monto Original', width: 120 },
//                     { name: 'saldoActual', title: 'Saldo Actual', width: 120 },
//                     { name: 'fechaVencimiento', title: 'Vencimiento', width: 120 },
//                     { name: 'estado', title: 'Estado', width: 120 }
//                 ];
//         }
//     };

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const filters = { startDate, endDate, deudorName: deudorName || undefined };
//             let response: any[] = [];

//             switch (reportType) {
//                 case 'gestiones':
//                     response = await getGestiones(filters);
//                     console.log(response)
//                     break;
//                 case 'compromisos':
//                     response = await getCompromisos(filters);
//                     break;
//                 case 'deudas':
//                     break;
//             }

//             // Procesar datos para CustomDataGridTs
//             const transformed = response.map((row: any) => {
//                 if (reportType === 'gestiones') {
//                     return {
//                         id: row.idGestion,
//                         fechaGestion: dayjs(row.fechaGestion).format('DD/MM/YYYY HH:mm'),
//                         deudor: row.deudor,
//                         tipoGestion: row.descripcion,
//                         descripcion: row.descripcion,
//                         usuario: row.usuario
//                     };
//                 }
//                 if (reportType === 'compromisos') {
//                     console.log(row.fechaCompromiso)
//                     return {
//                         id: row.idCompromiso,
//                         fechaCompromiso: dayjs(row.fechaCompromiso).format('DD/MM/YYYY'),
//                         deudor: row.deudor,
//                         montoComprometido: row.montoComprometido,
//                         estado: row.estado,
//                         fechaCumplimientoReal: row.fechaCumplimientoReal ? dayjs(row.fechaCumplimientoReal).format('DD/MM/YYYY') : 'Pendiente',
//                         observaciones: row.observaciones
//                     };
//                 }
//                 return row;
//             });

//             setData(transformed);
//             updateSummaryData(response);
//         } catch (err) {
//             setError('Error al cargar los datos. Por favor intente nuevamente.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateSummaryData = (reportData: any[]) => {
//         let newSummary: ReportSummary = { total: reportData.length };

//         switch (reportType) {
//             case 'gestiones':
//                 newSummary = {
//                     ...newSummary,
//                     exitosas: reportData.filter(g => g.idTipoGestionNavigation?.esExitoso).length,
//                     pendientes: reportData.filter(g => !g.idTipoGestionNavigation?.esExitoso).length
//                 };
//                 break;
//             case 'compromisos':
//                 newSummary = {
//                     ...newSummary,
//                     cumplidos: reportData.filter(c => c.estado === 'Cumplido').length,
//                     vencidos: reportData.filter(c => c.estado === 'Vencido').length
//                 };
//                 break;
//         }

//         setSummaryData(prev => ({ ...prev, [reportType]: newSummary }));
//     };

//     useEffect(() => {
//         fetchData();
//     }, [reportType]);

//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main} gutterBottom>
//                 Consulta de Reportes
//             </Typography>

//             <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
//                 <Alert severity="error" onClose={() => setError(null)}>
//                     {error}
//                 </Alert>
//             </Snackbar>

//             <Card elevation={3} sx={{ mb: 3 }}>
//                 <CardContent>
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography variant="h6">Filtros de Búsqueda</Typography>
//                         <IconButton onClick={() => setFiltersExpanded(!filtersExpanded)}>
//                             <FilterIcon />
//                         </IconButton>
//                     </Box>

//                     {filtersExpanded && (
//                         <>
//                             <Grid container spacing={2} mt={1}>
//                                 <Grid size={{ xs: 12, md: 3, lg: 12 }}>
//                                     <Select
//                                         value={reportType}
//                                         onChange={(e) => setReportType(e.target.value as ReportType)}
//                                         fullWidth
//                                         size="small"
//                                     >
//                                         <MenuItem value="gestiones">Gestiones</MenuItem>
//                                         <MenuItem value="compromisos">Compromisos</MenuItem>
//                                         <MenuItem value="deudas">Deudas</MenuItem>
//                                     </Select>
//                                 </Grid>

//                                 <Grid size={{ xs: 12, md: 3, lg: 6 }}>
//                                     <CustomDatePicker
//                                         label="Fecha Inicio"
//                                         defaultValue={startDate}
//                                         onChangeValue={setStartDate}
//                                         maxDate={endDate}
//                                     />
//                                 </Grid>

//                                 <Grid size={{ xs: 12, md: 3, lg: 6 }}>
//                                     <CustomDatePicker
//                                         label="Fecha Fin"
//                                         defaultValue={endDate}
//                                         onChangeValue={setEndDate}
//                                         minDate={startDate}
//                                     />
//                                 </Grid>

//                                 <Grid size={{ xs: 12, md: 3, lg: 12 }}>
//                                     <TextField
//                                         label="Filtrar por Deudor"
//                                         value={deudorName}
//                                         onChange={(e) => setDeudorName(e.target.value)}
//                                         fullWidth
//                                         sx={{ height: 100 }}
//                                     />
//                                 </Grid>
//                             </Grid>

//                             <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//                                 <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchData}>
//                                     Limpiar
//                                 </Button>
//                                 <Button
//                                     variant="contained"
//                                     startIcon={<SearchIcon />}
//                                     onClick={fetchData}
//                                     disabled={loading}
//                                 >
//                                     {loading ? <CircularProgress size={24} /> : 'Buscar'}
//                                 </Button>
//                             </Box>
//                         </>
//                     )}
//                 </CardContent>
//             </Card>

//             <Card elevation={3}>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                         Resultados del Reporte de {reportType.toUpperCase()}
//                     </Typography>
//                     <Divider sx={{ mb: 2 }} />
//                     {loading ? (
//                         <Box height={300} display="flex" alignItems="center" justifyContent="center">
//                             <CircularProgress />
//                         </Box>
//                     ) : (
//                         <CustomDataGridTs
//                             rows={data}
//                             columns={convertColumns(reportType)}
//                             gridId="reporte-grid"

//                             titleEmptyTable="No se encontraron resultados."
//                             getRowId={(row) => row.id}
//                         />
//                     )}
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// };

// export default ConsultaReportesVisual;
import React from 'react'

const ConsultaReportes = () => {
    return (
        <div>ConsultaReportes</div>
    )
}

export default ConsultaReportes