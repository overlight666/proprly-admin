/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AllTradeCodesByKeyAtom, defectCodesAtom, ITPLocationListAtom, ItpManagementListAtom, ItpTaskSubmissionListAtom } from "@/_recoil/states";
import { useCountriesAction, useITPAction, useOrganization, useProject } from "@/_recoil/actions";
import { Label } from "flowbite-react";
import { ItpLocation } from "@/lib/interface";
import TaskTable from "./itp-table";
import { useParams } from "react-router";

export default function ITPTaskManagement() {
    const [isType, setIsType] = useState("");
    const defectCodeList: any[] = useRecoilValue(defectCodesAtom);
    const orgAction = useOrganization();
    const projectAction = useProject();
    const regionAction = useCountriesAction();
    const setDefectCodes = useSetRecoilState(defectCodesAtom);
    const [selectedId, setSelectedId] = useState<any>();
    const [_sortedList, setSortedList] = useState<any[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>();
    const itpAction = useITPAction();
    const ItpTemplatesList = useRecoilValue(ItpManagementListAtom);
    const setItpList = useSetRecoilState(ItpManagementListAtom);
    const itpLocations = useRecoilValue(ITPLocationListAtom);
    const [allCategory, setAllCategory] = useRecoilState(AllTradeCodesByKeyAtom);
    const taskList = useRecoilValue(ItpTaskSubmissionListAtom);
    const params = useParams();
    const { project_id } = params;

    useEffect(() => {
        orgAction.getOrganizations();
        projectAction.getAllProjects();
        regionAction.getRegions();
    }, []);

    useEffect(() => {
        if (isType && selectedId) {
            itpAction.getItpTemplates("");
        }
    }, [isType, selectedId])

    useEffect(() => {
        if (isType && selectedTemplate && selectedId) {
            const params = `?locationId=${isType}&tradeId=${selectedId}&templateId=${selectedTemplate}`
            itpAction.getItpTasksSubmission(params);
        }
    }, [isType, selectedId, selectedTemplate]);

    useEffect(() => {
        setItpList([]);
        if (isType) {
            setAllCategory([]);
            itpAction.getAllTradeCodeByKey(isType, project_id)
        }

    }, [isType])

    function dynamicSort(property) {
        return function (a, b) {
            return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        };
    }

    useEffect(() => {
        if (defectCodeList) {
            const copyList = [...defectCodeList];
            copyList.sort(dynamicSort("id"));
            setSortedList(copyList);
        }
    }, [defectCodeList]);


    return (
        <div>
            <div className="flex items-end justify-between flex-wrap gap-1">
                <div className="flex flex-col gap-5 w-[80%] flex-wrap">
                    <div className="w-[45%]">
                        <Label>
                            Select Location<span className="text-error-500">*</span>
                        </Label>
                        <select
                            id="timeslot"
                            name="timeslot"
                            value={isType}
                            onChange={(e) => {
                                setSelectedId(undefined);
                                setDefectCodes([]);
                                setIsType(e.target.value);
                            }}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="" selected disabled>
                                Please Select
                            </option>
                            {
                                itpLocations?.map((location: ItpLocation, index: any) => {
                                    return (
                                        <option key={index} value={location?.key}>
                                            {location?.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="w-[45%]">
                        {isType && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Trade Category<span className="text-error-500">*</span>
                                </Label>
                                <select
                                    id="project"
                                    name="project"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {allCategory?.map((trade) => {
                                        return <option value={trade?.id}>{`${trade?.tradeCode} - ${trade?.tradeName}`}</option>;
                                    })}
                                </select>
                            </div>
                        )}


                    </div>
                    <div className="w-[45%]">
                        {
                            ItpTemplatesList?.length > 0 && <div className="flex flex-col">
                                <Label>
                                    Select ITP Template<span className="text-error-500">*</span>
                                </Label>
                                <select
                                    id="project"
                                    name="project"
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {ItpTemplatesList?.map((project) => {
                                        return <option value={project?.id}>{project.name}</option>;
                                    })}

                                </select>
                            </div>
                        }
                    </div>
                </div>

            </div>

            <TaskTable
                tableData={taskList ?? []}
                isType={isType}
            />

        </div>
    );
}
