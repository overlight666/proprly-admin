/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "flowbite-react";
import { BsSliders2Vertical, BsThreeDots } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { AddTradeCodeModal } from "../modals/addTradeCodeModal";
import type { ProjectState, TradeCode } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getTradeCodeListByProject } from "../../../store/features/reducers";
import { DataTable } from "simple-datatables";

export default function TradeMapping({ project_id }: any) {
  const { tradeCodeList, tradeCodeResponse, defectCodeList }: ProjectState =
    useSelector((state: any) => state.project);
  const dispatch = useDispatch();
  const ref = useRef<any>(null);
  useEffect(() => {
    dispatch(getTradeCodeListByProject(project_id));
  }, []);

  useEffect(() => {
    if (tradeCodeResponse !== undefined) {
      dispatch(getTradeCodeListByProject(project_id));
    }
  }, []);

  useEffect(() => {
    if (tradeCodeList && tradeCodeList.length > 0 && ref.current !== null) {
      if (
        document.getElementById("trade-code-table") &&
        typeof DataTable !== "undefined"
      ) {
        try {
          setTimeout(() => {
            const datatable = new DataTable("#trade-code-table", {
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
                table: "p-20",
              },
            });
            datatable.update();
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [tradeCodeList]);

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex w-[70%] flex-row items-center">
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
          <Button className="w-[100px]" color="gray">
            <div className="flex items-center gap-x-2 text-xs">
              <BsSliders2Vertical />
              Filter
            </div>
          </Button>
        </div>
        <Button className="mx-2 w-[200px]" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Add New Trade
          </div>
        </Button>
      </div>
      <div className="relative my-5 overflow-x-auto p-5 px-2 shadow-md sm:rounded-lg">
        {tradeCodeList && tradeCodeList.length > 0 ? (
          <table
            ref={ref}
            id="trade-code-table"
            className="h-[500px] w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
          >
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SR No
                </th>
                <th scope="col" className="px-6 py-3">
                  TRADE NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  TRADE CODE
                </th>
                <th scope="col" className="px-6 py-3">
                  DEFECT CODE
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {tradeCodeList && tradeCodeList.length ? (
                tradeCodeList.map((t: TradeCode, index: any) => {
                  return (
                    <tr
                      key={index}
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {t.id}
                      </th>
                      <td className="px-6 py-4">{t.tradeName}</td>
                      <td className="px-6 py-4">{t.tradeCode}</td>
                      <td className="px-6 py-4">
                        {t.defectcode && t.defectcode.length
                          ? t.defectcode
                              .map((o: any) => o.defectCode)
                              .join(", ")
                          : ""}
                      </td>
                      <td className="px-6 py-4">
                        <Button color="gray" className="w-[50px]">
                          <div className="flex items-center gap-x-2 text-xs">
                            <BsThreeDots />
                          </div>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
      <AddTradeCodeModal
        setOpen={setOpen}
        isOpen={isOpen}
        project_id={project_id}
        defectCodeList={defectCodeList}
      />
    </div>
  );
}
