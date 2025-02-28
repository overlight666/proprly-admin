/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { Config, NotificationParent } from "../../../_types";

const usersAtom = atom({
  key: "user",
  default: null,
});

const globalConfigAtom = atom<Config>({
  key: "globalConfig",
  default: undefined,
});

const allNotificationsAtom = atom<NotificationParent>({
  key: "allNotificationsAtom",
  default: undefined,
});

const addUserReponseAtom = atom<any>({
  key: "addUserReponseAtom",
  default: undefined,
});

const projectAdminUsersAtom = atom<any[]>({
  key: "projectAdminUsersAtom",
  default: undefined,
});

export {
  projectAdminUsersAtom,
  usersAtom,
  globalConfigAtom,
  allNotificationsAtom,
  addUserReponseAtom,
};
