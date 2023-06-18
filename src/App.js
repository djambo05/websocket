import { Binance } from "./components/Binance";
import { create } from 'zustand'

export const useSymbolStore = create((set) => ({
  symbols: {},
  addSymbol(symbol) {
    set(state => ({symbols: {...state.symbols, [symbol.symbol]: symbol}}))
  }
}))

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
