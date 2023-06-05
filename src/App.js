import "./App.css";
import { BinanceService } from "./services/BinanceApi.service";
import { Binance } from "./components/Binance";

function App() {
  BinanceService.getAllPrices();
  BinanceService.getOnePrice("BTCUSDT");
  return (
    <div className="App">
      <Binance />
    </div>
  );
}

export default App;
