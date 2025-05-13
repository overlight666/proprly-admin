/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthType } from "@/lib/interface";
import { atom } from "recoil";

const authAtom = atom<AuthType | any>({
  key: "auth",
  default: localStorage.getItem("authUser"),
});

const tokenAtom = atom<any>({
  key: "token",
  default: localStorage.getItem("token"),
});

const forgottenAtom = atom<any>({
  key: "forgottenAtom",
  default: false,
});
export { authAtom, tokenAtom, forgottenAtom };
