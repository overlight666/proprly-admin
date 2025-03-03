/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  AlertIcon,
  BoltIcon,
  BugIcon,
  BuildingIcon,
  CalenderIcon,
  FileIcon,
  FolderIcon,
  GridIcon,
  GroupIcon,
  PencilIcon,
  TaskIcon,
} from "../../icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedOrgAtom } from "../../_state/atoms/organizations";
import { useNavigate, useParams } from "react-router";
import TimeLine from "./components/Timeline";
import Defects from "./components/Defects";
import DefectsChart from "./components/DefectChart";
import { useModal } from "../../hooks/useModal";
import DefectResolutionModal from "../../_components/DefectResolutionModal";
import PropertyTable from "./components/PropertyTable";
import {
  activeTabIndexProjectAtom,
  bulkResponseAtom,
  projectDashboardAtom,
  propertiesAtom,
  selectedProjectAtom,
} from "../../_state";
import PropertyHeader from "./components/PropertyHeader";
import { useProperties } from "../../_actions";
import BulkImportComponent from "./components/BulkImportComponent";
import CommonArea from "../CommonAreas/CommonArea";
import DefectResolution from "../DefectResolution/DefectResolution";
import { Reports } from "../Reports/Reports";

import { Users } from "../users/Users";
import Appointments from "../Appointments";
import React from "react";

export default function SelectedProject() {
  const { id, project_id }: any = useParams();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const selectedOrganization = useRecoilValue(selectedOrgAtom);
  const dashboardData = useRecoilValue(projectDashboardAtom);
  const activeTabIndex = useRecoilValue(activeTabIndexProjectAtom);
  const properties = useRecoilValue(propertiesAtom);
  const setActiveTabIndex = useSetRecoilState(activeTabIndexProjectAtom);
  const bulkResponse = useRecoilValue(bulkResponseAtom);
  const propertyAction = useProperties();
  const setBulkResponse = useSetRecoilState(bulkResponseAtom);
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const tableRef = useRef<any>(null);
  const [canUpload, setCanUpload] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const [showBulk, setShowBulk] = useState(false);
  const [propertyUploadQueue, setPropertyUploadQueue] = useState<any>([]);

  useEffect(() => {
    if (selected && selected.length > 1) {
      setCanUpload(true);
    } else {
      setCanUpload(false);
    }
  }, [selected]);

  useEffect(() => {
    if (!bulkResponse) {
      setActiveTabIndex(0);
    }
  }, [project_id]);

  useEffect(() => {
    if (selectedProject || bulkResponse) {
      propertyAction.getPropertiesByProject(selectedProject?.id);
      setTimeout(() => {
        setBulkResponse(undefined);
      }, 100);
    }
  }, [selectedProject, bulkResponse]);

  const tabsData = [
    {
      label: "Dashboard",
      icon: <GridIcon />,
    },
    {
      label: "Properties",
      icon: <FolderIcon />,
    },
    {
      label: "Common Areas",
      icon: <GridIcon />,
    },
    {
      label: "Defect Resolution",
      icon: <TaskIcon />,
    },
    {
      label: "Appointments",
      icon: <CalenderIcon />,
    },
    {
      label: "Users",
      icon: <GroupIcon />,
    },
    {
      label: "Reports",
      icon: <FileIcon />,
    },
  ];

  const getTotal = () => {
    const count1 =
      dashboardData &&
      dashboardData?.defectsByProperty &&
      dashboardData?.defectsByProperty.in_progress
        ? dashboardData?.defectsByProperty.in_progress
        : 0;
    const count2 =
      dashboardData &&
      dashboardData?.defectsByCommonArea &&
      dashboardData?.defectsByCommonArea.in_progress
        ? dashboardData?.defectsByCommonArea.in_progress
        : 0;
    return count1 + count2;
  };

  const onSearch = (value: any) => {
    // tableRef.current?.dt()?.search(value).draw();
    tableRef.current.dt().search(value).draw();
  };

  const bulkUploadHandler = (value: boolean) => {
    if (value) {
      const propertyQueue =
        selected &&
        selected?.map((id: any) => {
          return properties.find((pr) => pr.id == id);
        });
      setPropertyUploadQueue(propertyQueue);
      setShowBulk(true);
    }
  };

  return (
    <div>
      <DefectResolutionModal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb
        pageTitle={selectedProject?.name}
        subPath={[
          {
            title: selectedOrganization && selectedOrganization?.name,
            path: `/organization/${selectedOrganization?.id}`,
          },
        ]}
        canEdit={true}
        editComponent={
          <div
            className="text-black dark:text-white cursor-pointer z-99999"
            onClick={() =>
              navigate(`/organization/${id}/project/${project_id}/edit`)
            }
          >
            <PencilIcon
              className="size-5"
              data-tooltip-id="tooltip"
              data-tooltip-content="Edit"
              data-tooltip-place="bottom"
            />
          </div>
        }
      />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <div className="flex w-full dark:text-white text-black border-b-[0.1px] border-gray-200 justify-evenly">
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
                    <BugIcon className="text-gray-800 size-6 dark:text-white/90" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Defects In-Progress
                    </span>
                  </div>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {getTotal()}
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
        ) : tabsData[activeTabIndex].label === "Properties" ? (
          (!showBulk && (
            <>
              <PropertyHeader
                onSearch={onSearch}
                canUpload={canUpload}
                setShowBulk={bulkUploadHandler}
              />
              <PropertyTable
                tableRef={tableRef}
                setSelected={setSelected}
                selected={selected}
              />
            </>
          )) || (
            <>
              <BulkImportComponent
                selected={propertyUploadQueue}
                setShowBulk={setShowBulk}
                clear={setSelected}
              />
            </>
          )
        ) : tabsData[activeTabIndex].label === "Common Areas" ? (
          <CommonArea />
        ) : tabsData[activeTabIndex].label === "Defect Resolution" ? (
          <div className="flex flex-row gap-4 mx-5">
            <DefectResolution />
          </div>
        ) : tabsData[activeTabIndex].label === "Appointments" ? (
          <>
            <Appointments />
          </>
        ) : tabsData[activeTabIndex].label === "Users" ? (
          <>
            <Users />
          </>
        ) : (
          <Reports />
        )}
      </div>
    </div>
  );
}
