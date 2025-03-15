import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MarketShareChartProps {
  data: Array<{
    name: string;
    share: number;
  }>;
}

const COLORS = ['#00FFFF', '#FF00FF', '#00FF00', '#FFFF00', '#FF3366'];

export function MarketShareChart({ data }: MarketShareChartProps) {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    // Increase the radius to push labels further out
    const radius = outerRadius * 1.4;

    // Calculate position on a circle
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Adjust label positioning to avoid bottom area (legend)
    const adjustedMidAngle = midAngle < 0 ? midAngle + 360 : midAngle;
    const isInBottomQuarter = adjustedMidAngle > 225 && adjustedMidAngle < 315;

    // Move labels that would appear in bottom quarter to sides
    const adjustedX = isInBottomQuarter 
      ? cx + (radius * 1.2) * Math.cos(-(adjustedMidAngle < 270 ? 225 : 315) * RADIAN)
      : x;
    const adjustedY = isInBottomQuarter
      ? cy + (radius * 1.2) * Math.sin(-(adjustedMidAngle < 270 ? 225 : 315) * RADIAN)
      : y;

    return (
      <text
        x={adjustedX}
        y={adjustedY}
        fill="#00FFFF"
        textAnchor={adjustedX > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm"
        opacity={0.8}
      >
        {`${name} (${(percent * 100).toFixed(1)}%)`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={{
            stroke: '#00FFFF',
            strokeWidth: 1,
            opacity: 0.5,
            type: 'curve', // Use curved lines
            strokeDasharray: '3 3' // Add subtle dash pattern
          }}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
          dataKey="share"
          filter="url(#glow)"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value.toFixed(2)}%`, 'Market Share']}
          contentStyle={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.15)'
          }}
        />
        <Legend 
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            opacity: 0.8,
            fontSize: '12px',
            paddingTop: '20px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}