import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer } from 'ws';
import { marketShareData } from "../shared/data";

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

  return httpServer;
}