/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { TableCell } from "../../../components/ui/table";
import { FolderIcon, SearchIcon } from "../../../icons";
import { useParams } from "react-router";
import { projectsAtom } from "@/_recoil/states";
import { Project } from "@/lib/interface";
import { ucword } from "@/helpers";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Input from "@/components/ui/input";
DataTable.use(DT);

// Define the table data using the interface

export default function OrganizationProjectTable({ tableRef }: any) {
    const [tableData, setTableData] = useState<any>([]);
    const projects = useRecoilValue(projectsAtom);
    const { id } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");


    useEffect(() => {
        if (projects) {
            const tb = projects.filter((projects: any) => JSON.stringify(projects).toLowerCase().includes(search)).map((proj: Project) => {
                return [
                    proj.name,
                    ucword(proj.type),
                    proj.maintenanceServiceType === "before_7_year"
                        ? "Before 7 Years"
                        : "After 7 Years",
                    proj.projectTower?.length,
                    proj.numBasementLevels,
                    proj.id,
                ];
            });
            setTableData(tb);
        }
    }, [projects, search]);

    return (
        <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex items-center justify-between pb-5 w-full">
                <div className="flex items-start gap-4">
                    {/* SearchIcon bar with button */}
                    <div className="flex h-[35px] w-[30vw] items-center">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="h-[35px] py-3 px-4 rounded-l-lg rounded-r-none border-r-0 bg-gray-50 text-gray-500 text-sm focus:!ring-0"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="h-full w-[46px] rounded-l-none rounded-r-lg bg-[#1a56db]"
                        >
                            <SearchIcon className="w-4 h-4 text-white" />
                        </Button>
                    </div>
                </div>

                {/* Add Organization button */}
                <Button className="flex items-center gap-2 py-2 px-3 bg-[#1a56db]" onClick={() => navigate(`/organization/${id}/project/new`, { replace: true })}>
                    <Plus className="text-white size-6 dark:text-white/90" />
                    <span className="text-sm font-medium text-white">
                        Add New Project
                    </span>
                </Button>
            </div>
            <div className="max-w-full overflow-hidden rounded-md bg-white dark:border-white/[0.05] dark:bg-white/[0.03] px-2">
                <div className="">
                    <DataTable
                        ref={tableRef}
                        className="compact stripe"
                        data={tableData}
                        options={{
                            destroy: true,
                            paging: true,
                            searching: true,
                            columnDefs: [
                                { type: 'string', targets: "_all" },
                                { searchable: true, targets: [0, 2, 3, 1, 4] },
                                {
                                    className:
                                        "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-200 text-[12px]",
                                    targets: "_all",
                                },
                                {
                                    className:
                                        "w-[400px]",
                                    targets: [0],
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
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                    <div className="flex flex-row gap-5">
                                        <FolderIcon
                                            className="size-5 cursor-pointer"
                                            data-tooltip-id="tooltip"
                                            data-tooltip-content="View"
                                            onClick={() =>
                                                navigate(`/organization/${id}/project/view/${_data}`)
                                            }
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
                                    Project Name
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Project Type
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Maintenance & Service Type
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Towers
                                </th>
                                <th
                                    scope="col"
                                    className="!text-[14px] px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Basement Levels
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
