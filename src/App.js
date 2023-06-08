import { Binance } from "./components/Binance";
import { OrderBook } from "./components/OrderBook";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: "30px",
      }}
    >
      <Binance />
      <OrderBook />
    </div>
  );
}

export default App;
