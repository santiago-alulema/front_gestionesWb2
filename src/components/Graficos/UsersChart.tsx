import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface UsersChartProps {
    data: Array<{ day: string; users: number }>;
}

export const UsersChart = ({ data }: UsersChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Usuarios" />
            </LineChart>
        </ResponsiveContainer>
    );
};