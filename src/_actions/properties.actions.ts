/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  activeTabIndexProjectAtom,
  bulkResponseAtom,
  generateReportAtom,
  listPropertiesAtom,
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
  const setListProperties = useSetRecoilState(listPropertiesAtom);
  const setGenerateReport = useSetRecoilState(generateReportAtom);
  const warrantyAction = useWarrantyAction();

  return {
    getPropertiesByProject,
    bulkUploadProperties,
    addProperty,
    getProperty,
    updateProperty,
    generateNewReport,
    getPropertyByProject,
  };

  function generateNewReport(id: any, toast: any) {
    return fetchWrapper
      .get(`${baseUrl}/request-report-generation?propertyId=${id}`)
      .then((_response: any) => {
        setGenerateReport(true);
        toast.success("New reports generated!");
      });
  }

  function getPropertyByProject(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${id}/properties`)
      .then((response: any) => {
        if (response) {
          setListProperties(
            response && response.data ? response.data : response
          );
        }
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
    _hasWarranties: boolean,
    _filesToDelete: any
  ) {
    return fetchWrapper
      .put(`${baseUrl}/property/${property_id}`, params)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          setBulkResponse(res);
          toast.info("Property has been updated");
          // if (filesToDelete) {
          //   filesToDelete?.map((del: any) => {
          //     warrantyAction.deleteWarranty(del);
          //   });
          // }

          const hasOldWaranties = warranties?.groups?.filter(
            (warant: any) => warant.warrantyId
          );
          const hasNewWarranties = warranties?.groups?.filter(
            (warant: any) => !warant.warrantyId
          );

          const oldWarranties = {
            groups: hasOldWaranties,
          };

          if (hasOldWaranties.length > 0) {
            oldWarranties?.groups?.map((warrant: any) => {
              warrantyAction.updateWarranty(
                warrant.warrantyId,
                { files: warrant.files },
                toast
              );
            });
            setActiveTabIndex(1);
          } else {
            setActiveTabIndex(1);
          }
          if (hasNewWarranties?.length > 0) {
            const hasFiles = hasNewWarranties?.filter(
              (warrant: any) => warrant?.files?.length > 0
            );

            if (hasFiles) {
              const warrantyParams = {
                propertyId: property_id,
                groups: hasFiles,
              };
              warrantyAction.uploadWarrantyGroupNoNavigate(
                warrantyParams,
                toast
              );
              setActiveTabIndex(1);
            }
          } else {
            setActiveTabIndex(1);
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

  function attachUser(user: any, id: any) {
    const params = {
      id: user?.id,
      roleId: 6,
    };
    return fetchWrapper
      .post(`${baseUrl}/property/${id}/user`, params)
      .then((_response: any) => {});
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

          if (params?.users?.length > 0) {
            const promise1 = params?.users?.map(async (user: any) => {
              await attachUser(user, res?.id);
            });
            Promise.all(promise1).then(function () {
              if (warranties?.length > 0) {
                const warrantyParams = {
                  propertyId: res.id,
                  ...warranties,
                };
                warrantyAction
                  .uploadWarrantyGroup(
                    id,
                    project_id,
                    warrantyParams,
                    navigate,
                    toast
                  )
                  .then(() => {
                    setBulkResponse(res);
                  });
              } else {
                setActiveTabIndex(1);
                toast.info("Property has been successfully created!");
                navigate(-1);
              }
            });
          } else {
            if (warranties?.length > 0) {
              const warrantyParams = {
                propertyId: res.id,
                ...warranties,
              };
              warrantyAction
                .uploadWarrantyGroup(
                  id,
                  project_id,
                  warrantyParams,
                  navigate,
                  toast
                )
                .then(() => {
                  setBulkResponse(res);
                });
            } else {
              setActiveTabIndex(1);
              toast.info("Property has been successfully created!");
              navigate(-1);
            }
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
