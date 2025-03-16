// Initial market share data
export const marketShareData = [
  { name: "ChatGPT", share: 59.70, growth: 8, description: "General-purpose AI chatbot", llms: "GPT-3.5, GPT-4" },
  { name: "Microsoft Copilot", share: 14.40, growth: 6, description: "General-purpose AI assistant", llms: "GPT-4" },
  { name: "Google Gemini", share: 13.50, growth: 5, description: "General-purpose AI assistant", llms: "Gemini" },
  { name: "Perplexity", share: 6.20, growth: 10, description: "Accuracy-focused AI search engine", llms: "Mistral 7B, Llama 2" },
  { name: "Claude AI", share: 3.20, growth: 14, description: "Business-focused AI assistant", llms: "Claude 3" },
  { name: "Grok", share: 0.80, growth: 12, description: "General-purpose AI search engine", llms: "Grok 2, Grok 3" },
  { name: "Deepseek", share: 0.70, growth: 10, description: "General-purpose AI search engine", llms: "DeepSeek V3" }
];

// Type definitions for historical data
export interface MarketShareDataPoint {
  name: string;
  share: number;
  growth: number;
  description: string;
  llms: string;
  timestamp?: Date;
}

export interface HistoricalDataPoint {
  timestamp: Date;
  data: MarketShareDataPoint[];
}

// Initialize historical data with the current state
export const historicalData: HistoricalDataPoint[] = [
  {
    timestamp: new Date(),
    data: marketShareData
  }
];