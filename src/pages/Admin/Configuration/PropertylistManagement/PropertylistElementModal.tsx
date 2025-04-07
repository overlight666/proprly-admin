/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import React, { useState } from "react";
import { Modal } from "../../../../components/ui/modal";
import Input from "../../../../components/form/input/InputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Checkbox from "../../../../components/form/input/Checkbox";
import Button from "../../../../components/ui/button/Button";
import { PlusIcon, TrashBinIcon } from "../../../../icons";
import { checklistElementListAtom } from "../../../../_state";
import { useRecoilValue } from "recoil";
import Select2 from "../../../../components/form/Select2";

export default function PropertylistElementModal({
  isOpen,
  closeModal,
  title,
  onSubmit,
}: any) {
  const checklistElements = useRecoilValue(checklistElementListAtom);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    zoneId: Yup.string().optional(),
    subElements: Yup.array().optional(),
    isDuplicate: Yup.boolean().optional(),
    duplicateElementId: Yup.string().optional(),
  });

  const [isChecked, setIsChecked] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any>();
  const [isDuplicate, setIsDuplicate] = useState(false);
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  const [subItems, setSubItems] = useState<any[]>([{ name: "", index: 0 }]);

  const removeElement = (e) => {
    const holder = [...subItems];
    const filtered = holder?.filter((hold: any) => hold.index != e);
    setValue("subElements", filtered);
    setSubItems(filtered);
  };

  const handleInput = (inputEv, index) => {
    const value = inputEv.target.value;
    setSubItems((state) =>
      state.map((val: any) => {
        if (val?.index == index) {
          val.name = value;
        }
        return val;
      })
    );
    setValue("subElements", subItems);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <form
          className="flex flex-col px-2 overflow-y-auto custom-scrollbar"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {title}
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Name</Label>
              <Input
                type="text"
                placeholder="Enter name"
                register={{ ...register("name") }}
                error={errors.name}
                hint={errors.name?.message}
              />
            </div>
            <div className="flex">
              <Checkbox
                disabled={isDuplicate}
                checked={isChecked}
                onChange={setIsChecked}
                label="Has Sub elements?"
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                disabled={isChecked}
                checked={isDuplicate}
                onChange={(e) => {
                  setIsDuplicate(e);
                  setValue("isDuplicate", e);
                }}
                label="Duplicate from"
              />
            </div>
            {isDuplicate && (
              <div>
                <Select2
                  options={checklistElements?.map((list) => {
                    return {
                      label: list.name,
                      value: list.id,
                    };
                  })}
                  placeholder="Select Existing Zone"
                  className="dark:bg-dark-900"
                  onChange={(e) => {
                    setSelectedZone(
                      checklistElements.find((zone) => zone.id == e)
                    );
                    setValue("zoneId", e);
                  }}
                />
              </div>
            )}
            {selectedZone?.elements && (
              <div>
                <Select2
                  options={selectedZone?.elements?.map((list) => {
                    return {
                      label: list.name,
                      value: list.id,
                    };
                  })}
                  placeholder="Select Existing Element"
                  className="dark:bg-dark-900"
                  onChange={(e) => {
                    setValue("duplicateElementId", e);
                  }}
                />
              </div>
            )}
            {isChecked &&
              subItems?.map((_element: any, index: any) => {
                return (
                  <div className="flex w-[95%] ml-5">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="input">Element Name</Label>
                      <div className="flex w-full gap-2">
                        <div className="w-[75%]">
                          <Input
                            type="text"
                            value={_element.name}
                            placeholder="Enter element name"
                            onChange={(e) => handleInput(e, _element?.index)}
                          />
                        </div>
                        {index == subItems.length - 1 && (
                          <Button
                            type="button"
                            variant="white"
                            onClick={() => {
                              setSubItems((oldArray) => [
                                ...oldArray,
                                {
                                  name: "",
                                  index: _element?.index + 1,
                                },
                              ]);
                            }}
                          >
                            <PlusIcon />
                          </Button>
                        )}
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => {
                              removeElement(_element?.index);
                            }}
                          >
                            <TrashBinIcon />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              disabled={isSubmitting}
              type="submit"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
