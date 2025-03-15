import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MarketShareChartProps {
  data: Array<{
    name: string;
    share: number;
  }>;
}

const COLORS = ['#635BFF', '#00D4FF', '#0A2540', '#7A73FF', '#33DBFF'];

export function MarketShareChart({ data }: MarketShareChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="share"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value.toFixed(2)}%`, 'Market Share']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
