/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";
import { useFetchWrapper } from "../_helpers";
import {
  activeTabIndexProjectAtom,
  commonAreaWarrantyResponse,
  warrantiesUpdateAtom,
} from "../_state";

export { useWarrantyAction };

function useWarrantyAction() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setActiveTabIndex = useSetRecoilState(activeTabIndexProjectAtom);
  const setWarrantyUpdate = useSetRecoilState(warrantiesUpdateAtom);
  const setCommonAreaWarrantyResponse = useSetRecoilState(
    commonAreaWarrantyResponse
  );
  return {
    uploadWarrantyGroup,
    updateWarranty,
    deleteWarranty,
    uploadBulk,
    saveCommonAreaWarranties,
    uploadWarrantyGroupNoNavigate,
  };

  function saveCommonAreaWarranties(params: any, toast: any) {
    return fetchWrapper
      .post(`${baseUrl}/warranty`, params)
      .then((response: any) => {
        const res = response && response.data ? response.data : response;
        setCommonAreaWarrantyResponse(res);
        if (res) {
          toast.success("Common area is saved!");
        }
      });
  }

  function deleteWarranty(id: any) {
    return fetchWrapper
      .delete(`${baseUrl}/warranty/${id}`)
      .then((response: any) => {
        if (response) {
          //   setActiveTabIndex(1)
        }
      });
  }

  function updateWarranty(id: any, params: any, toast: any) {
    return fetchWrapper
      .put(`${baseUrl}/warranty/${id}`, params)
      .then((response: any) => {
        if (response) {
          //   setActiveTabIndex(1)
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
            toast.error("Property has been created with warranty upload issue");
          }
        }
      });
  }

  function uploadWarrantyGroupNoNavigate(params: any, toast: any) {
    return fetchWrapper
      .post(`${baseUrl}/warranty`, params)
      .then((response: any) => {
        if (response) {
          console.log(response);
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
            toast.error("Wwarranty upload failed");
          }
        }
      });
  }

  function uploadWarrantyGroup(
    id: any,
    project_id: any,
    params: any,
    navigate: any,
    toast: any
  ) {
    return fetchWrapper
      .post(`${baseUrl}/warranty`, params)
      .then((response: any) => {
        if (response) {
          setActiveTabIndex(1);
          navigate(`/organization/${id}/project/${project_id}`);
          toast.info("Property has been created!");
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
            toast.error("Property has been created with warranty upload issue");
          }
        }
      });
  }

  function uploadBulk(params: any, toast: any) {
    return fetchWrapper
      .post(`${baseUrl}/warranty`, params)
      .then((response: any) => {
        if (response) {
          setActiveTabIndex(1);
          setWarrantyUpdate(response);
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
            toast.error("Property has been created with warranty upload issue");
          }
        }
      });
  }
}
