/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import { useEffect, useState } from "react";
import React from "react";
import { Modal } from "../../../../components/ui/modal";
import Input from "../../../../components/form/input/InputField";
import { toast } from "react-toastify";
import { useTrade } from "../../../../_actions";
import MultiSelect from "../../../../components/form/MultiSelect";
import { useRecoilValue } from "recoil";
import { defectCodesSelectAtom } from "../../../../_state/atoms/defects";

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
