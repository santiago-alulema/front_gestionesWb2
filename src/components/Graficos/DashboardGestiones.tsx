// // Dashboard.tsx
// import { useTheme } from '@mui/material/styles';
// import {
//     Box, Card, CardContent, Grid, Paper, Typography
// } from '@mui/material';
// import { useDashboardStore } from './store';
// import { CompromisosChart } from './CompromisosChart';
// import { DeudasChart } from './DeudasChart';
// import { GestionesChart } from './GestionesChart';

// const StatCard = ({ title, value, subValue, color = 'primary' }: {
//     title: string;
//     value: string | number;
//     subValue?: string;
//     color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
// }) => {
//     const theme = useTheme();

//     return (
//         <Card
//             elevation={3}
//             sx={{
//                 height: '100%',
//                 borderLeft: `4px solid ${theme.palette[color].main}`,
//             }}
//         >
//             <CardContent>
//                 <Typography
//                     variant="subtitle1"
//                     color="text.secondary"
//                     gutterBottom
//                 >
//                     {title}
//                 </Typography>
//                 <Typography
//                     variant="h4"
//                     color={color}
//                     fontWeight="bold"
//                 >
//                     {value}
//                 </Typography>
//                 {subValue && (
//                     <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         mt={1}
//                     >
//                         {subValue}
//                     </Typography>
//                 )}
//             </CardContent>
//         </Card>
//     );
// };

// export const DashboardGestiones = () => {
//     const theme = useTheme();
//     const { data } = useDashboardStore();

//     return (
//         <Box sx={{ p: 2 }}>

//             <Box sx={{ mt: 1, backgroundColor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius }}>
//                 <Typography
//                     variant="h4"
//                     gutterBottom
//                     sx={{
//                         fontWeight: 'bold',
//                         color: theme.palette.text.primary,
//                     }}
//                 >
//                     Resumen General
//                 </Typography>
//                 <Typography variant="body2" mb={2} color="text.secondary">
//                     Última actualización: {new Date().toLocaleString()}
//                 </Typography>
//             </Box>

//             <Grid container spacing={3} sx={{ mb: 3 }}>
//                 <Grid size={{ lg: 2, md: 4, sm: 6, xs: 12 }} >
//                     <StatCard
//                         title="Total Deudas"
//                         value={data.totalDeudas.toLocaleString()}
//                         color="error"
//                     />
//                 </Grid>

//                 <Grid size={{ lg: 2, md: 4, sm: 6, xs: 12 }}>
//                     <StatCard
//                         title="Deudas Gestionadas"
//                         value={data.totalGestiones.toLocaleString()}
//                         color="info"
//                     />
//                 </Grid>

//                 <Grid size={{ lg: 2, md: 4, sm: 6, xs: 12 }}>
//                     <StatCard
//                         title="Compromisos Activos"
//                         value={data.totalCompromisos.toLocaleString()}
//                         color="warning"
//                     />
//                 </Grid>

//                 <Grid size={{ lg: 2, md: 4, sm: 6, xs: 12 }}>
//                     <StatCard
//                         title="Teléfonos Activos"
//                         value={data.totalTelefonos.activos.toLocaleString()}
//                         subValue={`Inactivos: ${data.totalTelefonos.inactivos.toLocaleString()}`}
//                         color="primary"
//                     />
//                 </Grid>

//                 <Grid size={{ lg: 2, md: 4, sm: 6, xs: 12 }}>
//                     <StatCard
//                         title="Monto por Recuperar"
//                         value={`$${data.montoPorRecuperar.toLocaleString('en-US', {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2
//                         })}`}
//                         color="success"
//                     />
//                 </Grid>

//                 <Grid size={{ lg: 2, md: 4, sm: 6, xs: 12 }}>
//                     <StatCard
//                         title="Tasa de Cumplimiento"
//                         value={`${((data.compromisosResumen.cumplidos / data.compromisosResumen.activos) * 100 || 0).toFixed(1)}%`}
//                         subValue={`${data.compromisosResumen.cumplidos} de ${data.compromisosResumen.activos}`}
//                         color="secondary"
//                     />
//                 </Grid>
//             </Grid>

//             {/* Sección de gráficos */}
//             <Grid container spacing={3}>
//                 <Grid size={{ lg: 7, md: 6, xs: 12 }} >
//                     <Paper sx={{ height: '100%', borderRadius: theme.shape.borderRadius }}>
//                         <GestionesChart />
//                     </Paper>
//                 </Grid>
//                 <Grid size={{ lg: 4, md: 6, xs: 12 }} >
//                     <Paper sx={{ height: '100%', borderRadius: theme.shape.borderRadius }}>
//                         <CompromisosChart />
//                     </Paper>
//                 </Grid>

//                 <Grid size={{ lg: 12, md: 6, xs: 12 }} >
//                     <Paper sx={{ height: '100%', borderRadius: theme.shape.borderRadius }}>
//                         <DeudasChart />
//                     </Paper>
//                 </Grid>


//             </Grid>


//         </Box>
//     );
// };

import { Box, Typography, useTheme } from '@mui/material';
import construccion from '@/assets/images/construccion.jpg'; // Asegúrate de tener esta imagen o reemplázala

const DashboardGestiones = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                textAlign: 'center',
                p: 4,
                background: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                maxWidth: 800,
                mx: 'auto',
                my: 4
            }}
        >
            <img
                src={construccion}
                alt="En construcción"
                style={{
                    width: '100%',
                    maxWidth: 400,
                    height: 'auto',
                    marginBottom: theme.spacing(4)
                }}
            />

            <Typography
                variant="h5"
                sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                    fontWeight: 600
                }}
            >
                Dashboard de Gestión
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    color: theme.palette.text.secondary,
                    mb: 4
                }}
            >
                Próximamente
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: 600 }}>
                Estamos trabajando arduamente para construir esta sección.
                Pronto tendrás acceso a todas las herramientas de gestión
                en un solo lugar. ¡Gracias por tu paciencia!
            </Typography>
        </Box>
    );
}

export default DashboardGestiones;