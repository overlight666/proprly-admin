/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "@/helpers";
import {
  commonAreaReportsAtom,
  latestProjectReportsAtom,
  propertyReportsAtom,
} from "@/_recoil/states";

export { useReports };

function useReports() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setLatestProjectReports = useSetRecoilState(latestProjectReportsAtom);
  const setCommonAreaReports = useSetRecoilState(commonAreaReportsAtom);
  const setPropertyReports = useSetRecoilState(propertyReportsAtom);

  return {
    generateLatestProjectReport,
    getProjectCommonAreaReports,
    getProjectPropertyReports,
  };

  function generateLatestProjectReport(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/request-report-generation?projectId=${project_id}`)
      .then((response: any) => {
        setLatestProjectReports(
          response && response.data ? response.data : response
        );
      });
  }

  function getProjectCommonAreaReports(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${project_id}/common_area_reports`)
      .then((response: any) => {
        setCommonAreaReports(
          response && response.data ? response.data : response
        );
      });
  }
  function getProjectPropertyReports(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${project_id}/property_reports`)
      .then((response: any) => {
        setPropertyReports(
          response && response.data ? response.data : response
        );
      });
  }
}
