/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TemplateTable from "./TemplateTable";
import { useSetRecoilState } from "recoil";

import AddITP from "./AddITP";
import { useCountriesAction, useOrganization, useProject } from "@/_recoil/actions";
import { defectCodesAtom } from "@/_recoil/states";
import { useModal } from "@/helpers/useModal";
import { Label } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function TemplateManagement() {
    const [isType, setIsType] = useState("");
    const orgAction = useOrganization();
    const projectAction = useProject();
    const regionAction = useCountriesAction();
    const setDefectCodes = useSetRecoilState(defectCodesAtom);
    const [sortedList, _setSortedList] = useState<any[]>([]);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        orgAction.getOrganizations();
        projectAction.getAllProjects();
        regionAction.getRegions();
    }, []);

    return (
        <div>
            <div className="flex items-end justify-between flex-wrap gap-1">
                <div className="flex flex-row items-center gap-5 w-[80%] flex-wrap">
                    <div className="w-[45%]">
                        <Label>
                            Select Type<span className="text-error-500">*</span>
                        </Label>
                        <select
                            id="timeslot"
                            name="timeslot"
                            value={isType}
                            onChange={(e) => {
                                setDefectCodes([]);
                                setIsType(e.target.value);
                            }}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="" selected>
                                Please Select
                            </option>
                            <option value="default">Type 1</option>
                            <option value="project">Type 2</option>
                            <option value="organization">Type 3</option>
                            <option value="region">Type 4</option>
                        </select>
                    </div>

                </div>
                <Button
                    onClick={() => openModal()}
                    disabled={!isType}
                    type="button"
                >
                    <div className="flex items-center">
                        <PlusIcon />
                        Add
                    </div>
                </Button>
            </div>

            <TemplateTable
                tableData={sortedList?.map((_codes, _index) => {
                    return [];
                })}
            />

            <AddITP
                isOpen={isOpen}
                closeModal={closeModal}
            />
        </div>
    );
}
