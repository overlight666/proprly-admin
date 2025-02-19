/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, type FC } from "react";
import {
  HiArrowLeft,
  HiChevronLeft,
  HiChevronRight,
  HiReply,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import type { AppState, ReducerTypes } from "../../types";
import moment from "moment";
import { readNotificationReducer } from "../../store/features/reducers";

const NotificationView: FC = function () {
  const { selectedNotification }: AppState = useSelector(
    (state: ReducerTypes) => state.application
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
    dispatch(
      readNotificationReducer(selectedNotification && selectedNotification.id)
    );
  }, []);

  console.log(selectedNotification);
  return (
    <NavbarSidebarLayout isFooter={false}>
      <Menu />
      <div className="p-5">
        {/* <div className="mb-4 flex items-center">
          <div className="shrink-0">
            <img
              alt=""
              src="../../images/users/bonnie-green.png"
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div className="ml-4">
            <div className="truncate text-base font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              email@flowbite.com
            </div>
          </div>
        </div> */}
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {selectedNotification && selectedNotification?.title}
        </h1>
        <div className="flex flex-col text-[16px] ">
          <span className="text-black">
            {selectedNotification?.bodyWeb &&
              selectedNotification.bodyWeb.Project && (
                <>
                  <span>
                    <span className="text-blue-600">Project: </span>
                    {selectedNotification.bodyWeb.Project}
                  </span>
                </>
              )}
          </span>
          <div className="flex flex-col">
            <div className="flex flex-col">
              {selectedNotification?.bodyWeb &&
                selectedNotification.bodyWeb.Zone && (
                  <>
                    <span>
                      <span className="text-blue-600">Zone: </span>
                      {selectedNotification.bodyWeb.Zone}
                    </span>
                  </>
                )}
              {selectedNotification?.bodyWeb &&
                selectedNotification.bodyWeb.Element && (
                  <>
                    <span>
                      <span className="text-blue-600">Element: </span>
                      {selectedNotification.bodyWeb.Element}
                    </span>
                  </>
                )}
              {selectedNotification?.bodyWeb &&
                selectedNotification.bodyWeb.appointmentDate && (
                  <>
                    <span>
                      <span className="text-blue-600">Appointment Date: </span>
                      {selectedNotification.bodyWeb.appointmentDate}
                    </span>
                  </>
                )}
            </div>
          </div>
          <h1 className="my-5 font-bold">
            {selectedNotification?.property && "Property Information"}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-5">
              {selectedNotification?.property &&
                selectedNotification.property.unitNo && (
                  <>
                    <span>
                      <span className="text-blue-600">Unit No.: </span>
                      {selectedNotification.property.unitNo}
                    </span>
                  </>
                )}
              {selectedNotification?.property &&
                selectedNotification.property.lotNo && (
                  <>
                    <span>
                      <span className="text-blue-600">Lot No.: </span>
                      {selectedNotification.property.lotNo}
                    </span>
                  </>
                )}
            </div>
            <div className="flex flex-row gap-5">
              {selectedNotification?.property &&
                selectedNotification.property.floor && (
                  <>
                    <span>
                      <span className="text-blue-600">Floor: </span>
                      {selectedNotification.property.floor}
                    </span>
                  </>
                )}
              {selectedNotification?.property &&
                selectedNotification.property.bedroom && (
                  <>
                    <span>
                      <span className="text-blue-600">Bedroom: </span>
                      {selectedNotification.property.bedroom}
                    </span>
                  </>
                )}
            </div>
            <div className="flex flex-row gap-5">
              {selectedNotification?.property &&
                selectedNotification.property.bathroom && (
                  <>
                    <span>
                      <span className="text-blue-600">Bathroom: </span>
                      {selectedNotification.property.bathroom}
                    </span>
                  </>
                )}
              {selectedNotification?.property &&
                selectedNotification.property.ensuite && (
                  <>
                    <span>
                      <span className="text-blue-600">Ensuite: </span>
                      {selectedNotification.property.ensuite}
                    </span>
                  </>
                )}
            </div>
            <div className="flex flex-row gap-5">
              {selectedNotification?.property &&
                selectedNotification.property.studyRoom && (
                  <>
                    <span>
                      <span className="text-blue-600">Study Room: </span>
                      {selectedNotification.property.studyRoom}
                    </span>
                  </>
                )}
              {selectedNotification?.property &&
                selectedNotification.property.storage && (
                  <>
                    <span>
                      <span className="text-blue-600">Storage: </span>
                      {selectedNotification.property.storage}
                    </span>
                  </>
                )}
            </div>
            <div className="flex flex-row gap-5">
              {selectedNotification?.property &&
                selectedNotification.property.internalArea && (
                  <>
                    <span>
                      <span className="text-blue-600">Internal Area: </span>
                      {selectedNotification.property.internalArea}
                    </span>
                  </>
                )}
              {selectedNotification?.property &&
                selectedNotification.property.externalArea && (
                  <>
                    <span>
                      <span className="text-blue-600">External Area: </span>
                      {selectedNotification.property.externalArea}
                    </span>
                  </>
                )}
            </div>
            <div className="flex flex-row gap-5">
              {selectedNotification?.property &&
                selectedNotification.property.parkingSpaces && (
                  <>
                    <span>
                      <span className="text-blue-600">Parking Spaces: </span>
                      {selectedNotification.property.parkingSpaces}
                    </span>
                  </>
                )}
              {selectedNotification?.property &&
                selectedNotification.property.status && (
                  <>
                    <span>
                      <span className="text-blue-600">Status: </span>
                      {getStatus(selectedNotification.property.status)}
                    </span>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </NavbarSidebarLayout>
  );
};

const Menu: FC = function () {
  const { selectedNotification }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  return (
    <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
      <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
        <div className="pr-3">
          <a
            href="/notifications"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Go back</span>
            <HiArrowLeft className="text-2xl" />
          </a>
        </div>
        {/* <div className="flex space-x-2 pl-0 sm:px-2">
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Save for later</span>
            <HiClock className="text-2xl" />
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Purge</span>
            <HiExclamationCircle className="text-2xl" />
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Move</span>
            <HiFolder className="text-2xl" />
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Tag</span>
            <HiOutlineTag className="text-2xl" />
          </a>
        </div> */}
        <div className="pl-3 text-sm font-medium text-gray-500">
          {moment(
            selectedNotification && selectedNotification?.createdAt
          ).calendar()}
        </div>
      </div>
      <div className="hidden space-x-2 divide-x divide-gray-100 pl-0 dark:divide-gray-700 sm:flex sm:px-2">
        <div className="pr-2">
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Reply</span>
            <HiReply className="text-2xl" />
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Delete</span>
            <HiTrash className="text-2xl" />
          </a>
        </div>
        <div className="pl-2">
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <HiChevronLeft className="text-3xl" />
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <HiChevronRight className="text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;
