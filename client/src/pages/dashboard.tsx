import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MarketShareChart } from "@/components/MarketShareChart";
import { GrowthChart } from "@/components/GrowthChart";
import { StatsCard } from "@/components/StatsCard";

const marketShareData = [
  { name: "ChatGPT", share: 59.70, growth: 8, description: "General-purpose AI chatbot", llms: "GPT-3.5, GPT-4" },
  { name: "Microsoft Copilot", share: 14.40, growth: 6, description: "General-purpose AI assistant", llms: "GPT-4" },
  { name: "Google Gemini", share: 13.50, growth: 5, description: "General-purpose AI assistant", llms: "Gemini" },
  { name: "Perplexity", share: 6.20, growth: 10, description: "Accuracy-focused AI search engine", llms: "Mistral 7B, Llama 2" },
  { name: "Claude AI", share: 3.20, growth: 14, description: "Business-focused AI assistant", llms: "Claude 3" }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-foreground"
          >
            Who's Winning: AI Chatbot Market Share
          </motion.h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Market Leaders"
            value="5"
            description="Major players with >1% share"
          />
          <StatsCard
            title="Market Leader"
            value="ChatGPT"
            description="59.70% market share"
          />
          <StatsCard
            title="Fastest Growing"
            value="Claude AI"
            description="14% quarterly growth"
          />
          <StatsCard
            title="Total Market Share"
            value="97%"
            description="Top 5 platforms combined"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Market Share Distribution</h2>
            <MarketShareChart data={marketShareData} />
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quarterly Growth Rates</h2>
            <GrowthChart data={marketShareData} />
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Detailed Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4">Platform</th>
                  <th className="text-left py-4">Market Share</th>
                  <th className="text-left py-4">Growth</th>
                  <th className="text-left py-4">Description</th>
                  <th className="text-left py-4">LLMs Used</th>
                </tr>
              </thead>
              <tbody>
                {marketShareData.map((item) => (
                  <tr key={item.name} className="border-b">
                    <td className="py-4">{item.name}</td>
                    <td className="py-4">{item.share}%</td>
                    <td className="py-4">{item.growth}% ▲</td>
                    <td className="py-4">{item.description}</td>
                    <td className="py-4">{item.llms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
