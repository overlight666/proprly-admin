/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "../../../components/ui/modal";
import { Label } from "flowbite-react/components/Label";
import Input from "../../../components/form/input/InputField";
import { useState } from "react";
import Select2 from "../../../components/form/Select2";
import { toast } from "react-toastify";
import React from "react";

export default function AddTowerModal({ isOpen, closeModal, addTower }: any) {
  const [name, setName] = useState<any>("");
  const [floor, setFloor] = useState<any>("");

  const [nameError, setNameError] = useState<any>("");

  const towerOptions: any = [...Array(50)].map((i, index) => ({
    label: index + 1,
    value: index + 1,
  }));


  function onSubmit() {
    setNameError("");

    if (name.trim().length === 0) {
      setNameError("Name is required");
    }
    if (!floor) {
      toast.error("Floor must be selected");
    }
    if (name.trim().length > 0 && floor.trim().length > 0) {
      addTower(name, floor);
      closeModal();
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
              Add New Tower
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Tower Name</Label>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                error={nameError !== ""}
                hint={nameError}
              />
            </div>
            <div>
              <Label htmlFor="inputTwo">
                Floors <span className="text-error-500">*</span>{" "}
              </Label>
              <Select2
                options={towerOptions}
                placeholder="Select floors"
                className="dark:bg-dark-900"
                onChange={(e) => setFloor(e)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
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
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
