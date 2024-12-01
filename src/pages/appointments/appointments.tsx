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
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState();
  const [events, setEvents] = useState<any[]>([]);
  const [currentEvents, setCurrentEvents] = useState<any>([]);
  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM DD, YYYY")
  );
  const dispatch = useDispatch();

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
        projectAppointments.map((o) => {
          return {
            title: `${moment(o.startDate, "YYYY-MM-DD h:mm a").format(
              "h:mm A"
            )} ${o.type}`,
            date: new Date(moment(o.startDate, "YYYY-MM-DD h:mm a").toString()),
            ...o,
          };
        })) ||
        []
    );
  }, [projectAppointments, currentDate]);

  useEffect(() => {
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

  const truncateString = (string = "", maxLength = 12) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

  const getCount = (cardKey, myEvents) => {
    return (
      myEvents &&
      myEvents.length &&
      myEvents.filter((me) => me.appointmentTimeslot == cardKey).length
    );
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
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1891 6.37952L13.1886 6.37901L12.5655 5.75517C12.5653 5.75497 12.5651 5.75477 12.5649 5.75458C12.3384 5.52889 12.2138 5.22617 12.2138 4.90852V4.02424C12.2138 3.15047 11.5021 2.43869 10.6286 2.43869H9.74452C9.4289 2.43869 9.12244 2.31147 8.89953 2.08852L8.27466 1.46355C7.65671 0.845484 6.65132 0.845484 6.03337 1.46355L6.03297 1.46394L5.40711 2.08852C5.1842 2.31147 4.87774 2.43869 4.56212 2.43869H3.678C2.80458 2.43869 2.0928 3.15047 2.0928 4.02424V4.90852C2.0928 5.2263 1.96815 5.52878 1.74273 5.75423L1.74253 5.75443L1.11787 6.37851C0.817565 6.67887 0.65332 7.07585 0.65332 7.50017C0.65332 7.92419 0.818046 8.32127 1.11787 8.62114L1.11806 8.62134L1.7411 9.24518C1.74133 9.24541 1.74156 9.24564 1.74179 9.24587C1.96826 9.47154 2.0928 9.77422 2.0928 10.0918V10.9761C2.0928 11.8499 2.80458 12.5617 3.678 12.5617H4.56212C4.87774 12.5617 5.1842 12.6889 5.40711 12.9118L5.40731 12.912L6.03167 13.5372C6.34047 13.8455 6.74542 14 7.15263 14C7.55977 14 7.96457 13.8456 8.27327 13.5368L8.89814 12.9118L8.90003 12.9099C9.12318 12.6891 9.42844 12.5617 9.74452 12.5617H10.6286C11.5021 12.5617 12.2138 11.8499 12.2138 10.9761V10.0918C12.2138 9.7741 12.3385 9.47132 12.5651 9.24561C12.5653 9.24547 12.5654 9.24532 12.5655 9.24518L13.1885 8.62215L13.1891 6.37952ZM13.1891 6.37952C13.4891 6.67905 13.6533 7.07517 13.6533 7.50017C13.6533 7.92458 13.4888 8.32105 13.1888 8.62184L13.1891 6.37952ZM9.27045 5.11539L9.27065 5.11527C9.82019 4.74924 10.5618 4.89648 10.928 5.44676L9.27045 5.11539ZM9.27045 5.11539L5.91519 7.35241L5.21806 6.65515C4.75102 6.18803 3.99511 6.18803 3.52807 6.65515C3.06107 7.12223 3.06107 7.87812 3.52807 8.34519L4.9182 9.73556C5.14876 9.96616 5.45503 10.0857 5.76319 10.0857C5.99166 10.0857 6.2237 10.0203 6.42634 9.88494L9.27045 5.11539ZM6.4269 9.88456L10.5963 7.10448C11.1464 6.73848 11.2942 5.99627 10.9282 5.44707L6.4269 9.88456Z"
                    fill={appointmentTab === 2 ? "#1C64F2" : "#6B7280"}
                    stroke={appointmentTab === 2 ? "#1C64F2" : "#6B7280"}
                  />
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
                  <MonthlyBody events={events}>
                    <MonthlyDay<EventType>
                      renderDay={(data) => {
                        return (
                          <div className="flex flex-col gap-1">
                            {data.map(
                              (item: any, index) =>
                                index <= 2 && (
                                  <div
                                    key={index}
                                    className="flex cursor-pointer items-center gap-2 rounded-full bg-blue-100 p-1 px-3"
                                    onClick={() => {
                                      setAppointmentData(item);
                                      setRescheduleModal(true);
                                    }}
                                  >
                                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                    <span className="text-blue-600">
                                      <Tooltip content={item.title}>
                                        {truncateString(item.title)}
                                      </Tooltip>
                                    </span>
                                  </div>
                                )
                            )}
                            {data && data.length > 2 && (
                              <Dropdown
                                label=""
                                dismissOnClick={false}
                                renderTrigger={() => (
                                  <div className="flex items-center gap-2 rounded-full bg-blue-100 p-1 px-3">
                                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                    <span className="text-blue-600">
                                      + {data.length - 3}
                                    </span>
                                  </div>
                                )}
                              >
                                {data.map(
                                  (item: any, index) =>
                                    index > 2 && (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          setAppointmentData(item);
                                          setRescheduleModal(true);
                                        }}
                                      >
                                        {item.title}
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
            isCalendarView != undefined && (
              <div className="flex w-full flex-col  !bg-transparent">
                <AppointmentHeader
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
                              {(index == 0 && (
                                <div className="flex w-[10%] items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                  <span className="text-[18px] font-medium">
                                    {moment().format("DD MMM")}
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
                                  <div className="flex cursor-pointer flex-row items-center justify-center gap-3 font-medium text-blue-700">
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
      className="flex w-[25%] cursor-pointer flex-col rounded-md p-3 shadow-md"
      onClick={() => {
        thisClick(thisEvent);
      }}
    >
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
