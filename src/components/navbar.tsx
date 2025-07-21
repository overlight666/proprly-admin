/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useState } from "react";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Label,
  Navbar,
  TextInput,
  useThemeMode
} from "flowbite-react";
import {
  HiArchive,
  HiBell,
  HiCog,
  HiCurrencyDollar,
  HiEye,
  HiInbox,
  HiLogout,
  HiOutlineTicket,
  HiSearch,
  HiShoppingBag,
  HiUserCircle,
  HiUsers,
  HiViewGrid,
  HiChevronDown,
} from "react-icons/hi";
import { useSidebarContext } from "../context/SidebarContext";
import { useUserActions } from "@/_recoil/actions";
import { useNavigate } from "react-router";
import logoIcon from "~/images/default-user.png";
import { allNotificationsAtom, authAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import moment from "moment";

const ExampleNavbar: FC = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();
  const [selectedGroup, setSelectedGroup] = useState("AXA Group");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-purple-800 text-white">
      <div className="flex items-center justify-between px-4 py-2 h-12">
        {/* Left side - Group Dropdown */}
        <div className="flex items-center space-x-4">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex items-center space-x-2 bg-purple-900 px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors">
                <span>{selectedGroup}</span>
                <HiChevronDown className="h-4 w-4" />
              </div>
            }
          >
            <Dropdown.Item onClick={() => setSelectedGroup("AXA Group")}>
              AXA Group
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedGroup("Other Group")}>
              Other Group
            </Dropdown.Item>
          </Dropdown>
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <span className="text-xl font-semibold">Proprly.</span>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center space-x-3">
          <NotificationBellDropdown />
          <button className="p-1 hover:bg-purple-700 rounded">
            <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-xs text-gray-700">U</span>
            </div>
          </button>
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

const NotificationBellDropdown: FC = function () {
  const notifications = useRecoilValue(allNotificationsAtom);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-1 hover:bg-purple-700 rounded">
          <span className="sr-only">Notifications</span>
          <div className="relative">
            <HiBell className="text-xl text-white hover:text-gray-200" />
            {!notifications?.isRead && (
              <div className="absolute w-2 h-2 bg-red-500 -top-0.5 -right-0.5 rounded-full"></div>
            )}
          </div>
        </span>
      }
    >
      <div className="max-w-[24rem] !max-h-[500px] overflow-auto">
        <div className="block rounded-t-xl bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
        <div>
          {notifications?.data?.map((notification, index) => {
            return (
              <a
                key={index}
                href="#"
                className="flex border-y py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <div className="shrink-0">
                  {!notification?.isRead && (
                    <FaEnvelope className="h-8 w-8 text-red-300" />
                  ) || <FaEnvelopeOpen className="h-8 w-8 text-gray-300" />}
                </div>
                <div className="w-full pl-3">
                  <div className="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-100">
                    <b className="text-[16px]">{notification?.title}</b>
                    <br />
                    {notification?.property && (
                      <>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Unit {notification?.property?.unitNo}
                        </span>
                        <br />
                        Project &nbsp;
                        <span className="font-semibold text-blue-400 dark:text-blue-400">
                          {notification?.bodyWeb?.project}
                        </span>
                        &nbsp;
                        {notification?.bodyWeb?.zone && (
                          <>
                            <br />
                            Zone: &nbsp;
                            <span className="font-semibold text-green-900 dark:text-green-400">
                              {notification?.bodyWeb?.zone}
                            </span>
                          </>
                        )}
                        &nbsp;
                        {notification?.bodyWeb?.element && (
                          <>
                            <br /> Element: &nbsp;
                            <span className="font-semibold text-gray-900 dark:text-gray-200">
                              {notification?.bodyWeb?.element}
                            </span>
                          </>
                        )}
                        &nbsp;
                        {notification?.bodyWeb?.appointmentDate && (
                          <>
                            <br /> Appointment Date: &nbsp;
                            <span className="font-semibold text-red-900 dark:text-red-200">
                              {notification?.bodyWeb?.appointmentDate || ""}
                            </span>
                          </>
                        )}
                      </>
                    ) || (
                      notification?.commonArea && (
                        <>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Lot no {notification?.commonArea?.lotNo}
                          </span>
                          <br />
                          Project &nbsp;
                          <span className="font-semibold text-blue-400 dark:text-blue-400">
                            {notification?.bodyWeb?.project}
                          </span>
                          &nbsp;
                          {(notification?.bodyWeb?.zone ||
                            notification?.bodyWeb?.Zone) && (
                            <>
                              <br />
                              Zone: &nbsp;
                              <span className="font-semibold text-green-900 dark:text-green-400">
                                {notification?.bodyWeb?.Zone ||
                                  notification?.bodyWeb?.zone}
                              </span>
                            </>
                          )}
                          &nbsp;
                          {(notification?.bodyWeb?.element ||
                            notification?.bodyWeb?.Element) && (
                            <>
                              <br />
                              Element: &nbsp;
                              <span className="font-semibold text-gray-900 dark:text-gray-200">
                                {notification?.bodyWeb?.Element ||
                                  notification?.bodyWeb?.element}
                              </span>
                            </>
                          )}
                          &nbsp;
                          {notification?.bodyWeb?.appointmentDate && (
                            <>
                              <br />
                              Appointment Date: &nbsp;
                              <span className="font-semibold text-red-900 dark:text-red-200">
                                {notification?.bodyWeb?.appointmentDate || ""}
                              </span>
                            </>
                          )}
                        </>
                      )
                    )}
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                    {moment
                      .utc(notification.createdAt, "YYYY-MM-DD h:mm:ss a")
                      .calendar()}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <a
          href="#"
          className="block rounded-b-xl bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
        >
          <div className="inline-flex items-center gap-x-2">
            <HiEye className="h-6 w-6" />
            <span>View all</span>
          </div>
        </a>
      </div>
    </Dropdown>
  );
};

const UserDropdown: FC = function () {
  const userAction = useUserActions();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(authAtom);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-1 hover:bg-purple-700 rounded">
          <span className="sr-only">User menu</span>
          <Avatar alt="" img={logoIcon} rounded size="sm" />
        </span>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {JSON.parse(currentUser)?.user?.fullName}
        </span>
        <span className="block truncate text-sm font-medium">
          {JSON.parse(currentUser)?.user?.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
      <Dropdown.Item href="/account-settings">Account Settings</Dropdown.Item>
      <Dropdown.Item href="/contact-support">Support</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => {
          userAction.logout(navigate);
        }}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default ExampleNavbar;