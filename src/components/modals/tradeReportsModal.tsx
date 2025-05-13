/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { Modal } from "../ui/modal";
import { DownloadIcon } from "lucide-react";
export default function CommonAreaTradeReportModal({
  isOpen,
  closeModal,
  reports,
  title,
}: any) {
  const [tableData, setTableData] = useState<any>([]);
  useEffect(() => {
    const filteredReports = reports?.map((rep: any, index: any) => {
      return [
        index + 1,
        rep.lotNo,
        moment(rep.createdAt).format("YYYY-DD-MM hh:mm:ss"),
        rep,
      ];
    });
    setTableData(filteredReports);
  }, [reports]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[80%] p-6 lg:p-10"
      >
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>
        </div>
        <div className="mt-8 space-y-3">
          <DataTable
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
              3: (_data: any, _row: any) => (
                <div className="flex flex-row gap-4">
                  <a
                    href={_row[3]?.reportUrl}
                    target="_blank"
                    download={`${_row[3]?.reportName}`}
                    rel="noreferrer"
                  >
                    <DownloadIcon
                      //   onClick={() => setOpenModal(_data)}
                      className="size-5 text-blue-700 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Export Report"
                      data-tooltip-place="top"
                    />
                  </a>
                </div>
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
                  CA Lot No
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
      </Modal>
    </>
  );
}
