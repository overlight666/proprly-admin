/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProjects } from "../store/features/reducers";
import type { ProjectListType, ProjectState } from "../types";
import { BsThreeDots } from "react-icons/bs";
import { Button, Dropdown } from "flowbite-react";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";

const ProjectFullTable = function () {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const { projectList }: ProjectState = useSelector(
    (state: any) => state.project
  );

  useEffect(() => {
    if (!projectList) {
      dispatch(getProjects(id));
    }
  }, []);

  useEffect(() => {
    try {
      if (!DataTable.isDataTable("#project-table-full")) {
        new DataTable("#project-table-full", {
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
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [projectList]);

  return (
    <>
      {/* <div className="relative overflow-x-auto p-2 shadow-md sm:rounded-lg"> */}
      <table
        id="project-table-full"
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3">
              Project Type
            </th>
            <th scope="col" className="px-6 py-3">
              Maintenance & Service Type
            </th>
            <th scope="col" className="px-6 py-3">
              Towers
            </th>
            <th scope="col" className="px-6 py-3">
              Basement Levels
            </th>
            <th scope="col" className="px-6 py-3">
              {/* Reports */}
            </th>
          </tr>
        </thead>

        <tbody>
          {projectList &&
            projectList.map((p: ProjectListType, index) => {
              return (
                <tr
                  key={index}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    <a href={`/organization/${id}/project/${p.id}`}>{p.name}</a>
                  </th>
                  <td>{p.type.toUpperCase()}</td>
                  <td>
                    {p.maintenanceServiceType === "before_7_year"
                      ? "Before 7 Years"
                      : "After 7 Years"}
                  </td>
                  <td>
                    <div className="flex justify-center">
                      {p.projectTower.length}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      {p.numBasementLevels}
                    </div>
                  </td>
                  <td className="px-6 py-4">
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
                          navigate(`/organization/${id}/project/${p.id}`);
                        }}
                      >
                        View
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* </div> */}
    </>
  );
};

export default ProjectFullTable;
