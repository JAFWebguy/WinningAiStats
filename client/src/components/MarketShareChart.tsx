import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface MarketShareChartProps {
  data: Array<{
    name: string;
    share: number;
  }>;
}

const COLORS = [
  'rgba(0, 255, 255, 0.8)',   // Cyan
  'rgba(255, 0, 255, 0.8)',   // Magenta
  'rgba(0, 255, 0, 0.8)',     // Green
  'rgba(255, 255, 0, 0.8)',   // Yellow
  'rgba(255, 51, 102, 0.8)',  // Pink
  'rgba(51, 153, 255, 0.8)',  // Blue
  'rgba(255, 128, 0, 0.8)'    // Orange
];

export function MarketShareChart({ data }: MarketShareChartProps) {
  // Calculate responsive outer radius based on screen size
  const mobileOuterRadius = 100;
  const desktopOuterRadius = 150;

  return (
    <div className="h-[250px] md:h-[400px]"> {/* Container with responsive height */}
      <ResponsiveContainer width="100%" height="100%">
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
            outerRadius={({ viewBox }) => {
              // viewBox will be smaller on mobile due to container height
              return viewBox?.height ? Math.min(viewBox.height / 2.5, desktopOuterRadius) : mobileOuterRadius;
            }}
            fill="#8884d8"
            dataKey="share"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#colorGradient-${index})`} 
                style={{ filter: 'blur(0.5px)' }}
              />
            ))}
          </Pie>
          <Legend 
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              opacity: 0.8,
              fontSize: '12px',
              paddingTop: '20px' // Add some padding to prevent overlap
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}