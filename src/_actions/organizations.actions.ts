/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  buildersAtom,
  organizationDashboardAtom,
  organizationDefectAtom,
  organizationOutlineAtom,
  organizationPropertyOwnerAtom,
  organizationsAtom,
  organizationTimelineAtom,
  regionAtom,
  selectedOrgAtom,
} from "../_state/atoms/organizations";
import { usePersistor } from "../_helpers/persistor";

export { useOrganization };

function useOrganization() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
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
  };

  function getOrgPropertyOwners(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/organization/${id}/users?roleKey=property_owner`)
      .then((response: any) => {
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

  function addOrganization(params: any, navigate: any) {
    return fetchWrapper
      .post(`${baseUrl}/admin/organizations`, params)
      .then((response: any) => {
        if (response) {
          navigate("/");
        }
      });
  }

  function updateOrganization(id: any, params: any, toast: any) {
    return fetchWrapper
      .put(`${baseUrl}/admin/organizations/${id}`, params)
      .then((response: any) => {
        if (response) {
          toast.info("Organization is updated");
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

  function getBuilders() {
    return fetchWrapper
      .get(`${baseUrl}/users?roleKey=organization_admin`)
      .then((response: any) => {
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
