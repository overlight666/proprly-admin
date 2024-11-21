/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import type { ProjectState } from "../types";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";
import { useEffect } from "react";
const ProjectTable = function ({ towers }: any) {
  // const { projectTowers, gettingTowers }: ProjectState = useSelector(
  //   (state: any) => state.project
  // );
  useEffect(() => {
    try {
      if (
        towers &&
        towers.length > 0 &&
        !DataTable.isDataTable("#tower-table")
      ) {
        new DataTable("#tower-table", {
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
  }, []);

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
