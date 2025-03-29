/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import TimezoneTable from "./Table/TimezoneTable";
import TimezoneHeader from "./Header/TimezoneHeader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedRegionAtom } from "../../../_state";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { useParams } from "react-router";
import { useUserActions } from "../../../_actions";

export default function TimezoneManagement() {
  const tableRef = useRef<any>(null);
  const selectedRegion = useRecoilValue(selectedRegionAtom);
  const userAction = useUserActions();
  const setSelectedRegion = useSetRecoilState(selectedRegionAtom);
  const onSearch = (value: any) => {
    tableRef?.current?.dt().search(value).draw();
  };
  const { regionId } = useParams();

  useEffect(() => {
    if (regionId) {
      setSelectedRegion(undefined);
      userAction.getRegionById(regionId);
    }
  }, [regionId]);

  return (
    <div>
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb pageTitle="Timezone Management" />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <>
          <TimezoneHeader onSearch={onSearch} />
          <div className="grid grid-cols-1 md:grid-cols-2 px-5 py-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="input">Region Name</Label>
              <Input
                type="text"
                placeholder="Enter Region Name"
                value={selectedRegion?.regionName}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Region Code</Label>
              <Input
                type="text"
                placeholder="Enter Region Code"
                value={selectedRegion?.regionCode}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Currency</Label>
              <Input
                type="text"
                placeholder="Enter Currency"
                value={selectedRegion?.currency}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Date Format</Label>
              <Input
                type="text"
                placeholder="Enter Date Format"
                value={selectedRegion?.dateFormat}
                readOnly
              />
            </div>
          </div>
          <div className="px-5 py-2">
            <span className="text-gray-200 dark:text-gray-400">
              Timezones:{" "}
            </span>
            <TimezoneTable
              tableRef={tableRef}
              timezone={selectedRegion?.timezone}
            />
          </div>
        </>
      </div>
    </div>
  );
}
