/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";
import { Organization } from "../../_types";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { TableCell } from "../../components/ui/table";
import { FolderIcon, PencilIcon } from "../../icons";
import { useNavigate } from "react-router";
import React from "react";
DataTable.use(DT);

// Define the table data using the interface

export default function OrgTable({ orglist }: any) {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (orglist) {
      const tb = orglist.map((org: Organization) => {
        return [
          org.name,
          org.totalProjects,
          org.totalProperties,
          org.defectCounts?.open,
          org?.defectCounts?.in_progress,
          org.id,
        ];
      });
      setTableData(tb);
    }
  }, [orglist]);

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
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {_data}
                </TableCell>
              ),
              1: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {_data}
                </TableCell>
              ),
              2: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {_data}
                </TableCell>
              ),
              3: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {_data}
                </TableCell>
              ),
              4: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {_data}
                </TableCell>
              ),
              5: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex flex-row gap-5">
                    <FolderIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="View"
                      onClick={() => navigate(`/organization/${_data}`)}
                    />
                    <PencilIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Edit"
                      onClick={() => {
                        navigate(`/organization/edit?id=${_data}`);
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
                  Organization Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Projects
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Properties
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Open Defects
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Defects In-progress
                </th>

                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
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
