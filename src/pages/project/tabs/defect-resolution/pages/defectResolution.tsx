/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router";
import { useModal } from "@/helpers/useModal";
import { appointmentTradeCodesAtom, defectResolutionAtom, globalConfigAtom, reloadDefectsAtom } from "@/_recoil/states";
import { useDefectResolution } from "@/_recoil/actions";
import DefectResolutionModal from "@/components/modals/defectResolutionModal";
import DefectHeader from "../components/defectHeader";
import DefectItem from "../components/defectBox";
import { DefectSubmissionStatusSections } from "@/lib/interface";
import Radio from "@/components/ui/radio";

// Define the table data using the interface

export default function DefectResolution({ setTotalRows, itemOffset, pageRow }: any) {
    const { isOpen, openModal, closeModal } = useModal();
    const [selectedValue, setSelectedValue] = useState<any>("all");
    const [filter, setFilter] = useState<any>("Filter by");
    const [option, setOption] = useState<any>([]);
    const [label, setLabel] = useState("");
    const [filterValue, setFilterValue] = useState<any>();
    const tradeCodes = useRecoilValue(appointmentTradeCodesAtom);
    const { project_id } = useParams();
    const defectResolutionAction = useDefectResolution();
    const defects = useRecoilValue(defectResolutionAtom);
    const setDefects = useSetRecoilState(defectResolutionAtom);
    const isReload = useRecoilValue(reloadDefectsAtom);
    const setIsReload = useSetRecoilState(reloadDefectsAtom);
    const globalConfig = useRecoilValue(globalConfigAtom);
    const [selectedPage, setSelectedPage] = useState<string>('pending')
    const [endOffset, setEndOffset] = useState(0);



    const [search, setSearch] = useState("");


    useEffect(() => {
        if (selectedValue == "all") {
            setDefects([]);
            defectResolutionAction.getAllDefectResolutions(project_id);
        } else {
            setDefects([]);
            defectResolutionAction.getDefectResolutions(
                project_id,
                selectedValue
            );
        }
    }, [selectedValue, project_id]);

    useEffect(() => {
        if (isReload) {
            if (selectedValue == "all") {
                setDefects([]);
                defectResolutionAction.getAllDefectResolutions(project_id);
            } else {
                setDefects([]);
                defectResolutionAction.getDefectResolutions(
                    project_id,
                    selectedValue
                );
            }
            setIsReload(false)
        }

    }, [isReload])
    useEffect(() => {
        setFilterValue("");
        setOption([]);
        if (filter == "Logged By") {
            setLabel("Select logged by");
            const opt = [
                {
                    label: "Auditor",
                    value: "auditor",
                },
                {
                    label: "Owner",
                    value: "owner",
                },
                {
                    label: "Subcontractor",
                    value: "subcontractor",
                },
                {
                    label: "Tenant",
                    value: "tenant",
                },
                {
                    label: "Property Agent",
                    value: "property agent",
                },
            ];
            setOption(opt);
        } else if (filter == "Trade Category") {
            setLabel("Select trade category");
            setOption(
                tradeCodes?.map((au: any) => {
                    return {
                        label: au.tradeName,
                        value: au.id,
                    };
                })
            );
        } else if (filter == "Defect Type") {
            setLabel("Select defect type");
            const opt = [
                {
                    label: "Under-Construction",
                    value: "under_construction",
                },
                {
                    label: "Pre-settlement",
                    value: "pre_settlement",
                },
                {
                    label: "Handover",
                    value: "handover",
                },
                {
                    label: "Post-Handover",
                    value: "post_handover",
                },
            ];
            setOption(opt);
        }
    }, [filter]);

    const filteredDefects = (status: any) => {
        let results: any = defects?.filter((d) => status.includes(d.status));
        if (search.trim().length > 0) {
            results = results?.filter(
                (defect) => search !== "" && defect?.property?.unitNo === search
            );
        }
        if (filter != "Filter by" && filterValue !== "") {
            if (filter == "Logged By") {
                results = results?.filter(
                    (defect) =>
                        defect?.userRole?.roleName?.toLowerCase() ==
                        filterValue?.toLowerCase()
                );

            } else if (filter == "Trade Category") {
                results = results?.filter((defect) =>
                    defect?.defectCode?.tradeCode?.find(
                        (trade) => trade.id == filterValue
                    )
                );

            } else if (filter == "Defect Type") {
                results = results?.filter(
                    (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
                );
            }
        }
        return results
    }


    useEffect(() => {
        let pendings: any = defects?.filter((d) => d.status === "logged");
        let disputed: any = defects?.filter((d) => d.status === "disputed");
        let in_progress: any = defects?.filter((d) => d.status === "in_progress");
        let resolved: any = defects?.filter((d) => d.status === "resolved");
        if (search.trim().length > 0) {
            pendings = pendings?.filter(
                (defect) => search !== "" && defect?.property?.unitNo === search
            );
            disputed = disputed?.filter(
                (defect) => search !== "" && defect?.property?.unitNo === search
            );
            in_progress = in_progress?.filter(
                (defect) => search !== "" && defect?.property?.unitNo === search
            );
            resolved = resolved?.filter(
                (defect) => search !== "" && defect?.property?.unitNo === search
            );
        }
        if (filter != "Filter by" && filterValue !== "") {
            if (filter == "Logged By") {
                pendings = pendings?.filter(
                    (defect) =>
                        defect?.userRole?.roleName?.toLowerCase() ==
                        filterValue?.toLowerCase()
                );
                disputed = disputed?.filter(
                    (defect) =>
                        defect?.userRole?.roleName?.toLowerCase() ==
                        filterValue?.toLowerCase()
                );
                in_progress = in_progress?.filter(
                    (defect) =>
                        defect?.userRole?.roleName?.toLowerCase() ==
                        filterValue?.toLowerCase()
                );
                resolved = resolved?.filter(
                    (defect) =>
                        defect?.userRole?.roleName?.toLowerCase() ==
                        filterValue?.toLowerCase()
                );
            } else if (filter == "Trade Category") {
                pendings = pendings?.filter((defect) =>
                    defect?.defectCode?.tradeCode?.find(
                        (trade) => trade.id == filterValue
                    )
                );
                disputed = disputed?.filter((defect) =>
                    defect?.defectCode?.tradeCode?.find(
                        (trade) => trade.id == filterValue
                    )
                );
                in_progress = in_progress?.filter((defect) =>
                    defect?.defectCode?.tradeCode?.find(
                        (trade) => trade.id == filterValue
                    )
                );
                resolved = resolved?.filter((defect) =>
                    defect?.defectCode?.tradeCode?.find(
                        (trade) => trade.id == filterValue
                    )
                );
            } else if (filter == "Defect Type") {
                pendings = pendings?.filter(
                    (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
                );
                disputed = disputed?.filter(
                    (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
                );
                in_progress = in_progress?.filter(
                    (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
                );
                resolved = resolved?.filter(
                    (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
                );
            }
        }

    }, [defects, search, filter, filterValue]);

    useEffect(() => {
        if (pageRow != 'all') {
            setEndOffset(parseInt(itemOffset) + parseInt(pageRow));
        } else {
            setEndOffset(filteredDefects(globalConfig?.defectSubmissionStatusSections?.find((ds: any) => ds.key == selectedPage)?.status)?.length)
        }
        setTotalRows(filteredDefects(globalConfig?.defectSubmissionStatusSections?.find((ds: any) => ds.key == selectedPage)?.status)?.length)
    }, [selectedPage, itemOffset, pageRow])

    return (
        <div className="overflow-auto mt-5 w-full h-full">
            <DefectResolutionModal
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
            />
            <DefectHeader
                setSearch={setSearch}
                setFilter={setFilter}
                filter={filter}
                option={option}
                label={label}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
            />
            <div className="flex flex-wrap items-center gap-3 mb-3 flex-row w-full">
                <span className="text-black dark:text-white mr-5">Show Only:</span>
                <Radio
                    id="radio3"
                    name="options1"
                    value="all"
                    checked={selectedValue === "all"}
                    onChange={(e) => setSelectedValue(e)}
                    label="All"
                />
                <Radio
                    id="radio2"
                    name="options1"
                    value="property"
                    checked={selectedValue === "property"}
                    onChange={(e) => setSelectedValue(e)}
                    label="Property Defects"
                />
                <Radio
                    id="radio1"
                    name="options1"
                    value="commonArea"
                    checked={selectedValue === "commonArea"}
                    onChange={(e) => setSelectedValue(e)}
                    label="Common Area Defects"
                />
            </div>
            <div className="flex flex-col w-full mt-10">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        {
                            globalConfig?.defectSubmissionStatusSections?.map((tab: DefectSubmissionStatusSections, index: any) => {
                                return (
                                    <li className="me-2" key={index}>
                                        <a href="#" onClick={() => setSelectedPage(tab.key)} className={selectedPage !== tab.key ? `inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300` : `inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500`}>{`${tab.name} (${filteredDefects(globalConfig?.defectSubmissionStatusSections?.find((ds: any) => ds.key == tab.key)?.status)?.length})`}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {filteredDefects(globalConfig?.defectSubmissionStatusSections?.find((ds: any) => ds.key == selectedPage)?.status)?.length > 0 && <div className="w-full gap-2 grid grid-cols-1 md:grid-cols-4">
                    {
                        filteredDefects(globalConfig?.defectSubmissionStatusSections?.find((ds: any) => ds.key == selectedPage)?.status)?.slice(itemOffset, endOffset)?.map((defects, index) => {
                            return (
                                <DefectItem
                                    key={index}
                                    keyValue={index}
                                    defect={defects}
                                    openModal={openModal}
                                />
                            );
                        })
                    }
                </div>}

            </div>

        </div>
    );
}
