/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITPList, LocationItem } from "@/lib/interface";
import { atom } from "recoil";

const ItpManagementListAtom = atom<ITPList[]>({
    key: "ItpManagementListAtom",
    default: undefined,
});


const LocationListAtom = atom<LocationItem[]>({
    key: "LocationListAtom",
    default: undefined,
});

const TradeCodesByRegionAtom = atom<any[]>({
    key: "TradeCodesByRegionAtom",
    default: undefined,
});

const ITPMenuAtom = atom<any>({
    key: "ITPMenuAtom",
    default: "manage",
});


export { ItpManagementListAtom, TradeCodesByRegionAtom, LocationListAtom, ITPMenuAtom };
