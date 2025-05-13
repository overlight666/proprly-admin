/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "@/helpers";
import {
  buildersAtom,
  organizationDashboardAtom,
  organizationDefectAtom,
  organizationOutlineAtom,
  organizationPropertyOwnerAtom,
  organizationsAtom,
  organizationsBuilderAtom,
  organizationTimelineAtom,
  regionAtom,
  selectedOrgAtom,
} from "@/_recoil/states";
import { usePersistor } from "@/helpers/persistor";
import { toast } from "react-toastify";

export { useOrganization };

function useOrganization() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setOrganizations = useSetRecoilState(organizationsAtom);
  const setOrganizationOutline = useSetRecoilState(organizationOutlineAtom);
  const setBuilders = useSetRecoilState(buildersAtom);
  const setRegion = useSetRecoilState(regionAtom);
  const setSelectedOrg = useSetRecoilState(selectedOrgAtom);
  const setDashboardData = useSetRecoilState(organizationDashboardAtom);
  const setOrganizationTimeline = useSetRecoilState(organizationTimelineAtom);
  const setDefectSubmission = useSetRecoilState(organizationDefectAtom);
  const setOrgOwners = useSetRecoilState(organizationPropertyOwnerAtom);
  const setOrganizationBuilder = useSetRecoilState(organizationsBuilderAtom);

  const persist = usePersistor();

  return {
    getOrgPropertyOwners,
    getOrganizations,
    setOrganizationHeaderOutline,
    getBuilders,
    getRegion,
    addOrganization,
    getSelectedOrganization,
    updateOrganization,
    getDashboardStats,
    getTimeline,
    getDefectSubmission,
    getDefectSubmissionResult,
    attachBuilder,
  };

  function attachBuilder(id: any, params: any) {
    return fetchWrapper
      .post(`${baseUrl}/organizations/${id}/user`, params)
      .then((response: any) => {
        if (response) {
          setOrganizationBuilder(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getOrgPropertyOwners(id: any) {
    const isAdmin = persist.getValues("isAdmin");
    const url = isAdmin
      ? `${baseUrl}/users?roleKey=property_owner`
      : `${baseUrl}/organization/${id}/users?roleKey=property_owner`;
    return fetchWrapper.get(url).then((response: any) => {
      if (response) {
        setOrgOwners(response && response.data ? response.data : response);
      }
    });
  }

  function getDefectSubmission(id: any, openModal: any) {
    return fetchWrapper
      .get(`${baseUrl}/admin/defect-submissions/${id}`)
      .then((response: any) => {
        if (response) {
          setDefectSubmission(
            response && response.data ? response.data : response
          );
          openModal();
        }
      });
  }

  function getDefectSubmissionResult(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/admin/defect-submissions/${id}`)
      .then((response: any) => {
        if (response) {
          setDefectSubmission(
            response && response.data ? response.data : response
          );
        }
      });
  }
  function getTimeline(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/notifications?forAdmin=true&organizationId=${id}`)
      .then((response: any) => {
        if (response) {
          setOrganizationTimeline(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getDashboardStats(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/dashboard/organizations/${id}`)
      .then((response: any) => {
        if (response) {
          setDashboardData(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function addOrganization(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/admin/organizations`, params)
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

  function updateOrganization(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/admin/organizations/${id}`, params)
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

  function getSelectedOrganization(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/admin/organizations/${id}`)
      .then((response: any) => {
        if (response) {
          setSelectedOrg(response && response.data ? response.data : response);
        }
      });
  }

  function getOrganizations() {
    return fetchWrapper
      .get(`${baseUrl}/admin/organizations`)
      .then((response: any) => {
        if (response) {
          setOrganizations(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getBuilders(id?: any) {
    const isAdmin = persist.getValues("isAdmin");
    const url = isAdmin
      ? `${baseUrl}/users?roleKey=organization_admin`
      : `${baseUrl}/organization/${id}/users?roleKey=organization_admin`;
    return fetchWrapper.get(url).then((response: any) => {
      if (response) {
        setBuilders(response && response.data ? response.data : response);
      }
    });
  }

  function getRegion() {
    return fetchWrapper.get(`${baseUrl}/region`).then((response: any) => {
      if (response) {
        setRegion(response && response.data ? response.data : response);
      }
    });
  }

  function setOrganizationHeaderOutline(value: string) {
    persist.putValues("organizationOutline", value);
    setOrganizationOutline(value);
  }
}
