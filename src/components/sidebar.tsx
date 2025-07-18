/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Dropdown, Sidebar, TextInput, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiAdjustments,
  HiCog,
  HiSearch,
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
import Select from 'react-select';

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState("");

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

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        className={`${sidebarIndex}`}
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
                {(currentPage.includes("/organization/view")
                  || currentPage.includes("/project/new")
                  || currentPage.includes("/project/edit")
                  || currentPage.includes("/project/view")
                  || currentPage.includes("/property/new")) ?
                  !isLoading && <Sidebar.Item
                    href={`/organization/view/${selectedOrganization?.id}`}
                    label={`${selectedOrganization?.name?.charAt(0).toUpperCase()}${selectedOrganization?.name?.charAt(1).toUpperCase()}`}
                    className={
                      (currentPage.includes("/organization/view") || currentPage.includes("/project/new") || currentPage.includes("/project/edit")) ? "bg-gray-100 dark:bg-gray-700 reverse-label" : "reverse-label"
                    }
                  >
                    {selectedOrganization?.name}

                  </Sidebar.Item> || <Sidebar.Item
                    href="/"
                    className={
                      "/" === currentPage ? "bg-gray-100 dark:bg-gray-700 reverse-label" : "reverse-label"
                    }
                  >
                    Loading...
                  </Sidebar.Item>
                  :

                  <Sidebar.Item
                    href="/"
                    icon={PlusIcon}
                    className={
                      "/" === currentPage ? "bg-gray-100 dark:bg-gray-700 reverse-label" : "reverse-label"
                    }
                  >
                    Organizations
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/projects/all"
                    icon={BuildingIcon}
                    className={
                      "/projects/all" === currentPage ? "bg-gray-100 dark:bg-gray-700 reverse-label" : "reverse-label"
                    }
                  >
                    All Projects
                  </Sidebar.Item>}
              </Sidebar.ItemGroup>
              {
                isAdmin && <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="/signup-leads"
                    icon={GroupIcon}
                    className={
                      "/signup-leads" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Sign-up Leads
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/master-configuration"
                    icon={SettingsIcon}
                    className={
                      "/master-configuration" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Master Configuration
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/support-tickets"
                    icon={TicketIcon}
                    className={
                      "/support-tickets" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Support Tickets
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/region-management"
                    icon={EarthIcon}
                    className={
                      "/region-management" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Region Management
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              }
              {(currentPage.includes("/organization/view")
                || currentPage.includes("/project/new")
                || currentPage.includes("/project/edit")
                || currentPage.includes("/project/view")
                || currentPage.includes("/property/new")
                || currentPage.includes("/property/view")
                || currentPage.includes("/common-area/view")
                || currentPage.includes("/appointments/view")
                || currentPage.includes("/itp/view")) && <Sidebar.ItemGroup>
                  {!isLoading &&
                    <Select className="my-react-select-container"
                      classNamePrefix="my-react-select"
                      defaultValue={{
                        label: projects?.find((project) => project?.id == project_id)?.name,
                        value: projects?.find((project) => project?.id == project_id)?.id,
                      }}
                      isSearchable onChange={(selected: any) => {
                        navigate(`/organization/${id}/project/view/${selected.value}`)
                      }} options={projects?.map((project: Project) => {
                        return {
                          label: project.name,
                          value: project.id
                        }
                      }) as any || []}
                      placeholder="Select Project"
                    /> || <Sidebar.Item
                      href="/"
                      className={
                        "/" === currentPage ? "bg-gray-100 dark:bg-gray-700 reverse-label" : "reverse-label"
                      }
                    >
                      Loading...
                    </Sidebar.Item>}
                  {
                    project_id && <div>
                      <Sidebar.Item href={`/organization/${id}/project/${project_id}/property/view`} icon={BuildingIcon} className={currentPage.includes("/property/view") && "bg-blue-100 dark:bg-gray-900"}>
                        Properties
                      </Sidebar.Item>
                      <Sidebar.Item href={`/organization/${id}/project/${project_id}/common-area/view`} icon={CommonAreaIcon} className={currentPage.includes("/common-area/view") && "bg-blue-100 dark:bg-gray-900"}>
                        Common Areas
                      </Sidebar.Item>
                      <Sidebar.Item href={`/organization/${id}/project/${project_id}/itp/view`} icon={ItpIcon} className={currentPage.includes("/itp/view") && "bg-blue-100 dark:bg-gray-900"}>
                        ITPs
                      </Sidebar.Item>
                      <Sidebar.Item href={`/organization/${id}/project/${project_id}/appointments/view`} icon={AppointmentIcon} className={currentPage.includes("/appointments/view") && "bg-blue-100 dark:bg-gray-900"}>
                        Appointments
                      </Sidebar.Item>
                    </div>
                  }
                </Sidebar.ItemGroup>}
              {/* <Sidebar.ItemGroup>
                {(currentPage.includes("/organization/view")
                  || currentPage.includes("/project/new")
                  || currentPage.includes("/project/view")
                  || currentPage.includes("/property/new")
                  || currentPage.includes("/property/view")
                  || currentPage.includes("/common-area/view")
                  || currentPage.includes("/appointments/view")
                  || currentPage.includes("/itp/view")) && projects?.map((project: Project, index: any) => {
                    return (
                      project?.id == project_id ? <Sidebar.Collapse icon={FolderOpenIcon}
                        label={truncateMenuString(project?.name, 15)}
                        key={index} open={true}
                        data-tooltip-id="tooltip"
                        data-tooltip-content={project?.name}
                        className="bg-gray-200 dark:bg-gray-700">
                        <Sidebar.Item href={`/organization/${id}/project/${project_id}/property/view`} icon={BuildingIcon} className={currentPage.includes("/property/view") && "bg-blue-100 dark:bg-gray-900"}>
                          Properties
                        </Sidebar.Item>
                        <Sidebar.Item href={`/organization/${id}/project/${project_id}/common-area/view`} icon={CommonAreaIcon} className={currentPage.includes("/common-area/view") && "bg-blue-100 dark:bg-gray-900"}>
                          Common Areas
                        </Sidebar.Item>
                        <Sidebar.Item href={`/organization/${id}/project/${project_id}/itp/view`} icon={ItpIcon} className={currentPage.includes("/itp/view") && "bg-blue-100 dark:bg-gray-900"}>
                          ITPs
                        </Sidebar.Item>
                        <Sidebar.Item href={`/organization/${id}/project/${project_id}/appointments/view`} icon={AppointmentIcon} className={currentPage.includes("/appointments/view") && "bg-blue-100 dark:bg-gray-900"}>
                          Appointments
                        </Sidebar.Item>

                      </Sidebar.Collapse> : <Sidebar.Item
                        key={index}
                        href={`/organization/${id}/project/view/${project?.id}`}
                        icon={FolderClosedIcon}
                        // label={`${project?.name?.charAt(0).toUpperCase()}${project?.name?.charAt(1).toUpperCase()}`}
                        className={
                          (currentPage.includes("/project/view") || currentPage.includes("/property/new")) && project?.id == project_id ? "bg-gray-100 dark:bg-gray-700" : ""
                        }
                        data-tooltip-id="tooltip"
                        data-tooltip-content={project?.name}
                      >
                        {truncateMenuString(project?.name, 15)}
                      </Sidebar.Item>
                    )
                  })

                }

              </Sidebar.ItemGroup> */}

              {/* <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="/dashboard"
                  icon={HiChartPie}
                  className={
                    "/organizations" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                  }

                >
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item
                  href="/kanban"
                  icon={HiViewGrid}
                  className={
                    "/kanban" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Kanban
                </Sidebar.Item>
                <Sidebar.Item
                  href="/mailing/inbox"
                  icon={HiInboxIn}
                  label="3"
                  className={
                    "/mailing/inbox" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Inbox
                </Sidebar.Item>
                <Sidebar.Collapse
                  icon={HiShoppingBag}
                  label="E-commerce"
                  open={isEcommerceOpen}
                >
                  <Sidebar.Item
                    href="/e-commerce/products"
                    className={
                      "/e-commerce/products" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Products
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/e-commerce/billing"
                    className={
                      "/e-commerce/billing" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Billing
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/e-commerce/invoice"
                    className={
                      "/e-commerce/invoice" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Invoice
                  </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse
                  icon={HiUsers}
                  label="Users"
                  open={isUsersOpen}
                >
                  <Sidebar.Item
                    href="/users/list"
                    className={
                      "/users/list" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Users list
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/users/profile"
                    className={
                      "/users/profile" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Profile
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/users/feed"
                    className={
                      "/users/feed" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Feed
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/users/settings"
                    className={
                      "/users/settings" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Settings
                  </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse icon={HiChartSquareBar} label="Pages">
                  <Sidebar.Item href="/pages/pricing">Pricing</Sidebar.Item>
                  <Sidebar.Item href="/pages/maintenance">
                    Maintenace
                  </Sidebar.Item>
                  <Sidebar.Item href="/pages/404">404 not found</Sidebar.Item>
                  <Sidebar.Item href="/pages/500">
                    500 server error
                  </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse icon={HiLockClosed} label="Authentication">
                  <Sidebar.Item href="/authentication/sign-in">
                    Sign in
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/sign-up">
                    Sign up
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/forgot-password">
                    Forgot password
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/reset-password">
                    Reset password
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/profile-lock">
                    Profile lock
                  </Sidebar.Item>
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="https://github.com/themesberg/flowbite-react/"
                  icon={HiClipboard}
                >
                  Docs
                </Sidebar.Item>
                <Sidebar.Item
                  href="https://flowbite-react.com/"
                  icon={HiCollection}
                >
                  Components
                </Sidebar.Item>
                <Sidebar.Item
                  href="https://github.com/themesberg/flowbite-react/issues"
                  icon={HiInformationCircle}
                >
                  Help
                </Sidebar.Item>
              </Sidebar.ItemGroup> */}

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
    <div className="flex items-center justify-center gap-x-5">
      <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="sr-only">Tweaks</span>
        <HiAdjustments className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
      </button>
      <div>
        <Tooltip content="Settings page">
          <div className="hidden lg:block">
            <BottomBarSettingDropdown />
          </div>
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
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
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
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
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
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
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
