/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useRecoilValue } from "recoil";

import React from "react";
import { projectDashboardAtom } from "../../../../_state";
import { AlertIcon } from "../../../../icons";
import Radio from "../../../../components/form/input/Radio";

export default function Defects() {
  const [selectedValue, setSelectedValue] = useState("all");
  const projectDashboard = useRecoilValue(projectDashboardAtom);

  const getPercent = (current: any, total: any) => {
    const percentage = (current * 100) / total;
    return `${percentage}%`;
  };

  return (
    <div className=" rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-start justify-between flex-col">
        <div className="flex flex-row gap-2 items-center text-black dark:text-white">
          <AlertIcon className="size-5" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Defects
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3 flex-row w-full mt-2">
          <Radio
            id="defects3"
            name="defects"
            value="all"
            checked={selectedValue === "all"}
            onChange={(e) => setSelectedValue(e)}
            label="All"
          />
          <Radio
            id="defects2"
            name="defects"
            value="properties"
            checked={selectedValue === "properties"}
            onChange={(e) => setSelectedValue(e)}
            label="Properties"
          />
          <Radio
            id="defects1"
            name="defects"
            value="common_area"
            checked={selectedValue === "common_area"}
            onChange={(e) => setSelectedValue(e)}
            label="Common Areas"
          />
        </div>
        <div className="relative inline-block mt-2 overflow-auto max-h-[400px] w-full gap-6 flex flex-col">
          <div className="flex flex-row items-center gap-5">
            <span className="dark:text-gray-400 text-black text-sm  w-[30%]">
              Pending
            </span>
            <div className="flex flex-col items-center justify-center w-full">
              {(selectedValue == "all" || selectedValue == "properties") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      className={`absolute left-0 top-0 flex h-full items-center justify-center rounded bg-brand-500 text-xs font-medium text-white`}
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard.defectsByProperty &&
                            projectDashboard.defectsByProperty.pending,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByProperty &&
                      projectDashboard?.defectsByProperty.pending}
                  </p>
                </div>
              )}
              {(selectedValue == "all" || selectedValue == "common_area") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full  rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard?.defectsByCommonArea &&
                            projectDashboard?.defectsByCommonArea.pending,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                      className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-orange-500 text-xs font-medium text-white"
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByCommonArea &&
                      projectDashboard?.defectsByCommonArea.pending}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-5">
            <span className="dark:text-gray-400 text-black text-sm w-[30%]">
              In Progress
            </span>
            <div className="flex flex-col items-center justify-center w-full">
              {(selectedValue == "all" || selectedValue == "properties") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard?.defectsByProperty &&
                            projectDashboard?.defectsByProperty.in_progress,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                      className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-brand-500 text-xs font-medium text-white"
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByProperty &&
                      projectDashboard?.defectsByProperty.in_progress}
                  </p>
                </div>
              )}
              {(selectedValue == "all" || selectedValue == "common_area") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full  rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard?.defectsByCommonArea &&
                            projectDashboard?.defectsByCommonArea.in_progress,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                      className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-orange-500 text-xs font-medium text-white"
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByCommonArea &&
                      projectDashboard?.defectsByCommonArea.in_progress}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-5">
            <span className="dark:text-gray-400 text-black text-sm  w-[30%]">
              Resolved
            </span>
            <div className="flex flex-col items-center justify-center w-full">
              {(selectedValue == "all" || selectedValue == "properties") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard?.defectsByProperty &&
                            projectDashboard?.defectsByProperty.resolved,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                      className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-brand-500 text-xs font-medium text-white"
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByProperty &&
                      projectDashboard?.defectsByProperty.resolved}
                  </p>
                </div>
              )}
              {(selectedValue == "all" || selectedValue == "common_area") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full  rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard?.defectsByCommonArea &&
                            projectDashboard?.defectsByCommonArea.resolved,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                      className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-orange-500 text-xs font-medium text-white"
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByCommonArea &&
                      projectDashboard?.defectsByCommonArea.resolved}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-5">
            <span className="dark:text-gray-400 text-black text-sm  w-[30%]">
              Disputed
            </span>
            <div className="flex flex-col items-center justify-center w-full">
              {(selectedValue == "all" || selectedValue == "properties") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard?.defectsByProperty &&
                            projectDashboard?.defectsByProperty.disputed,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                      className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-brand-500 text-xs font-medium text-white"
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByProperty &&
                      projectDashboard?.defectsByProperty.disputed}
                  </p>
                </div>
              )}
              {(selectedValue == "all" || selectedValue == "common_area") && (
                <div className="flex w-full items-center gap-3">
                  <div className="relative block h-2 w-full  rounded bg-gray-200 dark:bg-gray-600">
                    <div
                      style={{
                        width: getPercent(
                          projectDashboard &&
                            projectDashboard?.defectsByCommonArea &&
                            projectDashboard?.defectsByCommonArea.disputed,
                          projectDashboard &&
                            projectDashboard.totalDefects &&
                            projectDashboard.totalDefects.total
                        ),
                      }}
                      className="absolute left-0 top-0 flex h-full items-center justify-center rounded bg-orange-500 text-xs font-medium text-white"
                    ></div>
                  </div>
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {projectDashboard &&
                      projectDashboard?.defectsByCommonArea &&
                      projectDashboard?.defectsByCommonArea.disputed}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center p-3 text-black dark:text-white">
            <span>
              Total Defects:{" "}
              <span className="text-blue-300 text-lg ml-3">
                {projectDashboard &&
                  projectDashboard.totalDefects &&
                  projectDashboard.totalDefects.total}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
