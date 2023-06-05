import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { BinanceService } from "../services/BinanceApi.service";

export const Binance = () => {
  const [changePrice, setChangePrice] = useState({});
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
      //   console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      //   console.log("Received message:", event.data);
      const eventData = JSON.parse(event.data);
      setChangePrice(eventData.data);
    };

    ws.onclose = () => {
      //   console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      //   console.error("WebSocket error:", error);
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
    <table style={{ margin: "30px", minWidth: "300px" }}>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {dataPrices
          .sort((a, b) => Number(b.price) - Number(a.price))
          .map((coin, index) => {
            const matchingCoin = Array.isArray(changePrice)
              ? changePrice.find((changeCoin) => changeCoin.s === coin.symbol)
              : undefined;
            if (matchingCoin && matchingCoin.c) {
              coin.price = matchingCoin.c;
            }
            return (
              <tr key={index}>
                <td style={{ textAlign: "left" }}>{coin.symbol}</td>
                <td style={{ textAlign: "left" }}>$ {coin.price}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
