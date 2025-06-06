/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { TableCell } from "@/components/ui/table";
import { TrashBinIcon } from "@/icons";

export default function LocationTable({ selectedLocations, setFieldValue }: any) {

    const locationToDelete = (location: any, selectedLocations: any) => {
        setFieldValue(
            "locations",
            selectedLocations.filter(
                (item: any) =>
                    item?.key !== location?.key
            )
        );
    }

    return (
        <>
            <div className="mt-8 space-y-3">
                <DataTable
                    className="compact stripe"
                    data={selectedLocations?.map((data) => {
                        return [
                            data?.name || "undefined",
                            data?.isMandatory ? "Mandatory" : "Optional",
                            data,
                            selectedLocations,
                        ];
                    }) || []}
                    options={{
                        // order: [[1, "asc"]],
                        destroy: true,
                        paging: true,
                        searching: true,
                        columnDefs: [
                            { searchable: true, targets: [0, 1] },
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
                        2: (_data: any, _row: any) => (
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                <div className="flex gap-3">
                                    <TrashBinIcon
                                        className="size-5 text-red-700 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Delete"
                                        data-tooltip-place="top"
                                        onClick={() => {
                                            locationToDelete(_data, _row[3]);
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
                                Location
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Type
                            </th>
                            <th
                                scope="col"
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Actions
                            </th>

                        </tr>
                    </thead>
                </DataTable>
            </div>
        </>
    );
}
