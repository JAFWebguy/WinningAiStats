export interface LLMMetrics {
  parameters: string;
  trainingDataSize: string;
  averageLatency: string;
  supportedLanguages: number;
  apiPricing: string;
  hardwareRequirements: string;
}

export interface MarketShareEntry {
  name: string;
  share: number;
  growth: number;
  description: string;
  llms: string;
  metrics: LLMMetrics;
}

export const marketShareData: MarketShareEntry[] = [
  { 
    name: "ChatGPT",
    share: 59.70,
    growth: 8,
    description: "General-purpose AI chatbot",
    llms: "GPT-3.5, GPT-4",
    metrics: {
      parameters: "175B (GPT-4)",
      trainingDataSize: "Estimated 1.5T tokens",
      averageLatency: "500-800ms",
      supportedLanguages: 95,
      apiPricing: "$0.03/1K tokens",
      hardwareRequirements: "GPU optimized"
    }
  },
  { 
    name: "Microsoft Copilot",
    share: 14.40,
    growth: 6,
    description: "General-purpose AI assistant",
    llms: "GPT-4",
    metrics: {
      parameters: "175B (GPT-4)",
      trainingDataSize: "1.0T tokens",
      averageLatency: "600-900ms",
      supportedLanguages: 85,
      apiPricing: "Subscription based",
      hardwareRequirements: "Cloud-based"
    }
  },
  { 
    name: "Google Gemini",
    share: 13.50,
    growth: 5,
    description: "General-purpose AI assistant",
    llms: "Gemini",
    metrics: {
      parameters: "785B (Ultra)",
      trainingDataSize: "Estimated 2.0T tokens",
      averageLatency: "400-600ms",
      supportedLanguages: 120,
      apiPricing: "$0.025/1K tokens",
      hardwareRequirements: "TPU optimized"
    }
  },
  { 
    name: "Perplexity",
    share: 6.20,
    growth: 10,
    description: "Accuracy-focused AI search engine",
    llms: "Mistral 7B, Llama 2",
    metrics: {
      parameters: "70B (Combined)",
      trainingDataSize: "800B tokens",
      averageLatency: "300-500ms",
      supportedLanguages: 30,
      apiPricing: "Free tier available",
      hardwareRequirements: "Mixed precision"
    }
  },
  { 
    name: "Claude AI",
    share: 3.20,
    growth: 14,
    description: "Business-focused AI assistant",
    llms: "Claude 3",
    metrics: {
      parameters: "400B+",
      trainingDataSize: "Estimated 1.2T tokens",
      averageLatency: "450-750ms",
      supportedLanguages: 75,
      apiPricing: "$0.028/1K tokens",
      hardwareRequirements: "Cloud optimized"
    }
  },
  { 
    name: "Grok",
    share: 0.80,
    growth: 12,
    description: "General-purpose AI search engine",
    llms: "Grok 2, Grok 3",
    metrics: {
      parameters: "300B+",
      trainingDataSize: "Real-time training",
      averageLatency: "550-850ms",
      supportedLanguages: 45,
      apiPricing: "Subscription only",
      hardwareRequirements: "Custom hardware"
    }
  },
  { 
    name: "Deepseek",
    share: 0.70,
    growth: 10,
    description: "General-purpose AI search engine",
    llms: "DeepSeek V3",
    metrics: {
      parameters: "200B",
      trainingDataSize: "700B tokens",
      averageLatency: "600-900ms",
      supportedLanguages: 25,
      apiPricing: "Contact sales",
      hardwareRequirements: "GPU optimized"
    }
  }
];