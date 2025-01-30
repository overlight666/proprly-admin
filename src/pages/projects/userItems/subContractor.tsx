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
  getTradeCodeListByProject,
  listUserByRoleReducer,
} from "../../../store/features/reducers";
import type {
  AppState,
  Lead,
  projectRole,
  ProjectState,
  ReducerTypes,
  userInterface,
  UserState,
} from "../../../types";
import AddUserModal from "../../../components/addUserModal";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import {
  setResponseStatus,
  setUserType,
} from "../../../store/features/projectSlice";
import { MultiSelect } from "react-multi-select-component";

export default function SubContractor() {
  const { project_id }: any = useParams();
  // let didInit = false;
  const { projectSubContractor }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );
  const { userData }: UserState = useSelector(
    (state: ReducerTypes) => state.user
  );
  const {
    selectedProject,
    responseStatus,
    userType,
    userResponse,
    tradeCodeList,
  }: ProjectState = useSelector((state: any) => state.project);

  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Lead>();
  const dispatch = useDispatch();

  useEffect(() => {
    const o =
      tradeCodeList &&
      tradeCodeList.length > 0 &&
      tradeCodeList.map((e) => {
        return { label: e.tradeName, value: e.id };
      });
    setOptions(o);
  }, [tradeCodeList]);

  useEffect(() => {
    if (responseStatus === "User Added" && userType === "sub_contractor") {
      toast.info("New sub contractor user is attached");
      dispatch(setResponseStatus(""));
      if (userResponse && userResponse.user) {
        dispatch(getSingleProject(project_id));
      }
    }
  }, [responseStatus]);

  useEffect(() => {
    // if (!didInit) {
    const params = {
      id: project_id,
      role: "project_sub_contractor",
      userType: (userData && userData.user && userData.user.userType) || "",
    };
    dispatch(listUserByRoleReducer(params));
    dispatch(getTradeCodeListByProject(project_id));
    //   didInit = true;
    // }
  }, []);

  const addUserHandler = (name, email, mobile, tradeCodeIds) => {
    if (
      name !== "" &&
      email !== "" &&
      mobile !== "" &&
      tradeCodeIds.length > 0
    ) {
      const codeIds =
        tradeCodeIds &&
        tradeCodeIds.length > 0 &&
        tradeCodeIds.map((e) => e.value);
      const params = {
        fullName: name,
        email: email,
        mobile: mobile,
        roleId: 5,
        projectId: project_id,
        tradeCodeIds: codeIds,
      };
      dispatch(createProjectUserReducer(params));
      dispatch(setUserType("sub_contractor"));
      setOpenModal(false);
      setIsSuccess(true);
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
    const codeIds =
      selected && selected.length > 0 && selected.map((e: any) => e.value);
    if (codeIds && codeIds.length > 0) {
      if (projectUser) {
        if (
          !projectUser.find(
            (user: userInterface) => user.id === selectedUser?.id
          )
        ) {
          const params = {
            id: selectedUser?.id,
            roleId: 5,
            projectId: project_id,
            tradeCodeIds: codeIds,
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
          tradeCodeIds: codeIds,
        };
        dispatch(createProjectUserReducer(params));
        dispatch(setUserType("sub_contractor"));
      }
    } else {
      toast.error("Please Assign a Trade Code");
    }
  };

  console.log(projectUser);
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-end gap-2">
        <div className="w-[30%]">
          <div className="mb-2 block">
            <Label htmlFor="project_admins" value="Sub-Contractor List" />
          </div>
          <Select
            id="project_admins"
            onChange={(e) => fillUserData(e.target.value)}
            required
          >
            {projectSubContractor && projectSubContractor.length > 0 ? (
              <>
                <option selected disabled>
                  Please Select
                </option>
                {projectSubContractor.map((user: Lead, index: number) => {
                  return (
                    <option key={index} value={JSON.stringify(user)}>
                      {user.fullName}
                    </option>
                  );
                })}
              </>
            ) : (
              <option selected disabled>
                No user available
              </option>
            )}
          </Select>
        </div>
        {selectedUser && (
          <div className="w-[30%]">
            <div className="mb-2 block">
              <Label
                className="mb-2"
                htmlFor="project_admins"
                value="Select Trade Category"
              />
            </div>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
        )}
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
              <th scope="col" className="px-6 py-3">
                TRADE CATEGORY
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
                      {user &&
                        user.tradeCodes &&
                        user.tradeCodes.length > 0 &&
                        user.tradeCodes
                          .map((td) => `[${td.tradeCode}]${td.tradeName}`)
                          .join(", ")}
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
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
        openModal={openModal}
        setOpenModal={setOpenModal}
        addUserHandler={addUserHandler}
        title={"Add Sub-Contractor"}
      />
      {/* <SelectTradeCode
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
        openModal={openTradeCodes}
        setOpenModal={setOpenTradeCodes}
        addUserHandler={addUserHandlerSub}
        title={"Select Trade Codes"}
      /> */}
    </div>
  );
}
