/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  commonAreaCategoryResponseAtom,
  commonAreaChecklistAtom,
  commonAreaConfigAtom,
  commonAreaResponseAtom,
  projectAuditorAtom,
  projectStrataAtom,
  projectSubContractorAtom,
  selectedCommonAreaAtom,
} from "../_state";
import { useWarrantyAction } from "./warranty.action";
import { usePersistor } from "../_helpers/persistor";
export { useCommonArea };

function useCommonArea() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setCommonArea = useSetRecoilState(selectedCommonAreaAtom);
  const setStrata = useSetRecoilState(projectStrataAtom);
  const setAuditor = useSetRecoilState(projectAuditorAtom);
  const setContractor = useSetRecoilState(projectSubContractorAtom);
  const setCommonAreaConfig = useSetRecoilState(commonAreaConfigAtom);
  const setCommonAreaChecklist = useSetRecoilState(commonAreaChecklistAtom);
  const setCommonAreaResponse = useSetRecoilState(commonAreaResponseAtom);
  const persist = usePersistor();
  const setCommonAreaCategoryResponse = useSetRecoilState(
    commonAreaCategoryResponseAtom
  );

  const warrantyAction = useWarrantyAction();

  return {
    getCommonArea,
    getProjectStrata,
    saveCommonArea,
    updateCommonArea,
    getCommonAreaConfig,
    getCommonAreaChecklist,
    addCommonAreaCategoryBasement,
    addCommonAreaCategoryTower,
    getProjectAuditor,
    getProjectSubContractor,
    detachCommonAreaCategoryTower,
    detachCommonAreaCategoryBasement
  };

  function addCommonAreaCategoryBasement(params: any, refresh: boolean) {
    return fetchWrapper
      .post(`${baseUrl}/common_area/basement/common_area_category`, params)
      .then((response: any) => {
        const res = response && response.data ? response.data : response;
        if (refresh) setCommonAreaCategoryResponse(res);
      });
  }

    function detachCommonAreaCategoryBasement(params: any) {
    return fetchWrapper
      .put(`${baseUrl}/common_area/detach_common_area_categories`, params)
      .then((response: any) => {
        const res = response && response.data ? response.data : response;
        setCommonAreaCategoryResponse(res);
      });
  }


  function addCommonAreaCategoryTower(params: any, refresh: boolean) {
    return fetchWrapper
      .post(
        `${baseUrl}/common_area/project_tower_floor/common_area_category`,
        params
      )
      .then((response: any) => {
        const res = response && response.data ? response.data : response;
        if (refresh) setCommonAreaCategoryResponse(res);
      });
  }

    function detachCommonAreaCategoryTower(params: any) {
    return fetchWrapper
      .put(
        `${baseUrl}/common_area/detach_common_area_categories`,
        params
      )
      .then((response: any) => {
        const res = response && response.data ? response.data : response;
        setCommonAreaCategoryResponse(res);
      });
  }

  function getCommonAreaChecklist(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/common_area_checklist?projectId=${project_id}`)
      .then((response: any) => {
        setCommonAreaChecklist(
          response && response.data ? response.data : response
        );
      });
  }

  function getCommonAreaConfig(common_area_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/common_area/${common_area_id}`)
      .then((response: any) => {
        setCommonAreaConfig(
          response && response.data ? response.data : response
        );
      });
  }

  function updateCommonArea(id: any, params: any, warranties: any, toast: any) {
    return fetchWrapper
      .put(`${baseUrl}/common_area/${id}`, params)
      .then((response: any) => {
        const res = response && response.data ? response.data : response;
        if (res) {
          warranties?.groups?.map((warrant: any) => {
            if (warrant && warrant.warrantyId) {
              warrantyAction.updateWarranty(
                warrant.warrantyId,
                { files: warrant.files },
                toast
              );
            }
          });
          toast.success("Common Area has been updated!");
        }
      });
  }

  function saveCommonArea(params: any, warranties: any, toast: any) {
    return fetchWrapper
      .post(`${baseUrl}/common_area`, params)
      .then((response: any) => {
        const res =
          response && response.data
            ? response.data.length > 0
              ? response.data[0]
              : response.data
            : response;
        setCommonAreaResponse(res);
        if (res?.id) {
          const warrantyParams = {
            commonAreaId: res.id,
            groups: warranties,
          };
          warrantyAction.saveCommonAreaWarranties(warrantyParams, toast);
        }
      });
  }

  function getCommonArea(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${project_id}/common_area`)
      .then((response: any) => {
        setCommonArea(response && response.data ? response.data : response);
      });
  }

  function getProjectStrata(org_id: any) {
    const isAdmin = persist.getValues("isAdmin");
    const url = isAdmin
      ? `${baseUrl}/users?roleKey=project_strata`
      : `${baseUrl}/organization/${org_id}/users?roleKey=project_strata`;
    return fetchWrapper.get(url).then((response: any) => {
      setStrata(response && response.data ? response.data : response);
    });
  }

  function getProjectAuditor(org_id: any) {
    const isAdmin = persist.getValues("isAdmin");
    const url = isAdmin
      ? `${baseUrl}/users?roleKey=project_auditor`
      : `${baseUrl}/organization/${org_id}/users?roleKey=project_auditor`;
    return fetchWrapper.get(url).then((response: any) => {
      setAuditor(response && response.data ? response.data : response);
    });
  }

  function getProjectSubContractor(org_id: any) {
    const isAdmin = persist.getValues("isAdmin");
    const url = isAdmin
      ? `${baseUrl}/users?roleKey=project_sub_contractor`
      : `${baseUrl}/organization/${org_id}/users?roleKey=project_sub_contractor`;
    return fetchWrapper.get(url).then((response: any) => {
      setContractor(response && response.data ? response.data : response);
    });
  }
}
