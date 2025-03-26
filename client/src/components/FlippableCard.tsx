import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Cpu, Globe, Clock, DollarSign, Server, Database } from "lucide-react";
import type { MarketShareEntry } from "@shared/data";

interface FlippableCardProps {
  platform: MarketShareEntry;
}

export function FlippableCard({ platform }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative perspective-1000 w-full h-[300px] cursor-pointer"
      onClick={flipCard}
    >
      <AnimatePresence initial={false} mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute w-full h-full"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -180 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Card className="p-4 h-full backdrop-blur-sm bg-white/5 border-slate-200 dark:border-cyan-500/20 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-cyan-400">
                {platform.name}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Cpu className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Parameters:</span>
                  <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.parameters}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Latency:</span>
                  <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.averageLatency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Languages:</span>
                  <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.supportedLanguages}</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-slate-500 dark:text-cyan-400/70">
                Click to see more details
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute w-full h-full"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Card className="p-4 h-full backdrop-blur-sm bg-white/5 border-slate-200 dark:border-cyan-500/20 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-cyan-400">
                {platform.name} - Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Training Data:</span>
                  <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.trainingDataSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Pricing:</span>
                  <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.apiPricing}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Server className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Hardware:</span>
                  <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.hardwareRequirements}</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-slate-500 dark:text-cyan-400/70">
                Click to flip back
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
