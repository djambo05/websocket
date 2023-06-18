import React from "react";
import { useEffect } from "react";
import { FixedSizeList } from "react-window";
import { Row } from "./Row";
import { getAllPrices } from '../services/BinanceApi.service'
import { useSymbolStore } from "../App";
import { shallow } from 'zustand/shallow'

export const Binance = () => {
  const symbols = useSymbolStore(state => Object.keys(state.symbols), shallow);
  const addSymbol = useSymbolStore(state => state.addSymbol);
  useEffect(() => {
    getAllPrices()
      .then(symbols => symbols.forEach(symbol => addSymbol(symbol)))
  }, [addSymbol])

  console.log(symbols)

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binancefuture.com/stream?streams=!miniTicker@arr"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      data.forEach(update => {
        addSymbol({
          symbol: update.s,
          price: update.c,
          time: update.E
        })
      })
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

  }, [addSymbol]);


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
          itemCount={
            symbols.length
          }
        >
          {({ index, style }) => {
            const symbol = symbols[index];
            return (
              <div key={symbol} style={{ ...style }}>
                <Row symbol={symbol} />
              </div>

            )
            // const coin = dataPrices[index];
            // if (!coin) {
            //   return null;
            // }
            // const matchingCoin = Array.isArray(changePrice)
            //   ? changePrice.find((changeCoin) => changeCoin.s === coin?.symbol)
            //   : undefined;
            // if (matchingCoin && matchingCoin.c) {
            //   coin.price = matchingCoin.c;
            //   // setChangeColor(true);
            // }
            // const price = Number(coin.price).toFixed(5);
            // return (
            //   <tr
            //     key={index}
            //     style={{
            //       ...style,
            //       height: "40px",
            //       minWidth: "500px",
            //       backgroundColor: "#ff9f53",
            //     }}
            //   >
            //     <td
            //       style={{
            //         textAlign: "left",
            //         width: "250px",
            //         borderTop: "0px",
            //         whiteSpace: "nowrap",
            //         paddingLeft: 20,
            //         fontWeight: 400,
            //         fontSize: "15px",
            //       }}
            //     >
            //       {coin?.symbol}
            //     </td>
            //     <td
            //       style={{
            //         textAlign: "left",
            //         width: "240px",
            //         borderTop: "0px",
            //         whiteSpace: "nowrap",
            //         paddingLeft: 20,
            //         fontWeight: 600,
            //         fontSize: "15px",
            //       }}
            //     >
            //       ${" "}
            //       <span
            //         style={
            //           {
            //             // color: changeColor && "red",
            //             // transitionProperty: "color",
            //             // transitionDuration: "1s",
            //             // transitionTimingFunction: "ease-in-out",
            //           }
            //         }
            //       >
            //         {price}
            //       </span>
            //     </td>
            //   </tr>
            // );
          }}
        </FixedSizeList>
      </tbody>
    </table>
  );
};
