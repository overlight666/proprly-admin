/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { commonAreaChecklistElementListAtom } from "@/_recoil/states";
import { Modal } from "@/components/ui/modal";
import { Label } from "flowbite-react";
import Input from "@/components/ui/input";
import Checkbox2 from "@/components/ui/checkbox2";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";


export default function ChecklistZoneModal({
  isOpen,
  closeModal,
  title,
  onSubmit,
  selectedCategory,
  isEdit,
}: any) {
  const checklistElements = useRecoilValue(commonAreaChecklistElementListAtom);
  const [isChecked, setIsChecked] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    duplicateCommonAreaCategoryId: Yup.string().optional(),
    isChecked: Yup.boolean().optional(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (isEdit) {
      setValue("name", selectedCategory?.name);
    } else {
      setValue("name", "");
    }
  }, [isEdit, selectedCategory]);

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
            <div className="flex items-center gap-3">
              <Checkbox2
                disabled={isEdit}
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(e);
                  setValue("isChecked", e);
                }}
                label="Duplicate from"
              />
            </div>
            {isChecked && (
              <div>
                <Select
                  options={checklistElements?.map((list) => {
                    return {
                      label: list.name,
                      value: list.id,
                    };
                  })}
                  placeholder="Select Existing Zone"
                  className="dark:bg-dark-900"
                  onChange={(e) => {
                    setValue("duplicateCommonAreaCategoryId", e);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <Button
              onClick={() => {
                closeModal();
              }}
              type="button"
              variant="outline"
            >
              Close
            </Button>
            <Button
              disabled={isSubmitting}
              type="submit"

            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
