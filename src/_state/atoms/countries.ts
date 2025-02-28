import { atom } from "recoil";
import { Country } from "../../_types";

const countriesAtom = atom<Country[]>({
  key: "countries",
  default: undefined,
});

export { countriesAtom };
