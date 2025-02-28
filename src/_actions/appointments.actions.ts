/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import {
  appointmentEventsAtom,
  appointmentRescheduleAtom,
  appointmentResponseAtom,
  appointmentTimeslotAtom,
  appointmentTradeCodesAtom,
  remainingTimeSlotsAtom,
  updateTImeslotAtom,
} from "../_state";

export { useAppointments };

function useAppointments() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setAppointmentTimeSlot = useSetRecoilState(appointmentTimeslotAtom);
  const setUpdateTimeSlot = useSetRecoilState(updateTImeslotAtom);
  const setRemainingTimeslots = useSetRecoilState(remainingTimeSlotsAtom);
  const setTradeCode = useSetRecoilState(appointmentTradeCodesAtom);
  const setAppointmentResponse = useSetRecoilState(appointmentResponseAtom);
  const setAppointmentEvents = useSetRecoilState(appointmentEventsAtom);
  const setAppointmentResched = useSetRecoilState(appointmentRescheduleAtom);

  return {
    getTimeSlots,
    updateTimeslot,
    getRemainingTimeslots,
    getTradeCodeByProject,
    saveAppointment,
    getAppointments,
    updateAppointment,
    cancelAppointment,
  };

  function cancelAppointment(id: any, toast: any) {
    return fetchWrapper
      .delete(`${baseUrl}/appointment/${id}`)
      .then((response: any) => {
        setAppointmentResched(
          response && response.data ? response.data : response
        );
        if (response) {
          toast.success("Appointment has been cancelled!");
        }
      });
  }

  function updateAppointment(id: any, params: any, toast: any) {
    return fetchWrapper
      .put(`${baseUrl}/appointment/${id}`, params)
      .then((response: any) => {
        setAppointmentResched(
          response && response.data ? response.data : response
        );
        if (response) {
          toast.success("Appointment Rescheduled Updated!");
        }
      });
  }

  function updateTimeslot(params: any, toast: any) {
    return fetchWrapper
      .post(`${baseUrl}/project-appointment-config`, params)
      .then((response: any) => {
        setUpdateTimeSlot(response && response.data ? response.data : response);
        if (response) {
          toast.success("Timeslot Updated!");
        }
      });
  }

  function saveAppointment(params: any, toast: any) {
    return fetchWrapper
      .post(`${baseUrl}/appointment`, params)
      .then((response: any) => {
        setAppointmentResponse(
          response && response.data ? response.data : response
        );
        if (response) {
          toast.success("Appointment has been registered!");
        }
      });
  }

  function getRemainingTimeslots(project_id: any, date: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${project_id}/appointment-config?date=${date}`)
      .then((response: any) => {
        setRemainingTimeslots(
          response && response.data ? response.data : response
        );
      });
  }

  function getAppointments(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${project_id}/appointments`)
      .then((response: any) => {
        setAppointmentEvents(
          response && response.data ? response.data : response
        );
      });
  }

  function getTradeCodeByProject(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/trade-code?projectId=${project_id}`)
      .then((response: any) => {
        setTradeCode(response && response.data ? response.data : response);
      });
  }

  function getTimeSlots(project_id: any) {
    return fetchWrapper
      .get(`${baseUrl}/project/${project_id}/appointment-config`)
      .then((response: any) => {
        setAppointmentTimeSlot(
          response && response.data ? response.data : response
        );
      });
  }
}
