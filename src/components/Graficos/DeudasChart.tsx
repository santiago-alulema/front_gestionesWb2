// // DeudasChart.tsx
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useDashboardStore } from './store';
// import { Box, Typography, useTheme } from '@mui/material';

// export const DeudasChart = () => {
//     const theme = useTheme();
//     const data = useDashboardStore((state) => state.data.deudasPorMes);

//     return (
//         <Box sx={{ p: 2, height: '100%' }}>
//             <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
//                 Deudas por Mes
//             </Typography>
//             <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                     <XAxis
//                         dataKey="mes"
//                         tick={{ fill: theme.palette.text.secondary }}
//                     />
//                     <YAxis
//                         tick={{ fill: theme.palette.text.secondary }}
//                         tickFormatter={(value) => `$${value.toLocaleString()}`}
//                     />
//                     <Tooltip
//                         formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Monto']}
//                         labelFormatter={(label) => `Mes: ${label}`}
//                         contentStyle={{
//                             borderRadius: theme.shape.borderRadius,
//                             border: 'none',
//                             boxShadow: theme.shadows[3],
//                         }}
//                     />
//                     <Bar
//                         dataKey="monto"
//                         fill="#388e3c"
//                         radius={[4, 4, 0, 0]}
//                         name="Monto"
//                     />
//                 </BarChart>
//             </ResponsiveContainer>
//         </Box>
//     );
// };