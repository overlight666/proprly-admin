/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

const warrantyAtom = atom<any>({
  key: "warrantyAtom",
  default: undefined,
});

const warrantiesUpdateAtom = atom<any>({
  key: "warrantiesUpdateAtom",
  default: undefined,
});

const commonAreaWarrantyResponse = atom<any>({
  key: "commonAreaWarrantyResponse",
  default: undefined,
});

const commonAreaConfigAtom = atom<any>({
  key: "commonAreaConfigAtom",
  default: undefined,
});

export {
  warrantyAtom,
  warrantiesUpdateAtom,
  commonAreaWarrantyResponse,
  commonAreaConfigAtom,
};
