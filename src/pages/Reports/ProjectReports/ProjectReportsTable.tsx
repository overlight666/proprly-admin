/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from "recoil";
import { selectedProjectAtom } from "../../../_state";
import { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { DownloadIcon } from "../../../icons";
import { TableCell } from "../../../components/ui/table";
import React from "react";

export default function ProjectReportsTable({ tableRef }: any) {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProject) {
      const filteredData = selectedProject?.report?.map(
        (obj: any, index: number) => {
          return [
            index + 1,
            obj?.reportName,
            moment(obj?.createdAt).format("lll"),
            obj?.reportUrl,
          ];
        }
      );
      setTableData(filteredData || []);
    }
  }, [selectedProject]);

  return (
    <>
      <div className="mt-8 space-y-3">
        <DataTable
          ref={tableRef}
          className="compact stripe"
          data={tableData}
          options={{
            // order: [[1, "asc"]],
            destroy: true,
            paging: true,
            searching: true,
            columnDefs: [
              { searchable: true, targets: [0, 1, 2, 3] },
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
            3: (_data: any, _row: any) => (
              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                <a
                  href={_data}
                  target="_blank"
                  download={`${_row[1]}.pdf`}
                  rel="noreferrer"
                >
                  <DownloadIcon
                    //   onClick={() => setOpenModal(_data)}
                    className="size-5 text-blue-700 cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  />
                </a>
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
                Sr No
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Property Report Name
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date Created
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
