import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MarketShareChart } from "@/components/MarketShareChart";
import { GrowthChart } from "@/components/GrowthChart";
import { StatsCard } from "@/components/StatsCard";
import { BrainAnimation } from "@/components/BrainAnimation";
import { PlatformInfoDrawer } from "@/components/PlatformInfoDrawer";
import { useWebSocket } from "@/hooks/useWebSocket";
import { marketShareData as initialData } from "@shared/data";
import { AdsenseInFeed } from "@/components/AdsenseInFeed";
import { InsightsGenerator } from "@/components/InsightsGenerator";
import { Footer } from "@/components/Footer";
import { StatsSkeleton, ChartSkeleton, TableRowSkeleton } from "@/components/ui/skeleton";
import { LLMMetricsGrid } from "@/components/LLMMetricsGrid";
import { PlatformComparison } from "@/components/PlatformComparison";
import { HistoricalData } from "@/components/HistoricalData";
import { useState } from "react";
import { MarketShareData, PlatformData, LLMMetrics } from "@shared/data";

// Sample data for demonstration
const sampleMarketShareData: MarketShareData[] = [
  { name: "ChatGPT", value: 59.70, color: "#FF6B6B" },
  { name: "Microsoft Copilot", value: 14.40, color: "#4ECDC4" },
  { name: "Google Gemini", value: 13.50, color: "#45B7D1" },
  { name: "Perplexity", value: 6.20, color: "#96CEB4" },
  { name: "Claude AI", value: 3.20, color: "#FFEEAD" },
  { name: "Grok", value: 0.80, color: "#D4A5A5" },
  { name: "Deepseek", value: 0.70, color: "#9B59B6" }
];

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
  const { data: marketShareData, error, isReconnecting } = useWebSocket(initialData);
  const isLoading = !marketShareData || isReconnecting;
  const [platformData] = useState(samplePlatformData);
  const [llmMetrics] = useState(sampleLLMMetrics);

  // Convert MarketShareEntry[] to MarketShareData[]
  const marketShareChartData: MarketShareData[] = marketShareData.map(entry => ({
    name: entry.name,
    value: entry.share,
    color: getColorForPlatform(entry.name)
  }));

  if (error) {
    console.error('WebSocket error:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient-xy" />
      <BrainAnimation />
      <div className="fixed inset-0 bg-[linear-gradient(var(--primary)_1px,_transparent_1px),_linear-gradient(90deg,_var(--primary)_1px,_transparent_1px)] bg-[size:20px_20px] [background-position:center] opacity-30 animate-cyber-grid" />

      {/* Navigation */}
      <nav className="relative border-b border-slate-200 dark:border-primary/20 bg-background/30 backdrop-blur-xl z-10">
        <div className="container flex h-16 items-center px-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-primary dark:to-accent holographic-text flex-1"
          >
            Who's Winning the LLM Race?
          </motion.h1>
          <ThemeToggle />
        </div>
      </nav>

      <main className="container relative mx-auto px-4 py-8 z-10">
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-700 dark:text-cyan-400 text-lg"
          >
            AI Chatbot Market Share Dashboard - March 2025
          </motion.p>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6">
                  <StatsSkeleton />
                </Card>
              ))}
            </>
          ) : (
            <>
              <StatsCard
                title="Total Market Leaders"
                value="7"
                description="Major players tracked"
              />
              <StatsCard
                title="Market Leader"
                value={marketShareData.find(item => item.share === Math.max(...marketShareData.map(item => item.share)))?.name || "ChatGPT"}
                description={`${(marketShareData.find(item => item.share === Math.max(...marketShareData.map(item => item.share)))?.share || 0).toFixed(3)}% market share`}
              />
              <StatsCard
                title="Fastest Growing"
                value={marketShareData.find(item => item.growth === Math.max(...marketShareData.map(item => item.growth)))?.name || "Claude AI"}
                description={`${(marketShareData.find(item => item.growth === Math.max(...marketShareData.map(item => item.growth)))?.growth || 0).toFixed(3)}% quarterly growth`}
              />
              <StatsCard
                title="Total Market Share"
                value={`${marketShareData.reduce((sum, item) => sum + item.share, 0).toFixed(3)}%`}
                description="All tracked platforms"
              />
            </>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-300 animate-hologram"
          >
            <Card className="p-6 h-full glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border overflow-hidden">
              {isLoading ? (
                <ChartSkeleton />
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-primary dark:to-accent">
                    Market Share Distribution
                  </h2>
                  <MarketShareChart data={marketShareChartData} />
                </>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-300 animate-hologram"
          >
            <Card className="p-6 h-full glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border overflow-hidden">
              {isLoading ? (
                <ChartSkeleton />
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-primary dark:to-accent">
                    Quarterly Growth Rates
                  </h2>
                  <GrowthChart data={platformData} />
                </>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Ad Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <AdsenseInFeed />
        </motion.div>

        {/* Detailed Breakdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className="transform transition-all duration-300 animate-hologram"
        >
          <Card className="p-6 glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border">
            <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-primary dark:to-accent">
              Detailed Breakdown
            </h2>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(7)].map((_, i) => (
                    <TableRowSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-primary/20">
                      <th className="text-left py-4 px-4 text-slate-700 dark:text-cyan-400">Platform</th>
                      <th className="text-left py-4 px-4 text-slate-700 dark:text-cyan-400">Market Share</th>
                      <th className="text-left py-4 px-4 text-slate-700 dark:text-cyan-400">Growth</th>
                      <th className="text-left py-4 px-4 text-slate-700 dark:text-cyan-400">Description</th>
                      <th className="text-left py-4 px-4 text-slate-700 dark:text-cyan-400">LLMs Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketShareData.map((item, index) => (
                      <tr
                        key={item.name}
                        className={`border-b border-slate-200 dark:border-primary/20 hover:bg-slate-100 dark:hover:bg-cyan-500/5 transition-colors ${
                          index === marketShareData.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          <PlatformInfoDrawer platform={item.name}>
                            <button className="hover:text-slate-900 dark:hover:text-cyan-400 transition-colors">
                              {item.name}
                            </button>
                          </PlatformInfoDrawer>
                        </td>
                        <td className="py-4 px-4">{item.share.toFixed(3)}%</td>
                        <td className="py-4 px-4 text-slate-700 dark:text-cyan-400">{item.growth.toFixed(3)}% ▲</td>
                        <td className="py-4 px-4">{item.description}</td>
                        <td className="py-4 px-4">{item.llms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="mt-6 text-sm text-slate-500 dark:text-cyan-400/70 italic text-right">
              Source: FirstPageSage, March 6, 2025
            </div>
          </Card>
        </motion.div>

        <div className="mt-8">
          <InsightsGenerator />
        </div>

        {/* Technical Metrics Section - Moved after InsightsGenerator */}
        <div className="mt-8">
          {isLoading ? (
            <Card className="p-6">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, j) => (
                      <TableRowSkeleton key={j} />
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <LLMMetricsGrid data={llmMetrics} />
          )}
        </div>

        {/* Platform Comparison Section */}
        <div className="mt-8">
          <PlatformComparison data={platformData} />
        </div>

        {/* Historical Data Section */}
        <div className="mt-8">
          <HistoricalData data={platformData} />
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