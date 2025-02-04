/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Label, Select, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import type { AppState, ReducerTypes } from "../../../types";

const CommonAreaInformation = function (params) {
  const { lotNo, setLotNo, status, setStatus }: any = params;
  const { config }: AppState = useSelector(
    (state: ReducerTypes) => state.application,
  );
  return (
    <div className="flex w-full pb-5">
      <div className="grid w-full grid-rows-2 gap-2 lg:grid-cols-4">
        <div className="row-start-1 pt-[20px]">
          <Label htmlFor="lotNo">
            Common Area Lot No. <span className="text-[red]">*</span>
          </Label>
          <TextInput
            className="mt-2"
            id="lotNo"
            name="lotNo"
            value={lotNo}
            onChange={(e) => setLotNo(e.target.value)}
            placeholder="Common Area Lot No."
            required
          />
        </div>
        <div className="row-start-2 pt-[20px]">
          <Label htmlFor="lotNo">
            Common Area Status <span className="text-[red]">*</span>
          </Label>
          <Select
            className="mt-2"
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" selected>
              Please Select
            </option>
            {config &&
              config.propertyStatusList &&
              config.propertyStatusList.map((status, index) => {
                return (
                  <option key={index} value={status.key}>
                    {status.value}
                  </option>
                );
              })}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CommonAreaInformation;
