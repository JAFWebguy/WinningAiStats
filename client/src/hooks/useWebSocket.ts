import { useState, useEffect, useCallback } from 'react';

export function useWebSocket<T>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const connect = useCallback(() => {
    try {
      setIsReconnecting(true);
      
      // Get the correct WebSocket URL based on environment
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      let wsUrl = '';
      
      // For Vercel, use the domain without the port
      if (window.location.hostname.includes('vercel.app')) {
        wsUrl = `${protocol}//${window.location.hostname}/ws`;
      } else {
        // For local development
        wsUrl = `${protocol}//${window.location.hostname}:4000/ws`;
      }
      
      console.log('Connecting to WebSocket:', wsUrl);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setIsReconnecting(false);
        setRetryCount(0);
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setData(parsedData);
        } catch (err) {
          console.error('Failed to parse WebSocket data:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError(new Error('WebSocket connection error'));
        setIsConnected(false);
        // Don't disconnect on error, let the onclose handler handle reconnection
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        setIsReconnecting(false);
        
        // Only attempt to reconnect if we haven't exceeded the retry limit
        if (retryCount < 3) {
          console.log(`Attempting to reconnect (${retryCount + 1}/3)...`);
          setRetryCount(prev => prev + 1);
          setTimeout(() => connect(), 3000); // Reconnect after 3 seconds
        } else {
          console.log('Max reconnection attempts reached. Using initial data.');
          // Use initial data as fallback
          setData(initialData);
        }
      };

      return () => {
        ws.close();
      };
    } catch (err) {
      console.error('Failed to establish WebSocket connection:', err);
      setError(err instanceof Error ? err : new Error('Unknown WebSocket error'));
      setIsConnected(false);
      setIsReconnecting(false);
      // Use initial data as fallback
      setData(initialData);
    }
  }, [initialData, retryCount]);

  useEffect(() => {
    // Always ensure we have data, even if connection fails
    if (!data) {
      setData(initialData);
    }

    // Attempt WebSocket connection
    try {
      const cleanup = connect();
      
      // Cleanup function
      return () => {
        if (cleanup) cleanup();
      };
    } catch (err) {
      console.error('WebSocket connection failed:', err);
      setError(err as Error);
      // Ensure we still have data even if connection fails
      setData(initialData);
    }
  }, [initialData, connect]);

  return { data, error, isConnected, isReconnecting };
}