/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from "react";
import { Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import OrgTableData from "./datatable/orgtable";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";
import { getCommonAreaByProjectReducer } from "../store/features/reducers";
import type { ProjectState } from "../types";

const CommonAreaTable = function () {
  const { project_id }: any = useParams();
  const { listCommonAreas }: ProjectState = useSelector(
    (state: any) => state.project
  );

  const dispatch = useDispatch();
  let isInit = false;

  useEffect(() => {
    if (!isInit) {
      dispatch(getCommonAreaByProjectReducer(project_id));
      isInit = true;
    }
  }, []);

  const getStatus = (value) => {
    return value
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });
  };

  useEffect(() => {
    try {
      if (!DataTable.isDataTable("#common-area-table")) {
        new DataTable("#common-area-table", {
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
    <table
      id="common-area-table"
      className="!w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
    >
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            SR NO.
          </th>
          <th scope="col" className="px-6 py-3">
            COMMON AREA LOT NO.
          </th>
          <th scope="col" className="px-6 py-3">
            STATUS
          </th>

          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {(listCommonAreas &&
          listCommonAreas.length &&
          listCommonAreas.map((ca, index) => {
            return (
              <tr key={index}>
                <td>{ca.id}</td>
                <td>{ca.lotNo}</td>
                <td>{getStatus(ca.status)}</td>
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
          })) || (
          <tr>
            <td colSpan={4}>
              <div className="flex w-full items-center justify-center py-5">
                No data found
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CommonAreaTable;
