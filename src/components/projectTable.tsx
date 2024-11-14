/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import type { ProjectState } from "../types";
import { DataTable } from "simple-datatables";
import { useEffect } from "react";
const ProjectTable = function ({ towers }: any) {
  // const { projectTowers, gettingTowers }: ProjectState = useSelector(
  //   (state: any) => state.project
  // );
  console.log(towers);
  useEffect(() => {
    if (document.getElementById("tower-table") && towers) {
      try {
        const datatable = new DataTable("#tower-table", {
          searchable: false,
          fixedHeight: false,
          paging: false,
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
  }, [towers]);

  return (
    <>
      <table
        id="tower-table"
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-[40%] px-6 py-3">
              Tower name
            </th>
            <th scope="col" className="w-[40%] px-6 py-3">
              No. of Floors
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {(towers &&
            towers.length &&
            towers.map((t, index) => {
              return (
                <tr
                  key={index}
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {t.name}
                  </th>
                  <td className="px-6 py-4">{t.numFloors}</td>
                  <td className="px-6 py-4">
                    <Button
                      // onClick={() => {
                      //   dispatch(updateProjectTab(1));
                      //   gotoPage(`/organization/${id}/new`);
                      // }}
                      color="gray"
                      className="w-[50px]"
                    >
                      <div className="flex items-center gap-x-2 text-xs">
                        <BsThreeDots />
                      </div>
                    </Button>
                  </td>
                </tr>
              );
            })) || (
            <tr>
              <th colSpan={3}>
                <div className="flex w-full items-center justify-center">
                  <span className="text-center text-gray-200">
                    No data to display
                  </span>
                </div>
              </th>
            </tr>
          )}
        </tbody>
      </table>
      {/* </div> */}
    </>
  );
};

export default ProjectTable;
