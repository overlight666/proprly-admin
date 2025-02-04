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
import { getCommonAreaReportsReducer } from "../store/features/reducers";
import { useParams } from "react-router";
import { type PropertyState } from "../types";
import { Button, Dropdown, Modal } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { toast } from "react-toastify";
DataTable.use(DT);
const CommonAreaReportTable = function ({ headerValue }: any) {
  const { project_id }: any = useParams();
  const { commonAreaReports }: PropertyState = useSelector(
    (state: any) => state.property,
  );

  const [reports, setReports] = useState<any>(undefined);
  const [reportHistory, setReportHistory] = useState<any>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [fullReport, setFullReport] = useState<any>({});
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<any>([]);

  const ucword = (str) => {
    return (
      (str &&
        str
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          })) ||
      ""
    );
  };

  useEffect(() => {
    dispatch(getCommonAreaReportsReducer(project_id));
  }, []);

  useEffect(() => {
    if (headerValue !== "all" && reports) {
      if (reports && reports.lotNo) {
        const reps =
          (reports && [
            reports.lotNo ? reports.lotNo : "",
            ucword(headerValue),
            reports.reportUrl ? reports.reportUrl : "",
          ]) ||
          [];
        setTableData([reps]);
      } else {
        setTableData([]);
      }
    } else {
      const allrep =
        commonAreaReports &&
        commonAreaReports.length > 0 &&
        commonAreaReports.map((x) => {
          return [
            (x.latestReport && x.latestReport.lotNo && x.latestReport.lotNo) ||
              "",
            ucword(x.key),
            (x.latestReport && x.latestReport.reportUrl) || "",
          ];
        });
      const filtered =
        allrep &&
        allrep.length > 0 &&
        allrep.filter(
          (y) =>
            y[3] !== ucword("under_construction") &&
            y[3] !== ucword("pre_sales") &&
            y[0] !== "",
        );
      setTableData(filtered || []);
    }
  }, [reports, headerValue]);

  useEffect(() => {
    setReports([]);
    if (commonAreaReports) {
      const rep: any =
        commonAreaReports &&
        commonAreaReports.length > 0 &&
        commonAreaReports.find((o) => o.key == headerValue);
      setReports(rep && rep.latestReport ? rep.latestReport : []);
      const repHistory =
        (rep &&
          rep.reports &&
          rep.reports.length > 0 &&
          rep.reports.map((r: any) => {
            return [
              r.lotNo,
              moment(r.createdAt).format("YYYY-DD-MM hh:mm:ss"),
              r.reportUrl,
            ];
          })) ||
        [];
      setReportHistory(repHistory);
      setFullReport((rep && rep?.fullReport) || {});
    }
  }, [commonAreaReports, headerValue]);

  const resetUCWords = (val) => {
    return val.toLowerCase().replace(/ /g, "_");
  };

  const generateReportHistory = (hval) => {
    const rep: any =
      commonAreaReports &&
      commonAreaReports.length > 0 &&
      commonAreaReports.find((o) => o.key == resetUCWords(hval));
    setReports(rep && rep.latestReport ? rep.latestReport : []);
    const repHistory =
      (rep &&
        rep.reports &&
        rep.reports.length > 0 &&
        rep.reports.map((r: any) => {
          return [
            r.lotNo,
            moment(r.createdAt).format("YYYY-DD-MM hh:mm:ss"),
            r.reportUrl,
          ];
        })) ||
      [];
    setReportHistory(repHistory);
    setOpenModal(true);
  };

  return (
    <>
      <DataTable
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        slots={{
          2: (_data: any, row: any) => (
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
                href={row[2]}
                target="_blank"
                download={`Unit_${row[0]}_${row[2]}.pdf`}
              >
                Export Report
              </Dropdown.Item>
              <Dropdown.Item onClick={() => generateReportHistory(row[1])}>
                {row[1] === ucword("general") ||
                row[1] === ucword("post_handover")
                  ? "Report History"
                  : "Trade Reports"}
              </Dropdown.Item>
              {row[1] === ucword("general") ||
                (row[1] === ucword("post_handover") &&
                  ((fullReport && fullReport.reportUrl && (
                    <Dropdown.Item
                      as="a"
                      href={fullReport.reportUrl}
                      target="_blank"
                      download={`Unit_${row[0]}_Lot_${resetUCWords(
                        row[1],
                      )}}.pdf`}
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
              CA LOT NO.
            </th>
            <th scope="col" className="px-6 py-3">
              INSPECTION TYPE
            </th>
            <th></th>
          </tr>
        </thead>
      </DataTable>

      <Modal show={openModal} onClose={() => setOpenModal(false)} size="7xl">
        <Modal.Header>Common Area Report History</Modal.Header>
        <Modal.Body className="max-h-[500px]">
          <DataTable
            className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
            slots={{
              2: (_data: any, row: any) => (
                <div>
                  <a
                    href={row[2]}
                    target="_blank"
                    download={`${row[0]}_${row[1]}.pdf`}
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
                  CA LOT NO.
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

export default CommonAreaReportTable;
