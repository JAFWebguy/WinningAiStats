import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { MarketShareEntry } from "@shared/data";
import { FlippableCard } from "./FlippableCard";

interface LLMMetricsGridProps {
  data: MarketShareEntry[];
}

export function LLMMetricsGrid({ data }: LLMMetricsGridProps) {
  // Split data into two columns: 4 items for left, 3 for right
  const leftColumnData = data.slice(0, 4);
  const rightColumnData = data.slice(4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="transform transition-all duration-300 animate-hologram"
    >
      <Card className="p-6 glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,255,255,0.15)] animate-pulse-border">
        <h2 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-primary dark:to-accent">
          Technical Metrics & Capabilities
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - 4 items */}
          <div className="space-y-4">
            {leftColumnData.map((platform) => (
              <FlippableCard key={platform.name} platform={platform} />
            ))}
          </div>

          {/* Right Column - 3 items */}
          <div className="space-y-4">
            {rightColumnData.map((platform) => (
              <FlippableCard key={platform.name} platform={platform} />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}