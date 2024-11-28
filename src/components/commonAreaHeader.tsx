/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { Label, Radio } from "flowbite-react";

const CommonAreaHeader = function ({ setHeaderValue }: any) {
  return (
    <>
      <div className="my-5 grid w-full grid-cols-9 gap-2 px-5">
        <div className="relative col-span-3 w-full">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 block w-full rounded-[5px] rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <fieldset className="mb-10 flex flex-row items-center gap-10 px-5">
        <span className="text-[14px]">Inspection Type:</span>
        <div className="flex items-center gap-2">
          <Radio
            id="general"
            name="propertyHeader"
            value="general"
            defaultChecked
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="general" className="text-[14px]">
            General
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="pre_settlement"
            name="propertyHeader"
            value="pre_settlement"
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="pre_settlement" className="text-[14px]">
            Pre-Settlement
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="handover"
            name="propertyHeader"
            value="handover"
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="handover" className="text-[14px]">
            Handover
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="post_handover"
            name="propertyHeader"
            value="post_handover"
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="post_handover" className="text-[14px]">
            Post-Handover
          </Label>
        </div>
      </fieldset>
    </>
  );
};

export default CommonAreaHeader;
