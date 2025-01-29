/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import type { ProjectState } from "../types";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";
import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyReportsReducer } from "../store/features/reducers";
import { useParams } from "react-router";
import type { Report } from "../types";
import { type PropertyState } from "../types";
import { Button, Dropdown, Modal } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
DataTable.use(DT);
const PropertyReportTable = function ({ headerValue }: any) {
  const { project_id }: any = useParams();
  const { propertyReports }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const [reports, setReports] = useState<any>(undefined);
  const [reportHistory, setReportHistory] = useState<any>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [fullReport, setFullReport] = useState<any>({});
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<any>([]);
  useEffect(() => {
    // const rp =
    //   (reports &&
    //     reports.length > 0 &&
    //     reports.map((r: Report) => {
    //       return [
    //         r.lotNo,
    //         r.unitNo,
    //         r.owners &&
    //           r.owners.length > 0 &&
    //           r.owners.map((o) => o.fullName).join(", "),
    //         headerValue,
    //         r.reportUrl,
    //       ];
    //     })) ||
    //   [];
    if (reports && reports.lotNo) {
      const reps =
        (reports && [
          reports.lotNo ? reports.lotNo : "",
          reports.unitNo ? reports.unitNo : "",
          reports.owners &&
            reports.owners.length > 0 &&
            reports.owners.map((o) => o.fullName).join(", "),
          headerValue,
          reports.reportUrl ? reports.reportUrl : "",
        ]) ||
        [];
      setTableData([reps]);
    }
  }, [reports, headerValue]);

  useEffect(() => {
    dispatch(getPropertyReportsReducer(project_id));
  }, []);

  useEffect(() => {
    setReports([]);
    if (propertyReports) {
      const rep =
        propertyReports && propertyReports.find((o) => o.key == headerValue);
      setReports(rep && rep.latestReport ? rep.latestReport : []);
      const repHistory =
        rep &&
        rep.reports &&
        rep.reports.length > 0 &&
        rep.reports.map((r: any) => {
          return [
            r.lotNo,
            r.unitNo,
            r.owners &&
              r.owners.length > 0 &&
              r.owners.map((o) => o.fullName).join(", "),
            moment(r.createdAt).format("YYYY-DD-MM"),
            r.reportUrl,
          ];
        });
      setReportHistory(repHistory);
      setFullReport((rep && rep?.fullReport) || {});
    }
  }, [propertyReports, headerValue]);

  return (
    <>
      <DataTable
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        slots={{
          3: (data: any, row: any) => (
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <Button color="gray" className="w-[50px]">
                  <div className="flex items-center gap-x-2 text-xs">
                    <BsThreeDots />
                  </div>
                </Button>
              )}
            >
              <Dropdown.Item
                as="a"
                href={row[4]}
                target="_blank"
                download={`Unit_${row[0]}_Lot_${row[1]}_${row[3]}.pdf`}
              >
                Export Report
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setOpenModal(true)}>
                {row[3] === "general" || row[3] === "post_handover"
                  ? "Report History"
                  : "Trade Reports"}
              </Dropdown.Item>
              {row[3] === "general" ||
                (row[3] === "post_handover" &&
                  ((fullReport && fullReport.reportUrl && (
                    <Dropdown.Item
                      as="a"
                      href={fullReport.reportUrl}
                      target="_blank"
                      download={`Unit_${row[0]}_Lot_${row[1]}_${row[3]}.pdf`}
                    >
                      Export Full Report
                    </Dropdown.Item>
                  )) || (
                    <Dropdown.Item
                      onClick={() => toast.warning("No report generated")}
                    >
                      Export Full Report
                    </Dropdown.Item>
                  )))}
            </Dropdown>
          ),
        }}
        data={tableData}
        options={{
          destroy: true,
          paging: true,
          searching: false,
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
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              LOT NO.
            </th>
            <th scope="col" className="px-6 py-3">
              UNIT NO.
            </th>
            <th scope="col" className="px-6 py-3">
              OWNER NAME
            </th>
            <th></th>
          </tr>
        </thead>
      </DataTable>

      <Modal show={openModal} onClose={() => setOpenModal(false)} size="7xl">
        <Modal.Header>Property Report History</Modal.Header>
        <Modal.Body>
          <DataTable
            className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
            slots={{
              4: (data: any, row: any) => (
                <div>
                  <a
                    href={row[4]}
                    target="_blank"
                    download={`${row[0]}_${row[1]}_${row[2]}_${row[3]}.pdf`}
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-md p-3 shadow-md"
                  >
                    Download
                  </a>
                </div>
              ),
            }}
            data={reportHistory || []}
            options={{
              destroy: true,
              paging: true,
              searching: false,
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
          >
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  LOT NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  UNIT NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  OWNER NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE CREATED
                </th>
                <th></th>
              </tr>
            </thead>
          </DataTable>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyReportTable;
