/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDefect } from "@/_recoil/actions";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Label } from "flowbite-react";
import { useEffect, useState } from "react";
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
          toast.info("Defect code has been updated!");
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
            <Button
              onClick={() => {
                setNameError("");
                setDefectName("");

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
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
