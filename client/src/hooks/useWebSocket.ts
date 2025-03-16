import { useState, useEffect } from 'react';
import type { MarketShareDataPoint, HistoricalDataPoint } from '@shared/data';

interface WebSocketData {
  current: MarketShareDataPoint[];
  historical: HistoricalDataPoint[];
}

export function useWebSocket(initialData: MarketShareDataPoint[]) {
  const [currentData, setCurrentData] = useState<MarketShareDataPoint[]>(initialData);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const parsedData: WebSocketData = JSON.parse(event.data);
        setCurrentData(parsedData.current);
        setHistoricalData(parsedData.historical);
      } catch (err) {
        setError('Failed to parse WebSocket data');
      }
    };

    socket.onerror = () => {
      setError('WebSocket connection error');
    };

    return () => {
      socket.close();
    };
  }, []);

  return { currentData, historicalData, error };
}