/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { history, useFetchWrapper } from "@/helpers";
import {
  addRegionResponseAtom,
  addUserReponseAtom,
  allNotificationsAtom,
  allRegionAtom,
  allUserAtom,
  authAtom,
  contactSupportAtom,
  globalConfigAtom,
  projectAdminUsersAtom,
  selectedRegionAtom,
  selectedTicketAtom,
  signupLeadsConvertAtom,
  signupLeadsListAtom,
  supportTicketsAtom,
  tokenAtom,
  usersAtom,
} from "@/_recoil/states";
import { usePersistor } from "@/helpers/persistor";
import { toast } from "react-toastify";

export { useUserActions };

function useUserActions() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setGlobalConfig = useSetRecoilState(globalConfigAtom);
  const setAllNotification = useSetRecoilState(allNotificationsAtom);
  const setAddUserResponse = useSetRecoilState(addUserReponseAtom);
  const setProjectAdminUsers = useSetRecoilState(projectAdminUsersAtom);
  const setLeads = useSetRecoilState(signupLeadsListAtom);
  const setLeadsConverted = useSetRecoilState(signupLeadsConvertAtom);
  const setSupportTickets = useSetRecoilState(supportTicketsAtom);
  const setSelectedSupportTickets = useSetRecoilState(selectedTicketAtom);
  const setContactSupport = useSetRecoilState(contactSupportAtom);
  const setRegions = useSetRecoilState(allRegionAtom);
  const setRegionsResponse = useSetRecoilState(addRegionResponseAtom);
  const setSelectedRegion = useSetRecoilState(selectedRegionAtom);
  const setAllUsers = useSetRecoilState(allUserAtom);
  const persist = usePersistor();

  return {
    changePassword,
    getDcryptToken,
    forgotPassword,
    resetPassword,
    login,
    logout,
    getAll,
    getConfig,
    getAllNotifications,
    addUser,
    getProjectAdminUsers,
    getLeads,
    rejectLead,
    convertLead,
    getSupportTikets,
    getSelectedTicket,
    submitSupportTikets,
    updateSupportTikets,
    getAllRegions,
    addRegion,
    getRegionById,
    updateRegion,
    deleteRegion,
    restoreRegion,
    getAllUsers
    // addUserWithTrades,
  };

  function getRegionById(id: any) {
    return fetchWrapper.get(`${baseUrl}/region/${id}`).then((response: any) => {
      if (response) {
        setSelectedRegion(response && response.data ? response.data : response);
      }
    });
  }

  function deleteRegion(id: any) {
    return fetchWrapper.delete(`${baseUrl}/region/${id}`).then((response: any) => {
      if (response) {
        setSelectedRegion(response && response.data ? response.data : response);
      }
    });
  }

  function restoreRegion(id: any) {
    return fetchWrapper.put(`${baseUrl}/region/restore/${id}`).then((response: any) => {
      if (response) {
        setSelectedRegion(response && response.data ? response.data : response);
      }
    });
  }

  function updateRegion(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/region/${id}`, params)
      .then((response: any) => {
        if (response) {
          setRegionsResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function addRegion(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/region`, params)
      .then((response: any) => {
        if (response) {
          setRegionsResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function getAllRegions() {
    return fetchWrapper.get(`${baseUrl}/region`).then((response: any) => {
      if (response) {
        setRegions(response && response.data ? response.data : response);
      }
    });
  }

  function getSelectedTicket(id: any) {
    return fetchWrapper
      .get(`${baseUrl}/support/${id}`)
      .then((response: any) => {
        if (response) {
          setSelectedSupportTickets(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function submitSupportTikets(params: any) {
    return fetchWrapper
      .post(`${baseUrl}/support`, params)
      .then((response: any) => {
        if (response) {
          setContactSupport(
            response && response.data ? response.data : response
          );
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

  function updateSupportTikets(id: any, params: any) {
    return fetchWrapper
      .put(`${baseUrl}/support/${id}`, params)
      .then((response: any) => {
        if (response) {
          setContactSupport(
            response && response.data ? response.data : response
          );
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

  function getSupportTikets() {
    return fetchWrapper.get(`${baseUrl}/support`).then((response: any) => {
      if (response) {
        setSupportTickets(response && response.data ? response.data : response);
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

  function getProjectAdminUsers(org_id: any) {
    const isAdmin = persist.getValues("isAdmin");
    const url = isAdmin
      ? `${baseUrl}/users?roleKey=project_admin`
      : `${baseUrl}/organization/${org_id}/users?roleKey=project_admin`;
    return fetchWrapper.get(url).then((response: any) => {
      setProjectAdminUsers(
        response && response.data ? response.data : response
      );
    });
  }

  function getAllUsers(org_id: any) {
    const isAdmin = persist.getValues("isAdmin");
    const url = isAdmin
      ? `${baseUrl}/users`
      : `${baseUrl}/organization/${org_id}/users`;
    return fetchWrapper.get(url).then((response: any) => {
      setAllUsers(
        response && response.data ? response.data : response
      );
    });
  }


  function addUser(project_id: any, params: any) {
    return fetchWrapper
      .post(`${baseUrl}/project/${project_id}/user`, params)
      .then((response: any) => {
        if (response) {
          setAddUserResponse(
            response && response.data ? response.data : response
          );
        }
      });
  }

  function convertLead(params: any, userAction: any) {
    return fetchWrapper
      .post(`${baseUrl}/admin/signup-leads/organization`, params)
      .then((response: any) => {
        if (response) {
          setLeadsConverted(
            response && response.data ? response.data : response
          );
          userAction.getLeads();
        }
      });
  }

  function rejectLead(params: any, userAction: any) {
    return fetchWrapper
      .delete(`${baseUrl}/admin/signup-leads/${params.id}`)
      .then((response: any) => {
        if (response) {
          setLeadsConverted(
            response && response.data ? response.data : response
          );
          userAction.getLeads();
        }
      });
  }

  // function addUserWithTrades(project_id: any, params: any) {
  //   return fetchWrapper
  //     .post(`${baseUrl}/project/${project_id}/users-with-tradecode`, params)
  //     .then((response: any) => {
  //       if (response) {
  //         setAddUserResponse(
  //           response && response.data ? response.data : response
  //         );
  //       }
  //     });
  // }

  function getConfig() {
    return fetchWrapper
      .get(`${baseUrl}/global_config`)
      .then((response: any) => {
        if (response) {
          setGlobalConfig(response && response.data ? response.data : response);
        }
      });
  }

  function getLeads() {
    return fetchWrapper
      .get(`${baseUrl}/admin/signup-leads`)
      .then((response: any) => {
        if (response) {
          setLeads(response && response.data ? response.data : response);
        }
      });
  }

  function getAllNotifications() {
    return fetchWrapper
      .get(`${baseUrl}/notifications?forAdmin=true`)
      .then((response: any) => {
        if (response) {
          setAllNotification(response);
        }
      });
  }

  function login(email: string, password: string, navigate: any) {
    const isAdmin = location.pathname === "/sign-in/admin" ? true : false;

    return fetchWrapper
      .post(`${baseUrl}/${isAdmin ? `admin/login` : `login`}`, {
        email,
        password,
      })
      .then((user: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        persist.putValues("token", user.token);
        persist.putValues("authUser", user);
        persist.putValues("isAdmin", isAdmin);
        setToken(user.token);
        setAuth(JSON.stringify(user));
        // get return url from location state or default to home page
        const { from }: any = history.location.state || {
          from: { pathname: "/" },
        };
        navigate(from);
        // history.push(from);
      })
      .catch((error: any) => {
        // Re-throw the error so it can be caught by the calling component
        throw error;
      });
  }

  function logout(navigate: any) {
    // remove user from local storage, set auth state to null and redirect to login page
    persist.clearValues("token");
    persist.clearValues("authUser");
    // localStorage.setItem("theme", "light");
    setAuth(undefined);
    setToken(undefined);
    navigate("/sign-in");
    // location.reload();
  }

  function getAll() {
    return fetchWrapper.get(baseUrl).then(setUsers);
  }

  function forgotPassword(email: string) {
    const isAdmin = location.href.includes("forgot-password/admin") ? true : false;

    return fetchWrapper
      .post(`${baseUrl}/${isAdmin ? `admin/forgot_password` : `forgot_password`}`, {
        email,
      })
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

  function changePassword(params: any) {
    const isAdmin = persist.getValues("isAdmin");
    const user = persist.getValues("authUser");
    const url = isAdmin ? `${baseUrl}/admin/${user?.user?.id}` : `${baseUrl}/users/${user?.user?.id}`
    return fetchWrapper.put(url, params).then((response: any) => {
      if (response) {
        return response;
      }
    }).catch((error: any) => error)
  }

  function resetPassword(password: string, confirmPassword: string, token: string, navigate: any) {
    return fetchWrapper
      .post(`${baseUrl}/reset_password`, {
        token,
        password,
        confirmPassword
      })
      .then((response: any) => {
        if (response) {
          const { from }: any = history.location.state || {
            from: { pathname: "/" },
          };
          navigate(from);
        }
      });
  }

  function getDcryptToken(token: string) {
    return fetchWrapper.post(`${baseUrl}/decrypt_token`, { token }).then((response: any) => {
      if (response) {
        return response;
      }
    }).catch((error: any) => console.error({ error }))
  }

}
