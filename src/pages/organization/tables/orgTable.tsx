/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";
import { Organization } from "@/lib/interface";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { TableCell } from "@/components/ui/table";
import { useNavigate } from "react-router";
import { BoxIcon, DocsIcon, ErrorIcon, FolderIcon, PencilIcon, TaskIcon } from "@/icons";
import { Badge } from "@/components/ui/badge";
DataTable.use(DT);

// Define the table data using the interface

export default function OrgTable({ filteredOrganizations }: any) {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (filteredOrganizations) {
            const tb = filteredOrganizations.map((org: Organization) => {
                return [
                    org.name,
                    org.totalProjects,
                    org.totalProperties,
                    org.defectCounts?.open,
                    org?.defectCounts?.requested,
                    org.id,
                ];
            });
            setTableData(tb);
        }
    }, [filteredOrganizations]);

    return (
        <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-10">
            <div className="max-w-full overflow-x-auto">
                <div className="">
                    <DataTable
                        className="compact stripe"
                        data={tableData}
                        options={{
                            destroy: true,
                            paging: true,
                            searching: false,
                            columnDefs: [
                                { searchable: true, targets: [0, 2, 3, 1, 4] },
                                {
                                    className:
                                        "px-4 py-3 text-gray-500 text-start text-theme-sm dark:!text-gray-200 text-[12px]",
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
                            0: (_data: any, _row: any) => (
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                    {_data}
                                </TableCell>
                            ),
                            1: (_data: any, _row: any) => (
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                    <Badge
                                        className={`flex items-center gap-1 py-0.5 px-2.5 bg-green-100 text-green-800`}
                                        variant="outline"
                                    >
                                        <BoxIcon className="text-green-800 size-3" />
                                        <span className="text-xs font-medium whitespace-nowrap">
                                            Projects: {_data}
                                        </span>
                                    </Badge>
                                </TableCell>
                            ),
                            2: (_data: any, _row: any) => (
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                    <Badge
                                        className={`flex items-center gap-1 py-0.5 px-2.5 bg-blue-100 text-blue-800`}
                                        variant="outline"
                                    >
                                        <DocsIcon className="text-blue-800 size-3" />
                                        <span className="text-xs font-medium whitespace-nowrap">
                                            Properties: {_data}
                                        </span>
                                    </Badge>
                                </TableCell>
                            ),
                            3: (_data: any, _row: any) => (
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                    <Badge
                                        className={`flex items-center gap-1 py-0.5 px-2.5 bg-red-100 text-red-800`}
                                        variant="outline"
                                    >
                                        <ErrorIcon className="text-red-800 size-3" />
                                        <span className="text-xs font-medium whitespace-nowrap">
                                            Open Defects: {_data}
                                        </span>
                                    </Badge>
                                </TableCell>
                            ),
                            4: (_data: any, _row: any) => (
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                    <Badge
                                        className={`flex items-center gap-1 py-0.5 px-2.5 bg-orange-100 text-orange-800`}
                                        variant="outline"
                                    >
                                        <TaskIcon className="text-orange-800 size-3" />
                                        <span className="text-xs font-medium whitespace-nowrap">
                                            Requested Defects: {_data}
                                        </span>
                                    </Badge>
                                </TableCell>
                            ),
                            5: (_data: any, _row: any) => (
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                    <div className="flex flex-row gap-5">
                                        <FolderIcon
                                            className="size-5 cursor-pointer"
                                            data-tooltip-id="tooltip"
                                            data-tooltip-content="View"
                                            onClick={() => navigate(`/organization/view/${_row[5]}`)}
                                        />
                                        <PencilIcon
                                            className="size-5 cursor-pointer"
                                            data-tooltip-id="tooltip"
                                            data-tooltip-content="Edit"
                                            onClick={() => {
                                                navigate(`/organization/edit/${_row[5]}`)
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
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Organization Name
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Projects
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Properties
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Open Defects
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Requested Defects
                                </th>

                                <th className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
