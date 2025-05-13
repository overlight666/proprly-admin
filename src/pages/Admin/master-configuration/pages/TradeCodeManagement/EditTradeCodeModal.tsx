/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTrade } from "@/_recoil/actions";
import { defectCodesSelectAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import MultiSelect from "@/components/ui/multiselect";
import { Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

export default function EditTradeCodeModal({
  isOpen,
  closeModal,
  tradeCode,
}: any) {
  const [defectName, setDefectName] = useState<any>(tradeCode?.tradeName);
  const defectCodeList: any[] = useRecoilValue(defectCodesSelectAtom);
  const [defectList, setDefectList] = useState<any>([]);

  const [nameError, setNameError] = useState<any>("");

  const tradeAction = useTrade();

  function onSubmit() {
    setNameError("");

    if (defectName.trim().length === 0) {
      setNameError("Trade name is required");
    }

    if (defectName.trim().length > 0) {
      //   addTradeCode(defectName, defectCode, defectList);
      tradeAction
        .editTradeCode(tradeCode?.id, {
          tradeName: defectName,
          defectCodes: defectList,
        })
        .then(() => {
          toast.success("Trade code has been updated!");
        });
      closeModal();
      setDefectName("");
    }
  }

  useEffect(() => {
    if (tradeCode) {
      setDefectName(tradeCode?.tradeName);
      setDefectList(tradeCode?.defectCode?.map((codes) => codes.id));
    }
  }, [tradeCode]);

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
              Edit Trade Code
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Trade Name</Label>
              <Input
                type="text"
                value={defectName}
                onChange={(e) => setDefectName(e.target.value)}
                placeholder="Enter defect name"
                error={nameError !== ""}
                hint={nameError}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Trade Code</Label>
              <Input
                disabled
                value={tradeCode?.tradeCode}
                type="text"
                placeholder="Enter defect code"
              />
            </div>
            <div className="space-y-2">
              <Label>
                Defect Codes<span className="text-error-500">*</span>
              </Label>
              <MultiSelect
                label=""
                hasLabel={false}
                options={[
                  ...((defectCodeList?.length > 0 && defectCodeList) || []),
                  ...((tradeCode?.defectCode.length > 0 &&
                    tradeCode?.defectCode) ||
                    []),
                ]?.map((defect: any) => {
                  return {
                    text: `${defect.defectCode} - ${defect.defectName}`,
                    value: defect.id,
                    selected: false,
                  };
                })}
                defaultSelected={tradeCode?.defectCode?.map(
                  (codes) => codes.id
                )}
                onChange={(values: any) => setDefectList(values)}
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
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
