/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";

import { tradeCodesAtom, tradeCodesResponseAtom } from "../_state";

export { useTrade };

function useTrade() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setTradeCodes = useSetRecoilState(tradeCodesAtom);
  const setTradeCodesResponse = useSetRecoilState(tradeCodesResponseAtom);

  return {
    addTradeCode,
    getTradeCodes,
  };

  function addTradeCode(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/trade-code`, params)
      .then((response: any) => {
        if (response) {
          setTradeCodesResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getTradeCodes(params: any) {
    return fetchWrapper
      .get(`${baseUrl}/trade-code${params}`)
      .then((response: any) => {
        setTradeCodes(response && response.data ? response.data : response);
      });
  }
}
