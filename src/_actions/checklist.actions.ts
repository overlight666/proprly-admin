/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  checklistElementListAtom,
  checklistElementResponseAtom,
  checklistZoneListAtom,
  checklistZoneResponseAtom,
  commonAreaChecklistElementListAtom,
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
  const setChecklistCommonAreaElement = useSetRecoilState(
    commonAreaChecklistElementListAtom
  );
  return {
    getChecklistZone,
    getChecklistElement,
    saveChecklistZone,
    saveChecklistElement,
    getCommonAreaElement,
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
  function getChecklistElement(params: any) {
    return fetchWrapper
      .get(`${baseUrl}/checklist${params}`)
      .then((response: any) => {
        setChecklistElement(
          response && response.data ? response.data : response
        );
      });
  }

  function getCommonAreaElement(params: any) {
    return fetchWrapper
      .get(`${baseUrl}/common_area_checklist${params}`)
      .then((response: any) => {
        setChecklistCommonAreaElement(
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
