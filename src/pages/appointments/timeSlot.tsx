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
import { Breadcrumb, Button, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ErrorHandler from "../../components/error";

import { FaChevronLeft } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import type { StylesConfig } from "react-select";
import Select from "react-select";
import {
  type OrgState,
  type ProjectState,
  type PropertyState,
} from "../../types";
import { useNavigate } from "react-router";

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
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const { appointmentResponse }: PropertyState = useSelector(
    (state: any) => state.property
  );

  const [timeSlotStart, setTimeSlotStart] = useState("09:00");
  const [timeSlotEnd, setTimeSlotEnd] = useState("18:00");
  const [slotSelected, setSlotSelected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>([]);

  const options: any = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
  ];

  return (
    <div className="w-full flex-col gap-2">
      <div className="flex w-[40%] flex-col gap-2">
        <div className="mt-5 flex w-full gap-2">
          <div className="w-[50%]">
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
          <div className="w-[50%]">
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
        </div>
        <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
          <Label htmlFor="days">
            Select Day
            <span className="text-[red]">*</span>
          </Label>
          <Select
            closeMenuOnSelect={false}
            defaultValue={[]}
            isMulti
            options={options}
            styles={colourStyles}
          />
        </div>
        <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
          <Label htmlFor="timeslot">
            Select Time-Slot
            <span className="text-[red]">*</span>
          </Label>
          <select
            id="timeslot"
            name="timeslot"
            value={slotSelected}
            onChange={(e) => setSlotSelected(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="" selected>
              Please Select
            </option>
            <option value="1hour">1 Hour</option>
            <option value="2hours">2 Hours</option>
            <option value="3hours">3 Hours</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
        <Label htmlFor="timeslot">Available Time</Label>
        <div className="flex flex-wrap gap-4">
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">9:00AM - 10:00AM</span>
          </div>
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">10:00AM - 11:00AM</span>
          </div>
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">11:00AM - 12:00PM</span>
          </div>
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">12:00PM - 1:00PM</span>
          </div>
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">1:00PM - 2:00PM</span>
          </div>
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">2:00PM - 3:00PM</span>
          </div>
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">3:00PM - 4:00PM</span>
          </div>
          <div className="flex cursor-pointer gap-2 rounded-lg border-2 border-blue-400 p-2 text-blue-400">
            <span className="text-[14px]">4:00PM - 5:00PM</span>
          </div>
        </div>
      </div>
      <div className="my-10 flex">
        <Button className="mx-1" color="primary">
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
