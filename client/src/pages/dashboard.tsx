import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MarketShareChart } from "@/components/MarketShareChart";
import { GrowthChart } from "@/components/GrowthChart";
import { StatsCard } from "@/components/StatsCard";
import { BrainAnimation } from "@/components/BrainAnimation";
import { PlatformInfoDrawer } from "@/components/PlatformInfoDrawer";

const marketShareData = [
  { name: "ChatGPT", share: 59.70, growth: 8, description: "General-purpose AI chatbot", llms: "GPT-3.5, GPT-4" },
  { name: "Microsoft Copilot", share: 14.40, growth: 6, description: "General-purpose AI assistant", llms: "GPT-4" },
  { name: "Google Gemini", share: 13.50, growth: 5, description: "General-purpose AI assistant", llms: "Gemini" },
  { name: "Perplexity", share: 6.20, growth: 10, description: "Accuracy-focused AI search engine", llms: "Mistral 7B, Llama 2" },
  { name: "Claude AI", share: 3.20, growth: 14, description: "Business-focused AI assistant", llms: "Claude 3" },
  { name: "Grok", share: 0.80, growth: 12, description: "General-purpose AI search engine", llms: "Grok 2, Grok 3" },
  { name: "Deepseek", share: 0.70, growth: 10, description: "General-purpose AI search engine", llms: "DeepSeek V3" }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black">
      {/* Holographic background effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-purple-900/10 animate-gradient-xy" />

      {/* Brain Animation */}
      <BrainAnimation />

      {/* Star Trek-style grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(0,255,255,0.03)_1px,_transparent_1px)] bg-[size:20px_20px] [background-position:center] opacity-30 animate-cyber-grid" />

      <nav className="relative border-b border-cyan-500/20 bg-black/30 backdrop-blur-xl z-10">
        <div className="container flex h-16 items-center px-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 holographic-text flex-1"
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
            className="text-cyan-400 text-lg holographic-text"
          >
            AI Chatbot Market Share Dashboard - March 2025
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Market Leaders"
            value="7"
            description="Major players tracked"
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
            value="98.5%"
            description="All tracked platforms"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-300 animate-hologram"
          >
            <Card className="p-6 h-full glass-effect border border-cyan-500/20 shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 holographic-text">
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
            className="transform transition-all duration-300 animate-hologram"
          >
            <Card className="p-6 h-full glass-effect border border-cyan-500/20 shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 holographic-text">
                Quarterly Growth Rates
              </h2>
              <GrowthChart data={marketShareData} />
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className="transform transition-all duration-300 animate-hologram"
        >
          <Card className="p-6 glass-effect border border-cyan-500/20 shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border">
            <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 holographic-text">
              Detailed Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/20">
                    <th className="text-left py-4 px-4 text-cyan-400 holographic-text">Platform</th>
                    <th className="text-left py-4 px-4 text-cyan-400 holographic-text">Market Share</th>
                    <th className="text-left py-4 px-4 text-cyan-400 holographic-text">Growth</th>
                    <th className="text-left py-4 px-4 text-cyan-400 holographic-text">Description</th>
                    <th className="text-left py-4 px-4 text-cyan-400 holographic-text">LLMs Used</th>
                  </tr>
                </thead>
                <tbody>
                  {marketShareData.map((item, index) => (
                    <tr
                      key={item.name}
                      className={`border-b border-cyan-500/20 hover:bg-cyan-500/5 transition-colors ${
                        index === marketShareData.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <PlatformInfoDrawer platform={item.name}>
                          <button className="hover:text-cyan-400 transition-colors">
                            {item.name}
                          </button>
                        </PlatformInfoDrawer>
                      </td>
                      <td className="py-4 px-4">{item.share}%</td>
                      <td className="py-4 px-4 text-cyan-400">{item.growth}% ▲</td>
                      <td className="py-4 px-4">{item.description}</td>
                      <td className="py-4 px-4">{item.llms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-sm text-cyan-400/70 italic text-right">
              Source: FirstPageSage, March 6, 2025
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}