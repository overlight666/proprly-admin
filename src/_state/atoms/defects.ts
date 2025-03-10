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

export { defectFeedbackAtom, defectCodesAtom };
