import { useState, useEffect, useCallback } from 'react';

export function useWebSocket<T>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000;

  const connect = useCallback(() => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      const socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setData(parsedData);
          setError(null);
          setRetryCount(0);
          setIsConnected(true);
          setIsReconnecting(false);
        } catch (err) {
          console.error('WebSocket parse error:', err);
          // Don't set error state for parse errors, keep using existing data
        }
      };

      socket.onopen = () => {
        console.log('WebSocket connected');
        setError(null);
        setRetryCount(0);
        setIsConnected(true);
        setIsReconnecting(false);
      };

      socket.onerror = (err) => {
        console.error('WebSocket error:', err);
        setIsConnected(false);
        
        if (retryCount < MAX_RETRIES) {
          setIsReconnecting(true);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            connect();
          }, RETRY_DELAY);
        } else {
          setError('WebSocket connection error');
          setIsReconnecting(false);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        if (retryCount < MAX_RETRIES) {
          setIsReconnecting(true);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            connect();
          }, RETRY_DELAY);
        } else {
          setError('WebSocket connection closed');
          setIsReconnecting(false);
        }
      };

      return socket;
    } catch (err) {
      console.error('WebSocket connection error:', err);
      setError('Failed to establish WebSocket connection');
      setIsConnected(false);
      setIsReconnecting(false);
      return null;
    }
  }, [retryCount]);

  useEffect(() => {
    const socket = connect();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  return {
    data,
    error,
    isConnected,
    isReconnecting,
    retryCount
  };
}