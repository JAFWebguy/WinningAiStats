import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { MarketShareEntry } from "@shared/data";
import { Cpu, Globe, Clock, DollarSign, Server, Database, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            <Accordion type="multiple" className="w-full">
              {leftColumnData.map((platform) => (
                <AccordionItem key={platform.name} value={platform.name} className="border-none">
                  <Card className="p-4 backdrop-blur-sm bg-white/5 border-slate-200 dark:border-cyan-500/20">
                    <AccordionTrigger className="hover:no-underline">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-cyan-400 flex items-center gap-2">
                        {platform.name}
                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 dark:text-cyan-500 transition-transform duration-200" />
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Cpu className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                          <span className="text-slate-600 dark:text-slate-300">Parameters:</span>
                          <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.parameters}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                          <span className="text-slate-600 dark:text-slate-300">Training Data:</span>
                          <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.trainingDataSize}</span>
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
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column - 3 items */}
          <div className="space-y-4">
            <Accordion type="multiple" className="w-full">
              {rightColumnData.map((platform) => (
                <AccordionItem key={platform.name} value={platform.name} className="border-none">
                  <Card className="p-4 backdrop-blur-sm bg-white/5 border-slate-200 dark:border-cyan-500/20">
                    <AccordionTrigger className="hover:no-underline">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-cyan-400 flex items-center gap-2">
                        {platform.name}
                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 dark:text-cyan-500 transition-transform duration-200" />
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Cpu className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                          <span className="text-slate-600 dark:text-slate-300">Parameters:</span>
                          <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.parameters}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Database className="h-4 w-4 text-slate-500 dark:text-cyan-500" />
                          <span className="text-slate-600 dark:text-slate-300">Training Data:</span>
                          <span className="text-slate-900 dark:text-cyan-400">{platform.metrics.trainingDataSize}</span>
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
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}