/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC } from "react";
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
  HiMenuAlt1,
  HiOutlineTicket,
  HiSearch,
  HiShoppingBag,
  HiUserCircle,
  HiUsers,
  HiViewGrid,
  HiX,
} from "react-icons/hi";
import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import { useUserActions } from "@/_recoil/actions";
import { useNavigate } from "react-router";
import logoIcon from "~/images/default-user.png";

import logoDark from "~/images/logo-dark.png";
// import logoLight from "~/images/logo-light.png";
import logoMain from "~/images/proprly-main.png";
import { allNotificationsAtom, authAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import moment from "moment";

const ExampleNavbar: FC = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();
  const isDarkMode = localStorage.getItem("theme") == 'dark';
  const [_mode, , toggleMode] = useThemeMode();


  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">

              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                <img
                  alt=""
                  src={isDarkMode ? logoDark : logoMain}
                  className="mr-3 h-6 sm:h-8"
                />
              </span>
            </Navbar.Brand>
            {isPageWithSidebar && (
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="ml-20 mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <span className="sr-only">Toggle sidebar</span>
                {isOpenOnSmallScreens && isSmallScreen() ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
            )}
            <form className="hidden md:block">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <TextInput
                icon={HiSearch}
                id="search"
                name="search"
                placeholder="Search"
                required
                size={32}
                type="search"
              />
            </form>

          </div>
          <div className="flex items-center lg:gap-3">
            <div className="flex items-center">
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
              >
                <span className="sr-only">Search</span>
                <HiSearch className="h-6 w-6" />
              </button>
              <NotificationBellDropdown />
              <AppDrawerDropdown />
              <DarkThemeToggle onClick={() => {
                toggleMode()
                localStorage.setItem("theme", !isDarkMode ? "dark" : "light");

              }} />
            </div>
            <div className="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const NotificationBellDropdown: FC = function () {
  const notifications = useRecoilValue(allNotificationsAtom);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Notifications</span>
          <div className="relative">
            <HiBell className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
            {
              !notifications?.isRead && <div className="absolute w-2 h-2 bg-red-600 bottom-1 right-0 rounded-full"></div>
            }
          </div>

        </span>
      }
    >
      <div className="max-w-[24rem] !max-h-[500px] overflow-auto">
        <div className="block rounded-t-xl bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
        <div>
          {
            notifications?.data?.map((notification, index) => {
              return (<a
                key={index}
                href="#"
                className="flex border-y py-3 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <div className="shrink-0">

                  {!notification?.isRead && <FaEnvelope className="h-8 w-8 text-red-300" /> || <FaEnvelopeOpen className="h-8 w-8 text-gray-300" />}
                </div>
                <div className="w-full pl-3">
                  <div className="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-100">
                    <b className="text-[16px]">{notification?.title}</b><br />
                    {
                      notification?.property &&
                      <>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Unit {notification?.property?.unitNo}
                        </span>
                        <br />Project &nbsp;<span className="font-semibold text-blue-400 dark:text-blue-400">
                          {notification?.bodyWeb?.project}
                        </span>
                        &nbsp; {notification?.bodyWeb?.zone && <>
                          <br />Zone: &nbsp;
                          <span className="font-semibold text-green-900 dark:text-green-400">
                            {notification?.bodyWeb?.zone}
                          </span>
                        </>}
                        &nbsp; {notification?.bodyWeb?.element && <>
                          <br /> Element: &nbsp;
                          <span className="font-semibold text-gray-900 dark:text-gray-200">
                            {notification?.bodyWeb?.element}
                          </span>
                        </>}
                        &nbsp; {notification?.bodyWeb?.appointmentDate && <>
                          <br /> Appointment Date: &nbsp;
                          <span className="font-semibold text-red-900 dark:text-red-200">
                            {notification?.bodyWeb?.appointmentDate || ""}
                          </span>
                        </>}
                      </> || notification?.commonArea && <>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Lot no {notification?.commonArea?.lotNo}
                        </span>
                        <br />Project &nbsp;<span className="font-semibold text-blue-400 dark:text-blue-400">
                          {notification?.bodyWeb?.project}
                        </span>
                        &nbsp; {notification?.bodyWeb?.zone || notification?.bodyWeb?.Zone && <>
                          <br />Zone: &nbsp;
                          <span className="font-semibold text-green-900 dark:text-green-400">
                            {notification?.bodyWeb?.Zone || notification?.bodyWeb?.zone}
                          </span>
                        </>}
                        &nbsp; {notification?.bodyWeb?.element || notification?.bodyWeb?.Element && <>
                          <br />Element: &nbsp;
                          <span className="font-semibold text-gray-900 dark:text-gray-200">
                            {notification?.bodyWeb?.Element || notification?.bodyWeb?.element}
                          </span>
                        </>}
                        &nbsp; {notification?.bodyWeb?.appointmentDate && <>
                          <br />Appointment Date: &nbsp;
                          <span className="font-semibold text-red-900 dark:text-red-200">
                            {notification?.bodyWeb?.appointmentDate || ""}
                          </span>
                        </>}
                      </>
                    }
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                    {moment
                      .utc(notification.createdAt, "YYYY-MM-DD h:mm:ss a")
                      .calendar()}
                  </div>
                </div>
              </a>)
            })
          }

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

const AppDrawerDropdown: FC = function () {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Apps</span>
          <HiViewGrid className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </span>
      }
    >
      <div className="block rounded-t-lg border-b bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:border-b-gray-600 dark:bg-gray-700 dark:text-white">
        Apps
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiShoppingBag className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Sales
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiUsers className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Users
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiInbox className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Inbox
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiUserCircle className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Profile
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiCog className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Settings
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiArchive className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Products
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiCurrencyDollar className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Pricing
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiOutlineTicket className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Billing
          </div>
        </a>
        <a
          href="#"
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiLogout className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Logout
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
        <span>
          <span className="sr-only">User menu</span>
          <Avatar
            alt=""
            img={logoIcon}
            rounded
            size="sm"
          />
        </span>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{JSON.parse(currentUser)?.user?.fullName}</span>
        <span className="block truncate text-sm font-medium">
          {JSON.parse(currentUser)?.user?.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
      <Dropdown.Item href="/account-settings">Account Settings</Dropdown.Item>
      <Dropdown.Item href="/contact-support">Support</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => {
        userAction.logout(navigate)
      }}>Sign out</Dropdown.Item>
    </Dropdown>
  );
};

export default ExampleNavbar;
