/* eslint-disable jsx-a11y/anchor-is-valid */

import { Label, Select, TextInput } from "flowbite-react";
import { useState, type FC } from "react";

const CommonAreaInformation: FC = function () {
  const [lotNo, setLotNo] = useState("");
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
          <Select className="mt-2" id="status" name="status">
            <option selected>Select</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CommonAreaInformation;
