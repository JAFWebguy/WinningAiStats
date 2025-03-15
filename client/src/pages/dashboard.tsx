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
    <div className="min-h-screen bg-black">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-gradient-xy" />

      {/* Cyber grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(transparent_1px,_#000_1px),_linear-gradient(90deg,_transparent_1px,_#000_1px)] bg-[size:30px_30px] [background-position:center] opacity-20 animate-cyber-grid" />

      <nav className="relative border-b border-purple-500/20 bg-black/50 backdrop-blur-xl z-10">
        <div className="container flex h-16 items-center px-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex-1"
          >
            Who's Winning
          </motion.h1>
          <ThemeToggle />
        </div>
      </nav>

      <main className="container relative mx-auto px-4 py-8 z-10">
        <div className="mb-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-purple-400 text-lg"
          >
            AI Chatbot Market Share Dashboard - March 2025
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-300"
          >
            <Card className="p-6 h-full bg-black/50 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] animate-pulse-border overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Market Share Distribution
              </h2>
              <MarketShareChart data={marketShareData} />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-300"
          >
            <Card className="p-6 h-full bg-black/50 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse-border overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
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
          whileHover={{ scale: 1.01 }}
          className="transform transition-all duration-300"
        >
          <Card className="p-6 bg-black/50 backdrop-blur-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] animate-pulse-border">
            <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Detailed Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-purple-400">Platform</th>
                    <th className="text-left py-4 px-4 text-purple-400">Market Share</th>
                    <th className="text-left py-4 px-4 text-purple-400">Growth</th>
                    <th className="text-left py-4 px-4 text-purple-400">Description</th>
                    <th className="text-left py-4 px-4 text-purple-400">LLMs Used</th>
                  </tr>
                </thead>
                <tbody>
                  {marketShareData.map((item, index) => (
                    <tr 
                      key={item.name} 
                      className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                        index === marketShareData.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-4">{item.name}</td>
                      <td className="py-4 px-4">{item.share}%</td>
                      <td className="py-4 px-4 text-green-400">{item.growth}% ▲</td>
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