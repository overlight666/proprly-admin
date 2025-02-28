/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import {
  DashboardData,
  DefectSumissionType,
  NotificationType,
  Organization,
  Region,
  userInterface,
} from "../../_types";

const organizationsAtom = atom({
  key: "organizations",
  default: undefined,
});

const selectedOrgAtom = atom<Organization | undefined>({
  key: "selectedOrg",
  default: undefined,
});

const buildersAtom = atom<any[]>({
  key: "builders",
  default: undefined,
});

const regionAtom = atom<Region[]>({
  key: "region",
  default: undefined,
});

const organizationOutlineAtom = atom({
  key: "organizationOutline",
  default: localStorage.getItem("organizationOutline") || "grid",
});

const organizationDashboardAtom = atom<DashboardData>({
  key: "organizationDashboardAtom",
  default: undefined,
});

const organizationTimelineAtom = atom<NotificationType[]>({
  key: "organizationTimelineAtom",
  default: undefined,
});

const organizationDefectAtom = atom<DefectSumissionType>({
  key: "organizationDefect",
  default: undefined,
});

const organizationPropertyOwnerAtom = atom<userInterface[]>({
  key: "organizationPropertyOwnerAtom",
  default: undefined,
});

export {
  organizationDefectAtom,
  organizationsAtom,
  organizationOutlineAtom,
  buildersAtom,
  regionAtom,
  selectedOrgAtom,
  organizationDashboardAtom,
  organizationTimelineAtom,
  organizationPropertyOwnerAtom,
};
