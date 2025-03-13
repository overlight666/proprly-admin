/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  checklistElementListAtom,
  checklistElementResponseAtom,
  checklistZoneListAtom,
  checklistZoneResponseAtom,
} from "../_state/atoms/checklist";

export { useChecklist };

function useChecklist() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setChecklistZone = useSetRecoilState(checklistZoneListAtom);
  const setChecklistZoneResponse = useSetRecoilState(checklistZoneResponseAtom);
  const setChecklistElement = useSetRecoilState(checklistElementListAtom);
  const setChecklistElementResponse = useSetRecoilState(
    checklistElementResponseAtom
  );

  return {
    getChecklistZone,
    getChecklistElement,
    saveChecklistZone,
    saveChecklistElement,
  };

  function getChecklistZone() {
    return fetchWrapper
      .get(`${baseUrl}/admin/checklist/zones`)
      .then((response: any) => {
        setChecklistZone(response && response.data ? response.data : response);
      });
  }

  function saveChecklistZone(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/admin/checklist/zones`, params)
      .then((response: any) => {
        setChecklistZoneResponse(
          response && response.data ? response.data : response
        );
      });
  }

  function getChecklistElement(zoneId: any) {
    return fetchWrapper
      .get(`${baseUrl}/admin/checklist/elements?checklistZoneId=${zoneId}`)
      .then((response: any) => {
        setChecklistElement(
          response && response.data ? response.data : response
        );
      });
  }

  function saveChecklistElement(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/admin/checklist/elements`, params)
      .then((response: any) => {
        setChecklistElementResponse(
          response && response.data ? response.data : response
        );
      });
  }
}
