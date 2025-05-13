/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "@/helpers";

import {
  allTradeCodesAtom,
  tradeCodesAtom,
  tradeCodesResponseAtom,
} from "@/_recoil/states";

export { useTrade };

function useTrade() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setTradeCodes = useSetRecoilState(tradeCodesAtom);
  const setAllTradeCodes = useSetRecoilState(allTradeCodesAtom);
  const setTradeCodesResponse = useSetRecoilState(tradeCodesResponseAtom);

  return {
    addTradeCode,
    editTradeCode,
    deleteTradeCode,
    getTradeCodes,
    activateTradeCode,
    getAllTradeCodes,
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

  function editTradeCode(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/trade-code/${id}`, params)
      .then((response: any) => {
        if (response) {
          setTradeCodesResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function activateTradeCode(id: any) {
    return fetchWrapper
      .put(`${baseUrl}/trade-code/restore/${id}`)
      .then((response: any) => {
        if (response) {
          setTradeCodesResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function deleteTradeCode(id: any) {
    return fetchWrapper
      .delete(`${baseUrl}/trade-code/${id}`)
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
  function getAllTradeCodes() {
    return fetchWrapper.get(`${baseUrl}/trade-code`).then((response: any) => {
      setAllTradeCodes(response && response.data ? response.data : response);
    });
  }
}
