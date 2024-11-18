/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { TbFileExport } from "react-icons/tb";

import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

import { clear } from "../store/features/imageSlice";
import { clearProject } from "../store/features/projectSlice";
import { updateProjectTab } from "../store/features/appSlice";
import { useDispatch } from "react-redux";
const ProjectHeader = function () {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  // const { userData }: UserState = useSelector(
  //   (state: ReducerTypes) => state.user
  // );

  const navigate = useNavigate();

  return (
    <>
      <div className="mb-10 ml-[16px] mt-5 grid w-full grid-cols-9 gap-2">
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
            Search
          </button>
        </div>
        <div className="col-span-4 flex items-center">
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
        </div>
        <Button
          onClick={() => {
            dispatch(clear());
            dispatch(clearProject());
            dispatch(updateProjectTab(1));
            navigate(`/organization/${id}/new`);
          }}
          className="col-span-2 w-[200px]"
        >
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Add new project
          </div>
        </Button>
      </div>
    </>
  );
};

export default ProjectHeader;
