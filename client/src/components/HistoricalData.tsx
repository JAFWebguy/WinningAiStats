import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { marketShareData } from '@shared/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoricalData {
  platformName: string;
  marketShare: number;
  growth: number;
  timestamp: string;
}

export function HistoricalData() {
  const [platform, setPlatform] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalData = async () => {
    if (!platform) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        platform,
        ...(startDate && { startDate: startDate.toISOString() }),
        ...(endDate && { endDate: endDate.toISOString() }),
      });
      
      const response = await fetch(`/api/market-share-history?${params}`);
      if (!response.ok) throw new Error('Failed to fetch historical data');
      
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const chartData = historicalData.map(data => ({
    ...data,
    timestamp: new Date(data.timestamp).toLocaleDateString(),
  }));

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Historical Market Data</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Platform</label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              {marketShareData.map(p => (
                <SelectItem key={p.name} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate as Date}
                onSelect={(date: Date | undefined) => setStartDate(date ?? null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate as Date}
                onSelect={(date: Date | undefined) => setEndDate(date ?? null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <Button
          onClick={fetchHistoricalData}
          disabled={!platform || loading}
          className="self-end"
          variant="default"
        >
          Fetch Data
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {loading && (
        <div className="text-center py-8">Loading historical data...</div>
      )}

      {historicalData.length > 0 && (
        <div className="space-y-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="marketShare"
                  stroke="#8884d8"
                  name="Market Share (%)"
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#82ca9d"
                  name="Growth (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Market Share (%)</th>
                  <th className="text-left py-2">Growth (%)</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{data.timestamp}</td>
                    <td className="py-2">{data.marketShare.toFixed(2)}</td>
                    <td className="py-2">{data.growth.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
} 