/* eslint-disable @typescript-eslint/no-explicit-any */
import { isLoadingAtom, LocationListAtom, TradeCodesByRegionAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import MultiSelect from "@/components/ui/multiselect";
import Select from "@/components/ui/select";
import { Label } from "flowbite-react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LocationTable from "./LocationTable";
import { FormikHelpers, useFormik } from "formik";
import { itpTemplateForm } from "@/lib/interface";
import { itpTemplateValidattion } from "@/lib/validations";
import { useITPAction } from "@/_recoil/actions";
import { toast } from "react-toastify";

export default function AddITP({
    currentParams,
    selectedId,
    isType,
    isOpen,
    closeModal,
    initialValues,
    isEdit
}: any) {
    const [_defectName, setDefectName] = useState<any>("");
    const [_defectCode, setDefectCode] = useState<any>("");
    const [_nameError, setNameError] = useState<any>("");
    const tradeCodes = useRecoilValue(TradeCodesByRegionAtom);
    const locationList = useRecoilValue(LocationListAtom);

    const [selectedLocations, setSelectedLocations] = useState<any>("");
    const itpAction = useITPAction();
    const setIsLoading = useSetRecoilState(isLoadingAtom);


    const formik = useFormik<itpTemplateForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: itpTemplateValidattion,
        onSubmit: async (
            values: itpTemplateForm,
            _formikHelpers: FormikHelpers<itpTemplateForm>,
        ) => {
            setIsLoading(true);
            const params =
                isType === "project"
                    ? `?projectId=${selectedId}`
                    : isType === "organization"
                        ? `?organizationId=${selectedId}`
                        : isType === "region"
                            ? `?regionId=${selectedId}`
                            : "";

            if (!isEdit) {
                itpAction.addITPTemplate(values, params).then((e: any) => {
                    if (e) {
                        if (!e?.error) {
                            setIsLoading(false);
                            closeModal();
                            formik.resetForm();
                            itpAction.getItpTemplates(currentParams);
                            itpAction.getTradeCode(currentParams);
                            toast.success("ITP Template added successfully");
                        } else {
                            toast.error(e?.error);
                            setIsLoading(false);
                        }

                    }
                })
            } else {
                itpAction.updateITPTemplate(values, values?.id).then((e: any) => {
                    if (e) {
                        if (!e?.error) {
                            setIsLoading(false);
                            closeModal();
                            formik.resetForm();
                            itpAction.getItpTemplates(currentParams);
                            itpAction.getTradeCode(currentParams);
                            toast.success("ITP Template updated successfully");
                        } else {
                            toast.error(e?.error);
                            setIsLoading(false);
                        }

                    }
                })
            }

        },
    });

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
                            {`${isEdit ? "Edit" : "Add"} ITP Template Management`}
                        </h5>
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="input">Select Trade Category<span className="text-error-500">*</span></Label>
                            <MultiSelect
                                label=""
                                hasLabel={false}
                                defaultSelected={formik.values.tradeCodes}
                                options={tradeCodes?.map((tradeCode: any) => {
                                    return {
                                        text: `${tradeCode?.tradeCode} - ${tradeCode?.tradeName}`,
                                        value: tradeCode?.id,
                                    };
                                }) ?? []}
                                onChange={(values: any) => formik.setFieldValue("tradeCodes", values)}
                            />

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="input">Enter ITP Template Name<span className="text-error-500">*</span></Label>
                            <Input
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="ITP Template Name"
                                error={formik.errors.name}
                                hint={formik.errors.name}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="input">Select Location<span className="text-error-500">*</span></Label>
                            <div className="flex justify-between items-center gap-1 w-full">
                                <div className="basis-[90%]">
                                    <Select
                                        placeholder="Select location"
                                        options={locationList?.map((location: any) => {
                                            return {
                                                label: location?.name,
                                                value: JSON.stringify({
                                                    ...location, isMandatory: true,
                                                    locationKey: location?.key
                                                }),
                                            };
                                        }
                                        )}
                                        onChange={(values: any) => setSelectedLocations(values)}
                                    />
                                </div>

                                <Button disabled={!selectedLocations} className="basis-[10%]" variant="secondary" onClick={() => {
                                    console.log(JSON.parse(selectedLocations)?.key)
                                    formik.values.locations?.find((location: any) => location?.key == JSON.parse(selectedLocations)?.key) ? toast.error("Location already added") : formik.setFieldValue("locations", [...formik.values.locations, JSON.parse(selectedLocations)])
                                    setSelectedLocations("")
                                }}>Add</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <LocationTable selectedLocations={formik.values.locations || []} setFieldValue={formik.setFieldValue} values={formik.values} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <Button
                            onClick={() => {

                                setNameError("");
                                setDefectName("");
                                setDefectCode("");
                                closeModal();
                            }}
                            type="button"
                            variant="outline"
                        >
                            Close
                        </Button>
                        <Button
                            disabled={formik.isSubmitting || !formik.values.name || formik.values.locations?.length === 0 || formik.values.tradeCodes?.length === 0}
                            onClick={() => formik.handleSubmit()}
                            type="button"

                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
