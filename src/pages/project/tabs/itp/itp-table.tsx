/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useRef } from "react";
import Input from "@/components/ui/input";
import { FolderClosed, Pencil, SearchIcon } from "lucide-react";
import { useRecoilValue } from "recoil";
import { TIPOptionsAtom } from "@/_recoil/states";
import { getIcons, ticketColoring } from "@/helpers/textIcons";
import { ucword } from "@/helpers";
export default function TaskTable({ tableData }: any) {
    const tableRef = useRef<any>(null);
    const optionList = useRecoilValue(TIPOptionsAtom);
    const onSearch = (value: any) => {
        tableRef?.current?.dt().search(value).draw();
    };

    return (
        <>

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
                            tasks?.itpTasks?.inspectionWorkActivity,
                            optionList?.find((list) => list.id == tasks?.itpTasks?.timingFrequencyId)?.label,
                            optionList?.find((list) => list.id == tasks?.itpTasks?.methodId)?.label,
                            tasks?.itpTasks?.acceptanceCriteria,
                            tasks?.itpTasks?.reference,
                            tasks?.comment,
                            tasks?.status || "Pending",
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
                            <div className="flex flex-row gap-4">

                                <Pencil
                                    //   onClick={() => setOpenModal(_data)}
                                    className="size-5 text-gray-200 cursor-pointer"
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="Edit"
                                    data-tooltip-place="top"
                                />
                                <FolderClosed
                                    //   onClick={() => setOpenModal(_data)}
                                    className="size-5 text-blue-700 cursor-pointer"
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="View"
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
