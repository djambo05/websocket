import { SymbolEntity } from "./binance.store";

export async function getAllPrices() {
  const data = await fetch("https://api.binance.com/api/v3/ticker/price")
    .then((res) => res.json())
    .then((symbols) => symbols.map((symbol) => new SymbolEntity(symbol)));
  const result = {};
  data.forEach((element) => {
    result[element.symbol] = element;
  });
  return result;
}
