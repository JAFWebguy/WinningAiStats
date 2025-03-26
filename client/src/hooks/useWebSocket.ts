import { useState, useEffect, useCallback } from 'react';

export function useWebSocket<T>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000;

  const connect = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
        setError(null); // Clear any previous errors
        setRetryCount(0); // Reset retry count on successful connection
      } catch (err) {
        setError('Failed to parse WebSocket data');
        console.error('WebSocket parse error:', err);
      }
    };

    socket.onopen = () => {
      console.log('WebSocket connected');
      setError(null);
      setRetryCount(0);
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('WebSocket connection error');
      
      // Attempt reconnection if under max retries
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          connect();
        }, RETRY_DELAY);
      }
    };

    socket.onclose = () => {
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          connect();
        }, RETRY_DELAY);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          connect(); // Attempt to reconnect
        }, RETRY_DELAY);
      } else {
        setError('WebSocket connection failed after multiple attempts');
      }
    };

    return socket;
  }, [retryCount]);

  useEffect(() => {
    const socket = connect();
    return () => {
      socket.close();
    };
  }, [connect]);

  return { 
    data, 
    error,
    isReconnecting: retryCount > 0,
    reconnectAttempt: retryCount 
  };
}