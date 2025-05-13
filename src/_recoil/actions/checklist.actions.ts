/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "@/helpers";
import {
  checklistElementListAtom,
  checklistElementResponseAtom,
  checklistZoneListAtom,
  checklistZoneResponseAtom,
  commonAreaChecklistElementListAtom,
  addCommonAreaCategoryResponseAtom,
  checklistResponseAtom,
  attachResponseAtom,
} from "@/_recoil/states";

export { useChecklist };

function useChecklist() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setChecklistZone = useSetRecoilState(checklistZoneListAtom);
  const setChecklistZoneResponse = useSetRecoilState(checklistZoneResponseAtom);
  const setChecklistElement = useSetRecoilState(checklistElementListAtom);
  const setAddCAResponse = useSetRecoilState(addCommonAreaCategoryResponseAtom);
  const setPropertyResponse = useSetRecoilState(checklistResponseAtom);
  const setChecklistElementResponse = useSetRecoilState(
    checklistElementResponseAtom
  );
  const setChecklistCommonAreaElement = useSetRecoilState(
    commonAreaChecklistElementListAtom
  );
  const attachResponse = useSetRecoilState(attachResponseAtom);

  return {
    getChecklistZone,
    getChecklistElement,
    saveChecklistZone,
    saveChecklistElement,
    getCommonAreaElement,
    saveCommonAreaCategory,
    updateCommonAreaCategory,
    deleteCommonAreaCategory,
    savePropertyChecklistCategory,
    updatePropertyChecklistCategory,
    deletePropertyChecklistCategory,
    restorePropertyChecklistCategory,
    updateChecklistElement,
    deletePropertyChecklistElement,
    restorePropertyChecklistElement,
    attachDetachDefectCode,
    restoreCommonAreaChecklistCategory,
  };

  function attachDetachDefectCode(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/admin/element/defects/${id}`, params)
      .then((response: any) => {
        attachResponse(response && response.data ? response.data : response);
      });
  }

  function getChecklistZone() {
    return fetchWrapper
      .get(`${baseUrl}/admin/checklist/zones`)
      .then((response: any) => {
        setChecklistZone(response && response.data ? response.data : response);
      });
  }

  function saveCommonAreaCategory(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/common_area_checklist`, params)
      .then((response: any) => {
        setAddCAResponse(response && response.data ? response.data : response);
      });
  }

  function updateCommonAreaCategory(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/common_area_checklist/${id}`, params)
      .then((response: any) => {
        setAddCAResponse(response && response.data ? response.data : response);
      });
  }

  function deleteCommonAreaCategory(id: any) {
    return fetchWrapper
      .delete(`${baseUrl}/common_area_checklist/${id}`)
      .then((response: any) => {
        setAddCAResponse(response && response.data ? response.data : response);
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

  function savePropertyChecklistCategory(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/checklist`, params)
      .then((response: any) => {
        setPropertyResponse(
          response && response.data ? response.data : response
        );
      });
  }

  function updatePropertyChecklistCategory(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/checklist/${id}`, params)
      .then((response: any) => {
        setPropertyResponse(
          response && response.data ? response.data : response
        );
      });
  }

  function deletePropertyChecklistCategory(id: any) {
    return fetchWrapper
      .delete(`${baseUrl}/checklist/${id}`)
      .then((response: any) => {
        setPropertyResponse(
          response && response.data ? response.data : response
        );
      });
  }

  function deletePropertyChecklistElement(id: any) {
    return fetchWrapper
      .delete(`${baseUrl}/admin/element/${id}`)
      .then((response: any) => {
        setPropertyResponse(
          response && response.data ? response.data : response
        );
      });
  }

  function restorePropertyChecklistElement(id: any) {
    return fetchWrapper
      .put(`${baseUrl}/checklist/elements/restore/${id}`)
      .then((response: any) => {
        setPropertyResponse(
          response && response.data ? response.data : response
        );
      });
  }

  function restorePropertyChecklistCategory(id: any) {
    return fetchWrapper
      .put(`${baseUrl}/checklist/zone/restore/${id}`)
      .then((response: any) => {
        if (response) {
          setPropertyResponse(
            response && response.data ? response.data : response
          );
        }
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
  function restoreCommonAreaChecklistCategory(id: any) {
    return fetchWrapper
      .put(`${baseUrl}/common-area-category/restore/${id}`)
      .then((response: any) => {
        if (response) {
          setPropertyResponse(
            response && response.data ? response.data : response
          );
        }
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

  function updateChecklistElement(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/admin/element/${id}`, params)
      .then((response: any) => {
        setChecklistElementResponse(
          response && response.data ? response.data : response
        );
      });
  }
}
