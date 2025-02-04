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
import {
  generateLatestReportReducer,
  getProjectReportReducer,
  getSingleProject,
} from "../../../store/features/reducers";
import type { AppState, ProjectDefectData, ProjectState } from "../../../types";
import { resetReport } from "../../../store/features/appSlice";
import { toast } from "react-toastify";
DataTable.use(DT);
const ProjectReportTable = function () {
  const { project_id }: any = useParams();

  const { projectReports, selectedProject }: ProjectState = useSelector(
    (state: any) => state.project,
  );
  const [openModal, setOpenModal] = useState(false);
  const [reports, setReports] = useState<any[] | undefined>(undefined);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<any>([]);
  const { reportGenerated }: AppState = useSelector(
    (state: any) => state.application,
  );
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
    setTableData([
      [
        selectedProject && selectedProject.name,
        (selectedProject && selectedProject.type.toUpperCase()) || "",
        ucword(selectedProject && selectedProject.maintenanceServiceType) || "",
        (selectedProject &&
          selectedProject.projectTower &&
          selectedProject.projectTower.length > 0 &&
          selectedProject.projectTower.map((t) => t.name).join(", ")) ||
          "",
        (selectedProject && selectedProject.numBasementLevels) || "",
      ],
    ]);
  }, [projectReports, selectedProject]);

  useEffect(() => {
    dispatch(getProjectReportReducer(project_id));
  }, []);

  useEffect(() => {
    if (reportGenerated) {
      dispatch(getProjectReportReducer(project_id));
      dispatch(resetReport());
      toast.info("New report has been generated!");
    }
  }, [reportGenerated]);

  const openReports = () => {
    const rp =
      (projectReports &&
        projectReports.defectDescriptions &&
        projectReports.defectDescriptions.tableData &&
        projectReports.defectDescriptions.tableData.length > 0 &&
        projectReports.defectDescriptions.tableData.map(
          (r: ProjectDefectData) => {
            return [r.srNo, `${r.unitNo}_project_report`, r.lastInspectionDate];
          },
        )) ||
      [];
    setReports(rp);
    setOpenModal(true);
  };

  return (
    <>
      <DataTable
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        slots={{
          5: (_data: any, _row: any) => (
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
                onClick={() => {
                  openReports();
                }}
              >
                Download Project Report
              </Dropdown.Item>
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
              PROJECT NAME
            </th>
            <th scope="col" className="px-6 py-3">
              PROJECT TYPE
            </th>
            <th scope="col" className="px-6 py-3">
              MAINTENANCE & SERVICE TYPE
            </th>
            <th scope="col" className="px-6 py-3">
              TOWERS
            </th>
            <th scope="col" className="px-6 py-3">
              BASEMENT LEVELS
            </th>
            <th></th>
          </tr>
        </thead>
      </DataTable>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="7xl">
        <Modal.Header>Project Report History</Modal.Header>
        <Modal.Body>
          <div className="flex flex-row-reverse">
            <Button
              color="primary"
              onClick={() => {
                dispatch(
                  generateLatestReportReducer(`projectId=${project_id}`),
                );
              }}
            >
              Generate Latest Project Reports
            </Button>
          </div>
          <DataTable
            className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
            slots={{
              3: (_data: any, _row: any) => (
                <Button color="gray">Download</Button>
              ),
            }}
            data={reports || []}
            options={{
              destroy: true,
              paging: false,
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

export default ProjectReportTable;
