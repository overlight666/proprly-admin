/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "flowbite-react/components/Label";
import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components/ui/modal";
import Input from "../../../../components/form/input/InputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useUserActions } from "../../../../_actions";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addRegionResponseAtom, selectedRegionAtom, systemRegionsAtom } from "../../../../_state";
import Select2 from "../../../../components/form/Select2";

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
  const systemRegions: any = useRecoilValue(systemRegionsAtom);
  const [selectedCountry, setSelectedCountry] = useState<any>()
  const [regionsOption, setRegionOptions] = useState<any>([])
  const [singleRegion, setSingleRegion] = useState<any>()
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
      const detachCountry = systemRegions?.countries?.find((country) => country.currency == selectedRegion?.currency);
      const detachRegion = detachCountry?.regions?.find((region) => region?.regionCode?.toLowerCase() == selectedRegion?.regionCode?.toLowerCase());
      console.log(detachCountry)
      setSingleRegion(JSON.stringify(detachRegion))
      setSelectedCountry(detachCountry?.countryCode)
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

  useEffect(() => {
    if(selectedCountry) {
      const detachCountry = systemRegions?.countries?.find((country) => country.countryCode == selectedCountry);
      setRegionOptions(detachCountry?.regions)
      setValue("currency", detachCountry?.currency);
       setValue("dateFormat", detachCountry?.dateFormat);
    }
  }, [selectedCountry])

  useEffect(() => {
    if(singleRegion) {
      const parsedRegion = JSON.parse(singleRegion)
      setValue("regionName", parsedRegion?.regionName);
      setValue("regionCode", parsedRegion?.regionCode);
    }
  }, [singleRegion])

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
              <Label htmlFor="input">Select Country</Label>
              <Select2
              options={
                systemRegions?.countries?.map((region) => {
                  return {
                    value: region?.countryCode,
                    label: region?.countryName,
                  }
                }) || []
              }
              defaultValue={isEdit ? selectedCountry: ""}
              placeholder="Select a country"
              className="dark:bg-dark-900"
              onChange={(e) => setSelectedCountry(e)}
            />
            </div>
            {
              selectedCountry &&  <div className="space-y-2">
              <Label htmlFor="input">Select Region</Label>
              <Select2
              options={
                regionsOption?.map((region) => {
                  return {
                    value: JSON.stringify(region),
                    label: region?.regionName,
                  }
                }) || []
              }
              placeholder="Select a region"
              className="dark:bg-dark-900"
              defaultValue={isEdit ? singleRegion: ""}
              onChange={(e) => setSingleRegion(e)}
            />
            </div>
            }
            {
              singleRegion && <>
              <div className="space-y-2">
              <Label htmlFor="input">Region Code</Label>
              <Input
                readOnly
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
                readOnly
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
                readOnly
                type="text"
                placeholder="mm/yy/dddd"
                register={{ ...register("dateFormat") }}
                error={errors.dateFormat}
                hint={errors.dateFormat?.message}
              />
            </div>
              </>
            }
            
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
