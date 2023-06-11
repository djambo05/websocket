import React from "react";
import { useEffect } from "react";
import { FixedSizeList } from "react-window";
import { Row } from "./Row";
import { getAllPrices } from "../services/BinanceApi.service";
import { useQuery } from "react-query";

export const Binance = () => {
  const { data: symbols = {} } = useQuery(["symbols", "hjj"], getAllPrices);
  const symbolArray = Object.values(symbols)
    .filter((coin) => coin.symbol.toLowerCase().endsWith("usdt"))
    .sort((a, b) => Number(b.price) - Number(a.price));

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=!miniTicker@arr"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      data.forEach((update) => {
        const symbol = symbols[update.s];
        if (symbol) {
          symbol.price = update.c;
          symbol.time = update.E;
        }
      });
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
  }, [symbols]);

  return (
    <div>
      <table
        style={{
          minWidth: "500px",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <caption
          style={{
            backgroundColor: "#ff5a61",
            color: "black",
            fontWeight: 700,
            fontSize: "25px",
          }}
        >
          Crypto Table
        </caption>
        <thead
          style={{
            display: "block",
            minHeight: "40px",
            minWidth: "500px",
            backgroundColor: "#ffdf4a",
          }}
        >
          <tr
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: "40px",
              minWidth: "500px",
            }}
          >
            <th
              style={{
                textAlign: "left",
                minWidth: "250px",
                paddingLeft: 20,
                whiteSpace: "nowrap",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              Coin
            </th>
            <th
              style={{
                textAlign: "left",
                width: "50%",
                paddingLeft: 20,
                whiteSpace: "nowrap",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              Price
            </th>
          </tr>
        </thead>

        <tbody style={{ overflowX: "hidden" }}>
          <FixedSizeList
            height={400}
            width={500}
            itemSize={40}
            itemCount={symbolArray.length}
          >
            {({ index, style }) => {
              const symbol = symbolArray[index];
              return (
                <div
                  onClick={() => {}}
                  key={symbol.symbol}
                  style={{ ...style }}
                >
                  <Row symbol={symbol} />
                </div>
              );
            }}
          </FixedSizeList>
        </tbody>
      </table>
    </div>
  );
};
