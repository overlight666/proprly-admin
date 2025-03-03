/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  AlertIcon,
  BoltIcon,
  BuildingIcon,
  FolderIcon,
  GridIcon,
} from "../../icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  organizationDashboardAtom,
  selectedOrgAtom,
} from "../../_state/atoms/organizations";
import { useParams } from "react-router";
import TimeLine from "./components/Timeline";
import Defects from "./components/Defects";
import DefectsChart from "./components/DefectChart";
import { useModal } from "../../hooks/useModal";
import DefectResolutionModal from "../../_components/DefectResolutionModal";
import ProjectTable from "./components/ProjectTable";
import ProjectTableHeader from "./components/ProjectHeader";
import { selectedProjectAtom } from "../../_state";
import React from "react";

export default function SelectedOrganization() {
  const { id }: any = useParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const selectedOrganization = useRecoilValue(selectedOrgAtom);
  const dashboardData = useRecoilValue(organizationDashboardAtom);
  const { isOpen, openModal, closeModal } = useModal();
  const setSelectedProject = useSetRecoilState(selectedProjectAtom);
  const tableRef = useRef<any>(null);

  const onSearch = (value: any) => {
    // tableRef.current?.dt()?.search(value).draw();
    tableRef.current.dt().search(value).draw();
  };

  useEffect(() => {
    setSelectedProject(undefined);
  }, [id]);

  const tabsData = [
    {
      label: "Dashboard",
      icon: <GridIcon />,
    },
    {
      label: "Projects",
      icon: <FolderIcon />,
    },
  ];
  return (
    <div>
      <DefectResolutionModal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb pageTitle={selectedOrganization?.name} />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <div className="flex dark:text-white text-black border-b-[0.1px] border-gray-200">
          {/* Loop through tab data and render button for each. */}
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={`transition-colors duration-300 ${
                  idx === activeTabIndex
                    ? "bg-blue-100 px-6 py-4 text-blue-600"
                    : "border-transparent hover:border-gray-200 px-6 py-4"
                }`}
                // Change the active tab on click.
                onClick={() => setActiveTabIndex(idx)}
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  {tab.icon}
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>
        {tabsData[activeTabIndex].label === "Dashboard" ? (
          <div className="flex flex-col gap-5 px-5 mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6 mt-3 ">
              {/* <!-- Metric Item Start --> */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex flex-col items-center justify-center mt-5">
                  <div className="flex flex-row gap-5">
                    <AlertIcon className="text-gray-800 size-6 dark:text-white/90" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Alerts - Needs Attention
                    </span>
                  </div>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {dashboardData?.needAttention}
                  </h4>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex flex-col items-center justify-center mt-5">
                  <div className="flex flex-row gap-5">
                    <FolderIcon className="text-gray-800 size-6 dark:!text-white/90" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total Projects
                    </span>
                  </div>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {dashboardData?.totalProjects}
                  </h4>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex flex-col items-center justify-center mt-5">
                  <div className="flex flex-row gap-5">
                    <BuildingIcon className="text-gray-800 size-6 dark:!text-white/90" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total Properties
                    </span>
                  </div>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {dashboardData?.totalProperties}
                  </h4>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex flex-col items-center justify-center mt-5">
                  <div className="flex flex-row gap-5">
                    <BoltIcon className="text-gray-800 size-6 dark:text-white/90" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total Open Defects
                    </span>
                  </div>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {dashboardData?.totalOpenDefects}
                  </h4>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 space-y-6 xl:col-span-7">
                <TimeLine openModal={openModal} />
              </div>
              <div className="col-span-12 xl:col-span-5">
                <Defects />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 space-y-6 xl:col-span-6">
                <DefectsChart
                  title={"Property Defects by Trade"}
                  keyId="pdt"
                  data={
                    dashboardData &&
                    dashboardData?.propertyDefectsByStatusAndTrade
                  }
                  totalTitle="Total Property Defects"
                  totalValue={
                    dashboardData &&
                    dashboardData.defectsByProperty &&
                    dashboardData.defectsByProperty.total
                  }
                />
              </div>
              <div className="col-span-12 xl:col-span-6">
                <DefectsChart
                  title={"Common Area Defects by Trade"}
                  keyId="cadt"
                  data={
                    dashboardData &&
                    dashboardData?.commonAreaDefectsByStatusAndTrade
                  }
                  totalTitle="Total Common Area Defects"
                  totalValue={
                    dashboardData &&
                    dashboardData.defectsByCommonArea &&
                    dashboardData.defectsByCommonArea.total
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <ProjectTableHeader onSearch={onSearch} />
            <div className="px-5 py-2">
              <ProjectTable tableRef={tableRef} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
