/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { BsListTask } from "react-icons/bs";
import { TbFileExport } from "react-icons/tb";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdFormatListNumbered } from "react-icons/md";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateGrid } from "../store/features/appSlice";
import type { AppState, ReducerTypes } from "../types";
import { clear } from "../store/features/imageSlice";
const OrganizationHeader = function (props: any) {
  const { isGrid }: AppState = useSelector(
    (state: ReducerTypes) => state.application,
  );

  const { canAddOrg, canTransformTable } = props;
  // const { userData }: UserState = useSelector(
  //   (state: ReducerTypes) => state.user
  // );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`${page}`);
  };

  return (
    <div className="mt-5 grid grid-cols-9 gap-2">
      <div className="relative col-span-3 w-full">
        <input
          type="search"
          id="search-dropdown"
          className="z-20 block w-full rounded-[5px] rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
          placeholder="Search"
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
        </button>
      </div>
      <div className="col-span-4 flex items-center">
        <Button
          // onClick={() => gotoPage("/organization/new")}
          className="mx-1 w-[90px]"
          color="gray"
        >
          <div className="flex items-center gap-x-2 text-xs">
            <BsListTask />
            Filter
          </div>
        </Button>
        <Button
          // onClick={() => gotoPage("/organization/new")}
          color="gray"
          className="mx-1"
        >
          <div className="flex items-center gap-x-2 text-xs ">
            <TbFileExport />
            Export CSV
          </div>
        </Button>
        {canTransformTable && (
          <>
            <Button
              onClick={() => {
                dispatch(updateGrid(!isGrid));
              }}
              color="gray"
              className={`mx-1 w-[50px] ${
                isGrid && "bg-gray-100 text-blue-600"
              }`}
            >
              <div className="flex items-center gap-x-2 text-xs">
                <AiOutlineAppstore />
              </div>
            </Button>
            <Button
              onClick={() => {
                dispatch(updateGrid(!isGrid));
              }}
              className={`mx-1 w-[50px] ${
                !isGrid && "bg-gray-100 text-blue-600"
              }`}
              color="gray"
            >
              <div className="flex items-center gap-x-2 text-xs">
                <MdFormatListNumbered />
              </div>
            </Button>
          </>
        )}
      </div>
      {canAddOrg && (
        <Button
          onClick={() => {
            dispatch(clear());
            gotoPage("/organization/new");
          }}
          className="col-span-2 w-[200px]"
        >
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Add organization
          </div>
        </Button>
      )}

      {/* )} */}
    </div>
  );
};

export default OrganizationHeader;
