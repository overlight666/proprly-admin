/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { ImageType } from "@/lib/interface";

const dropZoneAtom = atom<ImageType | undefined>({
  key: "dropZoneImage",
  default: undefined,
});

const uploadResponseAtom = atom<ImageType | undefined>({
  key: "uploadResponse",
  default: undefined,
});

const uploadProcessAtom = atom<any[]>({
  key: "uploadProcessAtom",
  default: [],
});

export { dropZoneAtom, uploadResponseAtom, uploadProcessAtom };
