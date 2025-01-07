/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Checkbox, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ErrorHandler from "../../components/error";

import { FaChevronLeft } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import type { StylesConfig } from "react-select";
import Select from "react-select";
import type { AppState } from "../../types";
import {
  type OrgState,
  type ProjectState,
  type PropertyState,
} from "../../types";
import { useNavigate, useParams } from "react-router";
import { duration } from "moment";
import {
  getTimeSlotByProjectReducer,
  updateTimeSlotsReducer,
} from "../../store/features/reducers";
import { clearTImeSlot } from "../../store/features/appSlice";

export interface AppointmentType {
  propertyId?: number;
  commonAreaId?: number;
  type: string;
  appointmentDate: string;
  appointmentTimeslot: string;
  description: string;
  userId?: number;
  tradeCodeId?: number;
}

const colourStyles: StylesConfig<any, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  multiValue: (styles, { data }) => {
    const color = data.color;
    return {
      ...styles,
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

const TimeSlots: FC = function () {
  const { project_id }: any = useParams();
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const { appointmentResponse }: PropertyState = useSelector(
    (state: any) => state.property
  );

  const { timeslotResponse, timeslot }: AppState = useSelector(
    (state: any) => state.application
  );

  const options: any = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
  ];

  const [timeSlotStart, setTimeSlotStart] = useState("09:00");
  const [timeSlotEnd, setTimeSlotEnd] = useState("17:00");
  const [slotSelected, setSlotSelected] = useState("1hour");
  const [daySelected, setDaySelected] = useState<any[]>(options);
  const [daySelected2, setDaySelected2] = useState<any[]>([]);
  const [slots, setSlots] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>([]);

  useEffect(() => {
    dispatch(getTimeSlotByProjectReducer(project_id));
  }, []);

  const slot1 = [
    "9:00AM - 10:00AM",
    "10:00AM - 11:00AM",
    "11:00AM - 12:00PM",
    "12:00PM - 1:00PM",
    "1:00PM - 2:00PM",
    "3:00PM - 4:00PM",
    "4:00PM - 5:00PM",
  ];
  const slot2 = [
    "9:00AM - 11:00AM",
    "11:00AM - 1:00PM",
    "1:00PM - 3:00PM",
    "3:00PM - 5:00PM",
  ];
  const slot3 = [
    "9:00AM - 9:30AM",
    "9:30AM - 10:00AM",
    "10:00AM - 10:30AM",
    "10:30AM - 11:00AM",
    "11:00AM - 11:30PM",
    "11:30AM - 12:00PM",
    "12:00PM - 12:30PM",
    "12:30PM - 1:00PM",
    "1:00PM - 1:30PM",
    "1:30PM - 2:00PM",
    "2:00PM - 2:30PM",
    "2:30PM - 3:00PM",
    "3:00PM - 3:30PM",
    "3:30PM - 4:00PM",
    "4:00PM - 4:30PM",
    "4:30PM - 5:00PM",
  ];

  const updateTimeSlotConfig = () => {
    if (daySelected2.length == 0) {
      toast.error("Please select at least 1 day");
    } else {
      const params = {
        projectId: project_id,
        configurations: daySelected2,
      };
      dispatch(updateTimeSlotsReducer(params));
    }
  };

  useEffect(() => {
    if (timeslotResponse) {
      toast.success("Time slots has been updated");
      dispatch(clearTImeSlot());
    }
  }, [timeslotResponse]);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const updateDaySelected = (value, sl) => {
    if (daySelected2.find((e) => e.day == value)) {
      const newDays = daySelected2.filter((e) => e.day != value);
      setDaySelected2(newDays);
    } else {
      const newVal = {
        day: value,
        start_time: sl.startTime,
        end_time: sl.endTime,
        duration: sl.duration,
      };
      setDaySelected2([...daySelected2, newVal]);
    }
  };

  const updateDuration = (duration, value) => {
    setDaySelected2(
      daySelected2 && daySelected2.length
        ? daySelected2.map((e) => {
            if (e.day == value) {
              e.duration = duration;
            }
            return e;
          })
        : []
    );
  };

  return (
    <div className="w-full flex-col gap-2">
      {timeslot &&
        timeslot.length &&
        timeslot.map((sl, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col gap-5 border-b-2 py-5"
            >
              <div key={index} className="flex w-full gap-5 py-5">
                <div className="flex w-full items-center gap-5">
                  <div className="flex w-[15%] items-center gap-x-3">
                    <Checkbox
                      id={sl.day}
                      name={sl.day}
                      onChange={(e) => updateDaySelected(e.target.id, sl)}
                    />
                    <Label htmlFor={sl.day}>
                      {capitalizeFirstLetter(sl.day)}
                    </Label>
                  </div>
                  <div className="flex w-[25%] flex-col">
                    <label
                      htmlFor="start-time"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Start:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        disabled
                        value={timeSlotStart}
                        onChange={(e) => setTimeSlotStart(e.target.value)}
                        type="time"
                        id="start-time"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        min="09:00"
                        max="18:00"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex w-[25%] flex-col">
                    <label
                      htmlFor="end-time"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End:
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        disabled
                        value={timeSlotEnd}
                        onChange={(e) => setTimeSlotEnd(e.target.value)}
                        type="time"
                        id="end-time"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        min="09:00"
                        max="18:00"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid w-[20%] grid-cols-1 gap-y-2">
                    <Label htmlFor="timeslot">
                      Select Time-Slot
                      <span className="text-[red]">*</span>
                    </Label>
                    <select
                      disabled={!daySelected2.find((e) => e.day == sl.day)}
                      id="timeslot"
                      name="timeslot"
                      value={
                        daySelected2 &&
                        daySelected2.length &&
                        daySelected2.find((e) => e.day == sl.day)?.duration
                          ? daySelected2.find((e) => e.day == sl.day)?.duration
                          : sl.duration
                      }
                      onChange={(e) => updateDuration(e.target.value, sl.day)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="" selected>
                        Please Select
                      </option>
                      <option value="30">30 Mins</option>
                      <option value="60">1 Hour</option>
                      <option value="120">2 Hours</option>
                    </select>
                  </div>
                </div>
              </div>
              {daySelected2 &&
              daySelected2.length &&
              daySelected2.find((e) => e.day == sl.day) ? (
                <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                  <Label htmlFor="timeslot">Available Time Slots</Label>
                  <div className="flex flex-wrap gap-4">
                    {daySelected2.find((e) => e.day == sl.day)?.duration == 60
                      ? slot1.map((s, index) => {
                          return (
                            <div
                              key={index}
                              className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400"
                            >
                              <span className="text-[14px]">{s}</span>
                            </div>
                          );
                        })
                      : daySelected2.find((e) => e.day == sl.day)?.duration ==
                        120
                      ? slot2.map((s, index) => {
                          return (
                            <div
                              key={index}
                              className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400"
                            >
                              <span className="text-[14px]">{s}</span>
                            </div>
                          );
                        })
                      : slot3.map((s, index) => {
                          return (
                            <div
                              key={index}
                              className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400"
                            >
                              <span className="text-[14px]">{s}</span>
                            </div>
                          );
                        })}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}

      <div className="my-10 flex">
        <Button
          disabled={daySelected2.length == 0}
          className="mx-1"
          color="primary"
          onClick={() => {
            updateTimeSlotConfig();
          }}
        >
          Submit
        </Button>
        <Button
          className="mx-1"
          onClick={() => {
            navigate(-1);
          }}
          color="gray"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TimeSlots;
