import React from "react";
import { useEffect, useState } from "react";

export const OrderBook = ({ coin }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const ws = new WebSocket(
      // `wss://stream.binance.com:9443/stream?streams=${coin.toLowerCase()}@depth`
      `wss://stream.binance.com:9443/stream?streams=${coin}@depth`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setData(eventData.data);
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
  }, [coin]);

  const buying = data?.a;
  const selling = data?.b;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minWidth: "600px" }}
    >
      <div
        style={{
          paddingLeft: "20px",
          backgroundColor: "#ff5a61",
          color: "black",
          fontWeight: 700,
          fontSize: "25px",
        }}
      >
        Orders Book {coin}
      </div>
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
          <span>Selling Price</span>
          <span style={{ marginLeft: "60px" }}>coins</span>
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
          <span>Buying Price</span>
          <span style={{ marginLeft: "60px" }}>coins</span>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <ul
          style={{ listStyle: "none", minWidth: "50%", margin: 0, padding: 0 }}
        >
          {selling &&
            selling.map((coin, index) => {
              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    columnGap: "30px",
                    paddingLeft: "20px",
                  }}
                >
                  <span>{Number(coin[0]).toFixed(5)}</span>
                  <span style={{ marginLeft: "60px" }}>
                    {Number(coin[1]).toFixed(5)}
                  </span>
                </li>
              );
            })}
        </ul>
        <ul
          style={{ listStyle: "none", minWidth: "50%", margin: 0, padding: 0 }}
        >
          {buying &&
            buying.map((coin, index) => {
              return (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    columnGap: "30px",
                    paddingLeft: "20px",
                  }}
                >
                  <span>{Number(coin[0]).toFixed(5)}</span>
                  <span style={{ marginLeft: "60px" }}>
                    {Number(coin[1]).toFixed(5)}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
