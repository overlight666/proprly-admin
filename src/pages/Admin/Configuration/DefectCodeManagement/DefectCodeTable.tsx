/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import React, { useRef } from "react";
import { TableCell } from "../../../../components/ui/table";
import { PencilIcon, SearchIcon, TrashBinIcon } from "../../../../icons";
import { toast } from "react-toastify";
import Input from "../../../../components/form/input/InputField";
export default function DefectCodeTable({ tableData }: any) {
  const tableRef = useRef<any>(null);

  const onSearch = (value: any) => {
    tableRef?.current?.dt().search(value).draw();
  };

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
          data={tableData || []}
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
                <div className="flex gap-3">
                  <PencilIcon
                    className="size-5 text-blue-700 cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Edit"
                    data-tooltip-place="top"
                    onClick={() => {
                      toast.warn("Under-construction");
                    }}
                  />
                  <TrashBinIcon
                    className="size-5 text-red-700 cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Delete"
                    data-tooltip-place="top"
                    onClick={() => {
                      toast.warn("Under-construction");
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
                Defect Name
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Defect Code
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
