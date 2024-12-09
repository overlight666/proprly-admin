/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Label } from "flowbite-react";
import UploadedItems from "../../properties/uploadedItems";

export default function StrataWarrantyInformation({
  handleUpload,
  uploadedWarranties,
  setUploadedWarranties,
  progressBar,
}: any) {
  return (
    <div className="mt-5 flex w-full flex-col pb-5">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Lifts" />
          </div>
          <UploadedItems
            progressBar={progressBar}
            uploadType="lifts"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find((g) => g.group === "lifts")?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Garage Door" />
          </div>
          <UploadedItems
            progressBar={progressBar}
            uploadType="garage_door"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find((g) => g.group === "garage_door")
                ?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Miscellaneous" />
          </div>
          <UploadedItems
            progressBar={progressBar}
            uploadType="miscellaneous"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find((g) => g.group === "miscellaneous")
                ?.data
            }
          />
        </div>
      </div>
    </div>
  );
}
