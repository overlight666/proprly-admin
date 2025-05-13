/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";

import { toast } from "react-toastify";
import { commonAreaReportsAtom } from "@/_recoil/states";
import { useModal } from "@/helpers/useModal";
import { BoxIcon, DownloadIcon, ListIcon } from "lucide-react";
import { DocsIcon } from "@/icons";
import CommonAreaTradeReportModal from "@/components/modals/tradeReportsModal";

export default function CommonAreaReportsTable({ tableRef, headerValue }: any) {
  const [tableData, setTableData] = useState<any[]>([]);
  const commonAreaReport = useRecoilValue(commonAreaReportsAtom);
  const [commonAreaHolder, setCommonAreaHolder] = useState<any>(undefined);
  const [modalTitle, setModalTitle] = useState("");
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (commonAreaReport) {
      if (headerValue === "all") {
        const dataWithReports = commonAreaReport?.filter(
          (report: any) => Object.keys(report.latestReport).length !== 0
        );
        const filteredData = dataWithReports?.map((obj: any, index: number) => {
          return [
            index + 1,
            obj?.latestReport?.lotNo,
            obj.value,
            { headerValue: headerValue, ...obj },
          ];
        });
        setTableData(filteredData || []);
      } else {
        if (headerValue !== "pre_settlement_general_inspection") {
          const getFiltered = commonAreaReport?.find(
            (report: any) => report.key == headerValue
          );
          const filteredData = getFiltered?.reports?.map(
            (obj: any, index: number) => {
              return [
                index + 1,
                obj?.lotNo,
                getFiltered?.value,
                { headerValue: headerValue, ...obj },
              ];
            }
          );
          setTableData(filteredData || []);
        } else {
          const getFiltered = commonAreaReport?.filter(
            (report: any) => report?.isGeneral == true
          );
          const dataWithReports = getFiltered?.filter(
            (report: any) => Object.keys(report.latestReport).length !== 0
          );

          const filteredData = dataWithReports?.map(
            (obj: any, index: number) => {
              return [
                index + 1,
                obj?.latestReport?.lotNo,
                obj.value,
                { headerValue: headerValue, ...obj },
              ];
            }
          );
          setTableData(filteredData || []);
        }
      }
    }
  }, [commonAreaReport, headerValue]);

  return (
    <>
      <CommonAreaTradeReportModal
        closeModal={closeModal}
        isOpen={isOpen}
        reports={commonAreaHolder}
        title={modalTitle}
      />
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
              <>
                <div className="flex flex-row gap-4">
                  {(_data?.headerValue == "pre_settlement_inspection" ||
                    _data?.headerValue == "handover_inspection" ||
                    _data?.headerValue == "pre_settlement_general_inspection" ||
                    _data?.headerValue == "all" ||
                    _data?.headerValue == "post_handover_inspection") && (
                      <a
                        href={_data?.latestReport?.reportUrl}
                        target="_blank"
                        download={`${_row[3]?.latestReport?.reportName}`}
                        rel="noreferrer"
                        onClick={() => {
                          if (!_data?.latestReport?.reportUrl) {
                            toast.warn("No report generated!");
                          }
                        }}
                      >
                        <DownloadIcon
                          //   onClick={() => setOpenModal(_data)}
                          className="size-5 text-blue-700 cursor-pointer"
                          data-tooltip-id="tooltip"
                          data-tooltip-content="Export Report"
                          data-tooltip-place="top"
                        />
                      </a>
                    )}
                  {(_data?.headerValue == "pre_settlement_inspection" ||
                    _data?.headerValue == "handover_inspection" ||
                    _data?.headerValue == "all") && (
                      <DocsIcon
                        onClick={() => {
                          setCommonAreaHolder(_row[3]?.reports);
                          openModal();
                          setModalTitle("Common Area Trade Report History");
                        }}
                        className="size-5 text-white cursor-pointer"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Trade Reports"
                        data-tooltip-place="top"
                      />
                    )}
                  {(_data?.headerValue == "pre_settlement_general_inspection" ||
                    _data?.headerValue == "all" ||
                    _data?.headerValue == "post_handover_inspection") && (
                      <ListIcon
                        onClick={() => {
                          setCommonAreaHolder(_data?.fullReports);
                          openModal();
                          setModalTitle("Common Area Report History");
                        }}
                        className="size-5 text-green-700 cursor-pointer"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Report History"
                        data-tooltip-place="top"
                      />
                    )}
                  {(_data?.headerValue == "pre_settlement_general_inspection" ||
                    _data?.headerValue == "all" ||
                    _data?.headerValue == "post_handover_inspection") && (
                      <a
                        href={_data?.fullReport?.reportUrl}
                        onClick={() => {
                          if (!_data?.fullReport?.reportUrl) {
                            toast.warn("No report generated!");
                          }
                        }}
                        target="_blank"
                        download={`${_row[3]?.fullReport?.reportName}`}
                        rel="noreferrer"
                      >
                        <BoxIcon
                          //   onClick={() => setOpenModal(_data)}
                          className="size-5 text-yellow-700 cursor-pointer"
                          data-tooltip-id="tooltip"
                          data-tooltip-content="Export Full Report"
                          data-tooltip-place="top"
                        />
                      </a>
                    )}
                </div>
              </>
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
                Inspection Type
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
