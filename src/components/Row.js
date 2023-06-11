import { observer } from "mobx-react";

export const Row = observer((props) => {
  const { symbol } = props;

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
        <span>{symbol.symbol}</span>
      </div>
      <div style={{ width: "100px" }}>
        <span>{symbol.price}</span>
      </div>
    </div>
  );
});
