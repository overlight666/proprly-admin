/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation, useParams } from "react-router";
import React from "react";
// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  FolderIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  PlusIcon,
  ShootingStarIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
// import SidebarWidget from "./SidebarWidget";
import { useOrganization } from "../_actions/organizations.actions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedOrgAtom } from "../_state/atoms/organizations";
import {
  useAppointments,
  useProperties,
  useReports,
  useUserActions,
} from "../_actions";
import { useProject } from "../_actions/projects.actions";
import {
  commonAreaWarrantyResponse,
  contactSupportAtom,
  projectResponseAtom,
  projectsAtom,
  selectedProjectAtom,
  warrantiesUpdateAtom,
} from "../_state";
import { useCommonArea } from "../_actions/commonArea.actions";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  id?: number;
};

const othersItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Home",
    path: "/home",
  },
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/dashboard", pro: false }],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const orgAction = useOrganization();
  const userAction = useUserActions();
  const [adminItems, setAdminItems] = useState<NavItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [orgItems, setOrgItems] = useState<NavItem[]>([]);
  const [projectItems, setProjectItems] = useState<NavItem[]>([]);
  const [showProjects, setShowProjects] = useState(false);
  const selectedOrganization = useRecoilValue(selectedOrgAtom);
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const projectResponse = useRecoilValue(projectResponseAtom);
  const warrantyUpdate = useRecoilValue(warrantiesUpdateAtom);
  const projects = useRecoilValue(projectsAtom);
  const setContactSupport = useSetRecoilState(contactSupportAtom);
  const contactSupportResponse = useRecoilValue(contactSupportAtom);

  const setWarrantyResponse = useSetRecoilState(warrantiesUpdateAtom);
  const setCommonAreaWarrantyResponse = useSetRecoilState(
    commonAreaWarrantyResponse
  );
  const commonAreaWarrantyResponseValue = useRecoilValue(
    commonAreaWarrantyResponse
  );
  const projectAction = useProject();
  const propertyAction = useProperties();
  const commonAreaAction = useCommonArea();
  const appointmentAction = useAppointments();
  const reportAction = useReports();
  const { id, project_id, property_id }: any = useParams();

  const currentRoute = [
    "/",
    "/contact-support",
    "/organization",
    "/organization/new",
    "/signup-leads",
    "signup-leads/view",
    "/master-configuration",
    "/support-tickets",
    "/region-management",
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
    return matchPath(pattern, location.pathname);
  });

  useEffect(() => {
    if (property_id) {
      propertyAction.getProperty(property_id);
    }
  }, [property_id]);

  useEffect(() => {
    if (id) {
      orgAction.getSelectedOrganization(id);
      orgAction.getDashboardStats(id);
      orgAction.getOrgPropertyOwners(id);
      commonAreaAction.getProjectStrata(id);
      commonAreaAction.getProjectAuditor(id);
      userAction.getProjectAdminUsers(id);
      commonAreaAction.getProjectSubContractor(id);
    }
  }, [id, project_id, projectResponse]);

  useEffect(() => {
    if (project_id) {
      projectAction.getSelectedProject(project_id);
      projectAction.getDashboardProjectStats(id, project_id);
      commonAreaAction.getCommonArea(project_id);
      commonAreaAction.getCommonAreaChecklist(project_id);
      appointmentAction.getTradeCodeByProject(project_id);

      appointmentAction.getAppointments(project_id);
      reportAction.getProjectCommonAreaReports(project_id);
      reportAction.getProjectPropertyReports(project_id);
    }
  }, [project_id]);

  useEffect(() => {
    if (commonAreaWarrantyResponseValue) {
      commonAreaAction.getCommonArea(project_id);
      setCommonAreaWarrantyResponse(undefined);
    }
  }, [commonAreaWarrantyResponseValue]);

  useEffect(() => {
    userAction.getConfig();
    userAction.getAllNotifications();
  }, []);

  useEffect(() => {
    if (warrantyUpdate) {
      propertyAction.getPropertiesByProject(project_id);
      setWarrantyResponse(undefined);
    }
  }, [warrantyUpdate]);

  useEffect(() => {
    if (
      currentRoute === "/" ||
      currentRoute === "/organization" ||
      currentRoute === "/organization/new" ||
      currentRoute === "/signup-leads" ||
      currentRoute === "signup-leads/view" ||
      currentRoute === "/master-configuration" ||
      currentRoute === "/support-tickets" ||
      currentRoute === "/region-management" ||
      currentRoute === "/contact-support" ||
      currentRoute === "/organization/:id/edit" ||
      currentRoute === "/organization/:id"
    ) {
      setShowProjects(false);
      const navItemsHolder: NavItem[] = [
        {
          icon: <PlusIcon />,
          name: "Organizations",
          path: "/",
        },
      ];
      setNavItems(navItemsHolder);
      if (id) {
        projectAction.getProjectsByOrg(id);
      }
    }
    if (selectedOrganization && id) {
      setShowProjects(true);
      setOrgItems([]);
      const navItemsHolder: NavItem[] = [
        {
          icon: <FolderIcon />,
          name: selectedOrganization.name,
          path: `/organization/${selectedOrganization.id}`,
          id: selectedOrganization.id,
        },
      ];
      setOrgItems(navItemsHolder.sort((a: any, b: any) => a.id - b.id));
      projectAction.getProjectsByOrg(id);
    } else {
      setOrgItems([]);
    }
  }, [currentRoute, selectedOrganization, id]);

  useEffect(() => {
    if (contactSupportResponse) {
      const boolString = localStorage.getItem("isAdmin");
      const isAdmins = boolString === "true";
      if (isAdmins) {
        userAction.getSupportTikets();
        setContactSupport("");
      }
    }
  }, [contactSupportResponse]);

  useEffect(() => {
    const boolString = localStorage.getItem("isAdmin");
    const isAdmins = boolString === "true";
    setIsAdmin(isAdmins);
    if (isAdmins) {
      userAction.getSupportTikets();
      const adminI = [
        {
          icon: <UserCircleIcon />,
          name: "Sign-up Leads",
          path: "/signup-leads",
        },
        {
          icon: <UserCircleIcon />,
          name: "Master Configuration",
          path: "/master-configuration",
        },
        {
          icon: <UserCircleIcon />,
          name: "Support Tickets",
          path: "/support-tickets",
        },
        {
          icon: <UserCircleIcon />,
          name: "Region Management",
          path: "/region-management",
        },
      ];
      setAdminItems(adminI);
    }
  }, []);

  useEffect(() => {
    if (projects) {
      setProjectItems([]);
      const projectNavHolder: any =
        projects &&
        projects.length > 0 &&
        projects.map((proj) => {
          return {
            icon: <ShootingStarIcon />,
            name: proj.name,
            path: `/organization/${id}/project/${proj.id}`,
            id: proj.id,
          };
        });
      if (projectNavHolder) {
        setProjectItems(
          projectNavHolder?.sort((a: any, b: any) => a.id - b.id)
        );
      }
    }
  }, [projects]);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others" | "admin menu" | "organization";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "others" | "admin menu" | "organization"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "others" | "admin menu" | "organization"
  ) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active items-center"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  !isExpanded && !isHovered && !isMobileOpen && "justify-center"
                } ${
                  isActive(nav.path)
                    ? "menu-item-active items-center"
                    : (!isActive(nav.path) &&
                        !selectedProject &&
                        selectedOrganization?.name == nav.name) ||
                      (selectedProject && selectedProject?.name == nav.name)
                    ? "menu-item-active items-center"
                    : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : (!isActive(nav.path) &&
                          !selectedProject &&
                          selectedOrganization?.name == nav.name) ||
                        (selectedProject && selectedProject?.name == nav.name)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {/* {nav.icon} */}
                  <div className="flex justify-center items-center p-2 !shadow-2xl dark:bg-blue-900 bg-gray-200 rounded-md">
                    {`${nav.name.charAt(0).toUpperCase()}${nav.name
                      .charAt(1)
                      .toUpperCase()}`}
                  </div>
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/proprly-dark.png"
                alt="Logo"
                width={100}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/proprly.png"
                alt="Logo"
                width={100}
                height={40}
              />
            </>
          ) : (
            <img src="/favicon.png" alt="Logo" width={24} height={24} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  ""
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            {(orgItems?.length && (
              <div className="">
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Organization"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(orgItems, "organization")}
              </div>
            )) || <></>}
            {showProjects && (
              <div className="">
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Projects"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(projectItems, "others")}
                {/* {renderMenuItems(othersItems, "others")} */}
              </div>
            )}
            {isAdmin && (
              <div className="">
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Admin Menu"
                  ) : (
                    <HorizontaLDots />
                  )}
                </h2>
                {renderMenuItems(adminItems, "admin menu")}
                {/* {renderMenuItems(othersItems, "others")} */}
              </div>
            )}
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
