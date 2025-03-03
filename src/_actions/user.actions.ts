/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { history, useFetchWrapper } from "../_helpers";
import {
  addUserReponseAtom,
  allNotificationsAtom,
  authAtom,
  globalConfigAtom,
  projectAdminUsersAtom,
  tokenAtom,
  usersAtom,
} from "../_state";
import { usePersistor } from "../_helpers/persistor";

export { useUserActions };

function useUserActions() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setGlobalConfig = useSetRecoilState(globalConfigAtom);
  const setAllNotification = useSetRecoilState(allNotificationsAtom);
  const setAddUserResponse = useSetRecoilState(addUserReponseAtom);
  const setProjectAdminUsers = useSetRecoilState(projectAdminUsersAtom);
  const persist = usePersistor();

  return {
    login,
    logout,
    getAll,
    getConfig,
    getAllNotifications,
    addUser,
    getProjectAdminUsers,
    // addUserWithTrades,
  };

  function getProjectAdminUsers(org_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/organization/${org_id}/users?roleKey=project_admin`)
      .then((response: any) => {
        setProjectAdminUsers(
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
    const isAdmin = location.pathname === "/signin/admin" ? true : false;

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
      });
  }

  function logout(navigate: any) {
    // remove user from local storage, set auth state to null and redirect to login page
    persist.clearValues("token");
    persist.clearValues("authUser");
    // localStorage.setItem("theme", "light");
    setAuth(undefined);
    setToken(undefined);
    navigate("/signin");
    // location.reload();
  }

  function getAll() {
    return fetchWrapper.get(baseUrl).then(setUsers);
  }
}
