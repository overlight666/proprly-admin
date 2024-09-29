/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjects } from "../store/features/reducers";
import type { ProjectListType, ProjectState } from "../types";

const ProjectFullTable = function () {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const { projectList }: ProjectState = useSelector(
    (state: any) => state.project
  );

  useEffect(() => {
    dispatch(getProjects(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="relative overflow-x-auto p-2 shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
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
                Reports
              </th>
            </tr>
          </thead>
          {!projectList ? (
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className="bg-red flex w-full items-center">
                    <span className="ml-10 text-center">
                      No projects found!
                    </span>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          ) : (
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
                      <td className="px-6 py-4"></td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
        <nav
          className="flex-column flex flex-wrap items-center justify-between py-4 md:flex-row"
          aria-label="Table navigation"
        >
          <span className="mb-4 block w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProjectFullTable;
