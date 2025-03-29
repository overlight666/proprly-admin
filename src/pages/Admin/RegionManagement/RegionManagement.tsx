/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import RegionHeader from "./Header/RegionHeader";
import RegionTable from "./Table/RegionTable";

export default function RegionManagement() {
  const tableRef = useRef<any>(null);

  const onSearch = (value: any) => {
    tableRef?.current?.dt().search(value).draw();
  };

  return (
    <div>
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb pageTitle="Region Management" />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <>
          <RegionHeader onSearch={onSearch} />

          <div className="px-5 py-2">
            <RegionTable tableRef={tableRef} />
          </div>
        </>
      </div>
    </div>
  );
}
