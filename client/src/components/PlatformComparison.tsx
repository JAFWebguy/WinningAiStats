import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { marketShareData } from '@shared/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRightIcon, GitCompareIcon } from 'lucide-react';

interface ComparisonData {
  platform1: string;
  platform2: string;
  comparisonMetrics: {
    marketShare: {
      platform1: number;
      platform2: number;
    };
    growth: {
      platform1: number;
      platform2: number;
    };
    metrics: {
      [key: string]: {
        platform1: string | number;
        platform2: string | number;
      };
    };
  };
}

export function PlatformComparison() {
  const [platform1, setPlatform1] = useState('');
  const [platform2, setPlatform2] = useState('');
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComparison = async () => {
    if (!platform1 || !platform2) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/compare-platforms?platform1=${encodeURIComponent(platform1)}&platform2=${encodeURIComponent(platform2)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch comparison data');
      }
      
      const data = await response.json();
      setComparisonData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Comparison error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        Platform Comparison
        <GitCompareIcon className="h-5 w-5 text-muted-foreground" />
      </h2>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">First Platform</label>
          <Select value={platform1} onValueChange={setPlatform1}>
            <SelectTrigger>
              <SelectValue placeholder="Select first platform" />
            </SelectTrigger>
            <SelectContent>
              {marketShareData.map(platform => (
                <SelectItem key={platform.name} value={platform.name}>
                  {platform.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ArrowRightIcon className="h-5 w-5 text-muted-foreground self-end mb-3" />
        
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Second Platform</label>
          <Select value={platform2} onValueChange={setPlatform2}>
            <SelectTrigger>
              <SelectValue placeholder="Select second platform" />
            </SelectTrigger>
            <SelectContent>
              {marketShareData.map(platform => (
                <SelectItem key={platform.name} value={platform.name}>
                  {platform.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={fetchComparison}
          disabled={!platform1 || !platform2 || loading}
          className="self-end"
          variant="default"
        >
          {loading ? 'Comparing...' : 'Compare'}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-muted-foreground">
          Comparing platforms...
        </div>
      )}

      {comparisonData && (
        <div className="space-y-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                {
                  metric: 'Market Share',
                  [platform1]: comparisonData.comparisonMetrics.marketShare.platform1,
                  [platform2]: comparisonData.comparisonMetrics.marketShare.platform2,
                },
                {
                  metric: 'Growth Rate',
                  [platform1]: comparisonData.comparisonMetrics.growth.platform1,
                  [platform2]: comparisonData.comparisonMetrics.growth.platform2,
                }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={platform1}
                  stroke="#8884d8"
                  name={platform1}
                />
                <Line
                  type="monotone"
                  dataKey={platform2}
                  stroke="#82ca9d"
                  name={platform2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{platform1}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Share:</span>
                  <span className="font-medium">{comparisonData.comparisonMetrics.marketShare.platform1}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Growth Rate:</span>
                  <span className="font-medium">{comparisonData.comparisonMetrics.growth.platform1}%</span>
                </div>
                {Object.entries(comparisonData.comparisonMetrics.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium">{value.platform1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{platform2}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Share:</span>
                  <span className="font-medium">{comparisonData.comparisonMetrics.marketShare.platform2}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Growth Rate:</span>
                  <span className="font-medium">{comparisonData.comparisonMetrics.growth.platform2}%</span>
                </div>
                {Object.entries(comparisonData.comparisonMetrics.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium">{value.platform2}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
} 