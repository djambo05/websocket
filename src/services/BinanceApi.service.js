import { SymbolEntity } from "./binance.store";
import { queryClient } from '../index';
import { QueryObserver, useQueryClient } from "react-query";
import { useEffect, useReducer } from "react";

export async function getAllPrices() {
  return fetch("https://testnet.binancefuture.com/fapi/v1/ticker/price")
    .then((res) => res.json())
  // .then((symbols => symbols.map(symbol => new SymbolEntity(symbol))))
  // const result = {};
  // data.forEach(element => {
  //   result[element.symbol] = element;
  // });
}


// export const useQueryData = (queryKey) => {
//   const qc = useQueryClient();

//   useEffect(() => {
//     if (!queryKey) return;

//     return qc.getQueryCache().subscribe(e => {
//       if (!e.type.startsWith('query') || e.query.queryKey[0] !== queryKey[0]) return;
//       forceUpdate()
//       console.log(e)
//     })

//   }, [qc, queryKey])


//   return qc.getQueryData(queryKey);
// }