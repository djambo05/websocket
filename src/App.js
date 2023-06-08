import { Binance } from "./components/Binance";
import { OrderBook } from "./components/OrderBook";

function App() {
  return (
    <div
      style={{
        display: "flex",
        columnGap: "30px",
        margin: "30px",
        height: "auto",
      }}
    >
      <Binance />
      <OrderBook />
    </div>
  );
}

export default App;
