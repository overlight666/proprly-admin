/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Label } from "flowbite-react";
import UploadedItems from "../uploadedItems";

export default function ModalWarranty({
  handleUpload,
  uploadedWarranties,
  setUploadedWarranties,
  progressBar,
}: any) {
  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Appliances" />
          </div>
          <UploadedItems
            progressBar={progressBar}
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
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Bathroom Fixtures" />
          </div>
          <UploadedItems
            progressBar={progressBar}
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
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Air Conditioning" />
          </div>
          <UploadedItems
            progressBar={progressBar}
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
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Utilities" />
          </div>
          <UploadedItems
            progressBar={progressBar}
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
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Intercom" />
          </div>
          <UploadedItems
            progressBar={progressBar}
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
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Builder warranty" />
          </div>
          <UploadedItems
            progressBar={progressBar}
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
