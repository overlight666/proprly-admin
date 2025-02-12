/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Button, Dropdown, Sidebar, Spinner, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
// import { RiOrganizationChart } from "react-icons/ri";
import {
  // HiAdjustments,
  // HiChartPie,
  // HiChartSquareBar,
  // HiClipboard,
  // HiCog,
  // HiDotsVertical,
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
import type {
  AppState,
  // Organization,
  OrgState,
  ProjectState,
  ReducerTypes,
  UserState,
} from "../types";
import {
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  FaCaretDown,
  // FaCaretLeft,
  FaCaretRight,
  FaRegFolder,
  FaRegFolderOpen,
} from "react-icons/fa";
import {
  clearProjectOpen,
  updateProjectOpen,
  updateProjectTab,
  updateProjectTabMain,
} from "../store/features/appSlice";
// import { BsCaretDown, BsCaretLeft } from "react-icons/bs";
import { getGlobalConfig } from "../store/features/reducers";
import {
  clearCommonAreaItem,
  clearCommonAreaResponse,
} from "../store/features/projectSlice";
import {
  clearPropertyData,
  // clearPropertyResponse,
} from "../store/features/propertySlice";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { setSelectedOrganization } from "../store/features/organizationSlice";

const ExampleSidebar: FC = function () {
  const dispatch = useDispatch();
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { config, openProjects }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const token = localStorage.getItem("token");
  const { projectList, loadedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const { userData }: UserState = useSelector((state: any) => state.user);
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  const { project_id }: any = useParams();
  const [currentPage, setCurrentPage] = useState("");
  const [_isEcommerceOpen, setEcommerceOpen] = useState(true);
  const [_isUsersOpen, setUsersOpen] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let isConfgLoaded = false;
  const truncateString = (string = "", maxLength = 12) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;
  // useEffect(() => {
  //   if (id) {
  //     dispatch(reloadProjectStatus(false));
  //   }
  // }, [id]);

  const currentRoute = [
    "/organization",
    "/organization/new",
    "/signup-leads",
    "signup-leads/view",
    "/master-configurations",
    "/support-tickets",
    "/organization/:id",
    "/organization/:id/edit",
    "/organization/:id/project/:project_id",
    "/organization/:id/project/:project_id/properties",
    "/organization/:id/project/:project_id/properties/new",
    "/organization/:id/project/:project_id/appointments",
    "/organization/:id/project/:project_id/common-area",
    "/organization/:id/project/:project_id/common-area/new",
    "/organization/:id/project/:project_id/common-area/:common_area_id/configure",
  ].find((pattern) => {
    return matchPath(pattern, pathname);
  });

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/e-commerce/"));
    setUsersOpen(newPage.includes("/users/"));
  }, [setCurrentPage, setEcommerceOpen, setUsersOpen]);

  useEffect(() => {
    if (!isConfgLoaded) {
      try {
        if (!config && token) {
          dispatch(getGlobalConfig());
        }
      } catch (error) {
        console.log(error);
      }
      isConfgLoaded = true;
    }
  }, [config, token, dispatch]);

  useEffect(() => {
    if (
      currentRoute === "/organization" ||
      currentRoute === "/organization/new" ||
      currentRoute === "/signup-leads" ||
      currentRoute === "signup-leads/view" ||
      currentRoute === "/master-configurations" ||
      currentRoute === "/support-tickets" ||
      currentRoute === "/organization/:id/edit"
    ) {
      dispatch(clearProjectOpen());
    }
  }, [currentRoute]);

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
                currentRoute === "signup-leads/view" ||
                currentRoute === "/master-configurations" ||
                currentRoute === "/support-tickets" ||
                currentRoute === "/organization/:id/edit" ? (
                  <>
                    <Sidebar.Item
                      onClick={() => {
                        dispatch(clearProjectOpen());
                      }}
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
                        key={"signup-leads"}
                        className={
                          "/signup-leads" === currentPage
                            ? "bg-gray-100 dark:bg-gray-700"
                            : ""
                        }
                      >
                        <div className="flex w-full items-center justify-between">
                          Sign-Up Leads
                        </div>
                      </Sidebar.Item>
                    )}
                    {userData.user?.permissions?.includes(
                      "can_access_leads"
                    ) && (
                      <Sidebar.Item
                        href="/master-configurations"
                        key={"master-configurations"}
                        className={
                          "/master-configurations" === currentPage
                            ? "bg-gray-100 dark:bg-gray-700"
                            : ""
                        }
                      >
                        <div className="flex w-full items-center justify-between">
                          Master Configurations
                        </div>
                      </Sidebar.Item>
                    )}
                    {userData.user?.permissions?.includes(
                      "can_access_leads"
                    ) && (
                      <Sidebar.Item
                        href="/support-tickets"
                        key={"support-tickets"}
                        className={
                          "/support-tickets" === currentPage
                            ? "bg-gray-100 dark:bg-gray-700"
                            : ""
                        }
                      >
                        <div className="flex w-full items-center justify-between">
                          Support Tickets
                        </div>
                      </Sidebar.Item>
                    )}
                  </>
                ) : (
                  selectedOrganization && (
                    <>
                      <Sidebar.Item
                        href={`/organization/${selectedOrganization.id}`}
                        className={`text-[14px] ${
                          currentRoute == "/organization/:id" && "bg-gray-200"
                        }`}
                      >
                        <div className="flex w-full items-center">
                          <div className="mr-3 flex h-6 items-center justify-center rounded bg-blue-100 p-2 shadow">
                            {" "}
                            <span className="text-blue-600">
                              {" "}
                              {selectedOrganization.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            {selectedOrganization.name}
                            {/* {id == selectedOrganization.id ? (
                              <FaCaretDown
                                color="primary"
                                className="text-primary-700"
                              />
                            ) : (
                              <FaCaretLeft
                                color="primary"
                                className="text-primary-700"
                              />
                            )} */}
                          </div>
                        </div>
                      </Sidebar.Item>
                      {projectList && projectList.length > 0 ? (
                        projectList.map((obj, index) => {
                          return (
                            <>
                              <Sidebar.Item
                                onClick={() => {
                                  dispatch(updateProjectTabMain(0));
                                  dispatch(updateProjectTab(1));

                                  dispatch(updateProjectOpen(obj.id));
                                }}
                                key={index}
                                // href={`/organization/${selectedOrganization.id}/project/${obj.id}`}
                                className={`ml-2 cursor-pointer text-[14px] ${
                                  currentRoute ==
                                    "/organization/:id/project/:project_id" &&
                                  project_id == obj.id &&
                                  "bg-gray-200"
                                }`}
                              >
                                <div className={`flex items-center `}>
                                  <div
                                    onClick={() =>
                                      navigate(
                                        `/organization/${selectedOrganization.id}/project/${obj.id}`
                                      )
                                    }
                                    className={`mr-3 flex h-6 items-center justify-center rounded p-2 shadow`}
                                  >
                                    {" "}
                                    {openProjects &&
                                    openProjects.length &&
                                    openProjects.includes(obj.id) ? (
                                      <FaRegFolderOpen />
                                    ) : (
                                      <FaRegFolder />
                                    )}
                                  </div>

                                  <div className="ml-2 flex w-full cursor-pointer items-center justify-between">
                                    <span
                                      onClick={() =>
                                        navigate(
                                          `/organization/${selectedOrganization.id}/project/${obj.id}`
                                        )
                                      }
                                    >
                                      {" "}
                                      {truncateString(obj.name)}
                                    </span>

                                    <Dropdown
                                      label=""
                                      dismissOnClick={false}
                                      renderTrigger={() => (
                                        <div
                                          color="gray"
                                          className="flex w-[50px] items-center justify-end"
                                        >
                                          <div className="flex items-center gap-x-2 text-xs">
                                            <PiDotsThreeVerticalBold />
                                          </div>
                                        </div>
                                      )}
                                    >
                                      <Dropdown.Item
                                        className="focus:rounded-lg"
                                        onClick={() => {
                                          dispatch(
                                            setSelectedOrganization(
                                              selectedOrganization
                                            )
                                          );
                                          navigate(
                                            `/organization/${selectedOrganization.id}/project/${obj.id}/edit`
                                          );
                                        }}
                                      >
                                        Edit
                                      </Dropdown.Item>
                                    </Dropdown>
                                  </div>
                                </div>
                              </Sidebar.Item>
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

// const BottomMenu: FC = function () {
//   return (
//     <div className="flex items-center justify-center gap-x-5">
//       <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//         <span className="sr-only">Tweaks</span>
//         <HiAdjustments className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
//       </button>
//       <div>
//         <Tooltip content="Settings page">
//           <a
//             href="/users/settings"
//             className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             <span className="sr-only">Settings page</span>
//             <HiCog className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
//           </a>
//         </Tooltip>
//       </div>
//       <div>
//         <LanguageDropdown />
//       </div>
//     </div>
//   );
// };

// const LanguageDropdown: FC = function () {
//   return (
//     <Dropdown
//       arrowIcon={false}
//       inline
//       label={
//         <span className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
//           <span className="sr-only">Current language</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             xmlnsXlink="http://www.w3.org/1999/xlink"
//             viewBox="0 0 3900 3900"
//             className="h-5 w-5 rounded-full"
//           >
//             <path fill="#b22234" d="M0 0h7410v3900H0z"></path>
//             <path
//               d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
//               stroke="#fff"
//               strokeWidth="300"
//             ></path>
//             <path fill="#3c3b6e" d="M0 0h2964v2100H0z"></path>
//             <g fill="#fff">
//               <g id="d">
//                 <g id="c">
//                   <g id="e">
//                     <g id="b">
//                       <path
//                         id="a"
//                         d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
//                       ></path>
//                       <use xlinkHref="#a" y="420"></use>
//                       <use xlinkHref="#a" y="840"></use>
//                       <use xlinkHref="#a" y="1260"></use>
//                     </g>
//                     <use xlinkHref="#a" y="1680"></use>
//                   </g>
//                   <use xlinkHref="#b" x="247" y="210"></use>
//                 </g>
//                 <use xlinkHref="#c" x="494"></use>
//               </g>
//               <use xlinkHref="#d" x="988"></use>
//               <use xlinkHref="#c" x="1976"></use>
//               <use xlinkHref="#e" x="2470"></use>
//             </g>
//           </svg>
//         </span>
//       }
//     >
//       <ul className="py-1" role="none">
//         <li>
//           <a
//             href="#"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
//           >
//             <div className="inline-flex items-center">
//               <svg
//                 className="mr-2 h-4 w-4 rounded-full"
//                 xmlns="http://www.w3.org/2000/svg"
//                 id="flag-icon-css-us"
//                 viewBox="0 0 512 512"
//               >
//                 <g fillRule="evenodd">
//                   <g strokeWidth="1pt">
//                     <path
//                       fill="#bd3d44"
//                       d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
//                       transform="scale(3.9385)"
//                     />
//                     <path
//                       fill="#fff"
//                       d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
//                       transform="scale(3.9385)"
//                     />
//                   </g>
//                   <path
//                     fill="#192f5d"
//                     d="M0 0h98.8v70H0z"
//                     transform="scale(3.9385)"
//                   />
//                   <path
//                     fill="#fff"
//                     d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
//                     transform="scale(3.9385)"
//                   />
//                 </g>
//               </svg>
//               <span className="whitespace-nowrap">English (US)</span>
//             </div>
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
//           >
//             <div className="inline-flex items-center">
//               <svg
//                 className="mr-2 h-4 w-4 rounded-full"
//                 xmlns="http://www.w3.org/2000/svg"
//                 id="flag-icon-css-de"
//                 viewBox="0 0 512 512"
//               >
//                 <path fill="#ffce00" d="M0 341.3h512V512H0z" />
//                 <path d="M0 0h512v170.7H0z" />
//                 <path fill="#d00" d="M0 170.7h512v170.6H0z" />
//               </svg>
//               Deutsch
//             </div>
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
//           >
//             <div className="inline-flex items-center">
//               <svg
//                 className="mr-2 h-4 w-4 rounded-full"
//                 xmlns="http://www.w3.org/2000/svg"
//                 id="flag-icon-css-it"
//                 viewBox="0 0 512 512"
//               >
//                 <g fillRule="evenodd" strokeWidth="1pt">
//                   <path fill="#fff" d="M0 0h512v512H0z" />
//                   <path fill="#009246" d="M0 0h170.7v512H0z" />
//                   <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
//                 </g>
//               </svg>
//               Italiano
//             </div>
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
//           >
//             <div className="inline-flex items-center">
//               <svg
//                 className="mr-2 h-4 w-4 rounded-full"
//                 xmlns="http://www.w3.org/2000/svg"
//                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                 id="flag-icon-css-cn"
//                 viewBox="0 0 512 512"
//               >
//                 <defs>
//                   <path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z" />
//                 </defs>
//                 <path fill="#de2910" d="M0 0h512v512H0z" />
//                 <use
//                   width="30"
//                   height="20"
//                   transform="matrix(76.8 0 0 76.8 128 128)"
//                   xlinkHref="#a"
//                 />
//                 <use
//                   width="30"
//                   height="20"
//                   transform="rotate(-121 142.6 -47) scale(25.5827)"
//                   xlinkHref="#a"
//                 />
//                 <use
//                   width="30"
//                   height="20"
//                   transform="rotate(-98.1 198 -82) scale(25.6)"
//                   xlinkHref="#a"
//                 />
//                 <use
//                   width="30"
//                   height="20"
//                   transform="rotate(-74 272.4 -114) scale(25.6137)"
//                   xlinkHref="#a"
//                 />
//                 <use
//                   width="30"
//                   height="20"
//                   transform="matrix(16 -19.968 19.968 16 256 230.4)"
//                   xlinkHref="#a"
//                 />
//               </svg>
//               <span className="whitespace-nowrap">中文 (繁體)</span>
//             </div>
//           </a>
//         </li>
//       </ul>
//     </Dropdown>
//   );
// };

export default ExampleSidebar;
