import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export interface PlatformData {
  name: string;
  marketShare?: number;
  growth: number;
  revenue?: number;
  userBase?: number;
}

export interface GrowthChartProps {
  data: PlatformData[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  const [chartData, setChartData] = useState<PlatformData[]>(data);

  // Always ensure we have data to display, even if empty array is passed
  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
    } else {
      // Fallback data if no data is provided
      setChartData([
        { name: "ChatGPT", marketShare: 59.70, growth: 8, revenue: 1000000000, userBase: 100000000 },
        { name: "Microsoft Copilot", marketShare: 14.40, growth: 6, revenue: 500000000, userBase: 50000000 },
        { name: "Google Gemini", marketShare: 13.50, growth: 5, revenue: 400000000, userBase: 40000000 },
        { name: "Perplexity", marketShare: 6.20, growth: 10, revenue: 100000000, userBase: 10000000 },
        { name: "Claude AI", marketShare: 3.20, growth: 14, revenue: 80000000, userBase: 8000000 },
        { name: "Grok", marketShare: 0.80, growth: 12, revenue: 20000000, userBase: 2000000 },
        { name: "Deepseek", marketShare: 0.70, growth: 10, revenue: 15000000, userBase: 1500000 }
      ]);
    }
  }, [data]);

  // Define colors for the bars
  const getBarColor = (value: number) => {
    if (value > 12) return "#FF6B6B"; // Highest growth - red
    if (value > 9) return "#FFD166"; // High growth - yellow
    if (value > 6) return "#06D6A0"; // Medium growth - green
    return "#118AB2"; // Low growth - blue
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          interval={0}
          angle={-45}
          textAnchor="end"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          label={{ 
            value: 'Growth (%)', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }}
        />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Growth Rate']}
          contentStyle={{ 
            backgroundColor: 'rgba(10, 10, 25, 0.8)',
            borderColor: 'rgba(0, 255, 255, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 255, 255, 0.2)'
          }}
        />
        <Bar 
          dataKey="growth" 
          radius={[4, 4, 0, 0]}
          // Use dynamic colors based on growth value
          fill="#00CED1"
          {...(chartData.length < 10 ? { 
            isAnimationActive: true,
            animationDuration: 1500
          } : {})}
        >
          {chartData.map((entry, index) => (
            <Bar 
              key={`bar-${index}`} 
              dataKey="growth" 
              fill={getBarColor(entry.growth)}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}