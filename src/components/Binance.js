import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { BinanceService } from "../services/BinanceApi.service";
import { FixedSizeList } from "react-window";

export const Binance = () => {
  const [changePrice, setChangePrice] = useState({});
  //   const [changeColor, setChangeColor] = useState(false);
  const {
    data: dataPrices,
    isLoading: isLoadingPrices,
    isError: isErrorPrices,
  } = useQuery(["binanceAll"], BinanceService.getAllPrices, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binancefuture.com/stream?streams=!miniTicker@arr"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      //   console.log("Received message:", event.data);
      const eventData = JSON.parse(event.data);
      setChangePrice(eventData.data);
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

  if (isLoadingPrices) {
    return <h1>Loading...</h1>;
  }
  if (isErrorPrices) {
    return <h1>Error</h1>;
  }
  if (!dataPrices) {
    return <h1>No data</h1>;
  }

  return (
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
          itemCount={dataPrices.length}
        >
          {({ index, style }) => {
            const coin = dataPrices
              .filter((coin) => coin?.symbol?.toLowerCase().endsWith("usdt"))
              .sort((a, b) => Number(b.price) - Number(a.price))[index];
            const matchingCoin = Array.isArray(changePrice)
              ? changePrice.find((changeCoin) => changeCoin.s === coin.symbol)
              : undefined;
            if (matchingCoin && matchingCoin.c) {
              coin.price = matchingCoin.c;
              // setChangeColor(true);
            }
            const price = Number(coin.price).toFixed(5);
            return (
              <tr
                key={index}
                style={{
                  ...style,
                  height: "40px",
                  minWidth: "500px",
                  backgroundColor: "#ff9f53",
                }}
              >
                <td
                  style={{
                    textAlign: "left",
                    width: "250px",
                    borderTop: "0px",
                    whiteSpace: "nowrap",
                    paddingLeft: 20,
                    fontWeight: 400,
                    fontSize: "15px",
                  }}
                >
                  {coin.symbol}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    width: "240px",
                    borderTop: "0px",
                    whiteSpace: "nowrap",
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  ${" "}
                  <span
                    style={
                      {
                        // color: changeColor && "red",
                        // transitionProperty: "color",
                        // transitionDuration: "1s",
                        // transitionTimingFunction: "ease-in-out",
                      }
                    }
                  >
                    {price}
                  </span>
                </td>
              </tr>
            );
          }}
        </FixedSizeList>
      </tbody>
    </table>
  );
};
