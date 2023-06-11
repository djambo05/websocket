import { useState } from "react";
import { Binance } from "./components/Binance";
import { OrderBook } from "./components/OrderBook";

function App() {
  const [coin, setCoin] = useState("");
  return (
    <div
      style={{
        display: "flex",
        columnGap: "30px",
        margin: "30px",
        height: "auto",
      }}
    >
      <Binance setCoin={setCoin} />
      <OrderBook coin={coin} />
    </div>
  );
}

export default App;
