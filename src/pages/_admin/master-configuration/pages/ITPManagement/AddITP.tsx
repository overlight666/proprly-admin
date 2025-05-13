/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Label } from "flowbite-react";
import { useState } from "react";

export default function AddITP({
    isOpen,
    closeModal,
}: any) {
    const [_defectName, setDefectName] = useState<any>("");
    const [_defectCode, setDefectCode] = useState<any>("");
    const [_nameError, setNameError] = useState<any>("");
    const [codeError, setCodeError] = useState<any>("");

    function onSubmit() {
    }

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
                            Add Template Management
                        </h5>
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="input">Select Trade Category<span className="text-error-500">*</span></Label>
                            <Select
                                options={[
                                    {
                                        label: "TC 1",
                                        value: "in_progress",
                                    },
                                    {
                                        label: "TC 2",
                                        value: "resolved",
                                    },
                                ]}
                                placeholder="Select trade category"
                                className="dark:bg-dark-900"
                                containerClass="w-[100%]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="input">Enter ITP Template Name<span className="text-error-500">*</span></Label>
                            <Input
                                type="text"
                                onChange={(e) => setDefectCode(e.target.value)}
                                placeholder="ITP Template Name"
                                error={codeError !== ""}
                                hint={codeError}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <button
                            onClick={() => {
                                setCodeError("");
                                setNameError("");
                                setDefectName("");
                                setDefectCode("");
                                closeModal();
                            }}
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => onSubmit()}
                            type="button"
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
