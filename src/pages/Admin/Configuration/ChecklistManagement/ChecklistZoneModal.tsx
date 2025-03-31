/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import React, { useEffect } from "react";
import { Modal } from "../../../../components/ui/modal";
import Input from "../../../../components/form/input/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function ChecklistZoneModal({
  isOpen,
  closeModal,
  title,
  onSubmit,
  selectedCategory,
  isEdit,
}: any) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
