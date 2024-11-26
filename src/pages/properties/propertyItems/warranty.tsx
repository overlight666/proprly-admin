/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Label } from "flowbite-react";
import UploadedItems from "../uploadedItems";

export default function Warranty({
  handleUpload,
  uploadedWarranties,
  setUploadedWarranties,
}: any) {
  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Appliances" />
          </div>
          <UploadedItems
            uploadType="appliances"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
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
          <UploadedItems
            uploadType="bathroom_fixtures"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
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
          <UploadedItems
            uploadType="air_conditioning"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
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
          <UploadedItems
            uploadType="utilities"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
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
          <UploadedItems
            uploadType="intercom"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
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
          <UploadedItems
            uploadType="builder_warranty"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
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
