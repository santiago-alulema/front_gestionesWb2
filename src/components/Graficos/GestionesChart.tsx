// // GestionesChart.tsx
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import { useDashboardStore } from './store';
// import { Box, Typography, useTheme } from '@mui/material';

// export const GestionesChart = () => {
//     const theme = useTheme();
//     const data = useDashboardStore((state) => state.data.gestionesPorDia);

//     return (
//         <Box sx={{ p: 2, height: '100%' }}>
//             <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
//                 Gestiones por Día
//             </Typography>
//             <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                     <XAxis
//                         dataKey="fecha"
//                         tick={{ fill: theme.palette.text.secondary }}
//                     />
//                     <YAxis
//                         tick={{ fill: theme.palette.text.secondary }}
//                     />
//                     <Tooltip
//                         contentStyle={{
//                             borderRadius: theme.shape.borderRadius,
//                             border: 'none',
//                             boxShadow: theme.shadows[3],
//                         }}
//                     />
//                     <Line
//                         type="monotone"
//                         dataKey="cantidad"
//                         stroke="#1976d2"
//                         strokeWidth={2}
//                         dot={{ r: 4 }}
//                         activeDot={{ r: 6, stroke: '#1976d2', strokeWidth: 2 }}
//                         name="Gestiones"
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </Box>
//     );
// };