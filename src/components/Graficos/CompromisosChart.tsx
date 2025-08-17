// // CompromisosChart.tsx
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// import { useDashboardStore } from './store';
// import { Box, Typography, useTheme } from '@mui/material';

// const COLORS = ['#1976d2', '#ff9800'];

// export const CompromisosChart = () => {
//     const theme = useTheme();
//     const { activos, cumplidos } = useDashboardStore((state) => state.data.compromisosResumen);

//     const data = [
//         { name: 'Activos', value: activos },
//         { name: 'Cumplidos', value: cumplidos },
//     ];

//     return (
//         <Box sx={{ p: 2, height: '100%' }}>
//             <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
//                 Compromisos
//             </Typography>
//             <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                     <Pie
//                         data={data}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={80}
//                         innerRadius={60}
//                         fill="#8884d8"
//                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     >
//                         {data.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                         ))}
//                     </Pie>
//                     <Tooltip
//                         formatter={(value) => [value, 'Cantidad']}
//                         contentStyle={{
//                             borderRadius: theme.shape.borderRadius,
//                             border: 'none',
//                             boxShadow: theme.shadows[3],
//                         }}
//                     />
//                     <Legend
//                         wrapperStyle={{
//                             paddingTop: '20px'
//                         }}
//                     />
//                 </PieChart>
//             </ResponsiveContainer>
//         </Box>
//     );
// };