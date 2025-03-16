import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GrowthChartProps {
  data: Array<{
    name: string;
    growth: number;
  }>;
}

// Keep colors consistent with pie chart
const COLORS = [
  'rgba(0, 255, 255, 0.8)',   // Cyan - ChatGPT
  'rgba(255, 0, 255, 0.8)',   // Magenta - Microsoft Copilot
  'rgba(0, 255, 0, 0.8)',     // Green - Google Gemini
  'rgba(255, 255, 0, 0.8)',   // Yellow - Perplexity
  'rgba(255, 51, 102, 0.8)',  // Pink - Claude AI
  'rgba(51, 153, 255, 0.8)',  // Blue - Grok
  'rgba(255, 128, 0, 0.8)'    // Orange - Deepseek
];

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
            backgroundColor: 'rgba(0, 20, 40, 0.9)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.15)',
            backdropFilter: 'blur(4px)',
            color: 'rgba(0, 255, 255, 0.9)'
          }}
          itemStyle={{
            color: 'rgba(0, 255, 255, 0.9)'
          }}
          formatter={(value: number) => [`${value.toFixed(3)}%`, 'Quarterly Growth']}
          labelStyle={{
            color: 'rgba(0, 255, 255, 0.9)'
          }}
        />
        <Bar 
          dataKey="growth"
          radius={[4, 4, 0, 0]}
          style={{ filter: 'blur(0.5px)' }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}