import { Binance } from "./components/Binance";
import { useQueryData } from "./services/BinanceApi.service";

function App() {

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Binance />
    </div>
  );
}

export default App;
