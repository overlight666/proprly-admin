/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { AddDefectCodeModal } from "../modals/addDefectCodeModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { DefectCode, ProjectState } from "../../../types";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../../../extension.css";

export default function DefectCodeManagement({ project_id }: any) {
  const { defectCodeList }: ProjectState = useSelector(
    (state: any) => state.project,
  );
  const [isOpen, setOpen] = useState(false);
  // let didInit = false;

  useEffect(() => {
    try {
      if (
        document.readyState === "complete" &&
        document.getElementById("defect-code-table")
      ) {
        // if (defectCodeList && defectCodeList.length > 0) {
        if (!DataTable.isDataTable("#defect-code-table")) {
          setTimeout(() => {
            new DataTable("#defect-code-table", {
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
          }, 1000);
        }
        // }
      }
    } catch (error) {
      console.log(error);
    }
  }, [defectCodeList]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-center justify-between">
        <form className="mx-2 w-[50%]">
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="z-20 block w-full rounded-lg border border-s-2 border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <Button
          className="mx-2 w-[200px]"
          onClick={() => setOpen(true)}
          disabled={true}
        >
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Add New Defect Code
          </div>
        </Button>
      </div>
      <div className="relative my-5 overflow-x-auto p-5 px-2 shadow-md sm:rounded-lg">
        <table
          id="defect-code-table"
          className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        >
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SR No
              </th>
              <th scope="col" className="px-6 py-3">
                DEFECT NAME
              </th>
              <th scope="col" className="px-6 py-3">
                DEFECT CODE
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {defectCodeList &&
              defectCodeList.length > 0 &&
              defectCodeList.map((obj: DefectCode, index: any) => {
                return (
                  <tr
                    key={index}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {obj.id}
                    </td>
                    <td className="px-6 py-4">{obj.defectName}</td>
                    <td className="px-6 py-4">{obj.defectCode}</td>
                    <td className="px-6 py-4">
                      <Button color="gray" className="w-[50px]">
                        <div className="flex items-center gap-x-2 text-xs">
                          <BsThreeDots />
                        </div>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <AddDefectCodeModal
        setOpen={setOpen}
        isOpen={isOpen}
        project_id={project_id}
      />
    </div>
  );
}
