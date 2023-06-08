import React from "react";
import { useEffect } from "react";

export const OrderBook = () => {
  useEffect(() => {
    const ws = new WebSocket(
      "wss://testnet.binancefuture.com/stream?streams=btcusdt@depth"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log(eventData);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);
  return <div>orderBook</div>;
};
