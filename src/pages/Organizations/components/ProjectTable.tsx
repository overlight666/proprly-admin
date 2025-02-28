/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";

import { useNavigate } from "react-router";
import { Project } from "../../../_types";
import { useRecoilValue } from "recoil";
import { projectsAtom } from "../../../_state";
import { TableCell } from "../../../components/ui/table";
import { FolderIcon } from "../../../icons";
import { ucword } from "../../../_helpers";
import { useParams } from "react-router";
DataTable.use(DT);

// Define the table data using the interface

export default function ProjectTable({ tableRef }: any) {
  const [tableData, setTableData] = useState<any>([]);
  const projects = useRecoilValue(projectsAtom);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (projects) {
      const tb = projects.map((proj: Project) => {
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
  }, [projects]);

  return (
    <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
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
                { searchable: true, targets: [0, 2, 3, 1, 4] },
                {
                  className:
                    "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400",
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
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex flex-row gap-5">
                    <FolderIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="View"
                      onClick={() =>
                        navigate(`/organization/${id}/project/${_data}`)
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
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Project Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Project Type
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Maintenance & Service Type
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Towers
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Basement Levels
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
