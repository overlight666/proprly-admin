/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsChevronRight, BsThreeDots } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import AddUserModal from "../../../components/addUserModal";
import { useDispatch, useSelector } from "react-redux";
import { listUserByRoleReducer } from "../../../store/features/reducers";
import type { AppState, ReducerTypes } from "../../../types";

export default function StrataInformation({
  attachedStrata,
  attachStrata,
  addStrata,
}: any) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStrata, setSelectedStrata] = useState<any>();
  const { projectStrata }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  let didInit = false;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!didInit) {
      dispatch(listUserByRoleReducer("project_strata"));
      didInit = true;
    }
  }, []);

  return (
    <div className="mt-5 flex w-full flex-col pb-5">
      <div className="flex w-full flex-row items-end gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="user" value="Strata list" />
          </div>
          <Select
            id="user"
            value={selectedStrata}
            onChange={(value) => setSelectedStrata(value.target.value)}
            required
          >
            <option selected>Please select</option>
            {projectStrata &&
              projectStrata.map((user, index) => {
                return (
                  <option key={index} value={JSON.stringify(user)}>
                    {user.fullName}
                  </option>
                );
              })}
          </Select>
        </div>
        <Button
          className="mx-1 mb-1"
          onClick={() => attachStrata(selectedStrata)}
        >
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Attach Strata
          </div>
        </Button>
      </div>
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
            {(attachedStrata &&
              attachedStrata.map((user: any, index: number) => {
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
      <div className="mt-1 flex items-center text-[14px] text-[blue]">
        <a href="javascript:void(0)" onClick={() => setOpenModal(true)}>
          ADD NEW STRATA
        </a>
        <BsChevronRight />
      </div>
      {/* <div className="my-5 flex flex-row gap-5">
        <Button className="w-[100px]">
          <div className="flex items-center gap-x-2 text-xs">Submit</div>
        </Button>
        <Button className="w-[100px]" color="gray">
          <div className="flex items-center gap-x-2 text-xs">Cancel</div>
        </Button>
      </div> */}
      <AddUserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        addUserHandler={addStrata}
        title={"Add new strata"}
      />
    </div>
  );
}
