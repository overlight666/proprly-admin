/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { Label, Radio } from "flowbite-react";

const PropertyReportHeader = function ({ setHeaderValue, headerValue }: any) {
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
            id="all"
            name="propertyHeader"
            value="all"
            checked={headerValue === "all"}
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="all" className="text-[14px]">
            All
          </Label>
        </div>
        {/* <div className="flex items-center gap-2">
          <Radio
            id="under_construction"
            name="propertyHeader"
            value="under_construction"
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="under_construction" className="text-[14px]">
            Under-Construction
          </Label>
        </div> */}
        <div className="flex items-center gap-2">
          <Radio
            id="pre_settlement_inspection"
            name="propertyHeader"
            value="pre_settlement_inspection"
            checked={headerValue === "pre_settlement_inspection"}
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="pre_settlement_inspection" className="text-[14px]">
            Pre-Settlement
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="pre_settlement_general_isnpection"
            name="propertyHeader"
            value="pre_settlement_general_isnpection"
            checked={headerValue === "pre_settlement_general_isnpection"}
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="pre_settlement_general_isnpection" className="text-[14px]">
            General
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Radio
            id="handover_isnpection"
            name="propertyHeader"
            value="handover_isnpection"
            checked={headerValue === "handover_isnpection"}
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="handover_isnpection" className="text-[14px]">
            Handover
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="post_handover_isnpection"
            name="propertyHeader"
            value="post_handover_isnpection"
            checked={headerValue === "post_handover_isnpection"}
            onChange={(e) => setHeaderValue(e.target.value)}
          />
          <Label htmlFor="post_handover_isnpection" className="text-[14px]">
            Post-Handover
          </Label>
        </div>
      </fieldset>
    </>
  );
};

export default PropertyReportHeader;
