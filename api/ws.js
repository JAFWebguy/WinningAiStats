// WebSocket API fallback for Vercel deployment
export default function handler(req, res) {
  // Sample data to return if WebSocket isn't available
  const sampleData = [
    { name: "ChatGPT", share: 59.70, growth: 8 },
    { name: "Microsoft Copilot", share: 14.40, growth: 6 },
    { name: "Google Gemini", share: 13.50, growth: 5 },
    { name: "Perplexity", share: 6.20, growth: 10 },
    { name: "Claude AI", share: 3.20, growth: 14 },
    { name: "Grok", share: 0.80, growth: 12 },
    { name: "Deepseek", share: 0.70, growth: 10 }
  ];
  
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Return the sample data as JSON
  res.status(200).json(sampleData);
} 