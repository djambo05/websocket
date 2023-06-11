import { makeAutoObservable } from "mobx";

export class SymbolEntity {
  symbol = null;
  price = 0;
  time = 0;

  constructor(symbol) {
    this.symbol = symbol.symbol;
    this.price = symbol.price;
    this.time = symbol.time;

    makeAutoObservable(this);
  }
}
