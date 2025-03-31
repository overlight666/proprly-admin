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

export {
  addCommonAreaCategoryResponseAtom,
  checklistZoneListAtom,
  checklistElementListAtom,
  checklistZoneResponseAtom,
  checklistElementResponseAtom,
  commonAreaChecklistElementListAtom,
};
