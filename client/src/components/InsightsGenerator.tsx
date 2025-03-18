import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Sparkles, Copy, Share2, Mail, MessageSquare } from "lucide-react";
import { SiNotion, SiSlack, SiWhatsapp } from "react-icons/si";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(insights);
      toast({
        title: "Copied to clipboard",
        description: "The insights have been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
        variant: "destructive",
      });
    }
  };

  const shareToEmail = () => {
    const subject = encodeURIComponent("AI Chatbot Market Insights");
    const body = encodeURIComponent(insights);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareToSlack = () => {
    // Using Slack's Web API to share content
    const text = encodeURIComponent(insights);
    window.open(`https://slack.com/share?text=${text}`);
  };

  const shareToNotion = () => {
    // Using Notion's sharing URL scheme
    const text = encodeURIComponent(insights);
    window.open(`https://www.notion.so/create-page?title=AI%20Market%20Insights&content=${text}`);
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(insights);
    window.open(`https://wa.me/?text=${text}`);
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
              <div className="flex justify-end gap-2 mb-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="hover:bg-cyan-500/10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-cyan-500/10"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={shareToEmail}>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={shareToSlack}>
                      <SiSlack className="mr-2 h-4 w-4" />
                      <span>Slack</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={shareToNotion}>
                      <SiNotion className="mr-2 h-4 w-4" />
                      <span>Notion</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={shareToWhatsApp}>
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      <span>WhatsApp</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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