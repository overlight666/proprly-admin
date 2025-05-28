/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";
import { useFetchWrapper } from "@/helpers";
import { AllTradeCodesAtom, AllTradeCodesByKeyAtom, ITPLocationListAtom, ItpManagementListAtom, ItpTaskListAtom, ItpTaskSubmissionListAtom, LocationListAtom, TIPOptionsAtom, TradeCodesByRegionAtom } from "../states";
import { toast } from "react-toastify";

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
        restoreITPTemplate
    };

    function getITPLocations() {
        return fetchWrapper
            .get(`${baseUrl}/itp_templates/locations`)
            .then((response: any) => {
                setITPLocations(response && response.data ? response.data : response);
            });
    }

    function getItpOptions() {
        return fetchWrapper
            .get(`${baseUrl}/itp_task_option_config`)
            .then((response: any) => {
                setITPOptions(response && response.data ? response.data : response);
            });
    }

    function getItpTemplates(params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp_templates${params}`)
            .then((response: any) => {
                setITPList(response && response.data ? response.data : response);
            });
    }

    function getItpTasks(params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp_task${params}`)
            .then((response: any) => {
                setITPTaskList(response && response.data ? response.data : response);
            });
    }

    function getItpTasksSubmission(params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp_task_submission${params}`)
            .then((response: any) => {
                setITPTaskSubmissionList(response && response.data ? response.data : response);
            });
    }

    function getAllTradeCode() {
        return fetchWrapper
            .get(`${baseUrl}/trade-code`)
            .then((response: any) => {
                setAllTradeCode(response && response.data ? response.data : response);
            });
    }

    function getAllTradeCodeByKey(locationKey: any, project_id: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp_templates/itp_template_tradecode?locationKey=${locationKey}&projectId=${project_id}`)
            .then((response: any) => {
                setAllTradeCodeByKey(response && response.data ? response.data : response);
            });
    }


    function getTradeCode(params: any) {
        return fetchWrapper
            .get(`${baseUrl}/trade-code${params}`)
            .then((response: any) => {
                setTradeCode(response && response.data ? response.data : response);
            });
    }

    function getLocations() {
        return fetchWrapper
            .get(`${baseUrl}/itp_templates/locations`)
            .then((response: any) => {
                setLocationList(response && response.data ? response.data : response);
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

    function addITPTask(params: any) {
        return fetchWrapper
            .post(`${baseUrl}/itp_task`, params)
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
