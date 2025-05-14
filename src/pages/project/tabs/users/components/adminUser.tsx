/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import AddUserModal from "@/components/modals/addUserModal";
import UserTable from "../tables/userTable";
import { useModal } from "@/helpers/useModal";
import { allUserAtom, globalConfigAtom, selectedProjectAtom } from "@/_recoil/states";
import { useProject, useUserActions } from "@/_recoil/actions";
import { projectRole, userInterface } from "@/lib/interface";
import { Label } from "flowbite-react";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getRoleId } from "@/helpers";


export const AdminUser = () => {
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [attachUser, setAttachUser] = useState<any>();
  const { project_id, id } = useParams();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  // const projectAdmins: any = useRecoilValue(projectAdminUsersAtom);
  const allUsers: any = useRecoilValue(allUserAtom);

  const userAction = useUserActions();
  const projectAction = useProject();
  const config: any = useRecoilValue(globalConfigAtom);

  useEffect(() => {
    if (selectedProject) {
      const attachedUsers = selectedProject?.user?.filter(
        (u: userInterface) =>
          u.project_role &&
          u.project_role.find(
            (role: projectRole) => role.roleKey === "project_admin"
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
      roleId: getRoleId(config?.roles, "project_admin"),
    };
    if (!selectedUsers.find((o: any) => o.email === temp.email)) {
      userAction.addUser(project_id, temp).then(() => {
        userAction.getAllUsers(id);
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
        roleId: getRoleId(config?.roles, "project_admin"),
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
        title={"Add New Admin"}
      />
      <div>
        <Label htmlFor="inputTwo">Project Admin list</Label>
        <div className="flex flex-row gap-2 w-full items-center">
          <Select
            options={
              allUsers?.map((user: any) => {
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
            variant="default"
            onClick={() => attachuserHandler()}
          >
            Attach Admin <PlusIcon />
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
        <span>ADD NEW ADMIN</span>
        <PlusIcon />
      </div>
    </div>
  );
};
