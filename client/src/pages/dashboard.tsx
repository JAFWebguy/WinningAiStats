import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MarketShareChart } from "@/components/MarketShareChart";
import { GrowthChart } from "@/components/GrowthChart";
import { StatsCard } from "@/components/StatsCard";
import { useWebSocket } from "@/hooks/useWebSocket";
import { marketShareData as initialData, PlatformData, LLMMetrics } from "@shared/data";
import { InsightsGenerator } from "@/components/InsightsGenerator";
import { Footer } from "@/components/Footer";
import { ChartSkeleton, TableRowSkeleton } from "@/components/ui/skeleton";
import { LLMMetricsGrid } from "@/components/LLMMetricsGrid";
import { PlatformComparison } from "@/components/PlatformComparison";
import { HistoricalData } from "@/components/HistoricalData";
import { useState } from "react";

// Sample data for demonstration
const samplePlatformData: PlatformData[] = [
  { name: "ChatGPT", marketShare: 59.70, growth: 8, revenue: 1000000000, userBase: 100000000 },
  { name: "Microsoft Copilot", marketShare: 14.40, growth: 6, revenue: 500000000, userBase: 50000000 },
  { name: "Google Gemini", marketShare: 13.50, growth: 5, revenue: 400000000, userBase: 40000000 },
  { name: "Perplexity", marketShare: 6.20, growth: 10, revenue: 100000000, userBase: 10000000 },
  { name: "Claude AI", marketShare: 3.20, growth: 14, revenue: 80000000, userBase: 8000000 },
  { name: "Grok", marketShare: 0.80, growth: 12, revenue: 20000000, userBase: 2000000 },
  { name: "Deepseek", marketShare: 0.70, growth: 10, revenue: 15000000, userBase: 1500000 }
];

const sampleLLMMetrics: LLMMetrics[] = [
  {
    name: "GPT-4",
    parameters: 175,
    trainingTokens: 1500000000,
    inferenceSpeed: 500,
    costPerToken: 0.03,
    releaseDate: "2023-03-14"
  },
  {
    name: "Claude 3",
    parameters: 400,
    trainingTokens: 1200000000,
    inferenceSpeed: 450,
    costPerToken: 0.028,
    releaseDate: "2023-07-14"
  },
  {
    name: "Gemini",
    parameters: 785,
    trainingTokens: 2000000000,
    inferenceSpeed: 400,
    costPerToken: 0.025,
    releaseDate: "2023-05-10"
  }
];

export function Dashboard() {
  const { data: marketShareData, error, isConnected, isReconnecting } = useWebSocket(initialData);
  const [platformData] = useState(samplePlatformData);
  const [llmMetrics] = useState(sampleLLMMetrics);

  // Convert MarketShareEntry[] to MarketShareData[]
  const marketShareChartData = marketShareData.map(entry => ({
    name: entry.name,
    value: entry.share,
    color: getColorForPlatform(entry.name)
  }));

  if (error) {
    console.error('WebSocket error:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">AI Stats</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="container py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Market Share"
            value={`${marketShareData.reduce((sum, item) => sum + item.share, 0).toFixed(2)}%`}
            description="Combined market share of all platforms"
            icon="chart"
          />
          <StatsCard
            title="Average Growth Rate"
            value={`${(marketShareData.reduce((sum, item) => sum + item.growth, 0) / marketShareData.length).toFixed(1)}%`}
            description="Average quarterly growth across platforms"
            icon="trending-up"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${(platformData.reduce((sum, item) => sum + item.revenue, 0) / 1000000000).toFixed(2)}B`}
            description="Combined revenue of all platforms"
            icon="dollar-sign"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Market Share Distribution</h2>
            {!isConnected ? (
              <ChartSkeleton />
            ) : (
              <MarketShareChart data={marketShareChartData} />
            )}
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Growth Trends</h2>
            {!isConnected ? (
              <ChartSkeleton />
            ) : (
              <GrowthChart data={platformData} />
            )}
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">LLM Metrics</h2>
            {!isConnected ? (
              <TableRowSkeleton />
            ) : (
              <LLMMetricsGrid data={llmMetrics} />
            )}
          </Card>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Platform Comparison</h2>
            {!isConnected ? (
              <TableRowSkeleton />
            ) : (
              <PlatformComparison data={platformData} />
            )}
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Historical Data</h2>
            {!isConnected ? (
              <TableRowSkeleton />
            ) : (
              <HistoricalData data={platformData} />
            )}
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">AI Insights Generator</h2>
            <InsightsGenerator />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Helper function to get colors for platforms
function getColorForPlatform(name: string): string {
  const colors: Record<string, string> = {
    "ChatGPT": "#FF6B6B",
    "Microsoft Copilot": "#4ECDC4",
    "Google Gemini": "#45B7D1",
    "Perplexity": "#96CEB4",
    "Claude AI": "#FFEEAD",
    "Grok": "#D4A5A5",
    "Deepseek": "#9B59B6"
  };
  return colors[name] || "#8884d8";
}