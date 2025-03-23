/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Input from "../../../../components/form/input/InputField";
import { SearchIcon } from "../../../../icons";

export default function SupportTicketsHeader({ onSearch }: any) {
  return (
    <>
      <div className="flex justify-between flex-row items-center px-5 py-5">
        <div
          className="flex space-x-2 w-full
      "
        >
          <div className="relative w-[40%]">
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
      </div>
    </>
  );
}
