import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from 'ws';
import { marketShareData, historicalData, type MarketShareDataPoint, type HistoricalDataPoint } from "../shared/data";

// Keep last 24 hours of data (updates every 5 seconds = 17,280 data points)
const MAX_HISTORY_LENGTH = 17280;

// Simulate real-time updates
function simulateMarketChanges(): MarketShareDataPoint[] {
  const updatedData = marketShareData.map(item => ({
    ...item,
    share: item.share + (Math.random() * 0.2 - 0.1), // Random fluctuation ±0.1%
    growth: item.growth + (Math.random() * 0.4 - 0.2), // Random fluctuation ±0.2%
  }));

  // Add to historical data
  historicalData.push({
    timestamp: new Date(),
    data: updatedData
  });

  // Maintain history length
  if (historicalData.length > MAX_HISTORY_LENGTH) {
    historicalData.shift();
  }

  return updatedData;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Create WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send initial data including historical data
    ws.send(JSON.stringify({
      current: marketShareData,
      historical: historicalData
    }));

    // Set up periodic updates
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        const updatedData = simulateMarketChanges();
        ws.send(JSON.stringify({
          current: updatedData,
          historical: historicalData
        }));
      }
    }, 5000); // Update every 5 seconds

    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });
  });

  return httpServer;
}