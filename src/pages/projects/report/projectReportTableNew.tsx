/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import type { ProjectState } from "../types";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../../../extension.css";
import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Dropdown, Modal } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  getProjectReportReducer,
  getSingleProject,
} from "../../../store/features/reducers";
import type {
  AppState,
  ProjectDefectData,
  ProjectReport,
  ProjectState,
} from "../../../types";
import moment from "moment";
import { resetReport } from "../../../store/features/appSlice";
import { toast } from "react-toastify";
DataTable.use(DT);
const ProjectReportTableNew = function () {
  const { project_id }: any = useParams();

  const { projectReports, selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const { reportGenerated }: AppState = useSelector(
    (state: any) => state.application
  );

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
    if (!selectedProject) {
      dispatch(getSingleProject(project_id));
    }
  }, [selectedProject]);

  useEffect(() => {
    const p =
      selectedProject &&
      selectedProject.report &&
      selectedProject.report.length > 0 &&
      selectedProject.report.map((rep) => {
        return [
          rep.id,
          `${selectedProject.name}_${moment(rep.createdAt).format(
            "YYYY-DD-MM_HH_ss"
          )}`,
          moment(rep.createdAt).format("YYYY-DD-MM HH:mm:ss"),
          rep.reportUrl,
        ];
      });
    setTableData(p);
  }, [selectedProject]);

  useEffect(() => {
    dispatch(getProjectReportReducer(project_id));
  }, []);

  useEffect(() => {
    if (reportGenerated) {
      dispatch(getProjectReportReducer(project_id));
      dispatch(resetReport());
      toast.info("New Report has been Generated!");
    }
  }, [reportGenerated]);
  return (
    <>
      <DataTable
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        slots={{
          3: (data: any, row: any) => (
            <div>
              <a
                href={row[3]}
                target="_blank"
                download={`${row[2]}.pdf`}
                rel="noreferrer"
                className="flex items-center justify-center rounded-md p-3 shadow-md"
              >
                Download
              </a>
            </div>
          ),
        }}
        data={tableData || []}
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
              Sr No
            </th>
            <th scope="col" className="px-6 py-3">
              Project Report Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date Created
            </th>

            <th></th>
          </tr>
        </thead>
      </DataTable>
    </>
  );
};

export default ProjectReportTableNew;
