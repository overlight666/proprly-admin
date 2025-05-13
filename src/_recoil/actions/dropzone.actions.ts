/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";
import { dropZoneAtom } from "@/_recoil/states";
import { useFetchWrapper } from "@/helpers";

export { useDropzoneAction };

function useDropzoneAction() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setImage = useSetRecoilState(dropZoneAtom);

  return {
    uploadImage,
  };
  function uploadImage(params: any) {
    return fetchWrapper
      .upload(`${baseUrl}/upload`, params)
      .then((response: any) => {
        if (response) {
          setImage(response && response.data ? response.data : response[0]);
        }
      });
  }
}
