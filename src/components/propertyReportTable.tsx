/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import type { ProjectState } from "../types";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";
import { useEffect } from "react";
import DataTable from "datatables.net-dt";
const PropertyReportTable = function () {
  // const { projectTowers, gettingTowers }: ProjectState = useSelector(
  //   (state: any) => state.project
  // );
  // let isInit = false;
  useEffect(() => {
    try {
      // if (!isInit) {
      if (!DataTable.isDataTable("#property-report-table")) {
        new DataTable("#property-report-table", {
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

      //   isInit = true;
      // }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <table
        id="property-report-table"
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-[40%] px-6 py-3">
              LOT NO.
            </th>
            <th scope="col" className="w-[40%] px-6 py-3">
              UNIT NO.
            </th>
            <th scope="col" className="w-[40%] px-6 py-3">
              OWNER NAME
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {/* </div> */}
    </>
  );
};

export default PropertyReportTable;
