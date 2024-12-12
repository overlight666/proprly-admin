/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsChevronRight, BsThreeDots } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectUserReducer,
  getSingleProject,
  listUserByRoleReducer,
} from "../../../store/features/reducers";
import type {
  AppState,
  Lead,
  projectRole,
  ProjectState,
  ReducerTypes,
  userInterface,
} from "../../../types";
import AddUserModal from "../../../components/addUserModal";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import {
  setResponseStatus,
  setUserType,
} from "../../../store/features/projectSlice";

export default function SubContractor() {
  const { project_id }: any = useParams();
  let didInit = false;
  const { projectSubContractor }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const {
    selectedProject,
    responseStatus,
    userType,
    userResponse,
  }: ProjectState = useSelector((state: any) => state.project);

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Lead>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseStatus === "User Added" && userType === "sub_contractor") {
      toast.info("New sub contructor user is attached");
      dispatch(setResponseStatus(""));
      if (userResponse && userResponse.user) {
        dispatch(getSingleProject(project_id));
      }
    }
  }, [responseStatus]);

  useEffect(() => {
    if (!didInit) {
      dispatch(listUserByRoleReducer("project_sub_contractor"));
      didInit = true;
    }
  }, []);

  const addUserHandler = (name, email, mobile) => {
    if (name !== "" && email !== "" && mobile !== "") {
      const params = {
        fullName: name,
        email: email,
        mobile: mobile,
        roleId: 5,
        projectId: project_id,
      };
      dispatch(createProjectUserReducer(params));
      dispatch(setUserType("sub_contractor"));
      setOpenModal(false);
    } else {
      toast.warn("All fields are required");
    }
  };

  const projectUser =
    selectedProject &&
    selectedProject.user &&
    selectedProject.user.length &&
    selectedProject.user.filter(
      (u: userInterface) =>
        u.project_role &&
        u.project_role.find(
          (role: projectRole) => role.roleKey === "project_sub_contractor"
        )
    );

  const fillUserData = (e) => {
    setSelectedUser(JSON.parse(e));
  };

  const attachUser = () => {
    if (projectUser) {
      if (
        !projectUser.find((user: userInterface) => user.id === selectedUser?.id)
      ) {
        const params = {
          id: selectedUser?.id,
          roleId: 5,
          projectId: project_id,
        };
        dispatch(createProjectUserReducer(params));
        dispatch(setUserType("sub_contractor"));
      } else {
        toast.warning("The selected user is already exist!");
      }
    } else {
      const params = {
        id: selectedUser?.id,
        roleId: 5,
        projectId: project_id,
      };
      dispatch(createProjectUserReducer(params));
      dispatch(setUserType("sub_contractor"));
    }
  };
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-end gap-2">
        <div className="w-[40%]">
          <div className="mb-2 block">
            <Label htmlFor="project_admins" value="Sub-Contractor List" />
          </div>
          <Select
            id="project_admins"
            onChange={(e) => fillUserData(e.target.value)}
            required
          >
            {(projectSubContractor &&
              projectSubContractor.length > 0 &&
              projectSubContractor.map((user: Lead, index: number) => {
                return (
                  <option key={index} value={JSON.stringify(user)}>
                    {user.fullName}
                  </option>
                );
              })) || <option selected>No user available</option>}
          </Select>
        </div>
        <Button className="mx-2 mb-1 w-[200px]" onClick={() => attachUser()}>
          <div className="flex items-center gap-x-2 text-xs">
            <HiPlus />
            Attach Sub Contractor
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
            {(projectUser &&
              projectUser.length > 0 &&
              projectUser.map((user: userInterface, index: number) => {
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
              <tr>
                <td colSpan={4}>
                  <div className="flex w-full items-center justify-center py-5">
                    {" "}
                    No User Available
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-1 flex items-center text-[14px] text-[blue]">
        <a href="javascript:void(0)" onClick={() => setOpenModal(true)}>
          ADD NEW SUB-CONTRACTOR
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
        addUserHandler={addUserHandler}
        title={"Add Sub-Contractor"}
      />
    </div>
  );
}
