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
  const { appointmentTab }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const { selectedProject, projectAppointments }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const { appointmentRefresh }: PropertyState = useSelector(
    (state: any) => state.property
  );

  const [isOpen, setOpen] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState();
  const [events, setEvents] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperties(selectedProject?.id));
    dispatch(getProjectAppointmentsReducer(project_id));
  }, []);

  useEffect(() => {
    if (appointmentRefresh) {
      dispatch(getProjectAppointmentsReducer(project_id));
      dispatch(setRefreshAppontments(false));
    }
  }, [appointmentRefresh]);

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
  }, [projectAppointments]);

  const truncateString = (string = "", maxLength = 12) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

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
          {appointmentTab === 1 && (
            <div className="flex w-full flex-col  !bg-transparent">
              <AppointmentHeader setOpen={setOpen} />
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

export default Appointments;
