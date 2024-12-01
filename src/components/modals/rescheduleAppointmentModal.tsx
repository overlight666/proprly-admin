/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Label, TextInput, Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  clearAppointmentResponse,
  setRefreshAppontments,
} from "../../store/features/propertySlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  cancelAppointmentReducer,
  getTimeSlotByProjectReducer,
  rescheduleAppointmentReducer,
} from "../../store/features/reducers";
import type { AppState, PropertyState } from "../../types";
import { toast } from "react-toastify";
import { ConfirmModal } from "./confirmModal";

export const RescheduleAppointmentModal = function (props: any) {
  const { isOpen, setOpen, appointmentData } = props;
  const { project_id } = useParams();
  const { timeslot }: AppState = useSelector((state: any) => state.application);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const { appointmentResponse }: PropertyState = useSelector(
    (state: any) => state.property
  );

  const [appointmentDate, setAppointmentDate] = useState(
    `${moment(appointmentData && appointmentData.appointmentDate).format(
      "MMMM"
    )} ${moment(appointmentData && appointmentData.appointmentDate).format(
      "DD"
    )}, ${moment(appointmentData && appointmentData.appointmentDate).format(
      "YYYY"
    )} `
  );
  const [currentTimeSlots, setCurrentTimeSlots] = useState<any | undefined>(
    undefined
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(
    `${moment(
      appointmentData && appointmentData.startDate,
      "YYYY-MM-DD h:mm a"
    ).format("HH:mm")}_${moment(
      appointmentData && appointmentData.endDate,
      "YYYY-MM-DD h:mm a"
    ).format("HH:mm")}`
  );
  const dispatch = useDispatch();
  const getStatus = (value) => {
    let val = "";
    try {
      val =
        value &&
        value
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          });
    } catch (error) {
      val = "";
    }
    return val;
  };

  useEffect(() => {
    // if (!didInit) {
    dispatch(getTimeSlotByProjectReducer(project_id));
    //   didInit = true;
    // }
  }, []);

  useEffect(() => {
    if (timeslot) {
      const currentDay = moment().format("dddd");
      const slots =
        timeslot.length > 0 &&
        timeslot.find(
          (m) =>
            m.day.toLowerCase() == currentDay.toLowerCase() ||
            m.day.toLowerCase() == "monday"
        );
      setCurrentTimeSlots(slots);
    }
  }, [timeslot]);

  useEffect(() => {
    setAppointmentDate(
      `${moment(appointmentData && appointmentData.appointmentDate).format(
        "MMMM"
      )} ${moment(appointmentData && appointmentData.appointmentDate).format(
        "DD"
      )}, ${moment(appointmentData && appointmentData.appointmentDate).format(
        "YYYY"
      )} `
    );
    setSelectedTimeSlot(
      `${moment(
        appointmentData && appointmentData.startDate,
        "YYYY-MM-DD h:mm a"
      ).format("HH:mm")}_${moment(
        appointmentData && appointmentData.endDate,
        "YYYY-MM-DD h:mm a"
      ).format("HH:mm")}`
    );
  }, [appointmentData]);

  const rescheduleAppointment = () => {
    const params = {
      id: appointmentData && appointmentData.id,
      appointmentDate: moment(appointmentDate).format("YYYY/DD/MM"),
      appointmentTimeslot: selectedTimeSlot,
    };
    dispatch(rescheduleAppointmentReducer(params));
  };

  useEffect(() => {
    if (appointmentResponse && appointmentResponse.error) {
      toast.warning(appointmentResponse.error);
    } else if (appointmentResponse && !appointmentResponse.error) {
      if (isCancel) {
        toast.info("Appointment successfully canceled");
        setIsCancel(false);
      } else {
        toast.info("Appointment successfully rescheduled");
      }

      dispatch(clearAppointmentResponse());
      dispatch(setRefreshAppontments(true));
      setOpen(false);
    }
  }, [appointmentResponse]);

  const cancelAppointment = () => {
    if (confirmModal) {
      setIsCancel(true);
      const params = {
        id: appointmentData && appointmentData.id,
      };
      dispatch(cancelAppointmentReducer(params));
    }
  };

  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>
          <strong>Re-Schedule Appointment</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="max-h-[600px] space-y-6">
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="organization">
                Unit No.
                <span className="text-[red]">*</span>
              </Label>
              <TextInput
                disabled
                id="unitNo"
                name="unitNo"
                value={
                  appointmentData &&
                  appointmentData.property &&
                  appointmentData.property.unitNo
                }
                placeholder="Unit No"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="organization">
                Property Status
                <span className="text-[red]">*</span>
              </Label>
              <TextInput
                disabled
                id="propertyStatus"
                name="propertyStatus"
                value={getStatus(
                  appointmentData && appointmentData.propertyStatus
                )}
                placeholder="propertyStatus"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2 ">
              <Label htmlFor="organization">
                Property Type
                <span className="text-[red]">*</span>
              </Label>
              <TextInput
                disabled
                id="propertyType"
                name="propertyType"
                value={
                  appointmentData && appointmentData.type === "inspection"
                    ? "Inspection Appointment"
                    : "Defect Appointment"
                }
                placeholder="propertyType"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <Label htmlFor="organization">
                Appointment Date <span className="text-[red]">*</span>
              </Label>
              <Datepicker
                value={appointmentDate}
                onSelectedDateChanged={(e) =>
                  setAppointmentDate(
                    `${moment(e).format("MMMM")} ${moment(e).format(
                      "DD"
                    )}, ${moment(e).format("YYYY")} `
                  )
                }
                minDate={
                  new Date(moment().year(), moment().month(), moment().date())
                }
              />
            </div>
            <div className="grid grid-cols-1">
              <Label htmlFor="organization">
                Appointment Time Slot <span className="text-[red]">*</span>
              </Label>
              <select
                id="timeslot"
                name="timeslot"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Please Select</option>
                {currentTimeSlots &&
                  currentTimeSlots.appointmentTimeSlotsListAmPm &&
                  currentTimeSlots.appointmentTimeSlotsListAmPm.map(
                    (time, index) => {
                      return (
                        <option key={index} value={time.key}>
                          {time.value}
                        </option>
                      );
                    }
                  )}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-y-2 ">
              <Label htmlFor="organization">Description</Label>
              <textarea
                rows={5}
                disabled
                value={appointmentData && appointmentData.description}
                className="block w-full resize-none border-0 bg-gray-100 p-2 text-base text-gray-900 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 gap-y-2 ">
              <Label htmlFor="organization">
                Auditor
                <span className="text-[red]">*</span>
              </Label>
              <TextInput
                disabled
                id="auditor"
                name="auditor"
                value={
                  appointmentData &&
                  appointmentData.user &&
                  appointmentData.fullName
                }
                placeholder="auditor"
              />
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 pb-5 text-red-600"
              onClick={() => {
                setConfirmModal(true);
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.00714L8.99286 0L5 3.99286L1.00714 0L0 1.00714L3.99286 5L0 8.99286L1.00714 10L5 6.00714L8.99286 10L10 8.99286L6.00714 5L10 1.00714Z"
                  fill="#E02424"
                />
              </svg>
              <span className="text-[14px] font-medium">
                CANCEL APPOINTMENT
              </span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button
              color="primary"
              onClick={() => {
                rescheduleAppointment();
              }}
              //   disabled={isProcess}
            >
              {/* {isProcess && (
                <Spinner
                  aria-label="Alternate spinner button example"
                  size="sm"
                  color="success"
                />
              )} */}
              <div className="flex items-center gap-x-2">Submit</div>
            </Button>
            <Button color="gray" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ConfirmModal
        isOpen={confirmModal}
        setOpen={setConfirmModal}
        title="Are you sure to cancel this appointment?"
        confirmHandler={() => cancelAppointment()}
      />
    </>
  );
};
