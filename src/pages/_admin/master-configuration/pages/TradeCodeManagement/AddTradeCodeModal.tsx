/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { defectCodesSelectAtom } from "@/_recoil/states";
import { Modal } from "@/components/ui/modal";
import { Label } from "flowbite-react";
import Input from "@/components/ui/input";
import MultiSelect from "@/components/ui/multiselect";
import { Button } from "@/components/ui/button";

export default function AddTradeCodeModal({
  isOpen,
  closeModal,
  addTradeCode,
}: any) {
  const defectCodeList: any[] = useRecoilValue(defectCodesSelectAtom);
  const [defectName, setDefectName] = useState<any>("");
  const [defectCode, setDefectCode] = useState<any>("");
  const [nameError, setNameError] = useState<any>("");
  const [codeError, setCodeError] = useState<any>("");
  const [defectListError, setDefectListError] = useState<any>("");
  const [defectList, setDefectList] = useState<any>([]);

  function onSubmit() {
    setCodeError("");
    setNameError("");
    setDefectListError("");

    if (defectName.trim().length === 0) {
      setNameError("Trade name is required");
    }
    if (defectCode.trim().length === 0) {
      setCodeError("Trade code is required");
    }
    if (defectList.length === 0) {
      setCodeError("Defect code is required");
      toast.error(defectListError);
    }
    if (
      defectName.trim().length > 0 &&
      defectCode.trim().length > 0 &&
      defectList.length > 0
    ) {
      addTradeCode(defectName, defectCode, defectList);
      closeModal();
      setDefectName("");
      setDefectCode("");
      setDefectList([]);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10 overflow-y-inherit"
      >
        <div
          className="flex flex-col px-2 custom-scrollbar"
          style={{
            overflowY: "inherit",
          }}
        >
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              Add New Trade Code
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Trade Name</Label>
              <Input
                type="text"
                onChange={(e) => setDefectName(e.target.value)}
                placeholder="Enter defect name"
                error={nameError !== ""}
                hint={nameError}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Trade Code</Label>
              <Input
                type="text"
                onChange={(e) => setDefectCode(e.target.value)}
                placeholder="Enter defect code"
                error={codeError !== ""}
                hint={codeError}
              />
            </div>
            <div className="space-y-2">
              <Label>
                Defect Codes<span className="text-error-500">*</span>
              </Label>
              <MultiSelect
                label=""
                hasLabel={false}
                options={defectCodeList?.map((defect: any) => {
                  return {
                    text: `${defect.defectCode} - ${defect.defectName}`,
                    value: defect.id,
                    selected: false,
                  };
                })}
                onChange={(values: any) => setDefectList(values)}
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
