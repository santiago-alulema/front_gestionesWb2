// // SalesChart.tsx (ejemplo, similar para los otros)
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface SalesChartProps {
//     data: Array<{ month: string; sales: number }>;
// }

// export const SalesChart = ({ data }: SalesChartProps) => {
//     return (
//         <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="sales" fill="#8884d8" name="Ventas" />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// };