/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import React, { useState } from "react";
import { Modal } from "../../../../components/ui/modal";

import MultiSelect from "../../../../components/form/MultiSelect";
import { useRecoilValue } from "recoil";
import { defectCodesSelectAtom } from "../../../../_state/atoms/defects";

export default function AttachDefectCodes({
  isOpen,
  closeModal,
  title,
  attachDefects,
}: any) {
  const defectCodeList: any[] = useRecoilValue(defectCodesSelectAtom);
  const [defectList, setDefectList] = useState<any>();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <form className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {title}
            </h5>
          </div>
          <div className="mt-8 space-y-3">
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
            <button
              onClick={() => {
                closeModal();
              }}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              onClick={() => attachDefects(defectList)}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
