/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { Property } from "@/lib/interface";

const propertiesAtom = atom<Property[]>({
  key: "properties",
  default: undefined,
});

const bulkResponseAtom = atom<any>({
  key: "bulkResponseAtom",
  default: undefined,
});

const propertyResponseAtom = atom<any>({
  key: "propertyResponseAtom",
  default: undefined,
});

const selectedPropertyAtom = atom<Property>({
  key: "selectedPropertyAtom",
  default: undefined,
});

const generateReportAtom = atom<any>({
  key: "generateReportAtom",
  default: undefined,
});

const listPropertiesAtom = atom<any>({
  key: "listPropertiesAtom",
  default: undefined,
});

export {
  listPropertiesAtom,
  generateReportAtom,
  propertiesAtom,
  bulkResponseAtom,
  propertyResponseAtom,
  selectedPropertyAtom,
};
