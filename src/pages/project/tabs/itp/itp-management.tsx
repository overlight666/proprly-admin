/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AllTradeCodesByKeyAtom, defectCodesAtom, ITPLocationListAtom, ItpManagementListAtom, ItpTaskSubmissionListAtom } from "@/_recoil/states";
import { useCountriesAction, useITPAction, useOrganization, useProject } from "@/_recoil/actions";
import { Label } from "flowbite-react";
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
    const [selectedTower, setSelectedTower] = useState<any>();
    const [selectedProperty, setSelectedProperty] = useState<any>();
    const [selectedCommonArea, setSelectedCommonArea] = useState<any>();
    const [selectedFoor, setSelectedFloor] = useState<any>();
    const [_sortedList, setSortedList] = useState<any[]>([]);
    const [towerList, setTowerList] = useState<any[]>([]);
    const [floorList, setFloorList] = useState<any[]>([]);
    const [propertyList, setPropertyList] = useState<any[]>([]);
    const [commonAreaList, setCommonAreaList] = useState<any[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>();
    const itpAction = useITPAction();
    const ItpTemplatesList = useRecoilValue(ItpManagementListAtom);
    const setItpList = useSetRecoilState(ItpManagementListAtom);
    const itpLocations: any = useRecoilValue(ITPLocationListAtom);
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
            const submissionParams = JSON.parse(isType);
            const params = `?locationId=${submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey || ''}&tradeId=${selectedId}&templateId=${selectedTemplate}`
            itpAction.getItpTasksSubmission(params);
        }
    }, [isType, selectedId, selectedTemplate]);

    useEffect(() => {
        if (isType) {
            const params = JSON.parse(isType);
            console.log(params)
            if (params?.data?.length == 0 && (!params?.taskParataskSubmitionParams || params?.taskSubmitionParams)) {
                itpAction.getItpConstructionData(project_id, params?.key).then((res) => {
                    setTowerList(res)
                })
            } else {
                if (params?.data?.length > 0 && params?.key == "property") {
                    setPropertyList(params?.data);
                } else if (params?.data?.length > 0 && params?.key == "common_area") {
                    setCommonAreaList(params?.data);
                }
            }
        }
    }, [isType])

    useEffect(() => {
        setItpList([]);
        if (isType) {
            setAllCategory([]);
            const submissionParams = JSON.parse(isType);
            if (submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey) {
                itpAction.getAllTradeCodeByKey(submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey || '', project_id)
            }

        }

    }, [isType])

    useEffect(() => {
        if (selectedProperty) {
            const parsedData = JSON.parse(selectedProperty);
            itpAction.getAllTradeCodeByKey(parsedData?.taskSubmitionParams?.locationKey || '', project_id)
        }
    }, [selectedProperty])

    useEffect(() => {
        if (selectedCommonArea) {
            const parsedData = JSON.parse(selectedCommonArea);
            itpAction.getAllTradeCodeByKey(parsedData?.taskSubmitionParams?.locationKey || '', project_id)
        }
    }, [selectedCommonArea])

    useEffect(() => {
        if (selectedTower) {
            const parsedTowers = JSON.parse(selectedTower);
            setFloorList(parsedTowers?.children)
        }
    }, [selectedTower])

    useEffect(() => {
        if (selectedFoor) {
            const parsedFloors = JSON.parse(selectedFoor);
            itpAction.getAllTradeCodeByKey(parsedFloors?.taskSubmitionParams?.locationKey || '', project_id)
        }
    }, [selectedFoor])


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
                            Select Location<span className="text-red-500">*</span>
                        </Label>
                        <select
                            id="timeslot"
                            name="timeslot"
                            value={isType}
                            onChange={(e) => {
                                setSelectedId(undefined);
                                setDefectCodes([]);
                                setIsType(e.target.value);
                                setTowerList([]);
                                setFloorList([]);
                                setCommonAreaList([]);
                                setPropertyList([]);
                                selectedCommonArea("");
                                selectedProperty("");
                                selectedFoor("");
                                selectedCommonArea("");
                            }}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        >
                            <option value="" selected disabled>
                                Please Select
                            </option>
                            {
                                itpLocations.locationList.map((location: any, index: number) => {
                                    return (
                                        <option key={index} value={JSON.stringify(location)}>
                                            {location?.title}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="w-[45%] flex flex-col gap-4">
                        {isType && propertyList?.length > 0 && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Property<span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="tower"
                                    name="tower"
                                    value={selectedProperty}
                                    onChange={(e) => setSelectedProperty(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {propertyList?.map((props) => {
                                        return <option value={JSON.stringify(props)}>{`Unit No ${props?.unitNo}, Lot No ${props?.lotNo}`}</option>;
                                    })}
                                </select>
                            </div>
                        )}
                        {isType && commonAreaList?.length > 0 && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Common Area<span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="tower"
                                    name="tower"
                                    value={selectedCommonArea}
                                    onChange={(e) => setSelectedCommonArea(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {commonAreaList?.map((props) => {
                                        return <option value={JSON.stringify(props)}>{`CA Lot No ${props?.lotNo}`}</option>;
                                    })}
                                </select>
                            </div>
                        )}
                        {isType && towerList?.length > 0 && (
                            <div className="flex flex-col">
                                <Label>
                                    Select Tower/Basement<span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="tower"
                                    name="tower"
                                    value={selectedTower}
                                    onChange={(e) => setSelectedTower(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {towerList?.map((towers) => {
                                        return <option value={JSON.stringify(towers)}>{towers?.title}</option>;
                                    })}
                                </select>
                            </div>
                        )}
                        {isType && towerList?.length > 0 && floorList?.length > 0 && (
                            <div className="flex flex-col ">
                                <Label>
                                    Select Floor<span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="floor"
                                    name="floor"
                                    value={selectedFoor}
                                    onChange={(e) => setSelectedFloor(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {floorList?.map((towers) => {
                                        return <option value={JSON.stringify(towers)}>{towers?.title}</option>;
                                    })}
                                </select>
                            </div>
                        )}
                        {isType && allCategory?.length > 0 && (
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
