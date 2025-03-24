/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { signupLeadsListAtom, supportTicketsAtom } from "../../../../_state";
import { useRecoilValue } from "recoil";
import { Leads } from "../../../../_types";
import { TableCell } from "../../../../components/ui/table";
import {
  CheckCircleIcon,
  CheckLineIcon,
  CloseIcon,
  FolderIcon,
} from "../../../../icons";
import moment from "moment";
import { useUserActions } from "../../../../_actions";
import { ucword } from "../../../../_helpers";
import { toast } from "react-toastify";
DataTable.use(DT);

// Define the table data using the interface

export default function SupportTicketsTable({ tableRef }: any) {
  const [tableData, setTableData] = useState<any>([]);
  const tickets = useRecoilValue(supportTicketsAtom);
  useEffect(() => {
    if (tickets?.length > 0) {
      const ticketMutate = tickets?.map((ticket, index) => {
        return [
          index + 1,
          ticket?.ticketNo,
          ticket?.user?.fullName,
          ticket?.user?.mobile,
          ticket?.user?.email,
          ticket?.status?.toUpperCase(),
          moment(ticket?.createdAt).format("ll"),
          ticket,
        ];
      });
      setTableData(ticketMutate);
    }
  }, [tickets]);
  console.log(tickets);
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
                { searchable: true, targets: [0, 1, 2, 3, 4, 5, 6] },
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
              7: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex flex-row gap-5">
                    <FolderIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="View"
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
                  Ticket No
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email Address
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ticket Created
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
