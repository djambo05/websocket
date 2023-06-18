import React from "react";
import { useEffect } from "react";
import { FixedSizeList } from "react-window";
import { Row } from "./Row";
import { getAllPrices } from '../services/BinanceApi.service'
import { useQuery, useQueryClient } from "react-query";

export const Binance = () => {
  const qc = useQueryClient();
  console.log(qc)
  const { data: symbols = {} } = useQuery(['symbols'], async () => {
    const data = await getAllPrices()
    return []

    data.forEach((item) => {
      const key = ['symbols', item.symbol];
      qc.setQueryData(key, item)
      return qc.getQueryCache().get(JSON.stringify(key));
    })
  })
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
        const key = ['symbols', update.s];
        const symbol = qc.getQueryData(key);
        console.log(symbol)

        qc.setQueryData(key, {
          symbol: update.s,
          price: update.c,
          time: update.E
        });
        if (!symbol) {
          const query = qc.getQueryCache().get(JSON.stringify(key))
          const symbols = qc.getQueryData(['symbols']);
          qc.setQueryData(['symbols'], [...symbols, query])
        }
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

  }, [qc, symbols]);


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
              <div key={symbol.state.data.symbol} style={{ ...style }}>
                <Row symbol={symbol.state.data} />
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
