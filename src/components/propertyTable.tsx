/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import type { Property } from "../types";
import { useEffect } from "react";
import { Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { selectProperty } from "../store/features/propertySlice";
// import OrgTableData from "./datatable/orgtable";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";

const PropertyTable = function ({ properties }) {
  const { id, project_id }: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (!DataTable.isDataTable("#organization-property-table")) {
        new DataTable("#organization-property-table", {
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
                  {props?.lotNo ? props?.lotNo : ""}
                </th>
                <th className="px-6 py-4">{props.unitNo}</th>
                <th className="px-6 py-4">
                  {props.user &&
                    props.user
                      .map((u) => {
                        return u.fullName;
                      })
                      .join(", ")}
                </th>
                <th className="px-6 py-4">
                  {props.projectTower && props.projectTower.name}
                </th>
                <th className="px-6 py-4">
                  {props.projectTower &&
                    props.projectTower.floorList.find(
                      (f) => f.key == props.floor
                    )?.value}
                </th>
                <th className="px-6 py-4">
                  <div
                    className={`flex w-auto items-center justify-center rounded-md border border-transparent  px-2.5 py-0.5 text-sm  shadow-sm transition-all ${
                      props.warrantyStatus == "pending" ||
                      props.warrantyStatus == "under_construction"
                        ? "bg-red-100 text-red-800"
                        : props.warrantyStatus == "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {props.warrantyStatus && props.warrantyStatus.toUpperCase()}
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
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(selectProperty(undefined));
                        navigate(
                          `/organization/${id}/project/${project_id}/properties/${props.id}`
                        );
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
  );
};

export default PropertyTable;
