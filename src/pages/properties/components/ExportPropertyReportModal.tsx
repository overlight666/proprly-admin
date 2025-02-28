/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useProperties } from "../../../_actions";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import { generateReportAtom, selectedPropertyAtom } from "../../../_state";
import { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "datatables.net-react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { DownloadIcon } from "../../../icons";
import { TableCell } from "../../../components/ui/table";
import { toast } from "react-toastify";

export default function ExportPropertyReportModal({
  isOpen,
  closeModal,
  id,
}: any) {
  const selectedProperty = useRecoilValue(selectedPropertyAtom);
  const propertyAction = useProperties();
  const [tableData, setTableData] = useState<any[]>([]);
  const newReportGenerated = useRecoilValue(generateReportAtom);
  const setReportGenerated = useSetRecoilState(generateReportAtom);
  useEffect(() => {
    setTableData([]);
    propertyAction.getProperty(id);
    if (newReportGenerated) {
      setReportGenerated(false);
    }
  }, [id, newReportGenerated]);

  useEffect(() => {
    if (selectedProperty) {
      const filteredData = selectedProperty?.report?.map(
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
  }, [selectedProperty]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[90%] p-6 lg:p-10 relative overflow-auto"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between">
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              Property Report History
            </h5>
            <Button
              onClick={() => {
                propertyAction.generateNewReport(id, toast);
              }}
              type="button"
              variant="white"
              className="mr-10"
            >
              Generate Latest Report
            </Button>
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
        </div>
      </Modal>
    </>
  );
}
