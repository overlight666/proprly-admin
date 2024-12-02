/* eslint-disable jsx-a11y/anchor-is-valid */

import { Label, Radio, Select, TextInput } from "flowbite-react";
import { useState, type FC } from "react";

const CommonAreaInformation: FC = function () {
  const [lotNo, setLotNo] = useState("");
  return (
    <div className="flex w-full">
      <div className="grid w-full grid-rows-3 gap-2 lg:grid-cols-4">
        <div className="row-start-1 pt-[20px]">
          <Label htmlFor="lotNo">Common Area Lot No.</Label>
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
          <Label htmlFor="lotNo">Common Area Status</Label>
          <Select className="mt-2" id="status" name="status">
            <option selected>Select</option>
          </Select>
        </div>
        <div className="row-start-3 flex flex-row items-center gap-6 ">
          <span>Choose:</span>
          <div className="flex items-center gap-2">
            <Radio id="tower" name="tower" value="Tower" defaultChecked />
            <Label htmlFor="tower">Tower</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="basement"
              name="basement"
              value="Basement"
              defaultChecked
            />
            <Label htmlFor="basement">Basement</Label>
          </div>
        </div>
        <div className="row-start-4">
          <Label htmlFor="lotNo">Select Tower</Label>
          <Select className="mt-2" id="status" name="status">
            <option selected>Select</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CommonAreaInformation;
