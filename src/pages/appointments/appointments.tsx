/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Dropdown, Tooltip } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  OrgState,
  ProjectState,
  PropertyState,
  ReducerTypes,
} from "../../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateAppointmentTab } from "../../store/features/appSlice";

import {
  getProjectAppointmentsReducer,
  getProperties,
  getTimeSlotByProjectReducer,
} from "../../store/features/reducers";

import { startOfMonth } from "date-fns";
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
  // DefaultMonthlyEventItem,
} from "@zach.codes/react-calendar";
import type { EventType } from "react-hook-form";
import "@zach.codes/react-calendar/dist/calendar-tailwind.css";
import AppointmentHeader from "../../components/appointmentHeader";
import { BookAppointmentModal } from "../../components/modals/bookAppointmentModal";
import TimeSlots from "./timeSlot";
import { useParams } from "react-router";
import moment from "moment";
import { RescheduleAppointmentModal } from "../../components/modals/rescheduleAppointmentModal";
import { setRefreshAppontments } from "../../store/features/propertySlice";
import { MdClose } from "react-icons/md";

const Appointments: FC = function () {
  const { project_id } = useParams();
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { appointmentTab, isCalendarView, timeslot }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const { selectedProject, projectAppointments }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const { appointmentRefresh }: PropertyState = useSelector(
    (state: any) => state.property
  );

  const [currentTimeSlots, setCurrentTimeSlots] = useState<any | undefined>(
    undefined
  );

  const [isOpen, setOpen] = useState(false);
  const [isViewAll, setViewAll] = useState(false);
  const [viewAllKey, setViewAllKey] = useState();
  const [viewAllValue, setViewAllValue] = useState();
  const [viewAllData, setViewAllData] = useState([]);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState();
  const [events, setEvents] = useState<any[]>([]);
  const [currentEvents, setCurrentEvents] = useState<any>([]);
  const [startKey, setStartKey] = useState<any>(undefined);
  const [filterBy, setFilterBy] = useState("all");
  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM DD, YYYY")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (document.getElementById("highlight")) {
      document
        .getElementById("highlight")
        ?.parentElement?.parentElement?.classList.add("bg-orange-100");
    }
  });

  useEffect(() => {
    dispatch(getProperties(selectedProject?.id));
    dispatch(getProjectAppointmentsReducer(project_id));
    dispatch(getTimeSlotByProjectReducer(project_id));
  }, []);

  useEffect(() => {
    if (appointmentRefresh) {
      dispatch(getProjectAppointmentsReducer(project_id));
      dispatch(setRefreshAppontments(false));
    }
  }, [appointmentRefresh]);

  useEffect(() => {
    if (timeslot) {
      const currentDay = moment(currentDate).format("dddd");
      const slots =
        timeslot.length > 0 &&
        timeslot.find((m) => m.day.toLowerCase() == currentDay.toLowerCase());
      setCurrentTimeSlots(slots);
    }
  }, [timeslot, currentDate]);

  useEffect(() => {
    setEvents(
      (projectAppointments &&
        projectAppointments.length > 0 &&
        projectAppointments
          .map((o) => {
            return {
              title: `${moment(o.startDate, "YYYY-MM-DD h:mm a").format(
                "h:mm A"
              )} ${o.type}`,
              date: new Date(
                moment(o.startDate, "YYYY-MM-DD h:mm a").toString()
              ),
              ...o,
            };
          })
          .sort(function (a: any, b: any) {
            var c: any = new Date(a.startDate);
            var d: any = new Date(b.startDate);
            return c - d;
          })) ||
        []
    );
  }, [projectAppointments, currentDate]);

  useEffect(() => {
    setStartKey(undefined);
    setCurrentEvents(
      events &&
        events.length &&
        events.filter(
          (e: any) =>
            moment(e.appointmentDate, "YYYY-MM-DD h:mm a").format(
              "YYYY-MM-DD"
            ) == moment(currentDate).format("YYYY-MM-DD")
        )
    );
  }, [events]);

  useEffect(() => {
    let hasKey = false;
    currentTimeSlots &&
      currentTimeSlots.appointmentTimeSlotsListAmPm &&
      currentTimeSlots.appointmentTimeSlotsListAmPm.length > 0 &&
      currentTimeSlots.appointmentTimeSlotsListAmPm.map((t) => {
        if (getCount(t.key, currentEvents) > 0 && !hasKey) {
          setStartKey(t.key);
          hasKey = true;
        }
      });
  }, [currentEvents]);

  const truncateString = (string = "", maxLength = 12) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

  const getCount = (cardKey, myEvents) => {
    return (
      myEvents &&
      myEvents.length &&
      myEvents.filter((me) => me.appointmentTimeslot == cardKey).length
    );
  };

  const getViewAllData = (cardKey, myEvents) => {
    setViewAllData(
      myEvents &&
        myEvents.length &&
        myEvents.filter((me) => me.appointmentTimeslot == cardKey)
    );
  };

  const getItemContent = (item) => {
    return item.property
      ? `${moment(item.startDate, "YYYY-MM-DD h:mm a").format(
          "h:mm A"
        )} to ${moment(item.endDate, "YYYY-MM-DD h:mm a").format(
          "h:mm A"
        )} Unit no. ${item.property?.unitNo} Lot no. ${item.property?.lotNo}, ${
          item.type == "inspection" ? "Inspection" : "Defect"
        } appointment`
      : `${moment(item.startDate, "YYYY-MM-DD h:mm a").format(
          "h:mm A"
        )} to ${moment(item.endDate, "YYYY-MM-DD h:mm a").format(
          "h:mm A"
        )} Common Area ${
          item.type == "inspection" ? "Inspection" : "Defect"
        } appointment`;
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
      <div className="mb-6 grid grid-cols-1 gap-y-6 bg-[#ffffff] px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/organization">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Organizations</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/organization/${selectedOrganization?.id}`}>
              {selectedOrganization?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={`/organization/${selectedOrganization?.id}/project/${selectedProject?.id}`}
            >
              {selectedProject?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={`/organization/${selectedOrganization?.id}/project/${selectedProject?.id}/appointments`}
            >
              Appointments
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            {appointmentTab === 2
              ? "Manage Time-Slots for Appointments"
              : "Manage"}
          </h1>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateAppointmentTab(1))}
                className={
                  appointmentTab === 1
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 2 }}
                >
                  <path
                    d="M15.8335 11.6667V6.25L11.6668 3.33333L7.50016 6.25V7.5H5.8335V5.41667L11.6668 1.25L17.5002 5.41667V11.6667H15.8335ZM12.0835 6.66667H12.9168V5.83333H12.0835V6.66667ZM10.4168 6.66667H11.2502V5.83333H10.4168V6.66667ZM12.0835 8.33333H12.9168V7.5H12.0835V8.33333ZM10.4168 8.33333H11.2502V7.5H10.4168V8.33333ZM5.8335 15.4167L11.6252 17L16.5835 15.4583C16.5141 15.3333 16.4134 15.2257 16.2814 15.1354C16.1495 15.0451 16.0002 15 15.8335 15H11.6252C11.2502 15 10.9516 14.9861 10.7293 14.9583C10.5071 14.9306 10.2779 14.875 10.0418 14.7917L8.10433 14.1458L8.56266 12.5208L10.2502 13.0833C10.4863 13.1528 10.7641 13.2083 11.0835 13.25C11.4029 13.2917 11.8752 13.3194 12.5002 13.3333C12.5002 13.1806 12.455 13.0347 12.3647 12.8958C12.2745 12.7569 12.1668 12.6667 12.0418 12.625L7.16683 10.8333H5.8335V15.4167ZM0.833496 18.3333V9.16667H7.16683C7.26405 9.16667 7.36127 9.17708 7.4585 9.19792C7.55572 9.21875 7.646 9.24306 7.72933 9.27083L12.6252 11.0833C13.0835 11.25 13.455 11.5417 13.7397 11.9583C14.0245 12.375 14.1668 12.8333 14.1668 13.3333H15.8335C16.5279 13.3333 17.1182 13.5625 17.6043 14.0208C18.0904 14.4792 18.3335 15.0833 18.3335 15.8333V16.6667L11.6668 18.75L5.8335 17.125V18.3333H0.833496ZM2.50016 16.6667H4.16683V10.8333H2.50016V16.6667Z"
                    fill={appointmentTab === 1 ? "#1C64F2" : "#6B7280"}
                  />
                </svg>
                Manage
              </a>
            </li>
            <li className="me-2">
              <a
                href="javascript:void(0)"
                onClick={() => dispatch(updateAppointmentTab(2))}
                className={
                  appointmentTab === 2
                    ? `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500`
                    : `group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`
                }
                aria-current="page"
              >
                <svg
                  className={
                    appointmentTab === 2
                      ? `me-2 h-4 w-4 text-blue-600 dark:text-blue-500`
                      : `me-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300`
                  }
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill={appointmentTab === 2 ? `#1A56DB` : `#6B7280`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.53122 8.4968V1.2C3.53122 1.01435 3.45813 0.836301 3.32804 0.705025C3.19794 0.57375 3.02148 0.5 2.8375 0.5C2.65351 0.5 2.47706 0.57375 2.34696 0.705025C2.21686 0.836301 2.14377 1.01435 2.14377 1.2V8.4968C1.69092 8.64221 1.29566 8.92922 1.01517 9.31631C0.734678 9.70339 0.583496 10.1705 0.583496 10.65C0.583496 11.1295 0.734678 11.5966 1.01517 11.9837C1.29566 12.3708 1.69092 12.6578 2.14377 12.8032V13.8C2.14377 13.9857 2.21686 14.1637 2.34696 14.295C2.47706 14.4263 2.65351 14.5 2.8375 14.5C3.02148 14.5 3.19794 14.4263 3.32804 14.295C3.45813 14.1637 3.53122 13.9857 3.53122 13.8V12.8032C3.98407 12.6578 4.37933 12.3708 4.65982 11.9837C4.94032 11.5966 5.0915 11.1295 5.0915 10.65C5.0915 10.1705 4.94032 9.70339 4.65982 9.31631C4.37933 8.92922 3.98407 8.64221 3.53122 8.4968ZM2.8375 11.525C2.66599 11.525 2.49833 11.4737 2.35573 11.3775C2.21313 11.2814 2.10198 11.1447 2.03635 10.9848C1.97071 10.825 1.95354 10.649 1.987 10.4793C2.02046 10.3096 2.10305 10.1537 2.22432 10.0313C2.3456 9.90891 2.50011 9.82557 2.66832 9.79181C2.83653 9.75805 3.01089 9.77538 3.16934 9.84161C3.3278 9.90783 3.46323 10.02 3.55851 10.1639C3.6538 10.3078 3.70466 10.4769 3.70466 10.65C3.70429 10.882 3.61281 11.1043 3.45027 11.2683C3.28772 11.4323 3.06737 11.5246 2.8375 11.525Z" />
                  <path d="M13.4168 10.65C13.4152 10.1708 13.2633 9.70441 12.9829 9.31763C12.7025 8.93086 12.308 8.64353 11.8559 8.4968V1.2C11.8559 1.01435 11.7829 0.836301 11.6528 0.705025C11.5227 0.57375 11.3462 0.5 11.1622 0.5C10.9782 0.5 10.8018 0.57375 10.6717 0.705025C10.5416 0.836301 10.4685 1.01435 10.4685 1.2V8.4968C10.0156 8.64221 9.62039 8.92922 9.33989 9.31631C9.0594 9.70339 8.90822 10.1705 8.90822 10.65C8.90822 11.1295 9.0594 11.5966 9.33989 11.9837C9.62039 12.3708 10.0156 12.6578 10.4685 12.8032V13.8C10.4685 13.9857 10.5416 14.1637 10.6717 14.295C10.8018 14.4263 10.9782 14.5 11.1622 14.5C11.3462 14.5 11.5227 14.4263 11.6528 14.295C11.7829 14.1637 11.8559 13.9857 11.8559 13.8V12.8032C12.308 12.6565 12.7025 12.3691 12.9829 11.9824C13.2633 11.5956 13.4152 11.1292 13.4168 10.65ZM11.1622 11.525C10.9907 11.525 10.8231 11.4737 10.6805 11.3775C10.5378 11.2814 10.4267 11.1447 10.3611 10.9848C10.2954 10.825 10.2783 10.649 10.3117 10.4793C10.3452 10.3096 10.4278 10.1537 10.549 10.0313C10.6703 9.90891 10.8248 9.82557 10.993 9.79181C11.1613 9.75805 11.3356 9.77538 11.4941 9.84161C11.6525 9.90783 11.7879 10.02 11.8832 10.1639C11.9785 10.3078 12.0294 10.4769 12.0294 10.65C12.029 10.882 11.9375 11.1043 11.775 11.2683C11.6124 11.4323 11.3921 11.5246 11.1622 11.525Z" />
                  <path d="M9.25447 4.35C9.25282 3.8708 9.10093 3.40441 8.82055 3.01763C8.54017 2.63086 8.14569 2.34353 7.69358 2.1968V1.2C7.69358 1.01435 7.6205 0.836301 7.4904 0.705025C7.3603 0.57375 7.18385 0.5 6.99986 0.5C6.81587 0.5 6.63942 0.57375 6.50932 0.705025C6.37922 0.836301 6.30613 1.01435 6.30613 1.2V2.1968C5.85328 2.34221 5.45803 2.62922 5.17753 3.01631C4.89704 3.40339 4.74586 3.87048 4.74586 4.35C4.74586 4.82952 4.89704 5.29661 5.17753 5.68369C5.45803 6.07078 5.85328 6.35779 6.30613 6.5032V13.8C6.30613 13.9857 6.37922 14.1637 6.50932 14.295C6.63942 14.4263 6.81587 14.5 6.99986 14.5C7.18385 14.5 7.3603 14.4263 7.4904 14.295C7.6205 14.1637 7.69358 13.9857 7.69358 13.8V6.5032C8.14569 6.35647 8.54017 6.06914 8.82055 5.68237C9.10093 5.29559 9.25282 4.8292 9.25447 4.35ZM6.99986 5.225C6.82835 5.225 6.66069 5.17368 6.51809 5.07754C6.37549 4.98139 6.26434 4.84473 6.19871 4.68485C6.13307 4.52496 6.1159 4.34903 6.14936 4.1793C6.18282 4.00956 6.26541 3.85365 6.38668 3.73128C6.50796 3.60891 6.66247 3.52557 6.83068 3.49181C6.9989 3.45805 7.17325 3.47538 7.3317 3.54161C7.49016 3.60783 7.62559 3.71998 7.72087 3.86388C7.81616 4.00777 7.86702 4.17694 7.86702 4.35C7.86665 4.58195 7.77517 4.8043 7.61263 4.96831C7.45008 5.13232 7.22973 5.22463 6.99986 5.225Z" />
                </svg>
                Time-Slot Management
              </a>
            </li>
          </ul>
        </div>

        <>
          {appointmentTab === 1 &&
            (isCalendarView == true || isCalendarView == undefined) && (
              <div className="flex w-full flex-col  !bg-transparent">
                <AppointmentHeader
                  setFilterBy={setFilterBy}
                  filterBy={filterBy}
                  setOpen={setOpen}
                  setCurrentDate={setCurrentDate}
                  currentDate={currentDate}
                />
                <br />
                <MonthlyCalendar
                  currentMonth={currentMonth}
                  onCurrentMonthChange={(date) => setCurrentMonth(date)}
                >
                  <MonthlyNav />
                  <MonthlyBody
                    events={
                      filterBy == "all"
                        ? [
                            ...events,
                            {
                              title: "highlight",
                              date: new Date(
                                moment(
                                  new Date(),
                                  "YYYY-MM-DD h:mm a"
                                ).toString()
                              ),
                            },
                          ]
                        : events.filter((e) => e.status == filterBy)
                    }
                  >
                    <MonthlyDay<EventType>
                      renderDay={(data: any) => {
                        return (
                          <div
                            className="flex flex-col gap-1"
                            id={
                              data.find((e: any) => e.title == "highlight")
                                ?.title
                            }
                          >
                            {data
                              .filter((e: any) => e.title !== "highlight")
                              .map(
                                (item: any, index) =>
                                  index <= 2 && (
                                    <div
                                      key={index}
                                      className={`flex cursor-pointer items-center gap-2 rounded-full ${
                                        item && item.status == "booked"
                                          ? "bg-blue-100"
                                          : item && item.status == "canceled"
                                          ? "bg-red-100"
                                          : "bg-green-100"
                                      } p-1 px-3`}
                                      onClick={() => {
                                        setAppointmentData(item);
                                        setRescheduleModal(true);
                                      }}
                                    >
                                      <div
                                        className={`h-2 w-2 rounded-full ${
                                          item && item.status == "booked"
                                            ? "bg-blue-600"
                                            : item && item.status == "canceled"
                                            ? "bg-red-600"
                                            : "bg-green-600"
                                        }`}
                                      ></div>
                                      <span
                                        className={`${
                                          item && item.status == "booked"
                                            ? "text-blue-600"
                                            : item && item.status == "canceled"
                                            ? "text-red-600 line-through"
                                            : "text-green-600"
                                        }`}
                                      >
                                        <Tooltip content={getItemContent(item)}>
                                          {truncateString(item.title)}
                                        </Tooltip>
                                      </span>
                                    </div>
                                  )
                              )}
                            {data &&
                              data.filter((e: any) => e.title !== "highlight")
                                .length > 3 && (
                                <Dropdown
                                  label=""
                                  dismissOnClick={false}
                                  renderTrigger={() => (
                                    <div className="flex items-center gap-2 rounded-full bg-blue-100 p-1 px-3">
                                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                      <span className="text-blue-600">
                                        +{" "}
                                        {data.filter(
                                          (e: any) => e.title !== "highlight"
                                        ).length - 3}
                                      </span>
                                    </div>
                                  )}
                                >
                                  {data
                                    .filter((e: any) => e.title !== "highlight")
                                    .map(
                                      (item: any, index) =>
                                        index > 2 && (
                                          <Dropdown.Item
                                            key={index}
                                            onClick={() => {
                                              setAppointmentData(item);
                                              setRescheduleModal(true);
                                            }}
                                          >
                                            <span
                                              className={
                                                item && item.status == "booked"
                                                  ? "text-blue-600"
                                                  : item &&
                                                    item.status == "canceled"
                                                  ? "text-red-600 line-through"
                                                  : "text-green-600"
                                              }
                                            >
                                              {getItemContent(item)}
                                            </span>
                                          </Dropdown.Item>
                                        )
                                    )}
                                </Dropdown>
                              )}
                          </div>
                        );
                      }}
                    />
                  </MonthlyBody>
                </MonthlyCalendar>
              </div>
            )}

          {appointmentTab === 1 &&
            isCalendarView == false &&
            isCalendarView != undefined &&
            !isViewAll && (
              <div className="flex w-full flex-col  !bg-transparent">
                <AppointmentHeader
                  setFilterBy={setFilterBy}
                  filterBy={filterBy}
                  setOpen={setOpen}
                  setCurrentDate={setCurrentDate}
                  currentDate={currentDate}
                />
                <br />
                <div className="flex min-h-[500px] flex-col gap-2">
                  {currentTimeSlots &&
                    currentTimeSlots.appointmentTimeSlotsListAmPm &&
                    currentTimeSlots.appointmentTimeSlotsListAmPm.length > 0 &&
                    currentTimeSlots.appointmentTimeSlotsListAmPm.map(
                      (t, index) => {
                        return (
                          getCount(t.key, currentEvents) > 0 && (
                            <div className="flex flex-row" key={index}>
                              {(startKey && startKey == t.key && (
                                <div className="flex w-[10%] items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                  <span className="text-[18px] font-medium">
                                    {moment(currentDate).format("DD MMM")}
                                  </span>
                                </div>
                              )) || (
                                <div className="w-[10%] items-center justify-center rounded-md bg-blue-50 text-blue-700"></div>
                              )}
                              <div className="flex w-[15%] items-center justify-center gap-2">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_735_26955)">
                                    <path
                                      d="M5.99973 0.5C7.45797 0.501673 8.85602 1.0817 9.88716 2.11284C10.9182 3.14392 11.4983 4.54185 11.5 6C11.5 7.0878 11.1774 8.15116 10.5731 9.05563C9.96873 9.9601 9.10975 10.6651 8.10476 11.0813C7.09977 11.4976 5.9939 11.6065 4.92701 11.3943C3.86011 11.1821 2.8801 10.6583 2.11092 9.88908C1.34173 9.1199 0.817902 8.13989 0.605684 7.07299C0.393465 6.0061 0.502383 4.90023 0.918665 3.89524C1.33495 2.89025 2.0399 2.03126 2.94437 1.42692C3.84876 0.82262 4.91202 0.500055 5.99973 0.5ZM7.18725 8.74275L7.1873 8.7428C7.39358 8.94902 7.67332 9.06487 7.965 9.06487C8.25668 9.06487 8.53642 8.94902 8.7427 8.7428L8.3892 8.3892L8.74281 8.7427C8.94903 8.53642 9.06487 8.25668 9.06487 7.965C9.06487 7.67332 8.94903 7.39358 8.74281 7.1873L8.74275 7.18724L7.1 5.54449V3.6C7.1 3.30826 6.98411 3.02847 6.77782 2.82218C6.57153 2.61589 6.29174 2.5 6 2.5C5.70826 2.5 5.42847 2.61589 5.22218 2.82218C5.01589 3.02847 4.9 3.30826 4.9 3.6L4.9 6L4.90001 6.00256C4.9015 6.29295 5.01701 6.57114 5.22166 6.77717L5.22285 6.77835L7.18725 8.74275Z"
                                      fill="#6B7280"
                                      stroke="#6B7280"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_735_26955">
                                      <rect
                                        width="12"
                                        height="12"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span>{t.value}</span>
                              </div>
                              {getCount(t.key, currentEvents) > 0 && (
                                <AppointmentCard
                                  thisClick={(e) => {
                                    setAppointmentData(e);
                                    setRescheduleModal(true);
                                  }}
                                  cardSlot={0}
                                  cardKey={t.key}
                                  myEvents={currentEvents}
                                />
                              )}
                              {getCount(t.key, currentEvents) > 1 && (
                                <AppointmentCard
                                  thisClick={(e) => {
                                    setAppointmentData(e);
                                    setRescheduleModal(true);
                                  }}
                                  cardSlot={1}
                                  cardKey={t.key}
                                  myEvents={currentEvents}
                                />
                              )}
                              {getCount(t.key, currentEvents) > 1 && (
                                <div className="flex w-[25%] items-center justify-center gap-2">
                                  <div
                                    className="flex cursor-pointer flex-row items-center justify-center gap-3 font-medium text-blue-700"
                                    onClick={() => {
                                      setViewAll(true);
                                      setViewAllKey(t.key);
                                      setViewAllValue(t.value);
                                      getViewAllData(t.key, currentEvents);
                                    }}
                                  >
                                    <span>VIEW ALL APPOINTMENTS</span>
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.34188 9.5C3.17742 9.49996 3.01666 9.44722 2.87993 9.34845C2.74319 9.24967 2.63663 9.1093 2.57369 8.94507C2.51076 8.78084 2.49429 8.60014 2.52637 8.42579C2.55844 8.25145 2.63762 8.0913 2.7539 7.96559L5.49255 5.00552L2.7539 2.04546C2.67446 1.96254 2.61111 1.86335 2.56752 1.75368C2.52393 1.64401 2.50099 1.52606 2.50003 1.40671C2.49907 1.28735 2.52011 1.16899 2.56193 1.05851C2.60375 0.948043 2.6655 0.84768 2.74359 0.76328C2.82167 0.67888 2.91453 0.612135 3.01674 0.566937C3.11895 0.52174 3.22846 0.498997 3.33889 0.500034C3.44931 0.501071 3.55844 0.525868 3.65991 0.572978C3.76138 0.620089 3.85314 0.688569 3.92986 0.774422L7.2565 4.37C7.41241 4.53857 7.5 4.76717 7.5 5.00552C7.5 5.24388 7.41241 5.47247 7.2565 5.64104L3.92986 9.23662C3.77393 9.40521 3.56243 9.49995 3.34188 9.5Z"
                                        fill="#1C64F2"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        );
                      }
                    )}
                </div>
              </div>
            )}

          {appointmentTab === 1 &&
            isCalendarView == false &&
            isCalendarView != undefined &&
            isViewAll && (
              <div className="flex w-full flex-col  !bg-transparent">
                <AppointmentHeader
                  setFilterBy={setFilterBy}
                  filterBy={filterBy}
                  setOpen={setOpen}
                  setCurrentDate={setCurrentDate}
                  currentDate={currentDate}
                />
                <br />
                <div className="relative flex min-h-[500px] flex-row gap-2">
                  <div className="flex w-[25%] flex-row">
                    <div className="flex h-[150px] w-[40%] items-center justify-center rounded-md bg-blue-50 text-blue-700">
                      <span className="text-[18px] font-medium">
                        {moment(currentDate).format("DD MMM")}
                      </span>
                    </div>
                    <div className="flex h-[150px] w-[60%] items-center justify-center gap-2">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_735_26955)">
                          <path
                            d="M5.99973 0.5C7.45797 0.501673 8.85602 1.0817 9.88716 2.11284C10.9182 3.14392 11.4983 4.54185 11.5 6C11.5 7.0878 11.1774 8.15116 10.5731 9.05563C9.96873 9.9601 9.10975 10.6651 8.10476 11.0813C7.09977 11.4976 5.9939 11.6065 4.92701 11.3943C3.86011 11.1821 2.8801 10.6583 2.11092 9.88908C1.34173 9.1199 0.817902 8.13989 0.605684 7.07299C0.393465 6.0061 0.502383 4.90023 0.918665 3.89524C1.33495 2.89025 2.0399 2.03126 2.94437 1.42692C3.84876 0.82262 4.91202 0.500055 5.99973 0.5ZM7.18725 8.74275L7.1873 8.7428C7.39358 8.94902 7.67332 9.06487 7.965 9.06487C8.25668 9.06487 8.53642 8.94902 8.7427 8.7428L8.3892 8.3892L8.74281 8.7427C8.94903 8.53642 9.06487 8.25668 9.06487 7.965C9.06487 7.67332 8.94903 7.39358 8.74281 7.1873L8.74275 7.18724L7.1 5.54449V3.6C7.1 3.30826 6.98411 3.02847 6.77782 2.82218C6.57153 2.61589 6.29174 2.5 6 2.5C5.70826 2.5 5.42847 2.61589 5.22218 2.82218C5.01589 3.02847 4.9 3.30826 4.9 3.6L4.9 6L4.90001 6.00256C4.9015 6.29295 5.01701 6.57114 5.22166 6.77717L5.22285 6.77835L7.18725 8.74275Z"
                            fill="#6B7280"
                            stroke="#6B7280"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_735_26955">
                            <rect width="12" height="12" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>{viewAllValue}</span>
                    </div>
                  </div>
                  <div className="flex w-full gap-2">
                    <div className="flex w-full flex-col">
                      {viewAllData &&
                        viewAllData.length > 0 &&
                        viewAllData.map((_v, index) => {
                          return (
                            <AppointmentCard
                              key={index}
                              thisClick={(e) => {
                                setAppointmentData(e);
                                setRescheduleModal(true);
                              }}
                              cardSlot={index}
                              cardKey={viewAllKey}
                              myEvents={currentEvents}
                            />
                          );
                        })}
                    </div>
                  </div>
                  <div
                    className="absolute right-1 top-1 cursor-pointer"
                    onClick={() => setViewAll(false)}
                  >
                    <MdClose size={30} />
                  </div>
                </div>
              </div>
            )}
          {appointmentTab === 2 && (
            <div className="flex w-full flex-col  !bg-transparent">
              <TimeSlots />
            </div>
          )}
        </>
      </div>
      <BookAppointmentModal isOpen={isOpen} setOpen={setOpen} />
      <RescheduleAppointmentModal
        isOpen={rescheduleModal}
        setOpen={setRescheduleModal}
        appointmentData={appointmentData}
      />
    </NavbarSidebarLayout>
  );
};

const AppointmentCard = function ({
  cardSlot,
  cardKey,
  myEvents,
  thisClick,
}: any) {
  const thisEvent =
    myEvents &&
    myEvents.length &&
    myEvents.filter((me) => me.appointmentTimeslot == cardKey)[cardSlot];

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

  return (
    <div
      className="relative flex h-[150px] w-[25%] cursor-pointer flex-col rounded-md p-3 shadow-md"
      onClick={() => {
        thisClick(thisEvent);
      }}
    >
      <span
        className={`absolute right-1 top-2 text-[14px] ${
          thisEvent.status == "booked"
            ? "text-blue-600"
            : thisEvent.status == "canceled"
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {getStatus(thisEvent.status)}
      </span>
      <span className="text-[16px] font-medium">
        {thisEvent && thisEvent.type == "inspection"
          ? "Inspection Appontment"
          : "Defect Appontment"}
      </span>
      <span className="text-[14px]">{thisEvent && thisEvent.description}</span>
      <hr className="my-2" />
      <div className="flex flex-row justify-between pr-10">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] text-gray-600">Unit/CA No.</span>
          <span className="text-[14px] font-medium">
            {thisEvent && thisEvent.property && thisEvent.property.unitNo}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] text-gray-600">Property Status</span>
          <span className="text-[14px] font-medium">
            {thisEvent && getStatus(thisEvent.propertyStatus)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
