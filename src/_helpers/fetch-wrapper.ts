/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilState } from "recoil";
import { tokenAtom } from "../_state";
import { usePersistor } from "./persistor";
import useLogout from "./goto";

export { useFetchWrapper };

function useFetchWrapper() {
  const [auth, setToken] = useRecoilState<any>(tokenAtom);
  const persist = usePersistor();
  const navigate = useLogout();
  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    upload: uploadImage("POST"),
  };

  function uploadImage(method: any) {
    return (url: any, body: any) => {
      const formData = new FormData();
      formData.append("files", body);
      const requestOptions: any = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.body = formData;
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  function request(method: any) {
    return (url: any, body: any) => {
      const requestOptions: any = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token: any = auth;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if ([401, 403].includes(response.status)) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          persist.clearValues("token");
          persist.clearValues("authUser");
          setToken(null);
          navigate("/signin");
        }

        const error =
          (data && data.message
            ? data.message
            : data.error
            ? data.error
            : data.messages
            ? data.messages.map((msg: any) => msg.message).join(",")
            : data.errors) || response.statusText;

        return Promise.reject(error);
      }

      return data;
    });
  }
}
