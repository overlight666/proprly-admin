/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { AuthType } from "../../../_types";

const authAtom = atom<AuthType | any>({
  key: "auth",
  default: localStorage.getItem("authUser"),
});

const tokenAtom = atom<any>({
  key: "token",
  default: localStorage.getItem("token"),
});

export { authAtom, tokenAtom };
