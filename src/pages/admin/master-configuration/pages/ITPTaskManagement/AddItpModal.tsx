/* eslint-disable @typescript-eslint/no-explicit-any */

import { useITPAction } from "@/_recoil/actions";
import { isLoadingAtom, TIPOptionsAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import Checkbox2 from "@/components/ui/checkbox2";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/text-area";
import { itpTaskForm } from "@/lib/interface";
import { itpTaskValidattion } from "@/lib/validations";
import { Label } from "flowbite-react";
import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function AddItpModal({
    isOpen,
    closeModal,
    selectedTemplate,
    tempParams,
    isType,
    selectedId
}: any) {
    const itpOption = useRecoilValue(TIPOptionsAtom);
    const setLoading = useSetRecoilState(isLoadingAtom);
    const itpAction = useITPAction();
    const [initialValues, _setInitialValues] = useState<itpTaskForm>({
        itpTemplateId: undefined,
        methodId: undefined,
        timingFrequencyId: undefined,
        inspectionWorkActivity: undefined,
        verificationTypeId: undefined,
        acceptanceCriteria: undefined,
        reference: undefined,
        comments: undefined,
        isFinal: false
    })

    const formik = useFormik<itpTaskForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: itpTaskValidattion,
        onSubmit: async (
            values: itpTaskForm,
            _formikHelpers: FormikHelpers<itpTaskForm>,
        ) => {
            setLoading(true);
            const params =
                isType === "project"
                    ? `?projectId=${selectedId}`
                    : isType === "organization"
                        ? `?organizationId=${selectedId}`
                        : isType === "region"
                            ? `?regionId=${selectedId}`
                            : "";

            await itpAction.addITPTask(values, params).then((res) => {
                if (res) {
                    setLoading(false);
                    itpAction.getItpTasks(selectedTemplate, tempParams);
                    toast.success("ITP Task has been added!");
                    closeModal();
                    _setInitialValues({
                        itpTemplateId: undefined,
                        methodId: undefined,
                        timingFrequencyId: undefined,
                        inspectionWorkActivity: undefined,
                        verificationTypeId: undefined,
                        acceptanceCriteria: undefined,
                        reference: undefined,
                        comments: undefined,
                        isFinal: false
                    })
                }
            })
        }

    })

    useEffect(() => {
        if (selectedTemplate) {
            formik.setFieldValue("itpTemplateId", selectedTemplate)
        }
    }, [selectedTemplate])
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className="max-w-[500px] p-6 lg:p-3 max-h-[80vh] overflow-auto"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            Add ITP Task
                        </h5>
                    </div>
                    <div className="mt-1 space-y-1">
                        <div className="space-y-2">
                            <Label htmlFor="input">Inpection Work Activity<span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                name="inspectionWorkActivity"
                                onChange={formik.handleChange}
                                placeholder="Enter Inpection Work Activity"
                                error={formik.errors.inspectionWorkActivity}
                                hint={formik.errors.inspectionWorkActivity}
                            />
                        </div>

                        <div className="mt-1 space-y-2">
                            <Label>Timing/Frequency<span className="text-red-500">*</span></Label>
                            <Select
                                options={itpOption?.filter((itps) => itps.types === 'timing_frequency')?.map((option) => {
                                    return {
                                        value: option?.id,
                                        label: option?.label
                                    }
                                }) as any || []}
                                onChange={(value) => {
                                    formik.setFieldValue("timingFrequencyId", value)
                                }}
                                placeholder="Select"
                            />
                        </div>
                        <div className="mt-1 space-y-2">
                            <Label>Method<span className="text-red-500">*</span></Label>
                            <Select
                                options={itpOption?.filter((itps) => itps.types === 'method')?.map((option) => {
                                    return {
                                        value: option?.id,
                                        label: option?.label
                                    }
                                }) as any || []}
                                onChange={(value) => {
                                    formik.setFieldValue("methodId", value)
                                }}
                                placeholder="Select"
                            />
                        </div>
                        <div className="mt-1 space-y-2">
                            <Label>Type<span className="text-red-500">*</span></Label>
                            <Select
                                options={itpOption?.filter((itps) => itps.types === 'legend')?.map((option) => {
                                    return {
                                        value: option?.id,
                                        label: option?.label
                                    }
                                }) as any || []}
                                onChange={(value) => {
                                    formik.setFieldValue("verificationTypeId", value)
                                }}
                                placeholder="Select"
                            />
                        </div>
                        <div className="mt-1 space-y-2">
                            <Label>Acceptance Criteria<span className="text-red-500">*</span></Label>
                            <TextArea
                                value={formik.values.acceptanceCriteria}
                                rows={4}
                                onChange={(e) => formik.setFieldValue("acceptanceCriteria", e)}
                                placeholder="Enter Acceptance Criteria"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="input">References</Label>
                            <Input
                                type="text"
                                name="reference"
                                placeholder="Enter References"
                                onChange={formik.handleChange}
                                error={formik.errors.reference}
                                hint={formik.errors.reference}
                            />
                        </div>
                        <div className="mt-1 space-y-2">
                            <Label>Comments/Record Type</Label>
                            <TextArea
                                value={formik.values.comments}
                                rows={4}
                                onChange={(e) => formik.setFieldValue("comments", e)}
                                placeholder="Enter Comments/Record Type"
                            />
                        </div>
                        <div className="mt-1 space-y-2">
                            <Checkbox2
                                checked={formik.values.isFinal == "true" || formik.values.isFinal == true}
                                onChange={(e) => {
                                    formik.setFieldValue("isFinal", e);
                                }}
                                label="Final Task"
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
                            onClick={() => formik.submitForm()}
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
