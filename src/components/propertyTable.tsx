/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import type { Property } from "../types";
import { useEffect } from "react";
import { DataTable } from "simple-datatables";
import { Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
// import OrgTableData from "./datatable/orgtable";

const PropertyTable = function ({ properties }) {
  useEffect(() => {
    if (document.getElementById("organization-property-table") && properties) {
      try {
        const datatable = new DataTable("#organization-property-table", {
          searchable: false,
          fixedHeight: false,
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
            table: "p-20 !w-full",
          },
        });
        datatable.update();
        // OrgTableData(orgList);
        // console.log(orgList);
        // dataTable.insert(newData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [properties]);

  return (
    <table
      id="organization-property-table"
      className="!w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
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
            LOT NO
          </th>
          <th scope="col" className="px-6 py-3">
            UNIT NO
          </th>
          <th scope="col" className="px-6 py-3">
            OWNER NAME
          </th>
          <th scope="col" className="px-6 py-3">
            TOWER
          </th>
          <th scope="col" className="px-6 py-3">
            FLOOR
          </th>
          <th scope="col" className="px-6 py-3">
            WARRANTY STATUS
          </th>

          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {properties &&
          properties.length > 0 &&
          properties.map((props: Property, index) => {
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
                  {props.lotNo}
                </th>
                <th className="px-6 py-4">{props.unitNo}</th>
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4">{props.tower}</th>
                <th className="px-6 py-4">{props.floor}</th>
                <th className="px-6 py-4">
                  <div
                    className={`flex w-auto items-center justify-center rounded-md border border-transparent  px-2.5 py-0.5 text-sm  shadow-sm transition-all ${
                      props.status === "pending" ||
                      props.status === "under_construction"
                        ? "bg-yellow-100 text-yellow-800"
                        : props.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    Pending
                  </div>
                </th>

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
                    <Dropdown.Item>View</Dropdown.Item>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default PropertyTable;
