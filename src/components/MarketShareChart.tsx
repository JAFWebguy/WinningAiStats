import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';

export interface MarketShareData {
  name: string;
  value: number;
  color: string;
}

export interface MarketShareChartProps {
  data: MarketShareData[];
}

export function MarketShareChart({ data }: MarketShareChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState<MarketShareData[]>(data);

  // Always ensure we have data to display, even if empty array is passed
  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
    } else {
      // Fallback data if no data is provided
      setChartData([
        { name: "ChatGPT", value: 59.70, color: "#FF6B6B" },
        { name: "Microsoft Copilot", value: 14.40, color: "#4ECDC4" },
        { name: "Google Gemini", value: 13.50, color: "#45B7D1" },
        { name: "Perplexity", value: 6.20, color: "#96CEB4" },
        { name: "Claude AI", value: 3.20, color: "#FFEEAD" },
        { name: "Grok", value: 0.80, color: "#D4A5A5" },
        { name: "Deepseek", value: 0.70, color: "#9B59B6" }
      ]);
    }
  }, [data]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // Desktop and mobile radius settings
  const desktopOuterRadius = 140;
  const mobileOuterRadius = 80;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={120}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke={activeIndex === index ? 'rgba(0, 255, 255, 0.5)' : 'transparent'}
                strokeWidth={activeIndex === index ? 2 : 0}
                className={activeIndex === index ? 'animate-pulse-border' : ''}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Market Share']}
            contentStyle={{ 
              backgroundColor: 'rgba(10, 10, 25, 0.8)',
              borderColor: 'rgba(0, 255, 255, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 255, 255, 0.2)'
            }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            formatter={(value) => <span className="text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 