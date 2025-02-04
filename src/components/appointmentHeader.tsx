/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { Button, Datepicker, Dropdown } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import type { AppState, ReducerTypes } from "../types";
import { updateCalendarView } from "../store/features/appSlice";
import moment from "moment";

const AppointmentHeader = function ({
  setOpen,
  currentDate,
  setCurrentDate,
  filterBy,
  setFilterBy,
}: any) {
  const { isCalendarView }: AppState = useSelector(
    (state: ReducerTypes) => state.application,
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className="mt-5 grid w-full grid-cols-7 gap-2">
        <div className="flex items-center">
          <Datepicker
            value={currentDate}
            onSelectedDateChanged={(e) =>
              setCurrentDate(
                `${moment(e).format("MMMM")} ${moment(e).format(
                  "DD",
                )}, ${moment(e).format("YYYY")} `,
              )
            }
          />
        </div>
        <div className="col-span-2 flex items-center">
          <form className="mx-auto w-full">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search for Unit/CA No."
                required
              />
            </div>
          </form>
        </div>
        <div className="col-span-2 flex items-center">
          <Button
            onClick={() => {
              dispatch(updateCalendarView(true));
            }}
            color="gray"
            className={`mx-1 p-[5px] ${
              (isCalendarView == true || isCalendarView == undefined) &&
              "!bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-x-2 text-xs ">
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2 1.4H10.5V0H9.1V1.4H3.5V0H2.1V1.4H1.4C0.623 1.4 0.00699999 2.03 0.00699999 2.8L0 12.6C0 13.37 0.623 14 1.4 14H11.2C11.97 14 12.6 13.37 12.6 12.6V2.8C12.6 2.03 11.97 1.4 11.2 1.4ZM11.2 12.6H1.4V5.6H11.2V12.6ZM4.2 8.4H2.8V7H4.2V8.4ZM7 8.4H5.6V7H7V8.4ZM9.8 8.4H8.4V7H9.8V8.4ZM4.2 11.2H2.8V9.8H4.2V11.2ZM7 11.2H5.6V9.8H7V11.2ZM9.8 11.2H8.4V9.8H9.8V11.2Z"
                  fill="#1E429F"
                />
              </svg>
            </div>
          </Button>
          <Button
            onClick={() => {
              dispatch(updateCalendarView(false));
            }}
            color="gray"
            className={`mx-1 p-[6px] ${
              isCalendarView == false &&
              isCalendarView != undefined &&
              "!bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-x-2 text-xs ">
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.27657 1.875H12.1001M6.27657 6H12.1001M6.27657 10.125H12.1001M1.1001 1.1875L2.39422 0.5V3.9375M1.1001 8.75C1.09992 8.52011 1.15399 8.29385 1.25737 8.0919C1.36075 7.88995 1.51013 7.71876 1.69185 7.594C1.87358 7.46923 2.08184 7.39486 2.2976 7.3777C2.51336 7.36054 2.72973 7.40113 2.92691 7.49576C3.1241 7.59039 3.2958 7.73603 3.42633 7.91938C3.55685 8.10272 3.64203 8.31791 3.67407 8.54526C3.7061 8.77261 3.68398 9.00487 3.60972 9.2208C3.53546 9.43672 3.41143 9.62941 3.24898 9.78125L1.1001 11.5H4.33539M1.1001 4.625H3.68833"
                  stroke="#1E429F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Button>

          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="relative ml-[15px] inline-block text-left">
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    <span
                      className={`${
                        filterBy == "booked"
                          ? "text-blue-600"
                          : filterBy == "canceled"
                          ? "text-red-600"
                          : filterBy == "all"
                          ? "text-gray-600"
                          : "text-green-600"
                      }`}
                    >
                      {filterBy == "all"
                        ? "All"
                        : filterBy == "booked"
                        ? "Booked"
                        : filterBy == "canceled"
                        ? "Cancelled"
                        : "Rescheduled"}
                    </span>
                    <svg
                      className=" text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          >
            <Dropdown.Item
              className={`${filterBy == "all" && "bg-gray-100"}`}
              onClick={() => {
                setFilterBy("all");
              }}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              className={`${filterBy == "booked" && "bg-gray-100"}`}
              onClick={() => {
                setFilterBy("booked");
              }}
            >
              <span className="text-blue-600">Booked</span>
            </Dropdown.Item>

            <Dropdown.Item
              className={`${filterBy == "rescheduled" && "bg-gray-100"}`}
              onClick={() => {
                setFilterBy("rescheduled");
              }}
            >
              <span className="text-green-600">Rescheduled</span>
            </Dropdown.Item>
            <Dropdown.Item
              className={`${filterBy == "canceled" && "bg-gray-100"}`}
              onClick={() => {
                setFilterBy("canceled");
              }}
            >
              <span className="text-red-600">Cancelled</span>
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="col-span-2 flex w-full flex-row-reverse items-center">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="w-[200px]"
          >
            <div className="flex items-center gap-x-2 text-xs">
              <HiPlus />
              Book New Appointment
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppointmentHeader;
