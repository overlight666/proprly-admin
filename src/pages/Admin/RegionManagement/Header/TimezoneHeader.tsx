/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Input from "../../../../components/form/input/InputField";
import { SearchIcon } from "../../../../icons";
import Button from "../../../../components/ui/button/Button";
import { useModal } from "../../../../hooks/useModal";
import TimezoneModal from "../Modal/TimezoneModal";

export default function TimezoneHeader({ onSearch }: any) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <TimezoneModal closeModal={closeModal} isOpen={isOpen} isEdit={isEdit} />
      <div className="flex justify-between flex-row items-center px-5 py-5 w-full">
        <div
          className="flex space-x-2 w-full justify-between items-center flex-row w-full
      "
        >
          <div className="relative w-[40%]">
            <Input
              placeholder="Search"
              type="text"
              className="pl-[62px] "
              onChange={(e) => onSearch(e.target.value)}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <SearchIcon className="size-6" />
            </span>
          </div>
          <div>
            <Button
              size="sm"
              variant="primary"
              type="button"
              onClick={() => {
                setIsEdit(false);
                openModal();
              }}
            >
              Add Timezone
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
