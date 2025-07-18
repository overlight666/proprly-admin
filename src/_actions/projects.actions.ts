/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useFetchWrapper } from "../_helpers";
import {
  allProjectsAtom,
  attachedUserResponse,
  isLoadingAtom,
  projectDashboardAtom,
  projectDefectAtom,
  projectResponseAtom,
  projectsAtom,
  projectTimelineAtom,
  projectTowerResponseAtom,
  selectedProjectAtom,
} from "../_state/atoms";

export { useProject };

function useProject() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setProjects = useSetRecoilState(projectsAtom);
  const setSelectedProject = useSetRecoilState(selectedProjectAtom);
  const setDashboardData = useSetRecoilState(projectDashboardAtom);
  const setProjectTimeline = useSetRecoilState(projectTimelineAtom);
  const setDefectSubmission = useSetRecoilState(projectDefectAtom);
  const setProjectResponse = useSetRecoilState(projectResponseAtom);
  const setProjectTowerResponse = useSetRecoilState(projectTowerResponseAtom);
  const setAttachedUserResponse = useSetRecoilState(attachedUserResponse);
  const setAllProjects = useSetRecoilState(allProjectsAtom);
  const setLoading = useSetRecoilState(isLoadingAtom)

  return {
    getProjectsByOrg,
    getSelectedProject,
    getDashboardProjectStats,
    getTimeline,
    getDefectSubmission,
    getDefectSubmissionResult,
    addProject,
    updateProject,
    addProjectTower,
    removeProjectTower,
    attachUser,
    getAllProjects,
    editProjectTower
  };

  function attachUser(project_id: any, params: any) {
    return fetchWrapper
      .post(`${baseUrl}/project/${project_id}/user`, params)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          setAttachedUserResponse(res);
        }
      });
  }

  function addProjectTower(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/project_towers`, params)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          setProjectTowerResponse(res);
        }
      });
  }

  function editProjectTower(params: any, id: any) {
    return fetchWrapper
      .put(`${baseUrl}/project_towers/${id}`, params)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          return res;
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

  function removeProjectTower(id: any) {
    return fetchWrapper
      .delete(`${baseUrl}/project_towers/${id}`)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          setProjectTowerResponse(res);
        }
      });
  }

  function updateProject(params: any, id: any, toast: any) {
    return fetchWrapper
      .put(`${baseUrl}/projects/${id}`, params)
      .then((response: any) => {
        if (response) {
          setProjectResponse(
            response && response.data ? response.data : response
          );
          toast.info("Project Updated!");
        }
      });
  }

  function addProject(params: any, navigate: any) {
    return fetchWrapper
      .post(`${baseUrl}/projects`, params)
      .then((response: any) => {
        if (response) {
          const res = response && response.data ? response.data : response;
          navigate(`/organization/${params.organizationId}/project/${res.id}`);
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
      .get(`${baseUrl}/notifications?forAdmin=true&projectId=${id}`)
      .then((response: any) => {
        if (response) {
          setProjectTimeline(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getDashboardProjectStats(id: any, project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/dashboard/organizations/${id}?projectId=${project_id}`)
      .then((response: any) => {
        if (response) {
          setDashboardData(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getProjectsByOrg(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/organization/${id}/projects`)
      .then((response: any) => {
        if (response) {
          setProjects(response && response.data ? response.data : response);
        }
      });
  }

  function getSelectedProject(id: any) {
    setLoading(true)
    return fetchWrapper
      .get(`${baseUrl}/projects/${id}`)
      .then((response: any) => {
        if (response) {
          setSelectedProject(
            response && response.data ? response.data : response
          );
           setLoading(false)
        }
      });
  }

  function getAllProjects() {
    return fetchWrapper.get(`${baseUrl}/projects`).then((response: any) => {
      if (response) {
        setAllProjects(response && response.data ? response.data : response);
      }
    });
  }
}
