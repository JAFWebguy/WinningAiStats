import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthChartProps {
  data: Array<{
    name: string;
    growth: number;
  }>;
}

const COLORS = [
  'rgba(0, 255, 255, 0.8)',   // Cyan - ChatGPT
  'rgba(255, 0, 255, 0.7)',   // Magenta - Microsoft Copilot
  'rgba(0, 255, 0, 0.7)',     // Green - Google Gemini
  'rgba(255, 255, 0, 0.7)',   // Yellow - Perplexity
  'rgba(255, 51, 102, 0.7)',  // Pink - Claude AI
  'rgba(51, 153, 255, 0.7)',  // Blue - Grok
  'rgba(255, 128, 0, 0.7)'    // Orange - Deepseek
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
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient key={`barGradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.9} />
              <stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
          ))}
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
        {data.map((_, index) => (
          <Bar 
            key={`bar-${index}`}
            dataKey="growth"
            fill={`url(#barGradient-${index})`}
            radius={[4, 4, 0, 0]}
            style={{ filter: 'blur(0.5px)' }}
            stackId="stack"
            data={[data[index]]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}