// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// interface ProductsChartProps {
//     data: Array<{ product: string; stock: number }>;
// }

// export const ProductsChart = ({ data }: ProductsChartProps) => {
//     return (
//         <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//                 <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={150}
//                     fill="#8884d8"
//                     dataKey="stock"
//                     nameKey="product"
//                     label={({ product, percent }) => `${product}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//             </PieChart>
//         </ResponsiveContainer>
//     );
// };