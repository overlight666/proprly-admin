/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { CommonAreaData, TableUser } from "@/lib/interface";

const selectedCommonAreaAtom = atom<CommonAreaData | any>({
  key: "selectedCommonAreaAtom",
  default: undefined,
});

const projectStrataAtom = atom<TableUser>({
  key: "projectStrataAtom",
  default: undefined,
});

const projectAuditorAtom = atom<any[]>({
  key: "projectAuditorAtom",
  default: undefined,
});

const projectSubContractorAtom = atom<any[]>({
  key: "projectSubContractorAtom",
  default: undefined,
});

const commonAreaChecklistAtom = atom<any[]>({
  key: "commonAreaChecklistAtom",
  default: undefined,
});

const commonAreaCategoryResponseAtom = atom<any>({
  key: "commonAreaCategoryResponseAtom",
  default: undefined,
});

const commonAreaResponseAtom = atom<any>({
  key: "commonAreaResponseAtom",
  default: undefined,
});

const projectSalesAgentAtom = atom<any[]>({
  key: "projectSalesAgentAtom",
  default: undefined,
});

const commonAreaMenuAtom = atom<any>({
  key: "commonAreaMenuAtom",
  default: "manage",
});


export {
  commonAreaMenuAtom,
  projectSalesAgentAtom,
  commonAreaResponseAtom,
  projectSubContractorAtom,
  selectedCommonAreaAtom,
  projectStrataAtom,
  commonAreaChecklistAtom,
  commonAreaCategoryResponseAtom,
  projectAuditorAtom,
};
