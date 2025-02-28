/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import { defectFeedbackAtom } from "../_state/atoms/defects";

export { useDefect };

function useDefect() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setDefectFeedback = useSetRecoilState(defectFeedbackAtom);

  return {
    pushDefectFeedback,
  };

  function pushDefectFeedback(id: any, params: any) {
    return fetchWrapper
      .post(`${baseUrl}/defect-submissions/${id}/feedback`, params)
      .then((response: any) => {
        if (response) {
          setDefectFeedback(
            response && response.data ? response.data : response
          );
        }
      });
  }
}
