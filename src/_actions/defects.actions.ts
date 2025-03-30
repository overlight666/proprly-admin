/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  defectCodesAtom,
  defectCodesResponseAtom,
  defectCodesSelectAtom,
  defectFeedbackAtom,
} from "../_state/atoms/defects";

export { useDefect };

function useDefect() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setDefectFeedback = useSetRecoilState(defectFeedbackAtom);
  const setDefectCodes = useSetRecoilState(defectCodesAtom);
  const setDefectCodesSelect = useSetRecoilState(defectCodesSelectAtom);
  const setDefectCodesResponse = useSetRecoilState(defectCodesResponseAtom);

  return {
    pushDefectFeedback,
    getDefectCodes,
    addDefectCode,
    getDefectCodesSelect,
    editDefectCode,
    deleteDefectCode,
  };

  function pushDefectFeedback(id: any, params: any) {
    return fetchWrapper
      .post(`${baseUrl}/defect-submissions/${id}/feedback`, params)
      .then((response: any) => {
        if (response) {
          setDefectFeedback(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function addDefectCode(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/defect-code`, params)
      .then((response: any) => {
        if (response) {
          setDefectCodesResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function editDefectCode(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/defect-code/${id}`, params)
      .then((response: any) => {
        if (response) {
          setDefectCodesResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function deleteDefectCode(id: any) {
    return fetchWrapper
      .delete(`${baseUrl}/defect-code/${id}`)
      .then((response: any) => {
        if (response) {
          setDefectCodesResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getDefectCodes(params: any) {
    return fetchWrapper
      .get(`${baseUrl}/defect-code${params}`)
      .then((response: any) => {
        setDefectCodes(response && response.data ? response.data : response);
      });
  }

  function getDefectCodesSelect(params: any) {
    return fetchWrapper
      .get(`${baseUrl}/defect-code${params}`)
      .then((response: any) => {
        setDefectCodesSelect(
          response && response.data ? response.data : response
        );
      });
  }
}
