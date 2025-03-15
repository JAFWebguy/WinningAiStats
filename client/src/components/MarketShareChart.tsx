import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MarketShareChartProps {
  data: Array<{
    name: string;
    share: number;
  }>;
}

const COLORS = ['#00FFFF', '#FF00FF', '#00FF00', '#FFFF00', '#FF3366'];

export function MarketShareChart({ data }: MarketShareChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#0088FF" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={{ 
            stroke: '#00FFFF', 
            strokeWidth: 1, 
            opacity: 0.5,
            type: 'spline', 
            smooth: true,   
          }}
          label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = outerRadius * 1.2 + 10; 

            // Calculate optimal label position based on angle
            const angle = -midAngle * RADIAN;
            const labelRadius = radius + (index % 2 === 0 ? 20 : 40); // Alternate label distances
            const x = cx + labelRadius * Math.cos(angle);
            const y = cy + labelRadius * Math.sin(angle);

            // Adjust position for very small segments
            const adjustedX = x + (percent < 0.05 ? (x > cx ? 20 : -20) : 0);
            const adjustedY = y + (percent < 0.05 ? (y > cy ? 10 : -10) : 0);

            return (
              <text
                x={adjustedX}
                y={adjustedY}
                fill={COLORS[index % COLORS.length]}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                opacity={0.8}
                fontSize={12}
              >
                {`${name} (${(percent * 100).toFixed(1)}%)`}
              </text>
            );
          }}
          outerRadius={150}
          fill="url(#colorGradient)"
          dataKey="share"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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