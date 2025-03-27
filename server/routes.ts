import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer } from 'ws';
import { marketShareData } from "../shared/data";
import OpenAI from 'openai';
import analyticsRouter from './routes/analytics';

// Initialize OpenAI client with error handling
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

export async function registerRoutes(app: Express, server: Server): Promise<void> {
  // Create WebSocket server
  const wss = new WebSocketServer({ server, path: '/ws' });

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

  // Platform comparison endpoint
  app.get('/api/compare-platforms', (req, res) => {
    try {
      const { platform1, platform2 } = req.query;
      
      if (!platform1 || !platform2) {
        return res.status(400).json({ error: 'Both platform1 and platform2 are required' });
      }

      const p1Data = marketShareData.find(p => p.name === platform1);
      const p2Data = marketShareData.find(p => p.name === platform2);

      if (!p1Data || !p2Data) {
        return res.status(404).json({ error: 'One or both platforms not found' });
      }

      const comparisonData = {
        platform1: p1Data.name,
        platform2: p2Data.name,
        comparisonMetrics: {
          marketShare: {
            platform1: p1Data.share,
            platform2: p2Data.share,
          },
          growth: {
            platform1: p1Data.growth,
            platform2: p2Data.growth,
          },
          metrics: {
            description: {
              platform1: p1Data.description,
              platform2: p2Data.description,
            },
            llms: {
              platform1: p1Data.llms,
              platform2: p2Data.llms,
            }
          }
        }
      };

      res.json(comparisonData);
    } catch (error) {
      console.error('Error comparing platforms:', error);
      res.status(500).json({ error: 'Failed to compare platforms' });
    }
  });

  // Historical market data endpoint
  app.get('/api/market-share-history', (req, res) => {
    try {
      const { platform, startDate, endDate } = req.query;
      
      if (!platform) {
        return res.status(400).json({ error: 'Platform is required' });
      }

      // Generate some historical data points
      const generateHistoricalData = () => {
        const platformData = marketShareData.find(p => p.name === platform);
        if (!platformData) {
          return [];
        }

        const dataPoints = [];
        const start = startDate ? new Date(startDate as string) : new Date('2024-01-01');
        const end = endDate ? new Date(endDate as string) : new Date();
        const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        
        for (let i = 0; i <= totalDays; i += 7) { // Weekly data points
          const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
          dataPoints.push({
            platformName: platformData.name,
            marketShare: platformData.share + (Math.random() * 2 - 1), // ±1% variation
            growth: platformData.growth + (Math.random() * 1 - 0.5), // ±0.5% variation
            timestamp: currentDate.toISOString()
          });
        }

        return dataPoints;
      };

      const historicalData = generateHistoricalData();
      res.json(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      res.status(500).json({ error: 'Failed to fetch historical data' });
    }
  });

  // AI Market Insights Generator endpoint
  app.post('/api/generate-insights', async (req, res) => {
    try {
      const { focus = 'market trends' } = req.body;

      const prompt = `Analyze the following AI Chatbot market share data and provide insights about ${focus}:

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

  // Register analytics routes
  app.use('/api', analyticsRouter);
}