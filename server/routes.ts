import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer } from 'ws';
import { marketShareData } from "../shared/data";
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simulate real-time updates
function simulateMarketChanges() {
  return marketShareData.map(item => ({
    ...item,
    share: item.share + (Math.random() * 0.2 - 0.1), // Random fluctuation ±0.1%
    growth: item.growth + (Math.random() * 0.4 - 0.2), // Random fluctuation ±0.2%
  }));
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Create WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send initial data
    ws.send(JSON.stringify(marketShareData));

    // Set up periodic updates
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        const updatedData = simulateMarketChanges();
        ws.send(JSON.stringify(updatedData));
      }
    }, 5000); // Update every 5 seconds

    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });
  });

  // AI Market Insights Generator endpoint
  app.post('/api/generate-insights', async (req, res) => {
    try {
      const { focus = 'market trends', selectedBot } = req.body;

      let prompt;
      if (selectedBot) {
        const botData = marketShareData.find(item => item.name === selectedBot);
        if (!botData) {
          throw new Error(`Bot ${selectedBot} not found in market data`);
        }

        prompt = `Analyze the following AI Chatbot (${selectedBot}) with a focus on ${focus}:

Specific Bot Data:
- Name: ${botData.name}
- Market Share: ${botData.share}%
- Quarterly Growth: ${botData.growth}%
- Description: ${botData.description}
- LLMs Used: ${botData.llms}

Market Context:
${marketShareData
  .filter(item => item.name !== selectedBot)
  .map(item => `- ${item.name}: ${item.share}% market share, ${item.growth}% quarterly growth`)
  .join('\n')}

Please provide 3-4 key insights about ${selectedBot} regarding ${focus}, considering:
1. Its current market position
2. Growth trajectory
3. Competitive advantages/challenges
4. Future potential

Format the response in clear, concise bullet points.`;
      } else {
        prompt = `Analyze the following AI Chatbot market share data and provide insights about ${focus}:

Market Share Data:
${marketShareData.map(item => 
  `- ${item.name}: ${item.share}% market share, ${item.growth}% quarterly growth
   Description: ${item.description}
   LLMs: ${item.llms}`
).join('\n')}

Please provide 3-4 key insights about ${focus}, focusing on:
1. Current market dynamics
2. Growth patterns
3. Competitive analysis
4. Future predictions

Format the response in clear, concise bullet points.`;
      }

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4-turbo-preview",
        temperature: 0.7,
      });

      const insights = completion.choices[0].message.content;
      res.json({ insights });
    } catch (error) {
      console.error('Error generating insights:', error);
      res.status(500).json({ error: 'Failed to generate insights' });
    }
  });

  return httpServer;
}