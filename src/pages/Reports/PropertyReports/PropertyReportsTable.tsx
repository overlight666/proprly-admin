/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from "recoil";
import { propertyReportsAtom } from "../../../_state";
import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { BoxIcon, DocsIcon, DownloadIcon, ListIcon } from "../../../icons";
import { useModal } from "../../../hooks/useModal";
import { toast } from "react-toastify";
import PropertyTradeReportModal from "./PropertyTradeReportsModal";
import { ucword } from "../../../_helpers";
import React from "react";
import PropertyReportModal from "./PropertyReportsModal";
import PropertyReportHistoryModal from "./PropertyReportsHistoryModal";

export default function PropertyReportsTable({ tableRef, headerValue }: any) {
  const [tableData, setTableData] = useState<any[]>([]);
  const propertReports = useRecoilValue(propertyReportsAtom);
  const [commonAreaHolder, setCommonAreaHolder] = useState<any>(undefined);
  const [modalTitle, setModalTitle] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [whichModal, setWhichModal] = useState(1);

  useEffect(() => {
    if (propertReports) {
      if (headerValue === "all") {
        const dataWithReports = propertReports?.filter(
          (report: any) => report?.reports?.length > 0 && report.value !== "All"
        );
        let arr: any = [];
        dataWithReports?.map((mr: any) => {
          const mer = mr?.reports
            ?.filter((r: any) => r.inspectionId)
            ?.map((r: any) => {
              return {
                value: mr.value,
                ...r,
              };
            });
          arr = [...arr, ...mer];
        });

        const filteredData = arr?.map((obj: any) => {
          return [
            obj?.unitNo,
            obj?.lotNo,
            obj?.owners?.map((o: any) => o.fullName).join(", "),
            obj?.value,
            { headerValue: headerValue, ...obj },
          ];
        });
        setTableData(filteredData || []);
      } else {
        const getFiltered = propertReports?.find(
          (report: any) => report.key == headerValue
        );
        const filteredData = getFiltered?.reports
          ?.filter((r: any) => r.inspectionId)
          ?.map((obj: any) => {
            return [
              obj?.unitNo,
              obj?.lotNo,
              obj?.owners?.map((o: any) => o.fullName).join(", "),
              getFiltered?.value,
              { headerValue: headerValue, ...obj, value: getFiltered?.value },
            ];
          });
        setTableData(filteredData || []);
      }
    }
  }, [propertReports, headerValue]);

  return (
    <>
      {whichModal == 1 ? (
        <PropertyReportModal
          closeModal={closeModal}
          isOpen={isOpen}
          reports={commonAreaHolder}
          title={modalTitle}
        />
      ) : whichModal == 2 ? (
        <PropertyTradeReportModal
          closeModal={closeModal}
          isOpen={isOpen}
          reports={commonAreaHolder}
          title={modalTitle}
        />
      ) : (
        <PropertyReportHistoryModal
          closeModal={closeModal}
          isOpen={isOpen}
          reports={commonAreaHolder}
          title={modalTitle}
        />
      )}

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
            4: (_data: any, _row: any) => (
              <>
                <div className="flex flex-row gap-4">
                  {_data?.hasReport && (
                    <a
                      href={_data?.reportUrl}
                      target="_blank"
                      download={`${_data?.reportName}`}
                      onClick={() => {
                        if (!_data?.reportUrl) {
                          toast.warn("No report generated!");
                        }
                      }}
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
                  )}
                  {_data?.hasTradeReport && (
                    <DocsIcon
                      onClick={() => {
                        setCommonAreaHolder(_data);
                        setWhichModal(2);
                        openModal();
                        setModalTitle("Trade Report History");
                      }}
                      className="size-5 text-black dark:text-white cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Trade Reports"
                      data-tooltip-place="top"
                    />
                  )}
                  {_data?.hasReportHistory && (
                    <ListIcon
                      onClick={() => {
                        setCommonAreaHolder(_data?.reportHistory);

                        setWhichModal(3);
                        openModal();

                        setModalTitle(
                          `${_data.value
                            ? _data.value
                            : ucword(_data.headerValue)
                          } Report History`
                        );
                      }}
                      className="size-5 text-green-700 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Report History"
                      data-tooltip-place="top"
                    />
                  )}
                  {_data?.hasFullReport && (
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
                Unit No
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Lot No
              </th>
              <th
                scope="col"
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Owner
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
