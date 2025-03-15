import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MarketShareChartProps {
  data: Array<{
    name: string;
    share: number;
  }>;
}

const COLORS = [
  'rgba(0, 255, 255, 0.8)',   // Cyan
  'rgba(255, 0, 255, 0.7)',   // Magenta
  'rgba(0, 255, 0, 0.7)',     // Green
  'rgba(255, 255, 0, 0.7)',   // Yellow
  'rgba(255, 51, 102, 0.7)',  // Pink
  'rgba(51, 153, 255, 0.7)',  // Blue
  'rgba(255, 128, 0, 0.7)'    // Orange
];

export function MarketShareChart({ data }: MarketShareChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.9} />
              <stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={{ stroke: '#00FFFF', strokeWidth: 1, opacity: 0.5 }}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="share"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`url(#colorGradient-${index})`} 
              style={{ filter: 'blur(0.5px)' }}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.15)'
          }}
          formatter={(value: number) => [`${value.toFixed(2)}%`, 'Market Share']}
        />
        <Legend 
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            opacity: 0.8,
            fontSize: '12px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}