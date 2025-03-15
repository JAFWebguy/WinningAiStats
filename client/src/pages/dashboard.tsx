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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-foreground flex-1"
          >
            Who's Winning
          </motion.h1>
          <ThemeToggle />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-muted-foreground text-lg"
          >
            AI Chatbot Market Share Dashboard - March 2025
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 h-full bg-gradient-to-br from-background to-background/95">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                Market Share Distribution
              </h2>
              <MarketShareChart data={marketShareData} />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 h-full bg-gradient-to-br from-background to-background/95">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                Quarterly Growth Rates
              </h2>
              <GrowthChart data={marketShareData} />
            </Card>
          </motion.div>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-background to-background/95">
            <h2 className="text-xl font-semibold mb-4">Detailed Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4">Platform</th>
                    <th className="text-left py-4 px-4">Market Share</th>
                    <th className="text-left py-4 px-4">Growth</th>
                    <th className="text-left py-4 px-4">Description</th>
                    <th className="text-left py-4 px-4">LLMs Used</th>
                  </tr>
                </thead>
                <tbody>
                  {marketShareData.map((item, index) => (
                    <tr 
                      key={item.name} 
                      className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${
                        index === marketShareData.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-4">{item.name}</td>
                      <td className="py-4 px-4">{item.share}%</td>
                      <td className="py-4 px-4">{item.growth}% ▲</td>
                      <td className="py-4 px-4">{item.description}</td>
                      <td className="py-4 px-4">{item.llms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}