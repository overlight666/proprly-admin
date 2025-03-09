import { useState } from "react";
import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { GearIcon, ListIcon } from "../../../icons";
import { MasterAccordion } from "./component/Accordion";

export default function MasterConfiguration() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabsData = [
    {
      label: "Regions",
      icon: <ListIcon />,
    },
    {
      label: "Organizations",
      icon: <GearIcon />,
    },
  ];
  return (
    <div>
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb pageTitle="Master Configuration" />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <div className="flex dark:text-white text-black border-b-[0.1px] border-gray-200">
          {/* Loop through tab data and render button for each. */}
          {tabsData?.map((tab, idx) => {
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
                  {tab?.icon}
                  {tab?.label}
                </div>
              </button>
            );
          })}
        </div>
        {tabsData[activeTabIndex]?.label === "Dashboard" ? (
          <div className="flex flex-col gap-5 px-5 mt-5">
            <select className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-gray-400">
              <option
                value="1"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Region 1
              </option>
              <option
                value="2"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Region 2
              </option>
            </select>
            <MasterAccordion />
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-5 mt-5">
            <select className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-gray-400">
              <option
                value="1"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Region 1
              </option>
              <option
                value="2"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Region 2
              </option>
            </select>
            <MasterAccordion />
          </div>
        )}
      </div>
    </div>
  );
}
