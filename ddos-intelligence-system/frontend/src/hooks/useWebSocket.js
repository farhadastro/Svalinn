import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to manage WebSocket connection for real-time attack events.
 * Handles auto-reconnection and buffering of recent events.
 */
export function useWebSocket(url) {
  const [isConnected, setIsConnected] = useState(false);
  const [attacks, setAttacks] = useState([]);
  const [latestAttack, setLatestAttack] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeThreats: 0,
    peakGbps: 0,
    startTime: Date.now() / 1000,
  });

  const ws = useRef(null);
  const bufferRef = useRef([]);
  const reconnectTimeoutRef = useRef(null);

  // Resolve WebSocket URLs: support single VITE_WS_URL or multi-region VITE_WS_US / VITE_WS_EU
  const wsUrls = [];
  if (import.meta.env.VITE_WS_US) wsUrls.push(import.meta.env.VITE_WS_US);
  if (import.meta.env.VITE_WS_EU) wsUrls.push(import.meta.env.VITE_WS_EU);
  if (import.meta.env.VITE_WS_URL && wsUrls.length === 0) wsUrls.push(import.meta.env.VITE_WS_URL);
  
  // Fallback to current host path for local dev
  if (wsUrls.length === 0) {
    wsUrls.push(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws/attacks`);
  }

  const endpointsRef = useRef(wsUrls);
  const attemptIndexRef = useRef(0);

  const connect = useCallback(() => {
    if (endpointsRef.current.length === 0) return;

    // Cycle through endpoints
    const currentUrl = endpointsRef.current[attemptIndexRef.current % endpointsRef.current.length];

    try {
      ws.current = new WebSocket(currentUrl);

      ws.current.onopen = () => {
        setIsConnected(true);
        // Reset attempt count on successful connect so we prefer this node
        attemptIndexRef.current = endpointsRef.current.indexOf(currentUrl);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        
        // Advance to next endpoint on failure
        attemptIndexRef.current += 1;
        const delay = Math.min(2000 * (attemptIndexRef.current || 1), 10000);
        reconnectTimeoutRef.current = setTimeout(connect, delay);
      };

      ws.current.onerror = () => {
        // Will trigger onclose automatically
        ws.current.close();
      };

      ws.current.onmessage = (msg) => {
        try {
          const event = JSON.parse(msg.data);
          
          setLatestAttack(event);
          
          // Avoid duplicates from WebSocket reconnect burst
          if (!bufferRef.current.some(a => a.attack_id === event.attack_id)) {
            bufferRef.current = [event, ...bufferRef.current].slice(0, 100);
            setAttacks([...bufferRef.current]);
            
            setStats((prev) => ({
              totalEvents: prev.totalEvents + 1,
              activeThreats: bufferRef.current.filter(a => Date.now() / 1000 - a.timestamp < a.duration_seconds).length,
              peakGbps: Math.max(prev.peakGbps, event.throughput_gbps),
              startTime: prev.startTime,
            }));
          }

        } catch {
          // Malformed message — skip
        }
      };
    } catch {
      // Connection initialization failed immediately
      attemptIndexRef.current += 1;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(connect, 3000);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.onclose = null; // Prevent reconnect after unmount
        ws.current.close();
      }
    };
  }, [connect]);

  // Keep connection alive with pings
  useEffect(() => {
    const interval = setInterval(() => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send('ping');
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return { isConnected, attacks, latestAttack, stats };
}
