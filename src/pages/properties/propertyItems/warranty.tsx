/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FileInput, Label } from "flowbite-react";
import UploadedItems from "../uploadedItems";

export default function Warranty({ handleUpload, uploadedWarranties }: any) {
  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Appliances" />
          </div>
          <FileInput
            id="file-upload"
            onChange={(e) => handleUpload(e, "appliances")}
            accept="application/pdf"
          />
          <UploadedItems
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find((g) => g.group === "appliances")
                ?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Bathroom Fixtures" />
          </div>
          <FileInput
            id="file-upload"
            onChange={(e) => handleUpload(e, "bathroom_fixtures")}
            accept="application/pdf"
          />
          <UploadedItems
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find(
                (g) => g.group === "bathroom_fixtures"
              )?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Air Conditioning" />
          </div>
          <FileInput
            id="file-upload"
            onChange={(e) => handleUpload(e, "air_conditioning")}
            accept="application/pdf"
          />
          <UploadedItems
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find(
                (g) => g.group === "air_conditioning"
              )?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Utilities" />
          </div>
          <FileInput
            id="file-upload"
            onChange={(e) => handleUpload(e, "utilities")}
            accept="application/pdf"
          />
          <UploadedItems
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find((g) => g.group === "utilities")
                ?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Intercom" />
          </div>
          <FileInput
            id="file-upload"
            onChange={(e) => handleUpload(e, "intercom")}
            accept="application/pdf"
          />
          <UploadedItems
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find((g) => g.group === "intercom")
                ?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Builder warranty" />
          </div>
          <FileInput
            id="file-upload"
            onChange={(e) => handleUpload(e, "builder_warranty")}
            accept="application/pdf"
          />
          <UploadedItems
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find(
                (g) => g.group === "builder_warranty"
              )?.data
            }
          />
        </div>
      </div>
    </div>
  );
}
