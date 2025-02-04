/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Label } from "flowbite-react";
import UploadedItems from "../../properties/uploadedItems";

export default function StrataUploads({
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
            <Label htmlFor="countries" value="Inspection Test Plans" />
          </div>
          <UploadedItems
            progressBar={progressBar}
            uploadType="inspection_test_plans"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find(
                (g) => g.group === "inspection_test_plans",
              )?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label
              htmlFor="countries"
              value="Pre-Settlement Inspection Report"
            />
          </div>
          <UploadedItems
            progressBar={progressBar}
            uploadType="pre_settlement_inspection_report"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find(
                (g) => g.group === "pre_settlement_inspection_report",
              )?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Handover Inspection Report" />
          </div>
          <UploadedItems
            progressBar={progressBar}
            uploadType="handover_inspection_report"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find(
                (g) => g.group === "handover_inspection_report",
              )?.data
            }
          />
        </div>
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Miscellaneous Report" />
          </div>
          <UploadedItems
            progressBar={progressBar}
            uploadType="miscellaneous_report"
            setUploadedFiles={setUploadedWarranties}
            handleUpload={handleUpload}
            uploadedFiles={
              uploadedWarranties &&
              uploadedWarranties.groups &&
              uploadedWarranties.groups.find(
                (g) => g.group === "miscellaneous_report",
              )?.data
            }
          />
        </div>
      </div>
    </div>
  );
}
