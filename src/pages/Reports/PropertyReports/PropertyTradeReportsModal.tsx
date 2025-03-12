/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "../../../components/ui/modal";
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useEffect, useState } from "react";
import { DownloadIcon } from "../../../icons";
import moment from "moment";
import React from "react";
export default function PropertyTradeReportModal({
  isOpen,
  closeModal,
  reports,
  title,
}: any) {
  // const [modalTitle, setModalTitle] = useState("");
  const [tableData, setTableData] = useState<any>([]);
  const [selectedTrade, setSelectedTrade] = useState("");
  // const [commonAreaHolder, setCommonAreaHolder] = useState<any>(undefined);

  useEffect(() => {
    const filteredReports = reports?.propetyReports
      ?.find((f) => f.value === selectedTrade)
      ?.tradeReports?.map((rep: any, index: any) => {
        return [
          index + 1,
          rep.lotNo,
          moment(rep.createdAt).format("YYYY-DD-MM hh:mm:ss"),
          rep,
        ];
      });
    setTableData(filteredReports);
  }, [selectedTrade]);

  return (
    <>
      {/* <PropertyTradeReportModal
        closeModal={innerModal.closeModal}
        isOpen={innerModal.isOpen}
        reports={commonAreaHolder}
        title={modalTitle}
      /> */}
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
          <div className="w-[30%] space-y-5">
            <select
              id="selectedTrade"
              name="selectedTrade"
              value={selectedTrade}
              onChange={(e) => {
                setSelectedTrade(e.target.value);
              }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="" selected>
                Please Select
              </option>
              {reports?.propetyReports?.map((pr: any) => {
                return <option value={pr.value}>{pr.value}</option>;
              })}
            </select>
          </div>
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
                  {/* <DocsIcon
                    onClick={() => {
                      setCommonAreaHolder(_row[3]?.reports);
                      innerModal.openModal();
                      setModalTitle("Trade Report History");
                    }}
                    className="size-5 text-white cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Trade Reports"
                    data-tooltip-place="top"
                  /> */}
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
                  Trade Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Trade Code
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
