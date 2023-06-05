export const BinanceService = {
  async getAllPrices() {
    const data = await fetch(
      "https://testnet.binancefuture.com/fapi/v1/ticker/price"
    ).then((res) => res.json());
    console.log(data);
    return data;
  },

  async getOnePrice(symbol) {
    const data = await fetch(
      `https://testnet.binancefuture.com/fapi/v1/ticker/price?symbol=${symbol}`
    ).then((res) => res.json());
    console.log(data);
    return data;
  },
};
