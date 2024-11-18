/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjects } from "../store/features/reducers";
import type { ProjectListType, ProjectState } from "../types";
import { DataTable } from "simple-datatables";

const ProjectFullTable = function () {
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
    if (document.getElementById("project-table-full") && projectList.length) {
      try {
        const datatable = new DataTable("#project-table-full", {
          searchable: false,
          fixedHeight: true,
          paging: true,
          perPage: 5,
          perPageSelect: [5, 10, 15, 20, 25],
          sortable: false,
          firstLast: true,
          nextPrev: true,
          classes: {
            selector:
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
            active: "[&>button]:text-white [&>button]:bg-blue-600",
            paginationListItemLink:
              "flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
            pagination: "datatable-pagination-test",
            paginationList:
              "inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse",
            bottom:
              "flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row",
            top: "flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row",
            table: "p-20",
          },
        });
        datatable.update();
      } catch (error) {
        console.log(error);
      }
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
            {/* <th scope="col" className="px-6 py-3">
              Reports
            </th> */}
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
                    {p.name}
                  </th>
                  <td className="px-6 py-4">{p.type.toUpperCase()}</td>
                  <td className="px-6 py-4">
                    {p.maintenanceServiceType === "before_7_year"
                      ? "Before 7 Years"
                      : "After 7 Years"}
                  </td>
                  <td className="px-6 py-4">{p.projectTower.length}</td>
                  <td className="px-6 py-4">{p.numBasementLevels}</td>
                  {/* <td className="px-6 py-4">0</td> */}
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
