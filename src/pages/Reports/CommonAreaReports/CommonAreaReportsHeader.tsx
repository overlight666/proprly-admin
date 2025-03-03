/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Input from "../../../components/form/input/InputField";
import Radio from "../../../components/form/input/Radio";
import { SearchIcon } from "../../../icons";

export default function CommonAreaReportsHeader({
  onSearch,
  setSelectedValue,
  selectedValue,
}: any) {
  return (
    <>
      <div className="flex flex-col px-5 w-full gap-5">
        <div
          className="flex space-x-2 w-[40%]
      "
        >
          <div className="relative w-full">
            <Input
              placeholder="Search"
              type="text"
              className="pl-[62px] "
              onChange={(e) => onSearch(e.target.value)}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <SearchIcon className="size-6" />
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3 flex-row w-full">
          <span className="text-black dark:text-white mr-5">
            Inspection Type:
          </span>
          <Radio
            id="inspection1"
            name="inspection"
            value="all"
            checked={selectedValue === "all"}
            onChange={(e) => setSelectedValue(e)}
            label="All"
          />
          <Radio
            id="inspection2"
            name="inspection"
            value="pre_settlement_inspection"
            checked={selectedValue === "pre_settlement_inspection"}
            onChange={(e) => setSelectedValue(e)}
            label="Pre-Settlement"
          />
          <Radio
            id="inspection3"
            name="inspection"
            value="pre_settlement_general_inspection"
            checked={selectedValue === "pre_settlement_general_inspection"}
            onChange={(e) => setSelectedValue(e)}
            label="General"
          />
          <Radio
            id="inspection4"
            name="inspection"
            value="handover_inspection"
            checked={selectedValue === "handover_inspection"}
            onChange={(e) => setSelectedValue(e)}
            label="Handover"
          />
          <Radio
            id="inspection5"
            name="inspection"
            value="post_handover_inspection"
            checked={selectedValue === "post_handover_inspection"}
            onChange={(e) => setSelectedValue(e)}
            label="Post Handover"
          />
        </div>
      </div>
    </>
  );
}
