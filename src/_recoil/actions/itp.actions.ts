/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";
import { useFetchWrapper } from "@/helpers";
import { ItpManagementListAtom, LocationListAtom, TradeCodesByRegionAtom } from "../states";
import { toast } from "react-toastify";

export { useITPAction };

function useITPAction() {
    const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
    const fetchWrapper: any = useFetchWrapper();
    const setITPList = useSetRecoilState(ItpManagementListAtom); // Replace with the correct atom for ITP
    const setTradeCode = useSetRecoilState(TradeCodesByRegionAtom); // Replace with the correct atom for Trade Codes
    const setLocationList = useSetRecoilState(LocationListAtom); // Replace with the correct atom for Locations

    return {
        getItpTemplates,
        getTradeCode,
        getLocations,
        addITPTemplate,
        deleteITPTemplate,
        updateITPTemplate
    };

    function getItpTemplates(params: any) {
        return fetchWrapper
            .get(`${baseUrl}/itp_templates${params}`)
            .then((response: any) => {
                setITPList(response && response.data ? response.data : response);
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
            .delete(`${baseUrl}/itp_category/${id}`)
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
