/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { CommonAreaData, TableUser } from "../../_types";

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

export {
  projectSubContractorAtom,
  selectedCommonAreaAtom,
  projectStrataAtom,
  commonAreaChecklistAtom,
  commonAreaCategoryResponseAtom,
  projectAuditorAtom,
};
