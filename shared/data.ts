export interface LLMMetrics {
  name: string;
  parameters: number;
  trainingTokens: number | string;
  inferenceSpeed: number;
  costPerToken: number | string;
  releaseDate: string;
}

export interface PlatformData {
  name: string;
  marketShare: number;
  growth: number;
  revenue: number;
  userBase: number;
}

export interface MarketShareData {
  name: string;
  value: number;
  color: string;
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
      name: "GPT-4",
      parameters: 175,
      trainingTokens: 1500000000,
      inferenceSpeed: 500,
      costPerToken: 0.03,
      releaseDate: "2023-03-14"
    }
  },
  { 
    name: "Microsoft Copilot",
    share: 14.40,
    growth: 6,
    description: "General-purpose AI assistant",
    llms: "GPT-4",
    metrics: {
      name: "GPT-4",
      parameters: 175,
      trainingTokens: 1000000000,
      inferenceSpeed: 600,
      costPerToken: "Subscription based",
      releaseDate: "2023-03-14"
    }
  },
  { 
    name: "Google Gemini",
    share: 13.50,
    growth: 5,
    description: "General-purpose AI assistant",
    llms: "Gemini",
    metrics: {
      name: "Gemini",
      parameters: 785,
      trainingTokens: 2000000000,
      inferenceSpeed: 400,
      costPerToken: 0.025,
      releaseDate: "2023-05-10"
    }
  },
  { 
    name: "Perplexity",
    share: 6.20,
    growth: 10,
    description: "Accuracy-focused AI search engine",
    llms: "Mistral 7B, Llama 2",
    metrics: {
      name: "Mistral 7B",
      parameters: 70,
      trainingTokens: 800000000,
      inferenceSpeed: 300,
      costPerToken: "Free tier available",
      releaseDate: "2023-07-04"
    }
  },
  { 
    name: "Claude AI",
    share: 3.20,
    growth: 14,
    description: "Business-focused AI assistant",
    llms: "Claude 3",
    metrics: {
      name: "Claude 3",
      parameters: 400,
      trainingTokens: 1200000000,
      inferenceSpeed: 450,
      costPerToken: 0.028,
      releaseDate: "2023-07-14"
    }
  },
  { 
    name: "Grok",
    share: 0.80,
    growth: 12,
    description: "General-purpose AI search engine",
    llms: "Grok 2, Grok 3",
    metrics: {
      name: "Grok 2",
      parameters: 300,
      trainingTokens: "Real-time training",
      inferenceSpeed: 550,
      costPerToken: "Subscription only",
      releaseDate: "2023-07-14"
    }
  },
  { 
    name: "Deepseek",
    share: 0.70,
    growth: 10,
    description: "General-purpose AI search engine",
    llms: "DeepSeek V3",
    metrics: {
      name: "DeepSeek V3",
      parameters: 200,
      trainingTokens: 700000000,
      inferenceSpeed: 600,
      costPerToken: "Contact sales",
      releaseDate: "2023-07-14"
    }
  }
];