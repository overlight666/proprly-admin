/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITPList, ITPOption, ITPTask, LocationItem } from "@/lib/interface";
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

const ITPLocationListAtom = atom<any[]>({
    key: "ITPLocationListAtom",
    default: undefined,
});

const AllTradeCodesByKeyAtom = atom<any[]>({
    key: "AllTradeCodesByKeyAtom",
    default: undefined,
});

const AllTradeCodesAtom = atom<any[]>({
    key: "AllTradeCodesAtom",
    default: undefined,
});

const ItpTaskSubmissionListAtom = atom<any[]>({
    key: "ItpTaskSubmissionListAtom",
    default: undefined,
});

const ItpTaskConstructionDataAtom = atom<any[]>({
    key: "ItpTaskConstructionDataAtom",
    default: undefined,
});

const ItpTaskSubmissionNewListAtom = atom<any[]>({
    key: "ItpTaskSubmissionNewListAtom",
    default: undefined,
});

const SelectedItpTaskAtom = atom<any[]>({
    key: "SelectedItpTaskAtom",
    default: undefined,
});


const ItpSubmissionPreviewAtom = atom<any>({
    key: "ItpSubmissionPreviewAtom",
    default: undefined,
});

const ItpSubmissionSubStatusAtom = atom<any>({
    key: "ItpSubmissionSubStatusAtom",
    default: undefined,
});

export { ItpSubmissionSubStatusAtom, ItpSubmissionPreviewAtom, ItpManagementListAtom, TradeCodesByRegionAtom, LocationListAtom, ITPMenuAtom, ItpTaskListAtom, TIPOptionsAtom, ITPLocationListAtom, AllTradeCodesAtom, ItpTaskSubmissionListAtom, AllTradeCodesByKeyAtom, ItpTaskConstructionDataAtom, ItpTaskSubmissionNewListAtom, SelectedItpTaskAtom };
