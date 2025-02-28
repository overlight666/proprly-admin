/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { SignUpLeadResponseType } from "../../_types";

const latestProjectReportsAtom = atom<SignUpLeadResponseType>({
  key: "latestProjectReportsAtom",
  default: undefined,
});

const commonAreaReportsAtom = atom<any[]>({
  key: "commonAreaReportsAtom",
  default: undefined,
});

const propertyReportsAtom = atom<any[]>({
  key: "propertyReportsAtom",
  default: undefined,
});

export { latestProjectReportsAtom, commonAreaReportsAtom, propertyReportsAtom };
