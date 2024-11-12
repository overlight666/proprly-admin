/* eslint-disable jsx-a11y/anchor-is-valid */
import { FileInput, Label } from "flowbite-react";

export default function Warranty() {
  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Appliances" />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Bathroom Fixtures" />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Air Conditioning" />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Utilities" />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Intercom" />
          </div>
          <FileInput id="file-upload" />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Builder warranty" />
          </div>
          <FileInput id="file-upload" />
        </div>
      </div>
    </div>
  );
}
