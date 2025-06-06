/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useRef } from "react";
import { useModal } from "@/helpers/useModal";
import Input from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BulkIcon } from "@/icons";
import { ITPTask } from "@/lib/interface";
import AddItpModal from "./AddItpModal";

export default function TaskTable({ tableData, isType, selectedTemplate, tempParams, selectedId }: any) {
    const tableRef = useRef<any>(null);
    const { openModal, isOpen, closeModal } = useModal();
    const onSearch = (value: any) => {
        tableRef?.current?.dt().search(value).draw();
    };
    return (
        <>
            <AddItpModal isOpen={isOpen}
                selectedTemplate={selectedTemplate}
                tempParams={tempParams}
                isType={isType}
                selectedId={selectedId}
                closeModal={closeModal} />
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
                <div className="flex gap-2">
                    <Button
                        onClick={() => openModal()}
                        disabled={!isType || !selectedTemplate}
                        type="button"
                    >
                        <div className="flex items-center gap-2">
                            <BulkIcon />
                            Bulk Upload
                        </div>
                    </Button>
                    <Button
                        onClick={() => openModal()}
                        type="button"
                        variant="outline"
                        disabled={!isType || !selectedTemplate}
                    >
                        <div className="flex items-center gap-2">
                            <PlusIcon />
                            Add
                        </div>
                    </Button>
                </div>
            </div>
            <div className="mt-8 space-y-3">
                <DataTable
                    ref={tableRef}
                    className="compact stripe"
                    data={tableData?.map((tasks: ITPTask) => {
                        return [
                            tasks?.inspectionWorkActivity,
                            tasks?.timingFrequency?.label,
                            tasks?.method?.label,
                            tasks?.acceptanceCriteria,
                            tasks?.reference,
                            tasks?.comments,
                            // tasks?.isFinal
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
                // slots={{
                //     6: (_data: any, _row: any) => (
                //         <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                //             <span>{_data == "true" || _data == true ? "YES" : "NO"}</span>
                //         </TableCell>
                //     )
                // }}

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
                            {/* <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Final Task
                            </th> */}
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </>
    );
}
