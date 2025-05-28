/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import {
  DashboardData,
  DefectSumissionType,
  NotificationType,
  Organization,
  Region,
  SettingItem,
  userInterface,
} from "@/lib/interface";

const organizationsAtom = atom<Organization[]>({
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

const organizationsBuilderAtom = atom<any>({
  key: "organizationsBuilderAtom",
  default: undefined,
});

const organizationMenuAtom = atom<any>({
  key: "organizationMenuAtom",
  default: undefined,
});

const organizationSettingsAtom = atom<SettingItem[]>({
  key: "organizationSettingsAtom",
  default: [],
});

export {
  organizationMenuAtom,
  organizationsBuilderAtom,
  organizationDefectAtom,
  organizationsAtom,
  organizationOutlineAtom,
  buildersAtom,
  regionAtom,
  selectedOrgAtom,
  organizationDashboardAtom,
  organizationTimelineAtom,
  organizationPropertyOwnerAtom,
  organizationSettingsAtom,
};
