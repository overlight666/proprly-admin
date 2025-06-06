/* eslint-disable @typescript-eslint/no-explicit-any */
import { isLoadingAtom, LocationListAtom, TradeCodesByRegionAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import MultiSelect from "@/components/ui/multiselect";
import Select from "@/components/ui/select";
import { Label } from "flowbite-react";
import { useEffect, useState } from "react";
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
    isEdit,
    setInitialValues
}: any) {
    const [_defectName, setDefectName] = useState<any>("");
    const [_defectCode, setDefectCode] = useState<any>("");
    const [_nameError, setNameError] = useState<any>("");
    const [type, setType] = useState<any>("");
    const tradeCodes = useRecoilValue(TradeCodesByRegionAtom);
    const locationList = useRecoilValue(LocationListAtom);
    const [codeList, setCodeList] = useState([])
    const [selectedLocations, setSelectedLocations] = useState<any>("");
    const itpAction = useITPAction();
    const setIsLoading = useSetRecoilState(isLoadingAtom);
    const [isInit, setIsInit] = useState(false)

    useEffect(() => {
        if (tradeCodes) {
            const promise = tradeCodes?.map((tradeCode: any) => {
                return {
                    text: `${tradeCode?.tradeCode} - ${tradeCode?.tradeName}`,
                    value: tradeCode?.id,
                };
            })
            Promise.all([promise]).then((value: any) => {
                setCodeList(value[0]);
                setIsInit(true);
            })
        }

    }, [tradeCodes])

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
                if (params !== "") {
                    delete values.isDefault
                }
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
                onClose={() => {
                    setInitialValues({
                        name: "",
                        isDefault: true,
                        tradeCodes: [],
                        locations: []
                    })
                    formik.setFieldValue("tradeCodes", [])
                    closeModal();
                }}
                className="max-w-[700px] p-6 lg:p-10"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            {`${isEdit ? "Edit" : "Add"} ITP Template Management`}
                        </h5>
                    </div>
                    <div className="mt-8 space-y-3">
                        {isInit && <div className="space-y-2">
                            <Label htmlFor="input">Select Trade Category<span className="text-red-500">*</span></Label>
                            <MultiSelect
                                label=""
                                hasLabel={false}
                                defaultSelected={formik.values.tradeCodes ?? []}
                                options={codeList}
                                onChange={(values: any) => formik.setFieldValue("tradeCodes", values)}
                            />
                        </div>}
                        <div className="space-y-2">
                            <Label htmlFor="input">Enter ITP Template Name<span className="text-red-500">*</span></Label>
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
                        <div className="grid grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="input">Select Location<span className="text-red-500">*</span></Label>
                                <div className="flex justify-between items-center gap-1 w-full">
                                    <div className="basis-[90%]">
                                        <Select
                                            placeholder="Select location"
                                            options={locationList?.map((location: any) => {
                                                return {
                                                    label: location?.name,
                                                    value: JSON.stringify({
                                                        ...location,
                                                        locationKey: location?.key
                                                    }),
                                                };
                                            }
                                            )}
                                            onChange={(values: any) => setSelectedLocations(values)}
                                        />
                                    </div>


                                </div>
                            </div>
                            <div className="flex items-end">
                                <div className="space-y-2 basis-[80%]">
                                    <Label htmlFor="input">Select Type<span className="text-red-500">*</span></Label>
                                    <div className="flex justify-between items-center gap-1 w-full">
                                        <div className="basis-[90%]">
                                            <Select
                                                placeholder="Select Tyoe"
                                                options={[
                                                    {
                                                        label: "Mandatory",
                                                        value: "mandatory"
                                                    },
                                                    {
                                                        label: "Optional",
                                                        value: "optional"
                                                    }
                                                ]
                                                }
                                                onChange={(values: any) => setType(values)}
                                            />
                                        </div>

                                    </div>

                                </div>
                                <Button type="button" disabled={!selectedLocations && !type} className="mb-1" variant="secondary" onClick={() => {
                                    const myLocation = JSON.parse(selectedLocations);
                                    myLocation.isMandatory = type == "mandatory" ? true : false;
                                    formik.values.locations?.find((location: any) => location?.key == JSON.parse(selectedLocations)?.key) ? toast.error("Location already added") : formik.setFieldValue("locations", [...formik.values.locations, myLocation])
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
                                setInitialValues({
                                    name: "",
                                    isDefault: true,
                                    tradeCodes: [],
                                    locations: []
                                });
                                formik.setFieldValue("tradeCodes", [])
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
