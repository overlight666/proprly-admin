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
import type { AppState, ReducerTypes, UserState } from "../../../types";
import { useParams } from "react-router";

export default function Owner({ attachedOwner, attachOwner, addOwner }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<any>();
  const { propertyOwnerList }: AppState = useSelector(
    (state: ReducerTypes) => state.application,
  );
  const { userData }: UserState = useSelector(
    (state: ReducerTypes) => state.user,
  );
  const { project_id }: any = useParams();
  // let didInit = false;
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!didInit) {
    const params = {
      id: project_id,
      role: "property_owner",
      userType: (userData && userData.user && userData.user.userType) || "",
    };
    dispatch(listUserByRoleReducer(params));
    //   didInit = true;
    // }
  }, []);

  return (
    <div className="mt-5 flex w-full flex-col">
      <div className="flex w-full flex-row items-end gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="owner" value="Owner list" />
          </div>
          <Select
            id="owner"
            value={selectedOwner}
            onChange={(value) => setSelectedOwner(value.target.value)}
            required
          >
            <option selected>Please select</option>
            {propertyOwnerList &&
              propertyOwnerList.map((owner, index) => {
                return (
                  <option key={index} value={JSON.stringify(owner)}>
                    {owner.fullName}
                  </option>
                );
              })}
          </Select>
        </div>
        <Button
          className="mx-2 mb-1 w-[200px]"
          onClick={() => attachOwner(selectedOwner)}
        >
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Attach Owner
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
            {(attachedOwner &&
              attachedOwner.map((owner: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {owner.fullName}
                    </th>
                    <td className="px-6 py-4">{owner.mobile}</td>
                    <td className="px-6 py-4">{owner.email}</td>
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
          ADD NEW OWNER
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
        addUserHandler={addOwner}
        title={"Add new owner"}
      />
    </div>
  );
}
