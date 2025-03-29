/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import React, { useEffect } from "react";
import { Modal } from "../../../../components/ui/modal";
import Input from "../../../../components/form/input/InputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useUserActions } from "../../../../_actions";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addRegionResponseAtom, selectedRegionAtom } from "../../../../_state";

export default function AddRegionModal({
  isOpen,
  closeModal,
  isEdit,
  id,
}: any) {
  const userAction = useUserActions();
  const regionResponse = useRecoilValue(addRegionResponseAtom);
  const selectedRegion = useRecoilValue(selectedRegionAtom);
  const setSelectedRegion = useSetRecoilState(selectedRegionAtom);
  const setRegionResponse = useSetRecoilState(addRegionResponseAtom);

  const validationSchema = Yup.object().shape({
    regionName: Yup.string().required("Region name is required"),
    regionCode: Yup.string().required("Region Code is required"),
    currency: Yup.string().required("Currency is required"),
    dateFormat: Yup.string().required("Date Format is required"),
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
      setValue("regionName", selectedRegion?.regionName);
      setValue("regionCode", selectedRegion?.regionCode);
      setValue("currency", selectedRegion?.currency);
      setValue("dateFormat", selectedRegion?.dateFormat);
    }
    if (isEdit && !selectedRegion) {
      setValue("regionName", "");
      setValue("regionCode", "");
      setValue("currency", "");
      setValue("dateFormat", "");
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
              {isEdit ? "Edit Region" : "Add Region"}
            </h5>
          </div>
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="input">Region Name</Label>
              <Input
                type="text"
                placeholder="Enter Region Name"
                register={{ ...register("regionName") }}
                error={errors.regionName}
                hint={errors.regionName?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Region Code</Label>
              <Input
                type="text"
                placeholder="Enter Region Code"
                register={{ ...register("regionCode") }}
                error={errors.regionCode}
                hint={errors.regionCode?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Currency</Label>
              <Input
                type="text"
                placeholder="$"
                register={{ ...register("currency") }}
                error={errors.currency}
                hint={errors.currency?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Date Format</Label>
              <Input
                type="text"
                placeholder="mm/yy/dddd"
                register={{ ...register("dateFormat") }}
                error={errors.dateFormat}
                hint={errors.dateFormat?.message}
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
              type="submit"
              disabled={isSubmitting}
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
