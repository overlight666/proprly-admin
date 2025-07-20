/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiAdjustments,
  HiCog,
  HiSearch,
  HiFolderOpen,
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
      className={classNames("w-44 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700", {
        hidden: !isSidebarOpenOnSmallScreens && isSmallScreen(),
      })}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            {/* Projects Button - Active State */}
            <div className="mb-4">
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-800 rounded-lg hover:bg-purple-700 transition-colors">
                <HiFolderOpen className="w-4 h-4 mr-3" />
                Projects
              </button>
            </div>

            {/* Admin Menu Items */}
            {isAdmin && (
              <div className="space-y-1 mb-4">
                <button
                  onClick={() => navigate("/signup-leads")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    "/signup-leads" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <GroupIcon className="w-4 h-4 mr-3" />
                  Sign-up Leads
                </button>
                <button
                  onClick={() => navigate("/master-configuration")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    "/master-configuration" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <SettingsIcon className="w-4 h-4 mr-3" />
                  Master Configuration
                </button>
                <button
                  onClick={() => navigate("/support-tickets")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    "/support-tickets" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <TicketIcon className="w-4 h-4 mr-3" />
                  Support Tickets
                </button>
                <button
                  onClick={() => navigate("/region-management")}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    "/region-management" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <EarthIcon className="w-4 h-4 mr-3" />
                  Region Management
                </button>
              </div>
            )}

            {/* Organization/Project Context Menu */}
            {(currentPage.includes("/organization/view") ||
              currentPage.includes("/project/new") ||
              currentPage.includes("/project/edit") ||
              currentPage.includes("/project/view") ||
              currentPage.includes("/property/new") ||
              currentPage.includes("/property/view") ||
              currentPage.includes("/common-area/view") ||
              currentPage.includes("/appointments/view") ||
              currentPage.includes("/itp/view")) && (
              <div className="space-y-3">
                {!isLoading && selectedOrganization && (
                  <button
                    onClick={() => navigate(`/organization/view/${selectedOrganization?.id}`)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage.includes("/organization/view")
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="w-6 h-6 mr-3 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                      {selectedOrganization?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{selectedOrganization?.name}</span>
                  </button>
                )}

                {project_id && !isLoading && (
                  <div className="ml-4 space-y-1">
                    <Select
                      className="my-react-select-container mb-3"
                      classNamePrefix="my-react-select"
                      defaultValue={{
                        label: projects?.find((project) => project?.id == project_id)?.name,
                        value: projects?.find((project) => project?.id == project_id)?.id,
                      }}
                      isSearchable
                      onChange={(selected: any) => {
                        navigate(`/organization/${id}/project/view/${selected.value}`)
                      }}
                      options={projects?.map((project: Project) => {
                        return {
                          label: project.name,
                          value: project.id
                        }
                      }) as any || []}
                      placeholder="Select Project"
                    />

                    <button
                      onClick={() => navigate(`/organization/${id}/project/${project_id}/property/view`)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage.includes("/property/view")
                          ? "bg-blue-100 dark:bg-gray-900 text-blue-900 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <BuildingIcon className="w-4 h-4 mr-3" />
                      Properties
                    </button>
                    <button
                      onClick={() => navigate(`/organization/${id}/project/${project_id}/common-area/view`)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage.includes("/common-area/view")
                          ? "bg-blue-100 dark:bg-gray-900 text-blue-900 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <CommonAreaIcon className="w-4 h-4 mr-3" />
                      Common Areas
                    </button>
                    <button
                      onClick={() => navigate(`/organization/${id}/project/${project_id}/itp/view`)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage.includes("/itp/view")
                          ? "bg-blue-100 dark:bg-gray-900 text-blue-900 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <ItpIcon className="w-4 h-4 mr-3" />
                      ITPs
                    </button>
                    <button
                      onClick={() => navigate(`/organization/${id}/project/${project_id}/appointments/view`)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage.includes("/appointments/view")
                          ? "bg-blue-100 dark:bg-gray-900 text-blue-900 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <AppointmentIcon className="w-4 h-4 mr-3" />
                      Appointments
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Default Organizations Link */}
            {!currentPage.includes("/organization/view") &&
             !currentPage.includes("/project/") &&
             !currentPage.includes("/property/") &&
             !currentPage.includes("/common-area/") &&
             !currentPage.includes("/appointments/") &&
             !currentPage.includes("/itp/") && (
              <button
                onClick={() => navigate("/")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  "/" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <PlusIcon className="w-4 h-4 mr-3" />
                Organizations
              </button>
            )}
          </div>
        </div>

        {/* Bottom Settings */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <HiAdjustments className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <HiCog className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleSidebar;