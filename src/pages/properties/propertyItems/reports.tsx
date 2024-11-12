/* eslint-disable jsx-a11y/anchor-is-valid */
import { FileInput, Label } from "flowbite-react";

export default function Reports() {
  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Inspection Test Plans" />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label
              htmlFor="countries"
              value="Pre-Settlement Inspection Report"
            />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Handover Inspection Report" />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Miscellaneous Report" />
          </div>
          <FileInput id="file-upload" />
        </div>
      </div>
    </div>
  );
}
