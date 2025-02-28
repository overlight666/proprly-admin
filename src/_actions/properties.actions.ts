/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  activeTabIndexProjectAtom,
  bulkResponseAtom,
  generateReportAtom,
  propertiesAtom,
  selectedPropertyAtom,
} from "../_state";
import { useWarrantyAction } from "./warranty.action";

export { useProperties };

function useProperties() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setProperties = useSetRecoilState(propertiesAtom);
  const setBulkResponse = useSetRecoilState(bulkResponseAtom);
  const setActiveTabIndex = useSetRecoilState(activeTabIndexProjectAtom);
  const setSelectedProperty = useSetRecoilState(selectedPropertyAtom);
  const setGenerateReport = useSetRecoilState(generateReportAtom);
  const warrantyAction = useWarrantyAction();

  return {
    getPropertiesByProject,
    bulkUploadProperties,
    addProperty,
    getProperty,
    updateProperty,
    generateNewReport,
  };

  function generateNewReport(id: any, toast: any) {
    return fetchWrapper
      .get(`${baseUrl}/request-report-generation?propertyId=${id}`)
      .then((_response: any) => {
        setGenerateReport(true);
        toast.success("New reports generated!");
      });
  }

  function getProperty(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/property/${id}`)
      .then((response: any) => {
        if (response) {
          setSelectedProperty(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function updateProperty(
    _id: any,
    _project_id: any,
    property_id: any,
    params: any,
    _navigate: any,
    toast: any,
    warranties: any,
    hasWarranties: boolean,
    _filesToDelete: any
  ) {
    return fetchWrapper
      .put(`${baseUrl}/property/${property_id}`, params)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          setBulkResponse(res);
          // if (filesToDelete) {
          //   filesToDelete?.map((del: any) => {
          //     warrantyAction.deleteWarranty(del);
          //   });
          // }
          if (hasWarranties) {
            warranties?.groups?.map((warrant: any) => {
              warrantyAction.updateWarranty(
                warrant.warrantyId,
                { files: warrant.files },
                toast
              );
            });
            setActiveTabIndex(1);
            toast.success("Property has been updated!");
          } else {
            setActiveTabIndex(1);
            toast.success("Property has been updated!");
          }
        }
      })
      .catch((e: any) => {
        if (e?.messages) {
          if (e?.messages?.length > 0) {
            e?.messages?.map((m: any) => {
              return toast.error(m?.message);
            });
          } else {
            toast.error(e);
          }
        } else {
          if (e) {
            toast.error(e);
          } else {
            toast.error("Unknown error, please contact admin");
          }
        }
      });
  }

  function addProperty(
    id: any,
    project_id: any,
    params: any,
    navigate: any,
    toast: any,
    warranties: any,
    _hasWarranties: boolean
  ) {
    return fetchWrapper
      .post(`${baseUrl}/property`, params)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          setBulkResponse(res);

          const warrantyParams = {
            propertyId: res.id,
            ...warranties,
          };
          warrantyAction.uploadWarrantyGroup(
            id,
            project_id,
            warrantyParams,
            navigate,
            toast
          );
        }
      })
      .catch((e: any) => {
        if (e?.messages) {
          if (e?.messages?.length > 0) {
            e?.messages?.map((m: any) => {
              return toast.error(m?.message);
            });
          } else {
            toast.error(e);
          }
        } else {
          if (e) {
            toast.error(e);
          } else {
            toast.error("Unknown error, please contact admin");
          }
        }
      });
  }

  function getPropertiesByProject(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${id}/properties`)
      .then((response: any) => {
        if (response) {
          setProperties(response && response.data ? response.data : response);
        }
      });
  }

  function bulkUploadProperties(
    id: any,
    project_id: any,
    params: any,
    navigate: any,
    toast: any
  ) {
    return fetchWrapper
      .post(`${baseUrl}/property/bulk`, params)
      .then((response: any) => {
        if (response) {
          setBulkResponse(response && response.data ? response.data : response);
          setActiveTabIndex(1);
          navigate(`/organization/${id}/project/${project_id}`);
        }
      })
      .catch((e: any) => {
        if (e?.messages) {
          if (e?.messages?.length > 0) {
            e?.messages?.map((m: any) => {
              return toast.error(m?.message);
            });
          } else {
            toast.error(e);
          }
        } else {
          if (e) {
            toast.error(e);
          } else {
            toast.error("Unknown error, please contact admin");
          }
        }
      });
  }
}
