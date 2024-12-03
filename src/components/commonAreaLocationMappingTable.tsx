/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

// import OrgTableData from "./datatable/orgtable";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";

const CommonAreaLocationMappingTable = function () {
  return (
    <table className="!w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            TOWER NAME
          </th>
          <th scope="col" className="px-6 py-3">
            FLOOR/LEVEL
          </th>
          <th scope="col" className="px-6 py-3">
            STATUS
          </th>

          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>
            <div className="flex w-full items-center justify-center py-5">
              No data information
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CommonAreaLocationMappingTable;
