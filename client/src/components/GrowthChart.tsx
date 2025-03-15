import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthChartProps {
  data: Array<{
    name: string;
    growth: number;
  }>;
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.8)" stopOpacity={0.9} />
            <stop offset="50%" stopColor="rgba(0, 128, 255, 0.7)" stopOpacity={0.7} />
            <stop offset="100%" stopColor="rgba(0, 0, 255, 0.6)" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
        <XAxis 
          dataKey="name" 
          stroke="rgba(0, 255, 255, 0.7)"
          opacity={0.7}
        />
        <YAxis 
          unit="%" 
          stroke="rgba(0, 255, 255, 0.7)"
          opacity={0.7}
        />
        <Tooltip
          contentStyle={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.15)'
          }}
          formatter={(value: number) => [`${value}%`, 'Quarterly Growth']}
        />
        <Bar 
          dataKey="growth" 
          fill="url(#barGradient)"
          radius={[4, 4, 0, 0]}
          style={{ filter: 'blur(0.5px)' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}