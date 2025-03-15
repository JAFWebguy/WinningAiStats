import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MarketShareChartProps {
  data: Array<{
    name: string;
    share: number;
  }>;
}

const COLORS = ['#A855F7', '#EC4899', '#3B82F6', '#06B6D4', '#8B5CF6'];

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
          contentStyle={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.15)'
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}