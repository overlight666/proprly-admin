import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { MasterAccordion } from "./component/Accordion";

export default function MasterConfiguration() {
  return (
    <div>
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb pageTitle="Master Configuration" />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <div className="flex flex-col gap-5 px-5 mt-5">
          <MasterAccordion />
        </div>
      </div>
    </div>
  );
}
