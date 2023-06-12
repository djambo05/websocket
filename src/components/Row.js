import { observer } from "mobx-react";

export const Row = observer((props) => {
  const { symbol, setCoin } = props;
  const price = Number(symbol.price).toFixed(5);
  const cryptoCurrency = symbol.symbol;
  return (
    <div
      style={{
        display: "flex",
        gap: "70px",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ width: "75px", marginLeft: "20px" }}>
        <span>{cryptoCurrency}</span>
      </div>
      <button onClick={() => setCoin(cryptoCurrency.toLowerCase())}>btn</button>
      <div style={{ width: "100px" }}>
        <span>{price}</span>
      </div>
    </div>
  );
});
