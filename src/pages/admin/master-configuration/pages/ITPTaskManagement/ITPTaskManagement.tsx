/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allProjectsAtom, defectCodesAtom, ItpManagementListAtom, ItpTaskListAtom, organizationsAtom, regionsAtom } from "@/_recoil/states";
import { useCountriesAction, useITPAction, useOrganization, useProject } from "@/_recoil/actions";
import { Label } from "flowbite-react";
import { Project } from "@/lib/interface";

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
    const projectList: Project[] = useRecoilValue(allProjectsAtom);
    const orglist: any = useRecoilValue(organizationsAtom);
    const regionList: any[] = useRecoilValue(regionsAtom);
    const itpAction = useITPAction();
    const ItpTemplatesList = useRecoilValue(ItpManagementListAtom);
    const setItpList = useSetRecoilState(ItpManagementListAtom);

    const taskList = useRecoilValue(ItpTaskListAtom);

    useEffect(() => {
        orgAction.getOrganizations();
        projectAction.getAllProjects();
        regionAction.getRegions();
    }, []);

    useEffect(() => {
        if (isType) {
            const params =
                isType === "project"
                    ? `?projectId=${selectedId}`
                    : isType === "organization"
                        ? `?organizationId=${selectedId}`
                        : isType === "region"
                            ? `?regionId=${selectedId}`
                            : "";
            if (selectedId || isType === "default") {
                // setIsLoading(true);
                setItpList([]);
                Promise.all([
                    itpAction.getItpTemplates(params),
                    itpAction.getTradeCode(params)]).then(() => {
                        // setTimeout(() => {
                        //     setIsLoading(false)
                        // }, 1000);

                    })
            }
        }
    }, [isType, selectedId]);

    useEffect(() => {
        if (selectedTemplate) {
            const params =
                isType === "project"
                    ? `?projectId=${selectedId}`
                    : isType === "organization"
                        ? `?organizationId=${selectedId}`
                        : isType === "region"
                            ? `?regionId=${selectedId}`
                            : "";

            if (selectedId || isType === "default") {
                const templateParams = params ? `${params}&itpTemplatesId=${selectedTemplate}` : `?itpTemplatesId=${selectedTemplate}`;
                itpAction.getItpTasks(templateParams);
            }
        }
    }, [selectedTemplate])

    useEffect(() => {
        setItpList([]);
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
                                setSelectedId(undefined);
                                setDefectCodes([]);
                                setIsType(e.target.value);
                            }}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="" selected>
                                Please Select
                            </option>
                            <option value="default">Default</option>
                            <option value="project">Project</option>
                            <option value="organization">Organization</option>
                            <option value="region">Region</option>
                        </select>
                    </div>
                    <div className="w-[45%]">
                        {isType === "project" && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Project<span className="text-error-500">*</span>
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
                                    {projectList?.map((project) => {
                                        return <option value={project?.id}>{project.name}</option>;
                                    })}
                                </select>
                            </div>
                        )}
                        {isType === "organization" && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Organization<span className="text-error-500">*</span>
                                </Label>
                                <select
                                    id="organization"
                                    name="organization"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {orglist?.map(
                                        (organization: any) => {
                                            return (
                                                <option value={organization?.id}>
                                                    {organization?.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        )}

                        {isType === "region" && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Region<span className="text-error-500">*</span>
                                </Label>
                                <select
                                    id="region"
                                    name="region"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {regionList?.map((region) => {
                                        return (
                                            <option value={region?.id}>{region.regionName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}

                    </div>
                    <div>
                        {
                            ItpTemplatesList?.length > 0 && <div className="flex flex-col">
                                <Label>
                                    Select ITP Category<span className="text-error-500">*</span>
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
                                    {ItpTemplatesList?.map((template) => {
                                        return <option value={template?.id}>{template.name}</option>;
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
