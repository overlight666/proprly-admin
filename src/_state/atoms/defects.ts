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

const defectCodesSelectAtom = atom<any[]>({
  key: "defectCodesSelectAtom",
  default: undefined,
});

const reloadDefectsAtom = atom<any>({
  key: "reloadDefectsAtom",
  default: undefined,
});


export {
  defectFeedbackAtom,
  defectCodesAtom,
  defectCodesResponseAtom,
  defectCodesSelectAtom,
  reloadDefectsAtom
};
