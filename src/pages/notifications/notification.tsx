/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Checkbox, Label, Progress, Table } from "flowbite-react";
import type { FC } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiEye,
  HiTrash,
  HiViewGrid,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import type { AppState, ReducerTypes } from "../../types";
import moment from "moment";
import { selectNotification } from "../../store/features/appSlice";

const NotificationPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <Menu />
      <Inbox />
      <Footer />
    </NavbarSidebarLayout>
  );
};

const Menu: FC = function () {
  return (
    <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
      <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
        <div className="pr-3">
          <Label htmlFor="checkbox-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="checkbox-all" name="checkbox-all" />
        </div>
        <div className="flex space-x-2 px-0 sm:px-2">
          <a
            href="#"
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Delete</span>
            <HiTrash className="text-2xl" />
          </a>
        </div>
        <div className="pl-3">
          <a
            href="/notifications"
            className="mr-3 inline-flex items-center gap-x-2 rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Mark all as read
          </a>
        </div>
      </div>
      <div className="hidden items-center space-x-0 space-y-3 sm:flex sm:space-x-3 sm:space-y-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Apps</span>
          <HiViewGrid className="text-2xl" />
        </a>
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="font-normal text-gray-500 dark:text-gray-400 sm:text-xs md:text-sm">
          Show&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-25
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
    </div>
  );
};

const Inbox: FC = function () {
  const { notifications }: AppState = useSelector(
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
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <Table className="min-w-full divide-y divide-gray-200">
              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {notifications &&
                  notifications.length > 0 &&
                  notifications.map((notif, index) => {
                    return (
                      <Table.Row
                        key={index}
                        className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
                      >
                        <Table.Cell className="w-4 p-4">
                          <div className="inline-flex items-center space-x-4">
                            <div>
                              <input
                                id="checkbox-1"
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                              />
                              <label htmlFor="checkbox-1" className="sr-only">
                                checkbox
                              </label>
                            </div>
                            <StarIcon />
                          </div>
                        </Table.Cell>
                        <Table.Cell className="relative flex items-center space-x-4 whitespace-nowrap p-4">
                          <a
                            onClick={() => dispatch(selectNotification(notif))}
                            href="/notifications/view"
                            className={`text-base after:absolute after:inset-0 dark:text-white ${
                              notif.isRead
                                ? "font-normal text-gray-700"
                                : "font-semibold text-gray-900"
                            }`}
                          >
                            {getStatus(
                              notif && notif.property && notif.property.status
                            )}
                          </a>
                        </Table.Cell>
                        <Table.Cell
                          className={`max-w-sm overflow-hidden truncate p-4 text-base dark:text-white xl:max-w-screen-md 2xl:max-w-screen-lg ${
                            notif.isRead
                              ? "font-normal text-gray-700"
                              : "font-semibold text-gray-900"
                          }`}
                        >
                          <a
                            onClick={() => dispatch(selectNotification(notif))}
                            href="/notifications/view"
                          >
                            {notif.title}
                          </a>
                        </Table.Cell>
                        <Table.Cell
                          className={`whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white ${
                            notif.isRead
                              ? "font-normal text-gray-700"
                              : "font-semibold text-gray-900"
                          }`}
                        >
                          {moment(notif.createdAt).calendar()}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StarIcon: FC = function () {
  return (
    <svg
      className="h-6 w-6 text-gray-500 hover:text-yellow-300 dark:text-gray-400 dark:hover:text-yellow-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
};

const Footer: FC = function () {
  return (
    <div className="w-full items-center space-y-4 border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:sticky sm:flex sm:justify-between sm:space-y-0">
      <div className="flex flex-col gap-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          3.24 GB of 15 GB used
        </div>
        <Progress progress={22} size="sm" />
      </div>
      <div className="hidden items-center gap-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 sm:flex">
        Last account activity: 2 hours ago
        <HiEye className="text-sm" />
      </div>
      <div className="mb-4 flex items-center sm:mb-0 sm:hidden">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="sr-only">Apps</span>
          <HiViewGrid className="text-2xl" />
        </a>
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="sr-only">Previous</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="sr-only">Next</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-25
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
    </div>
  );
};

export default NotificationPage;
