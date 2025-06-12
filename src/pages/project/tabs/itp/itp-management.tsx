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
    // const ItpTemplatesList = useRecoilValue(ItpManagementListAtom);
    const setItpList = useSetRecoilState(ItpManagementListAtom);

    const itpLocations: any = useRecoilValue(ITPLocationListAtom);
    const [myTemplates, setMytemplates] = useState<any[]>([]);
    const [allCategory, setAllCategory] = useRecoilState(AllTradeCodesByKeyAtom);
    // const taskList = useRecoilValue(ItpTaskSubmissionListAtom);
    const setTaskList = useSetRecoilState(ItpTaskSubmissionListAtom);
    const [reload, setReload] = useState("");
    const [dataHolder, setDataHolder] = useState<any>();
    const params = useParams();
    const { project_id } = params;

    useEffect(() => {
        setMytemplates([]);
        setIsType("");
        setTaskList([]);
        setSelectedId("");
        setDefectCodes([]);
        setTowerList([]);
        setFloorList([]);
        setCommonAreaList([]);
        setPropertyList([]);
        setSelectedCommonArea("");
        setSelectedProperty("");
        setSelectedFloor("");
        setDataHolder(undefined);
        setSelectedTemplate("");
        setSelectedTower("");
    }, [project_id])

    useEffect(() => {
        orgAction.getOrganizations();
        projectAction.getAllProjects();
        regionAction.getRegions();
    }, []);

    useEffect(() => {
        if (isType && !selectedTemplate && selectedId && !selectedFoor && !selectedTower && !selectedCommonArea && !selectedProperty) {
            const submissionParams = JSON.parse(isType);
            const params = `?locationKey=${submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey || ''}`
            itpAction.getItpTemplatesByLocation(project_id, params).then((tempaltes) => {
                setMytemplates(tempaltes)
            });

        }
        if (isType && !selectedTemplate && selectedId && selectedFoor && selectedTower && !selectedCommonArea && !selectedProperty) {
            const floor = JSON.parse(selectedFoor);
            const params = `?locationKey=${floor?.taskSubmitionParams?.locationKey || ''}&tradeId=${selectedId}`
            itpAction.getItpTemplatesByLocation(project_id, params).then((tempaltes) => {
                setMytemplates(tempaltes)
            });
        }
        if (isType && !selectedTemplate && selectedId && !selectedFoor && !selectedTower && selectedCommonArea && !selectedProperty) {
            const submissionParams = JSON.parse(isType);
            const ca = JSON.parse(selectedCommonArea);
            const params = `?locationKey=${submissionParams.key}&commonAreaCategoryId=${ca.id}&tradeId=${selectedId}`
            itpAction.getItpTemplatesByLocation(project_id, params).then((tempaltes) => {
                setMytemplates(tempaltes)
            });
        }
        if (isType && !selectedTemplate && selectedId && !selectedFoor && !selectedTower && !selectedCommonArea && selectedProperty) {
            const property = JSON.parse(selectedProperty);
            const submissionParams = JSON.parse(isType);
            const params = `?locationKey=${submissionParams.key}&tradeId=${selectedId}&propertyId=${property.id}`
            itpAction.getItpTemplatesByLocation(project_id, params).then((tempaltes) => {
                setMytemplates(tempaltes)
            });
        }
    }, [isType, selectedId, selectedTemplate, selectedFoor, selectedTower, selectedCommonArea, selectedProperty, reload])

    // useEffect(() => {
    //     //get itp with location
    //     if (isType && selectedTemplate && selectedId && !selectedFoor && !selectedTower && !selectedCommonArea && !selectedProperty) {
    //         const submissionParams = JSON.parse(isType);
    //         const params = `?locationId=${submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey || ''}&tradeId=${selectedId}&templateId=${selectedTemplate}`
    //         itpAction.getItpTasksSubmission(project_id, dataHolder?.key, params);

    //     }
    //     // get itp by construction
    //     if (isType && selectedTemplate && selectedId && selectedFoor && selectedTower && !selectedCommonArea && !selectedProperty) {
    //         const floor = JSON.parse(selectedFoor);
    //         const params = `?locationKey=${floor?.taskSubmitionParams?.locationKey || ''}&tradeId=${selectedId}&templateId=${JSON.parse(selectedTemplate).id}`
    //         itpAction.getItpTasksSubmissionByKey(project_id, dataHolder?.key, params).then((res) => {
    //             setTaskList(res?.data || res)
    //         })
    //     }

    //     // get itp by common area
    //     if (isType && selectedTemplate && selectedId && !selectedFoor && !selectedTower && selectedCommonArea && !selectedProperty) {
    //         const ca = JSON.parse(selectedCommonArea);
    //         const params = `?tradeId=${selectedId}&templateId=${JSON.parse(selectedTemplate).id}`
    //         itpAction.getItpTasksSubmissionByCommonArea(project_id, ca?.id, params).then((res) => {
    //             setTaskList(res?.data || res)
    //         })
    //     }
    //     // get itp by property
    //     if (isType && selectedTemplate && selectedId && !selectedFoor && !selectedTower && !selectedCommonArea && selectedProperty) {
    //         const property = JSON.parse(selectedProperty);
    //         const params = `?tradeId=${selectedId}&templateId=${JSON.parse(selectedTemplate).id}`
    //         itpAction.getItpTasksSubmissionByProperty(project_id, property?.id, params).then((res) => {
    //             setTaskList(res?.data || res)
    //         })
    //     }

    // }, [isType, selectedId, selectedTemplate, selectedFoor, selectedTower, selectedCommonArea, selectedProperty, reload]);

    useEffect(() => {
        if (isType) {
            setTaskList([]);
            setSelectedTemplate("");
            const params = JSON.parse(isType);
            setDataHolder(params)
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
                <div className="flex flex-col gap-5 w-full flex-wrap">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        <div className="flex flex-col">
                            <Label>
                                Select Location<span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="timeslot"
                                name="timeslot"
                                value={isType}
                                onChange={(e) => {
                                    setIsType(e.target.value);
                                    setTaskList([]);
                                    setSelectedId("");
                                    setDefectCodes([]);
                                    setTowerList([]);
                                    setFloorList([]);
                                    setCommonAreaList([]);
                                    setPropertyList([]);
                                    setSelectedCommonArea("");
                                    setSelectedProperty("");
                                    setSelectedFloor("");
                                    setDataHolder(undefined);
                                    setSelectedTemplate("");
                                    setSelectedTower("");
                                    setMytemplates([]);
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
                                    Select Trade Category<span className="text-red-500">*</span>
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
                        {
                            myTemplates?.length > 0 && <div className="flex flex-col">
                                <Label>
                                    Select ITP Template<span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="selectedTemplate"
                                    name="selectedTemplate"
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                >
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    {myTemplates?.map((project) => {
                                        return <option value={JSON.stringify(project)}>{project.name}</option>;
                                    })}

                                </select>
                            </div>
                        }
                        {/* {
                            ItpTemplatesList?.length > 0 && <div className="flex flex-col">
                                <Label>
                                    Select ITP Template<span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="selectedTemplate"
                                    name="selectedTemplate"
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
                        } */}

                    </div>

                </div>

            </div>

            <TaskTable
                setReload={setReload}
                tableData={selectedTemplate ? JSON.parse(selectedTemplate).tasks : []}
                isType={isType}
            />

        </div>
    );
}
