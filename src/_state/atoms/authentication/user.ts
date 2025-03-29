/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { Config, Leads, NotificationParent } from "../../../_types";

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

const signupLeadsListAtom = atom<Leads[]>({
  key: "signupLeadsAtom",
  default: undefined,
});

const signupLeadsConvertAtom = atom<any>({
  key: "signupLeadsConvertAtom",
  default: undefined,
});

const supportTicketsAtom = atom<any[]>({
  key: "supportTicketsAtom",
  default: undefined,
});

const selectedTicketAtom = atom<any>({
  key: "selectedTicketAtom",
  default: undefined,
});

const contactSupportAtom = atom<any>({
  key: "contactSupportAtom",
  default: undefined,
});

const allRegionAtom = atom<any>({
  key: "allRegionAtom",
  default: undefined,
});

const addRegionResponseAtom = atom<any>({
  key: "addRegionResponseAtom",
  default: undefined,
});

const selectedRegionAtom = atom<any>({
  key: "selectedRegionAtom",
  default: undefined,
});

export {
  selectedRegionAtom,
  addRegionResponseAtom,
  allRegionAtom,
  contactSupportAtom,
  selectedTicketAtom,
  supportTicketsAtom,
  signupLeadsConvertAtom,
  signupLeadsListAtom,
  projectAdminUsersAtom,
  usersAtom,
  globalConfigAtom,
  allNotificationsAtom,
  addUserReponseAtom,
};
