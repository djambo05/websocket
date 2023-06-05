import React from "react";
import { useQuery } from "react-query";
import { BinanceService } from "../services/BinanceApi.service";

export const Binance = () => {
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
          .map((obj, index) => {
            return (
              <tr key={index}>
                <td style={{ textAlign: "left" }}>{obj.symbol}</td>
                <td style={{ textAlign: "left" }}>$ {obj.price}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
