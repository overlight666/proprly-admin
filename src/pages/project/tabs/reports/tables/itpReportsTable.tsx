/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AllTradeCodesByKeyAtom, defectCodesAtom, ITPLocationListAtom, ItpManagementListAtom, ItpTaskSubmissionListAtom } from "@/_recoil/states";
import { useCountriesAction, useITPAction, useOrganization, useProject } from "@/_recoil/actions";
import { Label } from "flowbite-react";
import { useParams } from "react-router";
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { getIcons, ticketColoring } from "@/helpers/textIcons";
import { ucword } from "@/helpers";
import { toast } from "react-toastify";
import { DownloadIcon } from "@/icons";

export default function ITPReportsTable() {
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
    const setTaskList = useSetRecoilState(ItpTaskSubmissionListAtom);
    const [dataHolder, setDataHolder] = useState<any>();
    const params = useParams();
    const { project_id } = params;

    useEffect(() => {
        setIsType("")
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
        if (isType && selectedId) {
            itpAction.getItpTemplates("");
        }
    }, [isType, selectedId])

    useEffect(() => {
        //get itp with location
        if (isType && selectedTemplate && selectedId && !selectedFoor && !selectedTower && !selectedCommonArea && !selectedProperty) {
            const submissionParams = JSON.parse(isType);
            itpAction.getItpTemplatesReports(project_id, selectedTemplate, submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey).then((res) => {
                if (res) {
                    setDataHolder(res)
                }
            });
        }
        // get itp by construction
        if (isType && selectedTemplate && selectedId && selectedFoor && selectedTower && !selectedCommonArea && !selectedProperty) {
            const floor = JSON.parse(selectedFoor);
            itpAction.getItpTemplatesReports(project_id, selectedTemplate, floor?.taskSubmitionParams?.locationKey || '').then((res) => {
                if (res) {
                    setDataHolder(res)
                }
            });
        }

        // get itp by common area
        if (isType && selectedTemplate && selectedId && !selectedFoor && !selectedTower && selectedCommonArea && !selectedProperty) {
            // const ca = JSON.parse(selectedCommonArea);
            const submissionParams = JSON.parse(isType);
            itpAction.getItpTemplatesReports(project_id, selectedTemplate, submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey).then((res) => {
                if (res) {
                    setDataHolder(res)
                }
            });
        }
        // get itp by property
        if (isType && selectedTemplate && selectedId && !selectedFoor && !selectedTower && !selectedCommonArea && selectedProperty) {
            // const property = JSON.parse(selectedProperty);
            const submissionParams = JSON.parse(isType);
            itpAction.getItpTemplatesReports(project_id, selectedTemplate, submissionParams?.taskParataskSubmitionParams?.locationKey || submissionParams?.taskSubmitionParams?.locationKey).then((res) => {
                if (res) {
                    setDataHolder(res)
                }
            });
        }

    }, [isType, selectedId, selectedTemplate, selectedFoor, selectedTower, selectedCommonArea, selectedProperty]);

    useEffect(() => {
        if (isType) {
            setTaskList([]);
            setSelectedTemplate("");
            const params = JSON.parse(isType);
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
                        }

                    </div>

                </div>

            </div>

            <div className="mt-8 space-y-3">
                <DataTable
                    className="compact stripe"
                    data={dataHolder?.template?.tasks?.map((item) => {
                        return [
                            item?.inspectionWorkActivity || "n/a",
                            item?.timingFrequency?.label || "n/a",
                            item?.method?.label || "n/a",
                            item?.acceptanceCriteria || "n/a",
                            item?.comments || "n/a",
                            item?.subStatus || "",
                            item

                        ]
                    }) || []}
                    options={{
                        // order: [[1, "asc"]],
                        destroy: true,
                        paging: true,
                        searching: true,
                        columnDefs: [
                            { searchable: true, targets: [0, 1, 2, 3, 4, 5, 6] },
                            {
                                className:
                                    "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]",
                                targets: "_all",
                            },
                        ],

                        layout: {
                            topStart: null,
                            topEnd: null,
                            bottomStart: {
                                pageLength: {
                                    text: "Showing _START_-_END_ of _TOTAL_ Rows _MENU_",
                                },
                            },
                            bottomEnd: "paging",
                        },
                    }}
                    slots={{
                        5: (_data: any, _row: any) => (
                            <div className="flex items-center flex-nowrap">
                                <div
                                    className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all text-nowrap whitespace-nowrap
                                            ${ticketColoring(_data, true)}
                                            `}
                                >
                                    {getIcons(_data)}
                                    <span className="text-[12px]">{ucword(_data)}</span>
                                </div>
                            </div>
                        ),
                        6: (_data: any, _row: any) => (
                            <div className="flex flex-row gap-3 justify-center">

                                <DownloadIcon
                                    onClick={() => {
                                        toast.warning("Under Construction")
                                    }}
                                    className="size-5 text-green-600 dark:text-gray-200 cursor-pointer"
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="Download"
                                    data-tooltip-place="top"
                                />

                            </div>
                        ),
                    }}

                >
                    <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                        <tr>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Inspection Work Activity
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Timing/Frequency
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Method
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Acceptance Criteria
                            </th>

                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Comments
                            </th>

                            <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Status
                            </th>
                            <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                </DataTable>
            </div>

        </div>
    );
}
