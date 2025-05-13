/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { Country } from "@/lib/interface";

const countriesAtom = atom<Country[]>({
  key: "countries",
  default: undefined,
});

const regionsAtom = atom<any[]>({
  key: "regionsAtom",
  default: undefined,
});

const systemRegionsAtom = atom<any[]>({
  key: "systemRegionsAtom",
  default: undefined,
});

const regionOptionsAtom = atom<any[]>({
  key: "regionOptionsAtom",
  default: undefined,
});


export { countriesAtom, regionsAtom, systemRegionsAtom, regionOptionsAtom };
