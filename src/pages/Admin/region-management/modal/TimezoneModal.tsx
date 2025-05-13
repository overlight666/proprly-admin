/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Modal } from "../../../../components/ui/modal";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useUserActions } from "@/_recoil/actions";
import { addRegionResponseAtom, selectedRegionAtom } from "@/_recoil/states";
import { Label } from "flowbite-react";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TimezoneModal({ isOpen, closeModal, isEdit, id }: any) {
  const userAction = useUserActions();
  const regionResponse = useRecoilValue(addRegionResponseAtom);
  const selectedRegion = useRecoilValue(selectedRegionAtom);
  const setSelectedRegion = useSetRecoilState(selectedRegionAtom);
  const setRegionResponse = useSetRecoilState(addRegionResponseAtom);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    abbreviation: Yup.string().required("Abbreviation is required"),
    offset: Yup.string().required("Offset is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (regionResponse) {
      userAction.getAllRegions();
      setRegionResponse(undefined);
    }
  }, [regionResponse]);

  useEffect(() => {
    if (isEdit && id) {
      setSelectedRegion(undefined);
      userAction.getRegionById(id);
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (isEdit && selectedRegion) {
      //   setValue("regionName", selectedRegion?.regionName);
      //   setValue("regionCode", selectedRegion?.regionCode);
      //   setValue("currency", selectedRegion?.currency);
      //   setValue("dateFormat", selectedRegion?.dateFormat);
    }
    if (isEdit && !selectedRegion) {
      //   setValue("regionName", "");
      //   setValue("regionCode", "");
      //   setValue("currency", "");
      //   setValue("dateFormat", "");
    }
  }, [isEdit, selectedRegion]);

  function onSubmit(props: any) {
    if (!isEdit) {
      userAction
        .addRegion(props)
        .then(() => {
          toast.info("New Region has been created!");
          closeModal();
        })
        .catch((e) => {
          toast.error(e);
        });
    } else {
      userAction
        .updateRegion(id, props)
        .then(() => {
          toast.info("New Region has been updated!");
          closeModal();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  }

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
              {isEdit ? "Edit Timezone" : "Add Timezone"}
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Name</Label>
              <Input
                type="text"
                placeholder="Enter Name"
                register={{ ...register("name") }}
                error={errors.name}
                hint={errors.name?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Description</Label>
              <Input
                type="text"
                placeholder="Enter Description"
                register={{ ...register("description") }}
                error={errors.description}
                hint={errors.description?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Abbreviation</Label>
              <Input
                type="text"
                placeholder="$"
                register={{ ...register("abbreviation") }}
                error={errors.abbreviation}
                hint={errors.abbreviation?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Offset</Label>
              <Input
                type="text"
                placeholder="+8"
                register={{ ...register("offset") }}
                error={errors.offset}
                hint={errors.offset?.message}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <Button
              onClick={closeModal}
              type="button"
              variant="outline"
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}

            >
              {isEdit ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
