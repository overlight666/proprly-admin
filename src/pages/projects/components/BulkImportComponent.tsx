/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import FileUploader from "../../../_components/ImageUploader";
import ComponentCard from "../../../components/common/ComponentCard";
import { useWarrantyAction } from "../../../_actions";
import { toast } from "react-toastify";

/* eslint-disable react-hooks/rules-of-hooks */
export default function BulkImportComponent({
  selected,
  setShowBulk,
  clear,
}: any) {
  const [appliances, setAppliances] = useState<any>([]);
  const [bathroomFixtures, setBathroomFixtures] = useState<any>([]);
  const [airConditioning, setAirConditioning] = useState<any>([]);
  const [utilities, setUtilities] = useState<any>([]);
  const [intercom, setIntercom] = useState<any>([]);
  const [builderwarranty, setBuilderwarranty] = useState<any>([]);
  const warrantyAction = useWarrantyAction();
  const [isUploaded, setIsUploaded] = useState(false);
  const [warrantyGroup, setWarrantyGroup] = useState<any>([
    {
      group: "appliances",
      files: [],
    },
    {
      group: "bathroom_fixtures",
      files: [],
    },
    {
      group: "air_conditioning",
      files: [],
    },
    {
      group: "utilities",
      files: [],
    },
    {
      group: "intercom",
      files: [],
    },
    {
      group: "builder_warranty",
      files: [],
    },
  ]);

  const removeAppliances = (file: File) => {
    const newFiles: any =
      appliances &&
      appliances.length > 0 &&
      appliances.filter((e: any) => e.name !== file.name);
    setAppliances(newFiles);
  };

  const removeBathroomFixtures = (file: File) => {
    const newFiles: any =
      bathroomFixtures &&
      bathroomFixtures.length > 0 &&
      bathroomFixtures.filter((e: any) => e.name !== file.name);
    setBathroomFixtures(newFiles);
  };

  const removeAirConditioning = (file: File) => {
    const newFiles: any =
      airConditioning &&
      airConditioning.length > 0 &&
      airConditioning.filter((e: any) => e.name !== file.name);
    setAirConditioning(newFiles);
  };

  const removeUtilities = (file: File) => {
    const newFiles: any =
      utilities &&
      utilities.length > 0 &&
      utilities.filter((e: any) => e.name !== file.name);
    setUtilities(newFiles);
  };

  const removeIntercom = (file: File) => {
    const newFiles: any =
      intercom &&
      intercom.length > 0 &&
      intercom.filter((e: any) => e.name !== file.name);
    setIntercom(newFiles);
  };

  const removeBuilderwarranty = (file: File) => {
    const newFiles: any =
      builderwarranty &&
      builderwarranty.length > 0 &&
      builderwarranty.filter((e: any) => e.name !== file.name);
    setBuilderwarranty(newFiles);
  };

  const getUploadedFile = (f: any) => {
    const newGroup = warrantyGroup.map((w: any) => {
      if (w.group == f.group) {
        w.files.push(f.file.id);
      }
      return w;
    });
    setIsUploaded(true);
    setWarrantyGroup(newGroup);
  };

  const startUpload = () => {
    if (isUploaded) {
      const params = {
        propertyIds: selected.map((s: any) => s.id),
        groups: warrantyGroup,
      };
      warrantyAction
        .uploadBulk(params, toast)
        .then(() => {
          setShowBulk(false);
          toast.success("Bulk upload warranty completed");
          clear([]);
        })
        .catch((e: any) => {
          toast.error(e);
        });
    } else {
      toast.warn("Please upload warranty!");
    }
  };

  return (
    <div className="mt-5 mx-5">
      <ComponentCard title="Warranty Information">
        <div className="space-y-6">
          <FileUploader
            title="Appliances"
            group="appliances"
            removeFile={removeAppliances}
            setUploadQueue={setAppliances}
            uploadQueue={appliances}
            getUploadedFile={getUploadedFile}
          />
        </div>
        <div className="space-y-6">
          <FileUploader
            group="bathroom_fixtures"
            title="Bathroom Fixtures"
            removeFile={removeBathroomFixtures}
            setUploadQueue={setBathroomFixtures}
            uploadQueue={bathroomFixtures}
            getUploadedFile={getUploadedFile}
          />
        </div>
        <div className="space-y-6">
          <FileUploader
            group="air_conditioning"
            title="Air Conditioning"
            removeFile={removeAirConditioning}
            setUploadQueue={setAirConditioning}
            uploadQueue={airConditioning}
            getUploadedFile={getUploadedFile}
          />
        </div>
        <div className="space-y-6">
          <FileUploader
            group="utilities"
            title="Utilities"
            removeFile={removeUtilities}
            setUploadQueue={setUtilities}
            uploadQueue={utilities}
            getUploadedFile={getUploadedFile}
          />
        </div>
        <div className="space-y-6">
          <FileUploader
            group="intercom"
            title="Intercom"
            removeFile={removeIntercom}
            setUploadQueue={setIntercom}
            uploadQueue={intercom}
            getUploadedFile={getUploadedFile}
          />
        </div>
        <div className="space-y-6">
          <FileUploader
            group="builder_warranty"
            title="Builder Warranty"
            removeFile={removeBuilderwarranty}
            setUploadQueue={setBuilderwarranty}
            uploadQueue={builderwarranty}
            getUploadedFile={getUploadedFile}
          />
        </div>
      </ComponentCard>
      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <button
          onClick={() => setShowBulk(false)}
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
        >
          Cancel
        </button>
        <button
          onClick={() => startUpload()}
          type="button"
          className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
        >
          Bulk Upload
        </button>
      </div>
    </div>
  );
}
