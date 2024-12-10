/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef } from "react";
import { Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import OrgTableData from "./datatable/orgtable";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";
import { getCommonAreaByProjectReducer } from "../store/features/reducers";
import type { ProjectState } from "../types";
import { resetWarranty } from "../store/features/imageSlice";

const CommonAreaTable = function () {
  const { id, project_id }: any = useParams();
  const { commonAreaItem }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const navigate = useNavigate();
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
    let val = "";
    try {
      val =
        value &&
        value
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          });
    } catch (error) {
      val = "";
    }
    return val;
  };

  return commonAreaItem ? (
    <table
      ref={table}
      id="common-area-table"
      className="!w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
    >
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            COMMON AREA LOT NO.
          </th>
          <th scope="col" className="px-6 py-3">
            COMMON AREA STATUS
          </th>
          <th scope="col" className="px-6 py-3">
            WARRANTY STATUS
          </th>

          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {commonAreaItem && (
          <tr>
            <td>{commonAreaItem.lotNo}</td>
            <td>{getStatus(commonAreaItem.status)}</td>
            <th>
              <div
                className={`flex w-auto items-center justify-center rounded-md border border-transparent px-2.5  py-0.5 text-sm shadow-sm transition-all ${
                  commonAreaItem.warrantyStatus == "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {commonAreaItem &&
                  commonAreaItem.warrantyStatus &&
                  commonAreaItem.warrantyStatus.toUpperCase()}
              </div>
            </th>
            <td className="px-6 py-4">
              <div className="flex w-full flex-row-reverse">
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
                      dispatch(resetWarranty());
                      navigate(
                        `/organization/${id}/project/${project_id}/common-area/${commonAreaItem.id}`
                      );
                    }}
                  >
                    View
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  ) : (
    <table className="!w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
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

export default CommonAreaTable;
