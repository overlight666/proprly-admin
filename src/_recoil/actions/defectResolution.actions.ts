/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "@/helpers";
import { defectResolutionAtom } from "@/_recoil/states";
import { isLoadingAtom } from "@/_recoil/states";

export { useDefectResolution };

function useDefectResolution() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setDefects = useSetRecoilState(defectResolutionAtom);
  const setLoading = useSetRecoilState(isLoadingAtom);

  return {
    getDefectResolutions,
    getAllDefectResolutions,
  };

  function getDefectResolutions(id: any, type: string) {
    setLoading(true)
    let url = "";
    if (type == "commonArea") {
      url = `/admin/defect-submissions?projectId=${id}&type=commonArea`;
    } else {
      url = `/admin/defect-submissions?projectId=${id}&type=property`;
    }
    return fetchWrapper.get(`${baseUrl}${url}`).then((response: any) => {
      setDefects(response && response.data ? response.data : response);
      setLoading(false)
    });
  }

  function getAllDefectResolutions(id: any) {
    setLoading(true)
    return fetchWrapper
      .get(`${baseUrl}/admin/defect-submissions?projectId=${id}`)
      .then((response: any) => {
        setDefects(response && response.data ? response.data : response);
        setLoading(false)
      });
  }
}
