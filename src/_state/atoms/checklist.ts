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

export { checklistZoneListAtom, checklistElementListAtom };
