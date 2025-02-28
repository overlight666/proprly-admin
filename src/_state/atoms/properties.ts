/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { Property } from "../../_types";

const propertiesAtom = atom<Property[]>({
  key: "properties",
  default: undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export {
  generateReportAtom,
  propertiesAtom,
  bulkResponseAtom,
  propertyResponseAtom,
  selectedPropertyAtom,
};
