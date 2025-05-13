/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { DefectSumissionType } from "@/lib/interface";

const defectResolutionAtom = atom<DefectSumissionType[]>({
  key: "propertyDefectResolution",
  default: undefined,
});

export { defectResolutionAtom };
