/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function EditPropertyListElementModal({
  isOpen,
  closeModal,
  title,
  onSubmit,
  isEdit,
  selectedElement,
}: any) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (isEdit) {
      setValue("name", selectedElement?.name);
    }
  }, [isEdit, selectedElement]);

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
