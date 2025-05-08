/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Label from "../../../components/form/Label";
import Select2 from "../../../components/form/Select2";
import Button from "../../../components/ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import { PlusIcon } from "../../../icons";
import { toast } from "react-toastify";
import { projectRole, userInterface } from "../../../_types";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import {
  appointmentTradeCodesAtom,
  globalConfigAtom,
  projectSubContractorAtom,
  selectedProjectAtom,
} from "../../../_state";
import { useProject, useUserActions } from "../../../_actions";
import UserTradesTable from "./UserTableTrade";
import AddUserTradesModal from "./AddUserTradesModal";
import MultiSelect from "../../../components/form/MultiSelect";
import { getRoleId } from "../../../_helpers/getRoleId";
import React from "react";

export const SubContractorUser = () => {
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [attachUser, setAttachUser] = useState<any>();
  const { project_id, id } = useParams();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const projectSubContractor: any = useRecoilValue(projectSubContractorAtom);
  const userAction = useUserActions();
  const projectAction = useProject();
  const tradeCodeList = useRecoilValue(appointmentTradeCodesAtom);
  const [tradeCodes, setTradeCodes] = useState([]);
  const [tradesList, setTradeList] = useState([]);
  const config: any = useRecoilValue(globalConfigAtom);

  useEffect(() => {
    const tradesl = tradeCodeList?.map((trades: any) => {
      return {
        text: `${trades.tradeCode} - ${trades.tradeName}`,
        value: trades.id,
        selected: false,
      };
    });
    setTradeList(tradesl);
  }, [tradeCodeList]);

  useEffect(() => {
    if (selectedProject) {
      const attachedUsers = selectedProject?.user?.filter(
        (u: userInterface) =>
          u.project_role &&
          u.project_role.find(
            (role: projectRole) => role.roleKey === "project_sub_contractor"
          )
      );
      setSelectedUsers(attachedUsers || []);
    }
  }, [selectedProject]);

  const addUser = (
    email: any,
    fullName: any,
    mobileNumber: any,
    tradeCodes: any
  ) => {
    const temp = {
      fullName: fullName,
      mobile: mobileNumber,
      projectId: project_id,
      email,
      tradeCodeIds: tradeCodes,
      roleId: getRoleId(config?.role, "project_sub_contractor"),
    };
    if (!selectedUsers.find((o: any) => o.email === temp.email)) {
      userAction.addUser(project_id, temp).then(() => {
        userAction.getProjectAdminUsers(id);
        // setSelectedUsers((oldArray: any) => [...oldArray, temp]);
        projectAction.getSelectedProject(project_id);
      });
    } else {
      toast.warning("User email already exist");
    }
    closeModal();
  };

  const removeUser = (_email: string) => {
    toast.warn("This function is under construction");
    // const filteredBuilders = selectedUsers.filter(
    //   (builder: any) => builder.email !== email
    // );
    // setSelectedUsers(filteredBuilders);
  };

  const attachuserHandler = () => {
    const userHandler = JSON.parse(attachUser);

    if (!selectedUsers.find((o: any) => o.email === userHandler.email)) {
      const params = {
        id: userHandler?.id,
        roleId: getRoleId(config?.role, "project_sub_contractor"),
        tradeCodeIds: tradeCodes,
      };
      projectAction
        .attachUser(project_id, params)
        .then(() => {
          //   setSelectedUsers((oldArray: any) => [...oldArray, userHandler]);
          projectAction.getSelectedProject(project_id);
        })
        .catch((e: any) => {
          toast.error(e);
        });
    } else {
      toast.warning("User already exist");
    }
  };

  return (
    <div className="space-y-6 px-5 py-5">
      <AddUserTradesModal
        closeModal={closeModal}
        isOpen={isOpen}
        addUser={addUser}
        title={"Add New Sub-Contractor"}
      />
      <div>
        <Label htmlFor="inputTwo">Project subcontractor list</Label>
        <div className="flex flex-row gap-2 w-full">
          <Select2
            options={
              projectSubContractor?.map((user: any) => {
                return {
                  label: user?.fullName,
                  value: JSON.stringify(user),
                };
              }) || []
            }
            onChange={(e) => setAttachUser(e)}
            placeholder="Select a user"
            className="dark:bg-dark-900"
            containerClass="w-[85%]"
          />
          <Button
            size="sm"
            variant="primary"
            className="w-[15%]"
            onClick={() => attachuserHandler()}
          >
            Attach Subcontractor <PlusIcon />
          </Button>
        </div>
      </div>
      {attachUser?.length > 0 && (
        <div className="flex w-full">
          <div className="mt-2">
            <Label htmlFor="inputTwo">Trade Codes</Label>
            {/* <div className="flex flex-row gap-2 w-full"> */}
            <MultiSelect
              label=""
              hasLabel={false}
              options={tradesList}
              onChange={(values: any) => setTradeCodes(values)}
            />
            {/* </div> */}
          </div>
        </div>
      )}

      <div>
        <UserTradesTable
          selectedUsers={selectedUsers}
          removeUser={removeUser}
        />
      </div>
      <div
        className="text-blue-600 gap-1 flex flex-row items-center cursor-pointer"
        onClick={() => openModal()}
      >
        <span>ADD NEW SUB-CONTRACTOR</span>
        <PlusIcon />
      </div>
    </div>
  );
};
