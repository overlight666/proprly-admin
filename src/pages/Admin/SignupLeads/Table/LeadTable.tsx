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
import { signupLeadsListAtom } from "../../../../_state";
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
import { getIcons, textColoring } from "../../../../_helpers/textIcons";
import { confirm } from "../../../../components/dialog/ConfirmDialog";

DataTable.use(DT);

// Define the table data using the interface

export default function LeadTable({ tableRef }: any) {
  const [tableData, setTableData] = useState<any>([]);
  const leads = useRecoilValue(signupLeadsListAtom);
  const userActions = useUserActions();

  useEffect(() => {
    userActions.getLeads();
  }, []);

  useEffect(() => {
    if (leads) {
      const tb = leads.map((proj: Leads) => {
        return [
          proj.fullName,
          proj.mobileNumber,
          proj.email,
          proj.organizationName,
          proj.organizationCountryCode,
          proj.status,
          moment(proj.createdAt).format("lll"),
          proj,
        ];
      });
      setTableData(tb);
    }
  }, [leads]);

  const confirmAlertSubmit = async (_data: any) => {
    if (
      await confirm({
        confirmText: "CONFIRM",
        confirmation:
          "You are about to confirm the registration of this lead. Please confirm to continue!",
      })
    ) {
      userActions
        .convertLead({ id: _data.id }, userActions)
        .then(() => {
          toast.info("Lead converted");
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const rejectAlertSubmit = async (_data: any) => {
    if (
      await confirm({
        confirmText: "REJECT",
        confirmVariant: "danger",
        confirmation:
          "You are about to reject the registration of this lead. Please confirm to continue!",
      })
    ) {
      userActions
        .rejectLead({ id: _data.id }, userActions)
        .then(() => {
          toast.warning("Lead rejected");
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

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
                  <div
                    className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                    ${textColoring(_data, true)}
                    `}
                  >
                    {getIcons(_data)}
                    <span className="text-[12px]">{ucword(_data)}</span>
                  </div>
                </TableCell>
              ),
              7: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex flex-row gap-5">
                    {/* <FolderIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="View"
                        onClick={() =>
                          navigate(`/organization/${id}/project/${_data}`)
                        }
                    /> */}
                    {_data.status !== "accepted" && (
                      <CheckLineIcon
                        className={`size-5 cursor-pointer text-green-600 ${
                          _data.status == "rejected" && "text-yellow-600"
                        }`}
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Convert"
                        onClick={() => confirmAlertSubmit(_data)}
                      />
                    )}
                    {_data.status !== "accepted" &&
                      _data.status !== "rejected" && (
                        <CloseIcon
                          className="size-5 cursor-pointer text-red-600"
                          data-tooltip-id="tooltip"
                          data-tooltip-content="Reject"
                          onClick={() => rejectAlertSubmit(_data)}
                        />
                      )}
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
                  Organization Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Country
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
                  Lead Created
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
