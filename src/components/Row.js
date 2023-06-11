import { observer } from "mobx-react";

export const Row = observer((props) => {
  const { symbol } = props;
  const price = Number(symbol.price).toFixed(5);
  const cryptoCurrency = symbol.symbol;
  return (
    <div
      style={{
        display: "flex",
        gap: "150px",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ width: "100px", marginLeft: "20px" }}>
        <span>{cryptoCurrency}</span>
      </div>
      <div style={{ width: "100px" }}>
        <span>{price}</span>
      </div>
    </div>
  );
});
