/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

const checklistZoneListAtom = atom<any[]>({
  key: "checklistZoneListAtom",
  default: undefined,
});

const checklistElementListAtom = atom<any[]>({
  key: "checklistElementListAtom",
  default: undefined,
});

const checklistZoneResponseAtom = atom<any[]>({
  key: "checklistZoneResponseAtom",
  default: undefined,
});

const checklistElementResponseAtom = atom<any[]>({
  key: "checklistElementResponseAtom",
  default: undefined,
});

const commonAreaChecklistElementListAtom = atom<any[]>({
  key: "commonAreaChecklistElementListAtom",
  default: undefined,
});

const addCommonAreaCategoryResponseAtom = atom<any[]>({
  key: "commonAreaCategoryResponseAtom",
  default: undefined,
});

const checklistResponseAtom = atom<any[]>({
  key: "checklistResponseAtom",
  default: undefined,
});

const attachResponseAtom = atom<any[]>({
  key: "attachResponseAtom",
  default: undefined,
});

export {
  attachResponseAtom,
  checklistResponseAtom,
  addCommonAreaCategoryResponseAtom,
  checklistZoneListAtom,
  checklistElementListAtom,
  checklistZoneResponseAtom,
  checklistElementResponseAtom,
  commonAreaChecklistElementListAtom,
};
