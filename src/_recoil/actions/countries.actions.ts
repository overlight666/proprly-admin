/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "@/helpers";
import { countriesAtom, regionsAtom, systemRegionsAtom } from "@/_recoil/states";

export { useCountriesAction };

function useCountriesAction() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setCountries = useSetRecoilState(countriesAtom);
  const setRegions = useSetRecoilState(regionsAtom);
  const setSystemRegions = useSetRecoilState(systemRegionsAtom);
  return {
    getCountries,
    getRegions,
    getSystemRegions
  };

  function getCountries() {
    return fetchWrapper.get(`${baseUrl}/countries`).then((countries: any) => {
      setCountries(countries && countries.data ? countries.data : countries);
      return countries && countries.data ? countries.data : countries;
    });
  }

  function getRegions() {
    return fetchWrapper.get(`${baseUrl}/region`).then((response: any) => {
      setRegions(response && response.data ? response.data : response);
      return response && response.data ? response.data : response;
    });
  }


  function getSystemRegions() {
    return fetchWrapper.get(`${baseUrl}/config/system_regions`).then((response: any) => {
      setSystemRegions(response && response.data ? response.data : response);
    });
  }
}
