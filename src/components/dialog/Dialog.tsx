/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { confirmable, ConfirmDialog } from "react-confirm";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

export interface Props {
  confirmation?: string;
  confirmText: string;
  confirmVariant?: any;
}

const Confirmation: ConfirmDialog<Props, boolean> = ({
  show,
  proceed,
  confirmation,
  confirmText,
  confirmVariant,
}) => (
  <Modal
    onClose={() => proceed(false)}
    isOpen={show}
    className="max-w-[40%] p-6 lg:p-10 max-h-[90%] relative overflow-auto"
  >
    <div className="flex flex-col px-5 overflow-auto custom-scrollbar gap-10">
      <div className="flex justify-center">
        <span className="text-gray-600 dark:text-gray-200 text-[20px] text-center">
          {confirmation}
        </span>
      </div>
      <div className="flex justify-center gap-5">
        <Button onClick={() => proceed(false)} variant="white">
          CANCEL
        </Button>
        <Button
          onClick={() => proceed(true)}
          variant={confirmVariant || "primary"}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  </Modal>
);

export default confirmable(Confirmation);
