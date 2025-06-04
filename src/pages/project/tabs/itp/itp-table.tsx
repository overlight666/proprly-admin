/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useRef, useState } from "react";
import Input from "@/components/ui/input";
import { FolderClosed, SearchIcon } from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectedItpTaskAtom, TIPOptionsAtom, uploadResponseAtom } from "@/_recoil/states";
import { getIcons, ticketColoring } from "@/helpers/textIcons";
import { ucword } from "@/helpers";
import { SubmitIcon } from "@/icons";
import SubmitTaskModal from "../modals/submit-task-modals";
import { useModal } from "@/helpers/useModal";
import PreviewModal from "../modals/preview-modal";
export default function TaskTable({ tableData }: any) {
    const tableRef = useRef<any>(null);
    const optionList = useRecoilValue(TIPOptionsAtom);
    const [selectedTask, setSelectedTask] = useState();
    const [modalType, setModalType] = useState(0);
    const setSelectedItp = useSetRecoilState(SelectedItpTaskAtom);

    const onSearch = (value: any) => {
        tableRef?.current?.dt().search(value).draw();
    };

    const { isOpen, openModal, closeModal } = useModal();
    const setUploadResponse = useSetRecoilState(uploadResponseAtom);
    return (
        <>
            {modalType == 1 && <SubmitTaskModal isOpen={isOpen} closeModal={closeModal} selectedTask={selectedTask} />}
            {modalType == 2 && <PreviewModal isOpen={isOpen} closeModal={closeModal} />}
            <div
                className="flex w-full flex-row mt-5 justify-between
      "
            >
                <div className="relative w-[36%]">
                    <Input
                        placeholder="Search"
                        type="text"
                        className="pl-[62px] "
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        <SearchIcon className="size-6" />
                    </span>
                </div>

            </div>
            <div className="mt-8 space-y-3">
                <DataTable
                    ref={tableRef}
                    className="compact stripe"
                    data={tableData?.map((tasks: any) => {
                        return [
                            tasks?.itpTask?.inspectionWorkActivity || "n/a",
                            optionList?.find((list) => list.id == tasks?.itpTask?.timingFrequencyId)?.label || "n/a",
                            optionList?.find((list) => list.id == tasks?.itpTask?.methodId)?.label || "n/a",
                            tasks?.itpTask?.acceptanceCriteria || "n/a",
                            tasks?.itpTask?.reference || "n/a",
                            tasks?.comment || "n/a",
                            tasks?.status || "Pending" || "n/a",
                            tasks
                        ]
                    }) || []}
                    options={{
                        // order: [[1, "asc"]],
                        destroy: true,
                        paging: true,
                        searching: true,
                        columnDefs: [
                            { searchable: true, targets: [0, 1, 2, 3, 4, 5] },
                            {
                                className:
                                    "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[14px]",
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
                        6: (_data: any, _row: any) => (
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
                        7: (_data: any, _row: any) => (
                            <div className="flex flex-row gap-3 justify-center">

                                {(_data.status.toLowerCase() == "pending" || _data.status.toLowerCase() == "rejected" || _data.status.toLowerCase() == "reopened") && <SubmitIcon
                                    onClick={() => {
                                        setModalType(1);
                                        setSelectedTask(_data);
                                        setUploadResponse(undefined);
                                        openModal();
                                    }}
                                    className="size-5 text-green-600 dark:text-gray-200 cursor-pointer"
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="Submit"
                                    data-tooltip-place="top"
                                />}
                                {(_data.status.toLowerCase() == "submitted" || _data.status.toLowerCase() == "accepted" || _data.status.toLowerCase() == "approved" || _data.status.toLowerCase() == "in_progress") && <FolderClosed
                                    onClick={() => {
                                        setSelectedItp(_data);
                                        setModalType(2);
                                        openModal();
                                    }}
                                    className="size-5 text-blue-700 cursor-pointer"
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="View"
                                    data-tooltip-place="top"
                                />}

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
                                References
                            </th>

                            <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Comments/Record Type
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
        </>
    );
}
