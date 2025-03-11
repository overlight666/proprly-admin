/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

const defectFeedbackAtom = atom({
  key: "defectFeedbackAtom",
  default: undefined,
});

const defectCodesAtom = atom<any[]>({
  key: "defectCodesAtom",
  default: undefined,
});

const defectCodesResponseAtom = atom<any>({
  key: "defectCodesResponseAtom",
  default: undefined,
});

export { defectFeedbackAtom, defectCodesAtom, defectCodesResponseAtom };
