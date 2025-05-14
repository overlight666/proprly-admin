/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config, Leads } from "@/lib/interface";
import { atom } from "recoil";

const usersAtom = atom({
  key: "user",
  default: null,
});

const globalConfigAtom = atom<Config>({
  key: "globalConfig",
  default: undefined,
});

const allNotificationsAtom = atom<any>({
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


const isLoadingAtom = atom<any>({
  key: "isLoadingAtom",
  default: false,
});

const allUserAtom = atom<any>({
  key: "allUserAtom",
  default: undefined,
});

export {
  allUserAtom,
  isLoadingAtom,
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
