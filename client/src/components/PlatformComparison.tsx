import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlatformData } from "@shared/data";

interface PlatformComparisonProps {
  data: PlatformData[];
}

export function PlatformComparison({ data }: PlatformComparisonProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="font-medium">Platform</div>
        <div className="font-medium">Market Share</div>
        <div className="font-medium">Growth</div>
        <div className="font-medium">Revenue</div>
      </div>
      {data.map((platform) => (
        <div key={platform.name} className="grid grid-cols-4 gap-4">
          <div>{platform.name}</div>
          <div>{platform.marketShare}%</div>
          <div>{platform.growth}%</div>
          <div>${(platform.revenue / 1000000).toFixed(1)}M</div>
        </div>
      ))}
    </div>
  );
} 