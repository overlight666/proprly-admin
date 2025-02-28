/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import { defectResolutionAtom } from "../_state/atoms/defectResolution";

export { useDefectResolution };

function useDefectResolution() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setDefects = useSetRecoilState(defectResolutionAtom);

  return {
    getDefectResolutions,
  };

  function getDefectResolutions(id: any, type: string) {
    let url = "";
    if (type == "commonArea") {
      url = `/admin/defect-submissions?commonAreaId=${id}&type=commonArea`;
    } else {
      url = `/admin/defect-submissions?projectId=${id}&type=property`;
    }
    return fetchWrapper.get(`${baseUrl}${url}`).then((response: any) => {
      setDefects(response && response.data ? response.data : response);
    });
  }
}
