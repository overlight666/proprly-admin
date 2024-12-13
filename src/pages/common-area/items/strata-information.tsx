/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "flowbite-react";
import { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { listUserByRoleReducer } from "../../../store/features/reducers";
import type { AppState, ReducerTypes } from "../../../types";

export default function StrataInformation() {
  let didInit = false;
  const dispatch = useDispatch();
  const { projectStrata }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  useEffect(() => {
    if (!didInit) {
      dispatch(listUserByRoleReducer("project_strata"));
      didInit = true;
    }
  }, []);

  return (
    <div className="mt-5 flex w-full flex-col pb-5">
      <div className="relative my-5 overflow-x-auto p-5 px-2 shadow-md sm:rounded-lg">
        <table
          id="organization-project-table"
          className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        >
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                FULLNAME
              </th>
              <th scope="col" className="px-6 py-3">
                PHONE
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL ADDRESS
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(projectStrata &&
              projectStrata.map((user: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {user.fullName}
                    </th>
                    <td className="px-6 py-4">{user.mobile}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <Button color="gray" className="w-[50px]">
                        <div className="flex items-center gap-x-2 text-xs">
                          <BsThreeDots />
                        </div>
                      </Button>
                    </td>
                  </tr>
                );
              })) || (
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  colSpan={4}
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <div className="flex w-full items-center justify-center">
                    No data found
                  </div>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
