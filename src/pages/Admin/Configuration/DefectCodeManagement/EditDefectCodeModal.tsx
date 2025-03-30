/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import { useEffect, useState } from "react";
import React from "react";
import { Modal } from "../../../../components/ui/modal";
import Input from "../../../../components/form/input/InputField";
import { useDefect } from "../../../../_actions";
import { toast } from "react-toastify";

export default function EditDefectCodeModal({
  isOpen,
  closeModal,
  defectCode,
}: any) {
  const [defectName, setDefectName] = useState<any>(
    defectCode?.defectName || ""
  );
  const defectAction = useDefect();
  const [nameError, setNameError] = useState<any>("");

  function onSubmit() {
    setNameError("");

    if (defectName.trim().length === 0) {
      setNameError("Defect name is required");
    }

    if (defectName.trim().length > 0) {
      //   addDefectCode(defectName, defectCode);
      const params = {
        defectName: defectName,
      };
      defectAction
        .editDefectCode(defectCode?.id, params)
        .then(() => {
          toast.info("New defect code has been updated!");
        })
        .catch((e) => {
          toast.error(e);
        });
      closeModal();
      setDefectName("");
    }
  }

  useEffect(() => {
    if (defectCode) {
      setDefectName(defectCode?.defectName);
    }
  }, [defectCode]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              Edit Defect Code
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Defect Name</Label>
              <Input
                type="text"
                value={defectName}
                onChange={(e) => setDefectName(e.target.value)}
                placeholder="Enter defect name"
                error={nameError !== ""}
                hint={nameError}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={() => {
                setNameError("");
                setDefectName("");

                closeModal();
              }}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => onSubmit()}
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
