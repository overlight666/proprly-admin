/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import { countriesAtom, regionsAtom } from "../_state";

export { useCountriesAction };

function useCountriesAction() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setCountries = useSetRecoilState(countriesAtom);
  const setRegions = useSetRecoilState(regionsAtom);

  return {
    getCountries,
    getRegions,
  };

  function getCountries() {
    return fetchWrapper.get(`${baseUrl}/countries`).then((countries: any) => {
      setCountries(countries && countries.data ? countries.data : countries);
    });
  }

  function getRegions() {
    return fetchWrapper.get(`${baseUrl}/region`).then((response: any) => {
      setRegions(response && response.data ? response.data : response);
    });
  }
}
