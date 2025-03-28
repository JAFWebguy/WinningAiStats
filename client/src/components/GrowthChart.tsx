import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PlatformData } from "@shared/data";

interface GrowthChartProps {
  data: PlatformData[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="growth" fill="#8884d8" name="Growth Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}