/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Label from "../../../components/form/Label";
import Select2 from "../../../components/form/Select2";
import Button from "../../../components/ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import { PlusIcon } from "../../../icons";
import UserTable from "./UserTable";
import { toast } from "react-toastify";
import { projectRole, userInterface } from "../../../_types";
import AddUserModal from "./AddUserModal";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { projectAuditorAtom, selectedProjectAtom } from "../../../_state";
import { useProject, useUserActions } from "../../../_actions";

export const AuditorUser = () => {
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [attachUser, setAttachUser] = useState<any>();
  const { project_id, id } = useParams();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const projectAuditors: any = useRecoilValue(projectAuditorAtom);
  const userAction = useUserActions();
  const projectAction = useProject();

  useEffect(() => {
    if (selectedProject) {
      const attachedUsers = selectedProject?.user?.filter(
        (u: userInterface) =>
          u.project_role &&
          u.project_role.find(
            (role: projectRole) => role.roleKey === "project_auditor"
          )
      );
      setSelectedUsers(attachedUsers || []);
    }
  }, [selectedProject]);

  const addUser = (email: any, fullName: any, mobileNumber: any) => {
    const temp = {
      fullName: fullName,
      mobile: mobileNumber,
      projectId: project_id,
      email,
      roleId: 4,
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
        roleId: 4,
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
      <AddUserModal
        closeModal={closeModal}
        isOpen={isOpen}
        addUser={addUser}
        title={"Add New Auditor"}
      />
      <div>
        <Label htmlFor="inputTwo">Project Auditor list</Label>
        <div className="flex flex-row gap-2 w-full">
          <Select2
            options={
              projectAuditors?.map((user: any) => {
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
            Attach Auditor <PlusIcon />
          </Button>
        </div>
      </div>
      <div>
        <UserTable selectedUsers={selectedUsers} removeUser={removeUser} />
      </div>
      <div
        className="text-blue-600 gap-1 flex flex-row items-center cursor-pointer"
        onClick={() => openModal()}
      >
        <span>ADD NEW AUDITOR</span>
        <PlusIcon />
      </div>
    </div>
  );
};
