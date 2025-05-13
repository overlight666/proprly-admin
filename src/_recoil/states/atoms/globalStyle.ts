/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

const sidebarIndexAtom = atom<any>({
    key: "sidebarIndexAtom",
    default: "z-10",
});


export { sidebarIndexAtom };
