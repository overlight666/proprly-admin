/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import { useEffect, useState } from "react";
import React from "react";
import { Modal } from "../../../../components/ui/modal";
import Input from "../../../../components/form/input/InputField";
import { toast } from "react-toastify";
import { useTrade } from "../../../../_actions";

export default function EditTradeCodeModal({
  isOpen,
  closeModal,
  tradeCode,
}: any) {
  const [defectName, setDefectName] = useState<any>(tradeCode?.tradeName);
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
