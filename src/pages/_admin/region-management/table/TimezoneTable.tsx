/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { TableCell } from "../../../../components/ui/table";
import TimezoneModal from "../modal/TimezoneModal";
import { useModal } from "@/helpers/useModal";
import { PencilIcon } from "lucide-react";
import { CloseIcon } from "@/icons";
DataTable.use(DT);

// Define the table data using the interface

export default function TimezoneTable({ tableRef, timezone }: any) {
  const [tableData, setTableData] = useState<any>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    if (timezone) {
      const timezones = timezone?.map((tz, index) => {
        return [
          index + 1,
          tz?.name,
          tz.description,
          tz.abbreviation,
          tz.offset,
          tz,
        ];
      });
      setTableData(timezones);
    }
  }, [timezone]);
  return (
    <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-5">
      <TimezoneModal
        closeModal={closeModal}
        isOpen={isOpen}
        isEdit={isEdit}
        id={selectedId}
      />
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
                { searchable: true, targets: [0, 1, 2] },
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
              5: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                  <div className="flex flex-row gap-5">
                    <PencilIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Edit"
                      onClick={() => {
                        setSelectedId(_data?.id);
                        setIsEdit(true);
                        openModal();
                      }}
                    />
                    <CloseIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Deactivate"
                    //   onClick={() =>
                    //     navigate(`/organization/${id}/project/${_data}`)
                    //   }
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
                  Sr No
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </th>

                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </th>

                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Abbreviation
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Offset
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
