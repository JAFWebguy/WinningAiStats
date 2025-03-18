import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

const FOCUS_OPTIONS = [
  { value: "market trends", label: "Market Trends" },
  { value: "growth analysis", label: "Growth Analysis" },
  { value: "competitive landscape", label: "Competitive Landscape" },
  { value: "future predictions", label: "Future Predictions" }
];

export function InsightsGenerator() {
  const [insights, setInsights] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState("market trends");
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiRequest('POST', '/api/generate-insights', { focus });
      const data = await response.json();
      setInsights(data.insights);
    } catch (err) {
      setError('Failed to generate insights. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="transform transition-all duration-300 animate-hologram"
    >
      <Card className="p-6 glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,255,255,0.15)] animate-pulse-border">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-primary dark:to-accent flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Market Insights Generator
          </h2>
          
          <div className="flex items-center gap-4">
            <Select value={focus} onValueChange={setFocus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select focus" />
              </SelectTrigger>
              <SelectContent>
                {FOCUS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={generateInsights}
              disabled={isLoading}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Insights'
              )}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {insights && (
            <div className="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/20">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br />') }} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
