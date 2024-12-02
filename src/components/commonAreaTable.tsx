/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef } from "react";
import { Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import OrgTableData from "./datatable/orgtable";
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
  //   const isInitTable = false;

  const table = useRef(null);

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

  return listCommonAreas && listCommonAreas.length ? (
    <table
      ref={table}
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
        {listCommonAreas &&
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
          })}
      </tbody>
    </table>
  ) : (
    <></>
  );
};

export default CommonAreaTable;
