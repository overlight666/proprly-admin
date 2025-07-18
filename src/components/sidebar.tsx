/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Dropdown, Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiAdjustments,
  HiCog,
  HiSearch,
  HiChevronDown,
  HiChevronRight,
} from "react-icons/hi";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import { EarthIcon, GroupIcon, PlusIcon, SettingsIcon, TicketIcon } from "lucide-react";
import { useAppointments, useCountriesAction, useITPAction, useOrganization, useProject, useProperties, useReports, useUserActions } from "@/_recoil/actions";
import { usePersistor } from "@/helpers/persistor";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoadingAtom, projectsAtom, regionOptionsAtom, selectedOrgAtom, sidebarIndexAtom } from "@/_recoil/states";
import { useNavigate, useParams } from "react-router";
import { Project } from "@/lib/interface";
import { useCommonArea } from "@/_recoil/actions/commonArea.actions";
import { AppointmentIcon, BuildingIcon, CommonAreaIcon, ItpIcon } from "@/icons";
import {
  HomeIcon,
  GearIcon,
  ReportsIcon,
  UsersIcon,
} from "@/icons";

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState("");
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

  const persist = usePersistor();
  const isAdmin = persist.getValues("isAdmin");
  const selectedOrganization = useRecoilValue(selectedOrgAtom);

  const setIsLoading = useSetRecoilState(isLoadingAtom);
  const setRegionOptions = useSetRecoilState(regionOptionsAtom);
  const sidebarIndex = useRecoilValue(sidebarIndexAtom);
  const projects = useRecoilValue(projectsAtom);

  const isLoading = useRecoilValue(isLoadingAtom);

  const organizationAction = useOrganization();
  const countriesAction = useCountriesAction();
  const propertiesAction = useProperties();
  const commonAreaAction = useCommonArea();
  const projectsAction = useProject();
  const userAction = useUserActions();
  const appointmentAction = useAppointments();
  const reportAction = useReports();
  const itpActions = useITPAction();
  const navigate = useNavigate();

  const { id, project_id, property_id } = params;

  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);

  useEffect(() => {
    const newPage = window.location.pathname;
    if (newPage === "/") {
      setIsLoading(true);
      Promise.all([organizationAction.getOrganizations()]).then(() => {
        setIsLoading(false);
      });
    }
  }, [])

  useEffect(() => {
    setIsLoading(true);
    let promise2;
    let promise3;
    let promise4;

    const promise1 = Promise.all([
      userAction.getAllNotifications(),
      countriesAction.getSystemRegions(),
      countriesAction.getRegions(),
      userAction.getConfig(),
      userAction.getAllRegions(),
      userAction.getSupportTikets(),
      itpActions.getItpOptions(),
      itpActions.getAllTradeCode()
    ]).then((values) => {
      const countryHandler = values[0]?.map((r: any) => {
        return {
          value: r.id,
          label: r.regionName,
        };
      });
      setRegionOptions(countryHandler);
    });

    if (id) {
      promise2 = Promise.all([
        organizationAction.getBuilders(id),
        organizationAction.getSelectedOrganization(id),
        organizationAction.getDashboardStats(id),
        projectsAction.getProjectsByOrg(id),
        organizationAction.getOrgPropertyOwners(id),
        commonAreaAction.getProjectStrata(id),
        commonAreaAction.getProjectAuditor(id),
        commonAreaAction.getProjectSalesAgent(id),
        userAction.getProjectAdminUsers(id),
        commonAreaAction.getProjectSubContractor(id),
        userAction.getAllUsers(id),
        isAdmin && organizationAction.getOrganizationSettings(Number(id)),
      ]).then((values) => {
        const countryHandler = values[0]?.map((r: any) => {
          return {
            value: r.id,
            label: r.regionName,
          };
        });
        setRegionOptions(countryHandler);
      });
    }
    if (project_id) {
      promise3 = Promise.all([
        projectsAction.getSelectedProject(project_id),
        projectsAction.getDashboardProjectStats(id, project_id),
        projectsAction.getTimeline(project_id),
        propertiesAction.getPropertiesByProject(project_id),
        commonAreaAction.getCommonArea(project_id),
        commonAreaAction.getCommonAreaChecklist(project_id),
        appointmentAction.getTradeCodeByProject(project_id),
        appointmentAction.getAppointments(project_id),
        reportAction.getProjectCommonAreaReports(project_id),
        reportAction.getProjectPropertyReports(project_id),
        itpActions.getITPLocations(project_id)
      ])
    }
    if (property_id) {
      promise4 = Promise.all([
        propertiesAction.getProperty(property_id)
      ])
    }
    Promise.all([
      promise1,
      promise2,
      promise3,
      promise4
    ]).then(() => {
      setIsLoading(false);
    })
  }, [id, project_id, property_id])

  const currentProject = projects?.find((project) => project?.id == project_id);

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        className={`${sidebarIndex} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
        collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex h-full flex-col justify-between py-4">
          <div>
            {/* Organization Dropdown */}
            <div className="px-4 mb-4">
              <div className="relative">
                <select className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none">
                  <option>{selectedOrganization?.name || "ABA Group"}</option>
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <Sidebar.Items>
              {/* Projects Section */}
              <div className="px-4 mb-2">
                <button
                  onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                  className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    {isProjectsExpanded ? (
                      <HiChevronDown className="w-4 h-4" />
                    ) : (
                      <HiChevronRight className="w-4 h-4" />
                    )}
                    <span>Projects</span>
                  </div>
                </button>
              </div>

              {isProjectsExpanded && (
                <div className="ml-6 mb-4">
                  {/* Current Project */}
                  {currentProject && (
                    <div className="mb-2">
                      <div className="text-sm font-medium text-gray-900 dark:text-white px-3 py-1">
                        {currentProject.name}
                      </div>

                      {/* Project Menu Items */}
                      <div className="ml-3 space-y-1">
                        <Sidebar.Item
                          href={`/organization/${id}/project/view/${project_id}`}
                          icon={HomeIcon}
                          className={
                            currentPage === `/organization/${id}/project/view/${project_id}` 
                              ? "bg-gray-100 dark:bg-gray-700 text-blue-600" 
                              : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        >
                          Dashboard
                        </Sidebar.Item>

                        <Sidebar.Item
                          href={`/organization/${id}/project/${project_id}/defects`}
                          className={
                            currentPage.includes("/defects") 
                              ? "bg-gray-100 dark:bg-gray-700 text-blue-600" 
                              : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        >
                          Defects
                        </Sidebar.Item>

                        <Sidebar.Item
                          href={`/organization/${id}/project/${project_id}/inspection-test-plans`}
                          className={
                            currentPage.includes("/inspection-test-plans") 
                              ? "bg-gray-100 dark:bg-gray-700 text-blue-600" 
                              : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        >
                          Inspection Test Plans
                        </Sidebar.Item>

                        <Sidebar.Item
                          href={`/organization/${id}/project/${project_id}/calendar`}
                          className={
                            currentPage.includes("/calendar") 
                              ? "bg-gray-100 dark:bg-gray-700 text-blue-600" 
                              : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        >
                          Calendar
                        </Sidebar.Item>

                        <Sidebar.Item
                          href={`/organization/${id}/project/${project_id}/reports`}
                          icon={ReportsIcon}
                          className={
                            currentPage.includes("/reports") 
                              ? "bg-gray-100 dark:bg-gray-700 text-blue-600" 
                              : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        >
                          Reports
                        </Sidebar.Item>

                        <Sidebar.Item
                          href={`/organization/${id}/project/${project_id}/configure`}
                          icon={GearIcon}
                          className={
                            currentPage.includes("/configure") 
                              ? "bg-purple-600 text-white font-medium" 
                              : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        >
                          Configure Project
                        </Sidebar.Item>
                      </div>
                    </div>
                  )}

                  {/* All Projects Link */}
                  <Sidebar.Item
                    href="/projects/all"
                    className={
                      currentPage === "/projects/all" 
                        ? "bg-gray-100 dark:bg-gray-700 text-blue-600" 
                        : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  >
                    All Projects
                  </Sidebar.Item>
                </div>
              )}

              {/* Admin Section */}
              {isAdmin && (
                <Sidebar.ItemGroup>
                  <div className="px-4 mb-2 mt-6">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Administration
                    </span>
                  </div>

                  <Sidebar.Item
                    href="/signup-leads"
                    icon={GroupIcon}
                    className={
                      "/signup-leads" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  >
                    Sign-up Leads
                  </Sidebar.Item>

                  <Sidebar.Item
                    href="/master-configuration"
                    icon={SettingsIcon}
                    className={
                      "/master-configuration" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  >
                    Master Configuration
                  </Sidebar.Item>

                  <Sidebar.Item
                    href="/support-tickets"
                    icon={TicketIcon}
                    className={
                      "/support-tickets" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  >
                    Support Tickets
                  </Sidebar.Item>

                  <Sidebar.Item
                    href="/region-management"
                    icon={EarthIcon}
                    className={
                      "/region-management" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  >
                    Region Management
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              )}
            </Sidebar.Items>
          </div>
          <BottomMenu />
        </div>
      </Sidebar>
    </div>
  );
};

const BottomMenu: FC = function () {
  return (
    <div className="flex items-center justify-center gap-x-5 px-4">
      <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="sr-only">Tweaks</span>
        <HiAdjustments className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
      </button>
      <div>
        <div className="hidden lg:block">
          <BottomBarSettingDropdown />
        </div>
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
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
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
                    d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L65 14.5l1 2.7-2.4-1.7-2.4 1.7.9-2.7-2.4-1.7h2.9zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                    transform="scale(3.9385)"
                  />
                </g>
              </svg>
              <span className="whitespace-nowrap">English (US)</span>
            </div>
          </a>
        </li>
      </ul>
    </Dropdown>
  );
};

const BottomBarSettingDropdown: FC = function () {
  const { id } = useParams();
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">Settings page</span>
          <HiCog className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </span>
      }
    >
      {id ? (
        <Dropdown.Item href={`/organization-settings/${id}`}>
          Organization Settings
        </Dropdown.Item>
      ) : (
        ""
      )}
      <Dropdown.Item href={`/`}>New Settings</Dropdown.Item>
      <Dropdown.Divider />
    </Dropdown>
  );
};

export default ExampleSidebar;