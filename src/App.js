import { useEffect } from "react";
import "./App.css";
import { BinanceService } from "./services/BinanceApi.service";
import { Binance } from "./components/Binance";

function App() {
  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binancefuture.com/stream?streams=!miniTicker@arr"
    ); // Замените на ваш URL WebSocket

    // Обработчик открытия соединения
    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    // Обработчик получения сообщений
    ws.onmessage = (event) => {
      // console.log("Received message:", event.data);
      // Обработка полученных данных
    };

    // Обработчик закрытия соединения
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Обработчик ошибок
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Очистка ресурсов при размонтировании компонента
    return () => {
      ws.close();
    };
  }, []);
  BinanceService.getAllPrices();
  BinanceService.getOnePrice("BTCUSDT");
  return (
    <div className="App">
      <Binance />
    </div>
  );
}

export default App;
