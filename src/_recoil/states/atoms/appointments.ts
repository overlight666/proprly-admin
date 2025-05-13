/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

const appointmentTimeslotAtom = atom<any>({
  key: "appointmentTimeslotAtom",
  default: undefined,
});

const updateTImeslotAtom = atom<any>({
  key: "updateTImeslotAtom",
  default: undefined,
});

const remainingTimeSlotsAtom = atom<any>({
  key: "remainingTimeSlotsAtom",
  default: undefined,
});

const appointmentTradeCodesAtom = atom<any>({
  key: "appointmentTradeCodesAtom",
  default: undefined,
});

const appointmentResponseAtom = atom<any>({
  key: "appointmentResponseAtom",
  default: undefined,
});

const appointmentRescheduleAtom = atom<any>({
  key: "appointmentRescheduleAtom",
  default: undefined,
});

const appointmentEventsAtom = atom<any>({
  key: "appointmentEventsAtom",
  default: undefined,
});

const appointmentCancelAtom = atom<any>({
  key: "appointmentCancelAtom",
  default: undefined,
});

export {
  appointmentCancelAtom,
  appointmentRescheduleAtom,
  appointmentEventsAtom,
  appointmentResponseAtom,
  appointmentTimeslotAtom,
  updateTImeslotAtom,
  remainingTimeSlotsAtom,
  appointmentTradeCodesAtom,
};
