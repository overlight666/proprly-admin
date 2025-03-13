/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  checklistElementListAtom,
  checklistZoneListAtom,
} from "../_state/atoms/checklist";

export { useChecklist };

function useChecklist() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setChecklistZone = useSetRecoilState(checklistZoneListAtom);
  const setChecklistElement = useSetRecoilState(checklistElementListAtom);

  return {
    getChecklistZone,
    getChecklistElement,
  };

  function getChecklistZone() {
    return fetchWrapper
      .get(`${baseUrl}/admin/checklist/zones`)
      .then((response: any) => {
        setChecklistZone(response && response.data ? response.data : response);
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
}
