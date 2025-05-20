/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useRef, useState } from "react";
import { useITPAction } from "@/_recoil/actions";
import Input from "@/components/ui/input";
import { PencilIcon, SearchIcon } from "lucide-react";
import { TableCell } from "@/components/ui/table";
import { TrashBinIcon } from "@/icons";
import { confirm } from "@/components/ui/confirm-dialog";
import { toast } from "react-toastify";

export default function TemplateTable({ tableData, openModal, setInitialValues, setIsEdit }: any) {
    const tableRef = useRef<any>(null);
    const onSearch = (value: any) => {
        tableRef?.current?.dt().search(value).draw();
    };

    const itpAction = useITPAction();
    return (
        <>

            <div
                className="flex w-full flex-row mt-5
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
                    data={tableData?.map((data, index) => {
                        return [
                            index + 1,
                            data?.name,
                            data?.tradeCodes?.map((trade: any) => trade?.tradeName).join(", "),
                            data?.locations?.map((location: any) => location?.locationName).join(", "),
                            data,
                        ];
                    }) || []}
                    options={{
                        // order: [[1, "asc"]],
                        destroy: true,
                        paging: true,
                        searching: true,
                        columnDefs: [
                            { searchable: true, targets: [0, 1, 2, 3, 4] },
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
                        4: (_data: any, _row: any) => (
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                <div className="flex gap-3">
                                    <PencilIcon
                                        className="size-5 text-blue-700 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Edit"
                                        data-tooltip-place="top"
                                        onClick={() => {
                                            setIsEdit(true)
                                            let params: any = { ..._data };
                                            params.tradeCodes = _data?.tradeCodes?.map((trade: any) => trade?.id);
                                            params.locations = _data?.locations?.map((location: any) => {
                                                return {
                                                    ...location,
                                                    key: location?.locationKey,
                                                    name: location?.locationName,
                                                }
                                            });

                                            setInitialValues(params);
                                            openModal();
                                        }}
                                    />

                                    <TrashBinIcon
                                        className="size-5 text-red-700 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Delete"
                                        data-tooltip-place="top"
                                        onClick={async () => {
                                            if (
                                                await confirm({
                                                    confirmText: "Delete",
                                                    confirmVariant: "destructive",
                                                    confirmation:
                                                        "You are about to delete this ITP template. Please confirm to continue!",
                                                })
                                            ) {
                                                itpAction
                                                    .deleteITPTemplate(_data.id)
                                                    .then((res) => {
                                                        if (res && !res?.message) {
                                                            toast.warning(
                                                                `${_data.name} has been deleted!`
                                                            );
                                                        }

                                                    })
                                                    .catch((e) => {
                                                        toast.error(e);
                                                    });
                                            }
                                        }}
                                    />


                                </div>
                            </TableCell>
                        ),
                    }}
                >
                    <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                        <tr>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                SR No
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                ITP Template
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Trade Category
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Mapped Location
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
