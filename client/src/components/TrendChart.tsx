import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HistoricalDataPoint } from '@shared/data';

interface TrendChartProps {
  data: HistoricalDataPoint[];
  platform?: string; // Optional: to focus on a specific platform
}

export function TrendChart({ data, platform }: TrendChartProps) {
  // Process data for the chart
  const processedData = data.map(point => {
    const timestamp = new Date(point.timestamp);
    const formattedTime = timestamp.toLocaleTimeString();
    
    const dataPoint: { [key: string]: any } = {
      timestamp: formattedTime,
    };

    point.data.forEach(item => {
      if (!platform || item.name === platform) {
        dataPoint[`${item.name} Share`] = Number(item.share.toFixed(3));
        dataPoint[`${item.name} Growth`] = Number(item.growth.toFixed(3));
      }
    });

    return dataPoint;
  });

  // Generate colors for each platform
  const colors = [
    'rgba(0, 255, 255, 0.8)',   // Cyan
    'rgba(255, 0, 255, 0.8)',   // Magenta
    'rgba(0, 255, 0, 0.8)',     // Green
    'rgba(255, 255, 0, 0.8)',   // Yellow
    'rgba(255, 51, 102, 0.8)',  // Pink
    'rgba(51, 153, 255, 0.8)',  // Blue
    'rgba(255, 128, 0, 0.8)'    // Orange
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={processedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
        <XAxis 
          dataKey="timestamp"
          stroke="rgba(0, 255, 255, 0.7)"
          opacity={0.7}
        />
        <YAxis 
          yAxisId="share"
          label={{ 
            value: 'Market Share %',
            angle: -90,
            position: 'insideLeft',
            style: { fill: 'rgba(0, 255, 255, 0.7)' }
          }}
          stroke="rgba(0, 255, 255, 0.7)"
          opacity={0.7}
        />
        <YAxis 
          yAxisId="growth"
          orientation="right"
          label={{ 
            value: 'Growth %',
            angle: 90,
            position: 'insideRight',
            style: { fill: 'rgba(0, 255, 255, 0.7)' }
          }}
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
          labelStyle={{
            color: 'rgba(0, 255, 255, 0.9)'
          }}
        />
        <Legend 
          wrapperStyle={{
            color: 'rgba(0, 255, 255, 0.9)'
          }}
        />
        {data[0].data.map((item, index) => {
          if (!platform || item.name === platform) {
            return (
              <>
                <Line
                  key={`share-${item.name}`}
                  type="monotone"
                  dataKey={`${item.name} Share`}
                  stroke={colors[index]}
                  yAxisId="share"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  key={`growth-${item.name}`}
                  type="monotone"
                  dataKey={`${item.name} Growth`}
                  stroke={colors[index]}
                  strokeDasharray="5 5"
                  yAxisId="growth"
                  dot={false}
                  strokeWidth={2}
                />
              </>
            );
          }
          return null;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
