import React from "react";
import { useEffect, useState } from "react";

export const OrderBook = () => {
  const [ordersBook, setOrdersBook] = useState({});
  useEffect(() => {
    const ws = new WebSocket(
      "wss://testnet.binancefuture.com/stream?streams=btcusdt@depth"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setOrdersBook(eventData);
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
  console.log(ordersBook);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minWidth: "500px" }}
    >
      <caption
        style={{
          backgroundColor: "#ff5a61",
          color: "black",
          fontWeight: 700,
          fontSize: "25px",
        }}
      >
        Orders Book
      </caption>
      <div
        style={{ display: "flex", width: "100%", backgroundColor: "#ffdf4a" }}
      >
        <div
          style={{
            textAlign: "left",
            minWidth: "50%",
            paddingLeft: 20,
            whiteSpace: "nowrap",
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          sell
        </div>
        <div
          style={{
            textAlign: "left",
            minWidth: "50%",
            paddingLeft: 20,
            whiteSpace: "nowrap",
            fontWeight: 700,
            fontSize: "20px",
          }}
        >
          buy
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <ul
          style={{ listStyle: "none", minWidth: "50%", margin: 0, padding: 0 }}
        >
          <li>sell</li>
        </ul>
        <ul
          style={{ listStyle: "none", minWidth: "50%", margin: 0, padding: 0 }}
        >
          <li>buy</li>
        </ul>
      </div>
    </div>
  );
};