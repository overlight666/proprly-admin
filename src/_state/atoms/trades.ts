/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

const tradeCodesAtom = atom<any[]>({
  key: "tradeCodesAtom",
  default: undefined,
});

const tradeCodesResponseAtom = atom<any>({
  key: "tradeCodesResponseAtom",
  default: undefined,
});

export { tradeCodesAtom, tradeCodesResponseAtom };
