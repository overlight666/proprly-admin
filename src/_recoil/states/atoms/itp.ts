/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITPList, ItpLocation, ITPOption, ITPTask, LocationItem } from "@/lib/interface";
import { atom } from "recoil";

const ItpManagementListAtom = atom<ITPList[]>({
    key: "ItpManagementListAtom",
    default: undefined,
});

const ItpTaskListAtom = atom<ITPTask[]>({
    key: "ItpTaskListAtom",
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


const TIPOptionsAtom = atom<ITPOption[]>({
    key: "TIPOptionsAtom",
    default: undefined,
});

const ITPLocationListAtom = atom<ItpLocation[]>({
    key: "ITPLocationListAtom",
    default: undefined,
});

const AllTradeCodesAtom = atom<any[]>({
    key: "AllTradeCodesAtom",
    default: undefined,
});


export { ItpManagementListAtom, TradeCodesByRegionAtom, LocationListAtom, ITPMenuAtom, ItpTaskListAtom, TIPOptionsAtom, ITPLocationListAtom, AllTradeCodesAtom };
