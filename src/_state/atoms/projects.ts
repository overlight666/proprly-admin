/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import {
  DashboardData,
  DefectSumissionType,
  NotificationType,
  Project,
} from "../../_types";

const projectsAtom = atom<Project[]>({
  key: "projects",
  default: undefined,
});

const selectedProjectAtom = atom<Project | undefined>({
  key: "selectedProjectAtom",
  default: undefined,
});

const projectDashboardAtom = atom<DashboardData>({
  key: "projectDashboardAtom",
  default: undefined,
});

const projectTimelineAtom = atom<NotificationType[]>({
  key: "projectTimelineAtom",
  default: undefined,
});

const projectDefectAtom = atom<DefectSumissionType>({
  key: "projectDefectAtom",
  default: undefined,
});

const projectResponseAtom = atom<DefectSumissionType>({
  key: "projectResponseAtom",
  default: undefined,
});

const activeTabIndexProjectAtom = atom<number>({
  key: "activeTabIndexProjectAtom",
  default: 0,
});

const projectTowerResponseAtom = atom<number>({
  key: "projectTowerResponseAtom",
  default: 0,
});

const attachedUserResponse = atom<any>({
  key: "attachedUserResponse",
  default: undefined,
});

export {
  attachedUserResponse,
  projectTowerResponseAtom,
  activeTabIndexProjectAtom,
  projectResponseAtom,
  projectsAtom,
  selectedProjectAtom,
  projectDashboardAtom,
  projectTimelineAtom,
  projectDefectAtom,
};
