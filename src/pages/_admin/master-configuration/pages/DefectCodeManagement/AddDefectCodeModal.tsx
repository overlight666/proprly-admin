/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Label } from "flowbite-react";
import { useState } from "react";

export default function AddDefectCodeModal({
  isOpen,
  closeModal,
  addDefectCode,
}: any) {
  const [defectName, setDefectName] = useState<any>("");
  const [defectCode, setDefectCode] = useState<any>("");
  const [nameError, setNameError] = useState<any>("");
  const [codeError, setCodeError] = useState<any>("");

  function onSubmit() {
    setCodeError("");
    setNameError("");

    if (defectName.trim().length === 0) {
      setNameError("Defect name is required");
    }
    if (defectCode.trim().length === 0) {
      setCodeError("Defect code is required");
    }

    if (defectName.trim().length > 0 && defectCode.trim().length > 0) {
      addDefectCode(defectName, defectCode);
      closeModal();
      setDefectName("");
      setDefectCode("");
    }
  }

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
              Add New Defect Code
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Defect Name</Label>
              <Input
                type="text"
                onChange={(e) => setDefectName(e.target.value)}
                placeholder="Enter defect name"
                error={nameError !== ""}
                hint={nameError}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Defect Code</Label>
              <Input
                type="text"
                onChange={(e) => setDefectCode(e.target.value)}
                placeholder="Enter defect code"
                error={codeError !== ""}
                hint={codeError}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <Button
              onClick={() => {
                setCodeError("");
                setNameError("");
                setDefectName("");
                setDefectCode("");
                closeModal();
              }}
              type="button"
              variant="outline"
            >
              Close
            </Button>
            <Button
              onClick={() => onSubmit()}
              type="button"

            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
