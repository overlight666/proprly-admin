/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Dropdown, Sidebar, Spinner, TextInput, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
// import { RiOrganizationChart } from "react-icons/ri";
import {
  HiAdjustments,
  // HiChartPie,
  // HiChartSquareBar,
  // HiClipboard,
  HiCog,
  HiDotsVertical,
  // HiCollection,
  // HiInboxIn,
  // HiInformationCircle,
  // HiLockClosed,
  // HiOutlinePlusSm,
  HiPlus,
  HiSearch,
  // HiShoppingBag,
  // HiUsers,
  // HiViewGrid,
} from "react-icons/hi";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
// import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { Organization, OrgState, ProjectState, UserState } from "../types";
import { matchPath, useLocation, useParams } from "react-router-dom";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { getProjects } from "../store/features/reducers";
import { reloadProjectStatus } from "../store/features/projectSlice";

const ExampleSidebar: FC = function () {
  const dispatch = useDispatch();
  const { orgList }: OrgState = useSelector((state: any) => state.organization);
  const { projectList, loadedProject, reloadProject }: ProjectState =
    useSelector((state: any) => state.project);
  const { userData }: UserState = useSelector((state: any) => state.user);
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  const { id, project_id, property_id }: any = useParams();
  const [currentPage, setCurrentPage] = useState("");
  const [isEcommerceOpen, setEcommerceOpen] = useState(true);
  const [isUsersOpen, setUsersOpen] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Organization>();
  const { pathname } = useLocation();

  useEffect(() => {
    if (id && reloadProject) {
      dispatch(getProjects(id));
      dispatch(reloadProjectStatus(false));
    }
  }, [id]);

  const currentRoute = [
    "/organization",
    "/organization/new",
    "/signup-leads",
    "signup-leads/view",
    "/organization/:id",
    "/organization/:id/project/:project_id",
    "/organization/:id/project/:project_id/properties",
    "/organization/:id/project/:project_id/properties/new",
    "/organization/:id/project/:project_id/appointments",
  ].find((pattern) => {
    return matchPath(pattern, pathname);
  });

  useEffect(() => {
    const newList = orgList && orgList.find((org) => org.id == id);
    setSelectedOrg(newList);
  }, [id, orgList]);

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/e-commerce/"));
    setUsersOpen(newPage.includes("/users/"));
  }, [setCurrentPage, setEcommerceOpen, setUsersOpen]);

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <form className="pb-3 md:hidden">
              <TextInput
                icon={HiSearch}
                type="search"
                placeholder="Search"
                required
                size={32}
              />
            </form>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {currentRoute === "/organization" ||
                currentRoute === "/organization/new" ||
                currentRoute === "/signup-leads" ||
                currentRoute === "signup-leads/view" ? (
                  <>
                    <Sidebar.Item
                      href="/organization"
                      // icon={HiChartPie}
                      className={
                        "/organization" === currentPage
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      <div className="flex w-full items-center justify-between">
                        Organizations
                        <HiPlus color="primary" className="text-primary-700" />
                      </div>
                    </Sidebar.Item>
                    {userData.user?.permissions?.includes(
                      "can_access_leads"
                    ) && (
                      <Sidebar.Item
                        href="/signup-leads"
                        // icon={HiChartPie}
                        className={
                          "/signup-leads" === currentPage
                            ? "bg-gray-100 dark:bg-gray-700"
                            : ""
                        }
                      >
                        <div className="flex w-full items-center justify-between text-[16px]">
                          Sign-Up Leads
                        </div>
                      </Sidebar.Item>
                    )}
                  </>
                ) : (
                  selectedOrg && (
                    <>
                      <Sidebar.Item
                        href={`/organization/${selectedOrg.id}`}
                        className={`text-[14px] ${
                          currentRoute == "/organization/:id" && "bg-gray-200"
                        }`}
                      >
                        <div className="flex w-full items-center">
                          <div className="mr-3 flex h-6 items-center justify-center rounded bg-blue-100 p-2 shadow">
                            {" "}
                            <span className="text-blue-600">
                              {" "}
                              {selectedOrg.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            {selectedOrg.name}
                            <HiDotsVertical
                              color="primary"
                              className="text-primary-700"
                            />
                          </div>
                        </div>
                      </Sidebar.Item>
                      {projectList.length > 0 ? (
                        projectList.map((obj) => {
                          return (
                            <>
                              <Sidebar.Item
                                href={`/organization/${selectedOrg.id}/project/${obj.id}`}
                                className={`ml-2 text-[14px] ${
                                  currentRoute ==
                                    "/organization/:id/project/:project_id" &&
                                  project_id == obj.id &&
                                  "bg-gray-200"
                                }`}
                              >
                                <div className={`flex items-center `}>
                                  <div
                                    className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                  >
                                    {" "}
                                    {(currentRoute ==
                                      "/organization/:id/project/:project_id/properties" ||
                                      currentRoute ==
                                        "/organization/:id/project/:project_id/properties/new") &&
                                    project_id == obj.id ? (
                                      <FaRegFolderOpen />
                                    ) : (
                                      <FaRegFolder />
                                    )}
                                  </div>

                                  <div className="ml-2 flex w-full items-center justify-between">
                                    {obj.name}
                                    <HiDotsVertical
                                      color="primary"
                                      className="text-primary-700"
                                    />
                                  </div>
                                </div>
                              </Sidebar.Item>
                              {project_id == obj.id ? (
                                <Sidebar.Items style={{ marginLeft: 5 }}>
                                  <Sidebar.ItemGroup>
                                    <Sidebar.Item
                                      href={`/organization/${selectedOrg.id}/project/${obj.id}/properties`}
                                      className={`ml-2 text-[14px] ${
                                        (currentRoute ==
                                          "/organization/:id/project/:project_id/properties" ||
                                          currentRoute ==
                                            "/organization/:id/project/:project_id/properties/new") &&
                                        project_id == obj.id
                                          ? "bg-gray-200"
                                          : ""
                                      }`}
                                    >
                                      <div className={`flex items-center `}>
                                        <div
                                          className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                        >
                                          <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M15.8335 11.6667V6.25L11.6668 3.33333L7.50016 6.25V7.5H5.8335V5.41667L11.6668 1.25L17.5002 5.41667V11.6667H15.8335ZM12.0835 6.66667H12.9168V5.83333H12.0835V6.66667ZM10.4168 6.66667H11.2502V5.83333H10.4168V6.66667ZM12.0835 8.33333H12.9168V7.5H12.0835V8.33333ZM10.4168 8.33333H11.2502V7.5H10.4168V8.33333ZM5.8335 15.4167L11.6252 17L16.5835 15.4583C16.5141 15.3333 16.4134 15.2257 16.2814 15.1354C16.1495 15.0451 16.0002 15 15.8335 15H11.6252C11.2502 15 10.9516 14.9861 10.7293 14.9583C10.5071 14.9306 10.2779 14.875 10.0418 14.7917L8.10433 14.1458L8.56266 12.5208L10.2502 13.0833C10.4863 13.1528 10.7641 13.2083 11.0835 13.25C11.4029 13.2917 11.8752 13.3194 12.5002 13.3333C12.5002 13.1806 12.455 13.0347 12.3647 12.8958C12.2745 12.7569 12.1668 12.6667 12.0418 12.625L7.16683 10.8333H5.8335V15.4167ZM0.833496 18.3333V9.16667H7.16683C7.26405 9.16667 7.36127 9.17708 7.4585 9.19792C7.55572 9.21875 7.646 9.24306 7.72933 9.27083L12.6252 11.0833C13.0835 11.25 13.455 11.5417 13.7397 11.9583C14.0245 12.375 14.1668 12.8333 14.1668 13.3333H15.8335C16.5279 13.3333 17.1182 13.5625 17.6043 14.0208C18.0904 14.4792 18.3335 15.0833 18.3335 15.8333V16.6667L11.6668 18.75L5.8335 17.125V18.3333H0.833496ZM2.50016 16.6667H4.16683V10.8333H2.50016V16.6667Z"
                                              fill="#1E429F"
                                            />
                                          </svg>
                                        </div>
                                        Properties
                                      </div>
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                      href={`/organization/${selectedOrg.id}/project/${obj.id}`}
                                      className={`ml-2 text-[14px]`}
                                    >
                                      <div className={`flex items-center `}>
                                        <div
                                          className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                        >
                                          <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667ZM4.16667 15.8333H15.8333V4.16667H4.16667V15.8333Z"
                                              fill="#1E429F"
                                            />
                                          </svg>
                                        </div>
                                        Common Areas
                                      </div>
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                      href={`/organization/${selectedOrg.id}/project/${obj.id}`}
                                      className={`ml-2 text-[14px]`}
                                    >
                                      <div className={`flex items-center `}>
                                        <div
                                          className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <g clipPath="url(#clip0_715_31090)">
                                              <path
                                                d="M13.7035 0.8H11.0326C10.8907 0.557567 10.6864 0.356034 10.4401 0.215618C10.1938 0.0752026 9.91425 0.000843156 9.62947 0H6.37021C6.08542 0.000843156 5.80587 0.0752026 5.5596 0.215618C5.31332 0.356034 5.10899 0.557567 4.9671 0.8H2.29613C1.86393 0.8 1.44943 0.968571 1.14381 1.26863C0.838196 1.56869 0.666504 1.97565 0.666504 2.4V14.4C0.666504 14.8243 0.838196 15.2313 1.14381 15.5314C1.44943 15.8314 1.86393 16 2.29613 16H13.7035C14.1357 16 14.5502 15.8314 14.8559 15.5314C15.1615 15.2313 15.3332 14.8243 15.3332 14.4V2.4C15.3332 1.97565 15.1615 1.56869 14.8559 1.26863C14.5502 0.968571 14.1357 0.8 13.7035 0.8ZM9.62947 1.6V3.2H6.37021V1.6H9.62947ZM13.7035 14.4H2.29613V2.4H4.74058V3.2C4.52448 3.2 4.31722 3.28429 4.16442 3.43431C4.01161 3.58434 3.92576 3.78783 3.92576 4C3.92576 4.21217 4.01161 4.41566 4.16442 4.56569C4.31722 4.71571 4.52448 4.8 4.74058 4.8H11.2591C11.4752 4.8 11.6825 4.71571 11.8353 4.56569C11.9881 4.41566 12.0739 4.21217 12.0739 4C12.0739 3.78783 11.9881 3.58434 11.8353 3.43431C11.6825 3.28429 11.4752 3.2 11.2591 3.2V2.4H13.7035V14.4Z"
                                                fill="#1E429F"
                                              />
                                              <path
                                                d="M11.2591 7.2H7.18502C6.96892 7.2 6.76167 7.28429 6.60886 7.43431C6.45605 7.58434 6.37021 7.78783 6.37021 8C6.37021 8.21217 6.45605 8.41566 6.60886 8.56569C6.76167 8.71571 6.96892 8.8 7.18502 8.8H11.2591C11.4752 8.8 11.6825 8.71571 11.8353 8.56569C11.9881 8.41566 12.0739 8.21217 12.0739 8C12.0739 7.78783 11.9881 7.58434 11.8353 7.43431C11.6825 7.28429 11.4752 7.2 11.2591 7.2Z"
                                                fill="#1E429F"
                                              />
                                              <path
                                                d="M11.2591 10.4H7.18502C6.96892 10.4 6.76167 10.4843 6.60886 10.6343C6.45605 10.7843 6.37021 10.9878 6.37021 11.2C6.37021 11.4122 6.45605 11.6157 6.60886 11.7657C6.76167 11.9157 6.96892 12 7.18502 12H11.2591C11.4752 12 11.6825 11.9157 11.8353 11.7657C11.9881 11.6157 12.0739 11.4122 12.0739 11.2C12.0739 10.9878 11.9881 10.7843 11.8353 10.6343C11.6825 10.4843 11.4752 10.4 11.2591 10.4Z"
                                                fill="#1E429F"
                                              />
                                              <path
                                                d="M4.74058 8.8C5.19059 8.8 5.55539 8.44183 5.55539 8C5.55539 7.55817 5.19059 7.2 4.74058 7.2C4.29057 7.2 3.92576 7.55817 3.92576 8C3.92576 8.44183 4.29057 8.8 4.74058 8.8Z"
                                                fill="#1E429F"
                                              />
                                              <path
                                                d="M4.74058 12C5.19059 12 5.55539 11.6418 5.55539 11.2C5.55539 10.7582 5.19059 10.4 4.74058 10.4C4.29057 10.4 3.92576 10.7582 3.92576 11.2C3.92576 11.6418 4.29057 12 4.74058 12Z"
                                                fill="#1E429F"
                                              />
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_715_31090">
                                                <rect
                                                  width="16"
                                                  height="16"
                                                  fill="white"
                                                />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </div>
                                        ITPs
                                      </div>
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                      href={`/organization/${selectedOrg.id}/project/${obj.id}/appointments`}
                                      className={`ml-2 text-[14px] ${
                                        currentRoute ==
                                          "/organization/:id/project/:project_id/appointments" &&
                                        project_id == obj.id
                                          ? "bg-gray-200"
                                          : ""
                                      }`}
                                    >
                                      <div className={`flex items-center `}>
                                        <div
                                          className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M14.4 1.6H12.8V0.8C12.8 0.587827 12.7157 0.384344 12.5657 0.234315C12.4157 0.0842854 12.2122 0 12 0C11.7878 0 11.5843 0.0842854 11.4343 0.234315C11.2843 0.384344 11.2 0.587827 11.2 0.8V1.6H8.8V0.8C8.8 0.587827 8.71571 0.384344 8.56569 0.234315C8.41566 0.0842854 8.21217 0 8 0C7.78783 0 7.58434 0.0842854 7.43431 0.234315C7.28429 0.384344 7.2 0.587827 7.2 0.8V1.6H4.8V0.8C4.8 0.587827 4.71571 0.384344 4.56569 0.234315C4.41566 0.0842854 4.21217 0 4 0C3.78783 0 3.58434 0.0842854 3.43431 0.234315C3.28429 0.384344 3.2 0.587827 3.2 0.8V1.6H1.6C1.17565 1.6 0.768687 1.76857 0.468629 2.06863C0.168571 2.36869 0 2.77565 0 3.2V14.4C0 14.8243 0.168571 15.2313 0.468629 15.5314C0.768687 15.8314 1.17565 16 1.6 16H14.4C14.8243 16 15.2313 15.8314 15.5314 15.5314C15.8314 15.2313 16 14.8243 16 14.4V3.2C16 2.77565 15.8314 2.36869 15.5314 2.06863C15.2313 1.76857 14.8243 1.6 14.4 1.6ZM3.2 3.2C3.2 3.41217 3.28429 3.61566 3.43431 3.76569C3.58434 3.91571 3.78783 4 4 4C4.21217 4 4.41566 3.91571 4.56569 3.76569C4.71571 3.61566 4.8 3.41217 4.8 3.2H7.2C7.2 3.41217 7.28429 3.61566 7.43431 3.76569C7.58434 3.91571 7.78783 4 8 4C8.21217 4 8.41566 3.91571 8.56569 3.76569C8.71571 3.61566 8.8 3.41217 8.8 3.2H11.2C11.2 3.41217 11.2843 3.61566 11.4343 3.76569C11.5843 3.91571 11.7878 4 12 4C12.2122 4 12.4157 3.91571 12.5657 3.76569C12.7157 3.61566 12.8 3.41217 12.8 3.2H14.4V4.8H1.6V3.2H3.2ZM1.6 14.4V6.4H14.4V14.4H1.6Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M4.4 8H3.6C3.37909 8 3.2 8.17909 3.2 8.4V9.2C3.2 9.42091 3.37909 9.6 3.6 9.6H4.4C4.62091 9.6 4.8 9.42091 4.8 9.2V8.4C4.8 8.17909 4.62091 8 4.4 8Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M4.4 11.2H3.6C3.37909 11.2 3.2 11.3791 3.2 11.6V12.4C3.2 12.6209 3.37909 12.8 3.6 12.8H4.4C4.62091 12.8 4.8 12.6209 4.8 12.4V11.6C4.8 11.3791 4.62091 11.2 4.4 11.2Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M8.4 8H7.6C7.37909 8 7.2 8.17909 7.2 8.4V9.2C7.2 9.42091 7.37909 9.6 7.6 9.6H8.4C8.62091 9.6 8.8 9.42091 8.8 9.2V8.4C8.8 8.17909 8.62091 8 8.4 8Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M8.4 11.2H7.6C7.37909 11.2 7.2 11.3791 7.2 11.6V12.4C7.2 12.6209 7.37909 12.8 7.6 12.8H8.4C8.62091 12.8 8.8 12.6209 8.8 12.4V11.6C8.8 11.3791 8.62091 11.2 8.4 11.2Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M12.4 8H11.6C11.3791 8 11.2 8.17909 11.2 8.4V9.2C11.2 9.42091 11.3791 9.6 11.6 9.6H12.4C12.6209 9.6 12.8 9.42091 12.8 9.2V8.4C12.8 8.17909 12.6209 8 12.4 8Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M12.4 11.2H11.6C11.3791 11.2 11.2 11.3791 11.2 11.6V12.4C11.2 12.6209 11.3791 12.8 11.6 12.8H12.4C12.6209 12.8 12.8 12.6209 12.8 12.4V11.6C12.8 11.3791 12.6209 11.2 12.4 11.2Z"
                                              fill="#1E429F"
                                            />
                                          </svg>
                                        </div>
                                        Appointments
                                      </div>
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                      href={`/organization/${selectedOrg.id}/project/${obj.id}`}
                                      className={`ml-2 text-[14px] `}
                                    >
                                      <div className={`flex items-center `}>
                                        <div
                                          className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M4.8 14.4H1.6V2.4H4V3.2C3.5584 3.2 3.2 3.5584 3.2 4C3.2 4.4416 3.5584 4.8 4 4.8H6.2064L7.8064 3.2H5.6V1.6H8V3.0232C8.4416 2.6256 9.0016 2.4 9.6 2.4H13.6C13.6 1.5176 12.8824 0.8 12 0.8H9.3776C9.1 0.324 8.5896 0 8 0H5.6C5.0104 0 4.5 0.324 4.2224 0.8H1.6C0.7176 0.8 0 1.5176 0 2.4V14.4C0 15.2824 0.7176 16 1.6 16H4.8C4.94 16 5.0648 15.9544 5.1792 15.8912C4.9456 15.444 4.8 14.9416 4.8 14.4Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M14.4536 4H9.6C9.388 4 9.184 4.084 9.0344 4.2344L6.6344 6.6344C6.484 6.784 6.4 6.988 6.4 7.2V14.4C6.4 15.2824 7.0936 16 7.9464 16H14.4536C15.3064 16 16 15.2824 16 14.4V5.6C16 4.7176 15.3064 4 14.4536 4ZM9.6 5.9312V7.2H8.3312L9.6 5.9312ZM8 14.4V8.8H10.4C10.8416 8.8 11.2 8.4416 11.2 8V5.5928L14.396 5.5792C14.396 5.5792 14.4 5.5856 14.4 5.6L14.4536 14.4H8Z"
                                              fill="#1E429F"
                                            />
                                          </svg>
                                        </div>
                                        Reports
                                      </div>
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                      href={`/organization/${selectedOrg.id}/project/${obj.id}`}
                                      className={`ml-2 text-[14px]`}
                                    >
                                      <div className={`flex items-center `}>
                                        <div
                                          className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                        >
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M11.2 1.68421C10.8168 1.6873 10.4374 1.76348 10.08 1.90905C10.27 2.45398 10.3759 3.02742 10.3936 3.60758C10.6372 3.45316 10.9157 3.37056 11.2 3.36842C11.473 3.36742 11.7416 3.43994 11.9805 3.57909C12.2193 3.71825 12.4203 3.9194 12.5644 4.16343C12.7085 4.40745 12.7909 4.68623 12.8038 4.97324C12.8167 5.26025 12.7596 5.54596 12.6379 5.80318C12.5163 6.06041 12.3341 6.28059 12.1088 6.4428C11.8835 6.60501 11.6225 6.70384 11.3507 6.72989C11.0788 6.75595 10.8052 6.70836 10.5557 6.59166C10.3063 6.47496 10.0894 6.29302 9.9256 6.06316C9.69569 6.59075 9.38758 7.07653 9.0128 7.50232C9.39295 7.87998 9.8552 8.15386 10.3591 8.30002C10.8631 8.44618 11.3934 8.46017 11.9036 8.34077C12.4139 8.22136 12.8886 7.97219 13.2862 7.61505C13.6839 7.25791 13.9923 6.80367 14.1847 6.29204C14.377 5.78041 14.4474 5.22698 14.3896 4.68013C14.3317 4.13327 14.1476 3.60965 13.8531 3.15504C13.5586 2.70042 13.1628 2.32867 12.7003 2.07227C12.2378 1.81587 11.7227 1.68263 11.2 1.68421Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M12 9.26316H10.9888C11.3313 9.77721 11.593 10.3459 11.764 10.9474H12C12.6365 10.9474 13.247 11.2135 13.6971 11.6873C14.1471 12.1611 14.4 12.8037 14.4 13.4737V14.3158H12V15.1579C11.9974 15.4454 11.9476 15.7303 11.8528 16H15.2C15.4122 16 15.6157 15.9113 15.7657 15.7534C15.9157 15.5954 16 15.3812 16 15.1579V13.4737C15.9987 12.3574 15.5769 11.2872 14.827 10.4979C14.0772 9.70853 13.0605 9.2645 12 9.26316Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M5.2 7.57895C4.48799 7.57895 3.79196 7.3567 3.19995 6.94031C2.60793 6.52391 2.14651 5.93208 1.87403 5.23964C1.60156 4.54721 1.53027 3.78527 1.66917 3.05019C1.80808 2.3151 2.15095 1.63988 2.65442 1.10991C3.15788 0.579945 3.79934 0.219033 4.49768 0.0728154C5.19601 -0.0734023 5.91985 0.0016419 6.57766 0.288458C7.23547 0.575274 7.79772 1.06098 8.19329 1.68416C8.58886 2.30733 8.8 3.03999 8.8 3.78947C8.79894 4.79416 8.41932 5.75738 7.74442 6.46781C7.06951 7.17823 6.15445 7.57783 5.2 7.57895ZM5.2 1.68421C4.80444 1.68421 4.41776 1.80768 4.08886 2.03901C3.75996 2.27034 3.50362 2.59914 3.35224 2.98383C3.20087 3.36851 3.16126 3.79181 3.23843 4.20019C3.3156 4.60857 3.50608 4.98369 3.78579 5.27812C4.06549 5.57255 4.42186 5.77305 4.80982 5.85429C5.19778 5.93552 5.59992 5.89383 5.96537 5.73448C6.33082 5.57514 6.64318 5.3053 6.86294 4.9591C7.0827 4.61289 7.2 4.20586 7.2 3.78947C7.2 3.23112 6.98929 2.69564 6.61421 2.30083C6.23914 1.90602 5.73043 1.68421 5.2 1.68421Z"
                                              fill="#1E429F"
                                            />
                                            <path
                                              d="M9.6 16H0.8C0.587827 16 0.384344 15.9113 0.234315 15.7534C0.0842854 15.5954 0 15.3812 0 15.1579V12.6316C0.00127029 11.5153 0.423106 10.4451 1.17298 9.65576C1.92285 8.86643 2.93952 8.42239 4 8.42105H6.4C7.46048 8.42239 8.47715 8.86643 9.22702 9.65576C9.97689 10.4451 10.3987 11.5153 10.4 12.6316V15.1579C10.4 15.3812 10.3157 15.5954 10.1657 15.7534C10.0157 15.9113 9.81217 16 9.6 16ZM1.6 14.3158H8.8V12.6316C8.8 11.9616 8.54714 11.319 8.09706 10.8452C7.64697 10.3714 7.03652 10.1053 6.4 10.1053H4C3.36348 10.1053 2.75303 10.3714 2.30294 10.8452C1.85286 11.319 1.6 11.9616 1.6 12.6316V14.3158Z"
                                              fill="#1E429F"
                                            />
                                          </svg>
                                        </div>
                                        Users
                                      </div>
                                    </Sidebar.Item>
                                  </Sidebar.ItemGroup>
                                </Sidebar.Items>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        })
                      ) : !loadedProject ? (
                        <div className="flex justify-center">
                          <Spinner
                            aria-label="Alternate spinner button example"
                            size="sm"
                          />
                          <span className="pl-3 text-[12px]">
                            Loading Project...
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )
                )}

                {/* {(orgList &&
                  orgList.length &&
                  orgList.map((org: Organization) => {
                    return (
                      <>
                        <Sidebar.Item
                          href={`/organization/${org.id}`}
                          className="ml-2 text-[14px]"
                        >
                          <div className="flex items-center">
                            <div className="mr-3 flex h-6 items-center justify-center rounded bg-blue-100 p-2 shadow">
                              {" "}
                              <span className="text-blue-600">
                                {" "}
                                {org.name.charAt(0)}
                              </span>
                            </div>

                            {org.name}
                          </div>
                        </Sidebar.Item>
                      </>
                    );
                  })) || <></>} */}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
          {/* <BottomMenu /> */}
        </div>
      </Sidebar>
    </div>
  );
};

const BottomMenu: FC = function () {
  return (
    <div className="flex items-center justify-center gap-x-5">
      <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="sr-only">Tweaks</span>
        <HiAdjustments className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
      </button>
      <div>
        <Tooltip content="Settings page">
          <a
            href="/users/settings"
            className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Settings page</span>
            <HiCog className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
          </a>
        </Tooltip>
      </div>
      <div>
        <LanguageDropdown />
      </div>
    </div>
  );
};

const LanguageDropdown: FC = function () {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="sr-only">Current language</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3900 3900"
            className="h-5 w-5 rounded-full"
          >
            <path fill="#b22234" d="M0 0h7410v3900H0z"></path>
            <path
              d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
              stroke="#fff"
              strokeWidth="300"
            ></path>
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z"></path>
            <g fill="#fff">
              <g id="d">
                <g id="c">
                  <g id="e">
                    <g id="b">
                      <path
                        id="a"
                        d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                      ></path>
                      <use xlinkHref="#a" y="420"></use>
                      <use xlinkHref="#a" y="840"></use>
                      <use xlinkHref="#a" y="1260"></use>
                    </g>
                    <use xlinkHref="#a" y="1680"></use>
                  </g>
                  <use xlinkHref="#b" x="247" y="210"></use>
                </g>
                <use xlinkHref="#c" x="494"></use>
              </g>
              <use xlinkHref="#d" x="988"></use>
              <use xlinkHref="#c" x="1976"></use>
              <use xlinkHref="#e" x="2470"></use>
            </g>
          </svg>
        </span>
      }
    >
      <ul className="py-1" role="none">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              <svg
                className="mr-2 h-4 w-4 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                id="flag-icon-css-us"
                viewBox="0 0 512 512"
              >
                <g fillRule="evenodd">
                  <g strokeWidth="1pt">
                    <path
                      fill="#bd3d44"
                      d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                      transform="scale(3.9385)"
                    />
                    <path
                      fill="#fff"
                      d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                      transform="scale(3.9385)"
                    />
                  </g>
                  <path
                    fill="#192f5d"
                    d="M0 0h98.8v70H0z"
                    transform="scale(3.9385)"
                  />
                  <path
                    fill="#fff"
                    d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                    transform="scale(3.9385)"
                  />
                </g>
              </svg>
              <span className="whitespace-nowrap">English (US)</span>
            </div>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              <svg
                className="mr-2 h-4 w-4 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                id="flag-icon-css-de"
                viewBox="0 0 512 512"
              >
                <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                <path d="M0 0h512v170.7H0z" />
                <path fill="#d00" d="M0 170.7h512v170.6H0z" />
              </svg>
              Deutsch
            </div>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              <svg
                className="mr-2 h-4 w-4 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                id="flag-icon-css-it"
                viewBox="0 0 512 512"
              >
                <g fillRule="evenodd" strokeWidth="1pt">
                  <path fill="#fff" d="M0 0h512v512H0z" />
                  <path fill="#009246" d="M0 0h170.7v512H0z" />
                  <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
                </g>
              </svg>
              Italiano
            </div>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <div className="inline-flex items-center">
              <svg
                className="mr-2 h-4 w-4 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                id="flag-icon-css-cn"
                viewBox="0 0 512 512"
              >
                <defs>
                  <path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z" />
                </defs>
                <path fill="#de2910" d="M0 0h512v512H0z" />
                <use
                  width="30"
                  height="20"
                  transform="matrix(76.8 0 0 76.8 128 128)"
                  xlinkHref="#a"
                />
                <use
                  width="30"
                  height="20"
                  transform="rotate(-121 142.6 -47) scale(25.5827)"
                  xlinkHref="#a"
                />
                <use
                  width="30"
                  height="20"
                  transform="rotate(-98.1 198 -82) scale(25.6)"
                  xlinkHref="#a"
                />
                <use
                  width="30"
                  height="20"
                  transform="rotate(-74 272.4 -114) scale(25.6137)"
                  xlinkHref="#a"
                />
                <use
                  width="30"
                  height="20"
                  transform="matrix(16 -19.968 19.968 16 256 230.4)"
                  xlinkHref="#a"
                />
              </svg>
              <span className="whitespace-nowrap">中文 (繁體)</span>
            </div>
          </a>
        </li>
      </ul>
    </Dropdown>
  );
};

export default ExampleSidebar;
