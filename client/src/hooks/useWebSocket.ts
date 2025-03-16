import { useState, useEffect } from 'react';

export function useWebSocket<T>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
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

  return { data, error };
}
