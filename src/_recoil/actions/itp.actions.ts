/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";
import { errorMessage, useFetchWrapper } from "@/helpers";
import { AllTradeCodesAtom, AllTradeCodesByKeyAtom, ITPLocationListAtom, ItpManagementListAtom, ItpSubmissionPreviewAtom, ItpSubmissionSubStatusAtom, ItpTaskConstructionDataAtom, ItpTaskListAtom, ItpTaskSubmissionListAtom, LocationListAtom, TIPOptionsAtom, TradeCodesByRegionAtom } from "../states";
import { toast } from "react-toastify";
import axios from "axios";
export { useITPAction };

function useITPAction() {
    const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
    const fetchWrapper: any = useFetchWrapper();
    const setITPList = useSetRecoilState(ItpManagementListAtom); // Replace with the correct atom for ITP
    const setTradeCode = useSetRecoilState(TradeCodesByRegionAtom); // Replace with the correct atom for Trade Codes
    const setLocationList = useSetRecoilState(LocationListAtom); // Replace with the correct atom for Locations
    const setITPTaskList = useSetRecoilState(ItpTaskListAtom);
    const setITPOptions = useSetRecoilState(TIPOptionsAtom);
    const setITPLocations = useSetRecoilState(ITPLocationListAtom);
    const setAllTradeCode = useSetRecoilState(AllTradeCodesAtom);
    const setITPTaskSubmissionList = useSetRecoilState(ItpTaskSubmissionListAtom);
    const setAllTradeCodeByKey = useSetRecoilState(AllTradeCodesByKeyAtom);
    const setItpTaskConstructionData = useSetRecoilState(ItpTaskConstructionDataAtom);
    const setItpSubmissionPreview = useSetRecoilState(ItpSubmissionPreviewAtom);
    const setItpSubmissionSubStatus = useSetRecoilState(ItpSubmissionSubStatusAtom);
    return {
        getItpTemplates,
        getTradeCode,
        getLocations,
        addITPTemplate,
        deleteITPTemplate,
        updateITPTemplate,
        getItpTasks,
        getItpOptions,
        addITPTask,
        getITPLocations,
        getAllTradeCode,
        getItpTasksSubmission,
        getAllTradeCodeByKey,
        restoreITPTemplate,
        taskSubmission,
        getItpConstructionData,
        getItpTasksSubmissionByKey,
        getItpTasksSubmissionByCommonArea,
        getItpTasksSubmissionByProperty,
        taskSubmissionReopen,
        getItpTemplatesReports,
        getItpTemplatesByLocation,
        getItpSubmission,
        taskResubmission,
        getItpSubmissionSubStatus,
        uploadSignature,
        getITPReports
    };

    async function uploadSignature(file: any, token: any) {
        const formData = new FormData();
        formData.append("files", file);
        return axios({
            method: "post",
            url: `${baseUrl}/upload`,
            data: formData,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response: any) => {
                return response.data[0];
            })
            .catch((error: any) => {
                return error;
            });
    }

    function getItpSubmissionSubStatus(id: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp-task-submissions/${id}/sub-status/list`)
            .then((response: any) => {
                setItpSubmissionSubStatus(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getItpSubmission(id: any) {
        setItpSubmissionPreview(undefined);
        return fetchWrapper
            .get(`${baseUrl}/itp_task_submission/${id}`)
            .then((response: any) => {
                setItpSubmissionPreview(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getITPLocations(project_id: any) {
        return fetchWrapper
            .get(`${baseUrl}/project/${project_id}/properties_common_areas`)
            .then((response: any) => {
                setITPLocations(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getITPReports(project_id: any, params: any) {
        return fetchWrapper
            .get(`${baseUrl}/reports/project/${project_id}${params}`)
            .then((response: any) => {
                return response && response.data ? response.data : response;
            }).catch((e: any) => {
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


    function getItpOptions() {
        return fetchWrapper
            .get(`${baseUrl}/itp_task_option_config`)
            .then((response: any) => {
                setITPOptions(response && response.data ? response.data : response);
            }).catch((e: any) => {
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


    function getItpTemplatesByLocation(project_id: any, params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/templates-with-submission-by-project/${project_id}${params}`)
            .then((response: any) => {
                return response && response.data ? response.data : response;
            }).catch((e: any) => {
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

    function getItpTemplates(params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp_templates${params}`)
            .then((response: any) => {
                setITPList(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getItpTemplatesReports(project_id: any, template_id: any, location_key: any) {
        return fetchWrapper
            .get(`${baseUrl}/report/itp_task_submission/project/${project_id}/template/${template_id}/location/${location_key}`)
            .then((response: any) => {
                return (response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getItpTasks(id: any, params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/template/${id}/tasks${params}`)
            .then((response: any) => {
                setITPTaskList(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getItpTasksSubmission(project_id: any, locationKey: any, params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/project/${project_id}/${locationKey}/submissions${params}`)
            .then((response: any) => {
                if (response?.status) {
                    errorMessage(response)
                } else {
                    setITPTaskSubmissionList(response && response.data ? response.data : response);
                }

            }).catch((e: any) => {
                errorMessage(e)
            });
    }

    function getItpTasksSubmissionByKey(project_id: any, locationKey: any, params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/project/${project_id}/${locationKey}/submissions${params}`)
            .then((response: any) => {
                if (response?.status) {
                    errorMessage(response)
                } else {
                    return (response && response.data ? response.data : response);
                }

            }).catch((e: any) => {
                errorMessage(e)
            });
    }

    function getItpTasksSubmissionByCommonArea(project_id: any, commonAreaId: any, params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/project/${project_id}/commonarea/${commonAreaId}/submissions${params}`)
            .then((response: any) => {
                if (response?.status) {
                    errorMessage(response)
                } else {
                    return (response && response.data ? response.data : response);
                }

            }).catch((e: any) => {
                errorMessage(e)
            });
    }

    function getItpTasksSubmissionByProperty(project_id: any, propertyId: any, params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/project/${project_id}/property/${propertyId}/submissions${params}`)
            .then((response: any) => {
                if (response?.status) {
                    errorMessage(response)
                } else {
                    return (response && response.data ? response.data : response);
                }

            }).catch((e: any) => {
                errorMessage(e)
            });
    }

    function getItpConstructionData(project_id: any, key_from_construction_option: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/location-mapping-by-project/${project_id}?locationListKey=${key_from_construction_option}`)
            .then((response: any) => {
                if (response?.status) {
                    errorMessage(response)
                } else {
                    setItpTaskConstructionData(response && response.data ? response.data : response);
                    return response && response.data ? response.data : response;
                }

            }).catch((e: any) => {
                errorMessage(e)
            });
    }

    function getAllTradeCode() {
        return fetchWrapper
            .get(`${baseUrl}/trade-code`)
            .then((response: any) => {
                setAllTradeCode(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getAllTradeCodeByKey(locationKey: any, project_id: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp/tradecodes-by-location-by-project/${project_id}?locationKey=${locationKey}`)
            .then((response: any) => {
                if (response?.status) {
                    errorMessage(response)
                } else {
                    setAllTradeCodeByKey(response && response.data ? response.data : response);
                }

            }).catch((e: any) => {
                errorMessage(e)
            });
    }


    function getTradeCode(params: any) {
        return fetchWrapper
            .get(`${baseUrl}/trade-code${params}`)
            .then((response: any) => {
                setTradeCode(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function getLocations() {
        return fetchWrapper
            .get(`${baseUrl}/itp_templates/locations`)
            .then((response: any) => {
                setLocationList(response && response.data ? response.data : response);
            }).catch((e: any) => {
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

    function deleteITPTemplate(id: any) {
        return fetchWrapper
            .delete(`${baseUrl}/itp_templates/${id}`)
            .then((response: any) => {
                return response && response.data ? response.data : response;
            }).catch((e: any) => {
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

    function restoreITPTemplate(id: any) {
        return fetchWrapper
            .put(`${baseUrl}/itp_templates/restore/${id}`)
            .then((response: any) => {
                return response && response.data ? response.data : response;
            }).catch((e: any) => {
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

    function addITPTemplate(params: any, urlParams: any) {
        return fetchWrapper
            .post(`${baseUrl}/itp_templates${urlParams}`, params)
            .then((response: any) => {
                if (response) {
                    return response && response.data ? response.data : response
                }
            }).catch((e: any) => {
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


    function taskSubmissionReopen(id: any, params: any) {
        return fetchWrapper
            .post(`${baseUrl}/itp-submissions/${id}/feedback`, params)
            .then((response: any) => {
                if (response) {
                    return response && response.data ? response.data : response
                }
            }).catch((e: any) => {
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

    function taskSubmission(params: any) {
        return fetchWrapper
            .post(`${baseUrl}/itp_task_submission`, params)
            .then((response: any) => {
                if (response) {
                    return response && response.data ? response.data : response
                }
            }).catch((e: any) => {
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

    function taskResubmission(id: any, params: any) {
        return fetchWrapper
            .post(`${baseUrl}/itp-task-submissions/${id}/sub-status/change`, params)
            .then((response: any) => {
                if (response) {
                    return response && response.data ? response.data : response
                }
            }).catch((e: any) => {
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


    function addITPTask(params: any, urlParams: any) {
        return fetchWrapper
            .post(`${baseUrl}/itp_task${urlParams}`, params)
            .then((response: any) => {
                if (response) {
                    return response && response.data ? response.data : response
                }
            }).catch((e: any) => {
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

    function updateITPTemplate(params: any, id: any) {
        return fetchWrapper
            .put(`${baseUrl}/itp_templates/${id}`, params)
            .then((response: any) => {
                if (response) {
                    return response && response.data ? response.data : response
                }
            }).catch((e: any) => {
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
