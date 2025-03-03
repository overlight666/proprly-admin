/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { selectedOrgAtom } from "../../../_state/atoms/organizations";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Select from "../../../components/form/Select";
import {
  globalConfigAtom,
  projectResponseAtom,
  selectedProjectAtom,
} from "../../../_state";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { ucword } from "../../../_helpers";
import DropzoneComponent from "../../../components/form/form-elements/DropZone";
import {
  dropZoneAtom,
  uploadResponseAtom,
} from "../../../_state/atoms/dropzone";
import FileUploader from "../../../_components/ImageUploader";
import { Link } from "react-router";
import Button from "../../../components/ui/button/Button";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { ImageType } from "../../../_types";
import { useModal } from "../../../hooks/useModal";
import { useProject } from "../../../_actions/projects.actions";
import { BoxIcon, FolderIcon } from "../../../icons";
import React from "react";
import TowersTable from "../Towers/TowersTable";
import AddTowerModal from "../Towers/AddTowerModal";

export default function EditProject() {
  const uploadResponse: any = useRecoilValue(uploadResponseAtom);
  const setUploadResponse = useSetRecoilState(uploadResponseAtom);
  const selectedOrganization = useRecoilValue(selectedOrgAtom);
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const globalConfig = useRecoilValue(globalConfigAtom);

  const [projectTypeOptions, setProjectTypeOptions] = useState<any>([]);
  const [msTypeOptions, setMsTypeOptions] = useState<any>([]);
  const setImage = useSetRecoilState(dropZoneAtom);
  const [fileContainer, setFileContainer] = useState<ImageType[]>([]);
  const projectResponse = useRecoilValue(projectResponseAtom);
  const uploadedImage = useRecoilValue(dropZoneAtom);
  const { isOpen, openModal, closeModal } = useModal();
  const [towers, setTowers] = useState<any[]>([]);
  const [uploadQueue, setUploadQueue] = useState<any>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { id, project_id }: any = useParams();
  const projectAction = useProject();

  const basementOptions: any = [
    {
      label: 1,
      value: 1,
    },
    {
      label: 2,
      value: 2,
    },
    {
      label: 3,
      value: 3,
    },
    {
      label: 4,
      value: 4,
    },
    {
      label: 5,
      value: 5,
    },
  ];
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    name: Yup.string().required("Organization name is required"),
    maintenanceServiceType: Yup.string().required("Service type is required"),
    address0: Yup.string().required("Address is required"),
    address1: Yup.string().optional(),
    address2: Yup.string().optional(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const validationSchema2 = Yup.object().shape({
    numBasementLevels: Yup.string().required("Basement is required"),
  });
  const formOptions2 = { resolver: yupResolver(validationSchema2) };
  const form2 = useForm(formOptions2);

  const form2Status = form2.formState;

  useEffect(() => {
    projectAction.getSelectedProject(project_id);
  }, [project_id, projectResponse]);

  useEffect(() => {
    setImage(undefined);
  }, []);

  useEffect(() => {
    if (globalConfig) {
      const typeHandler =
        globalConfig &&
        globalConfig?.projectTypeList.map((r) => {
          return {
            value: r.value,
            label: ucword(r.value),
            disabled: r.key !== "apartment",
          };
        });
      setProjectTypeOptions(typeHandler);
      const msHandler =
        globalConfig &&
        globalConfig?.projectMaintenanceServiceTypeList.map((r) => {
          return {
            value: r.key,
            label: ucword(r.value),
            disabled: false,
          };
        });
      setMsTypeOptions(msHandler);
    }
  }, [globalConfig]);

  useEffect(() => {
    if (uploadResponse) {
      if (fileContainer && fileContainer.length > 0) {
        setFileContainer((oldArray: any) => [...oldArray, uploadResponse]);
      } else {
        setFileContainer([uploadResponse]);
      }
      setUploadResponse(undefined);
    }
  }, [uploadResponse]);

  function onSubmit(props: any) {
    if (uploadedImage) {
      const params = {
        organizationId: id,
        maintenanceServiceType: props.maintenanceServiceType,
        type: props.type,
        name: props.name,
        address: `${props.address0}, ${props.address1}, ${props.address2}`,
        imageId: uploadedImage.id,
        documents: fileContainer.map((f) => f.id),
      };
      projectAction
        .updateProject(params, project_id, toast)
        .catch((error: any) => {
          toast.error(error[0].message);
        });
    } else {
      toast.warn("Please upload project image");
    }
  }

  const removeFile = (file: File) => {
    const newFiles: any =
      fileContainer &&
      fileContainer.length > 0 &&
      fileContainer.filter((e) => e.name !== file.name);
    setFileContainer(newFiles);
  };

  const removeTower = (tower: any) => {
    projectAction
      .removeProjectTower(tower.id)
      .then(() => {
        const filteredTower: any =
          towers &&
          towers.length > 0 &&
          towers.filter((t) => t.name !== tower.name);
        setTowers(filteredTower);
      })
      .catch((e: any) => {
        toast.error(e);
      });
  };

  const addTower = (name: any, floor: any) => {
    const t = {
      name: name,
      numFloors: floor,
    };
    setTowers((oldArray: any) => [...oldArray, t]);
  };

  function onSubmit2(props: any) {
    if (towers.length === 0) {
      toast.error("Please add a tower!");
    } else {
      const params = {
        organizationId: id,
        numBasementLevels: props.numBasementLevels,
        towers: towers,
      };
      const newTower = towers.filter((t) => !t.id);
      if (newTower && newTower.length > 0) {
        newTower.map((to) => {
          const params = {
            projectId: project_id,
            ...to,
          };
          projectAction.addProjectTower(params);
        });
      }

      projectAction
        .updateProject(params, project_id, toast)
        .catch((error: any) => {
          toast.error(error[0].message);
        });
    }
  }

  const tabsData = [
    {
      label: "Project Information",
      icon: <FolderIcon />,
    },
    {
      label: "Tower/Basement Information",
      icon: <BoxIcon />,
    },
  ];

  useEffect(() => {
    if (selectedProject) {
      setValue("type", selectedProject.type);
      setValue("name", selectedProject.name);
      setValue(
        "maintenanceServiceType",
        selectedProject.maintenanceServiceType
      );
      const addressHandling = selectedProject.address.split(",");
      if (addressHandling.length > 0) {
        setValue("address0", addressHandling[0]);
      }
      if (addressHandling.length > 1) {
        setValue("address1", addressHandling[1]);
      }
      if (addressHandling.length > 2) {
        setValue("address2", addressHandling[2]);
      }
      form2.setValue("numBasementLevels", selectedProject.numBasementLevels);
      setImage(selectedProject.image);
      setUploadQueue(selectedProject.documents);
      setTowers(selectedProject?.projectTower || []);
      setFileContainer(selectedProject?.documents || []);
    }
  }, [selectedProject]);

  return (
    <div className="min-h-screen  overflow-hidden ">
      <AddTowerModal
        isOpen={isOpen}
        closeModal={closeModal}
        addTower={addTower}
      />
      <PageMeta title="Proprly | Admin" description="Edit Project" />
      <PageBreadcrumb
        pageTitle="Edit Project"
        subPath={[
          {
            title: selectedOrganization && selectedOrganization?.name,
            path: `/organization/${selectedOrganization?.id}`,
          },
          {
            title: selectedProject && selectedProject?.name,
            path: `/organization/${selectedOrganization?.id}/project/${selectedProject?.id}`,
          },
        ]}
      />
      <div className="flex dark:text-white text-black border-b-[0.1px] border-gray-200 mb-5">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`transition-colors duration-300 ${
                idx == 0 && "rounded-tl-md"
              } ${
                idx === activeTabIndex
                  ? "bg-blue-100 px-6 py-4 text-blue-600"
                  : "border-transparent hover:border-gray-200 px-6 py-4"
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                {tab.icon}
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>
      {activeTabIndex == 0 && (
        <div className="grid grid-cols-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-2"
            id="projectForm"
          >
            <ComponentCard title="Project Information">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="input">
                    Project Name <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    type="text"
                    register={{ ...register("name") }}
                    error={errors.name}
                    hint={errors.name?.message}
                    placeholder="Enter your organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="inputTwo">
                    Project type <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Select
                    options={projectTypeOptions}
                    placeholder="Select type"
                    className="dark:bg-dark-900"
                    register={{ ...register("type") }}
                    error={errors.type}
                    hint={errors.type?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="inputTwo">
                    Maintenance and Service type{" "}
                    <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Select
                    options={msTypeOptions}
                    placeholder="Select Maintenance and Service type"
                    className="dark:bg-dark-900"
                    register={{ ...register("maintenanceServiceType") }}
                    error={errors.maintenanceServiceType}
                    hint={errors.maintenanceServiceType?.message}
                  />
                </div>
              </div>
            </ComponentCard>
            <ComponentCard
              className="!mt-[0px] pt-[0px]"
              title="Address Information"
            >
              <div>
                <Label htmlFor="input">
                  House no/Unit no <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  type="text"
                  register={{ ...register("address0") }}
                  error={errors.address0}
                  hint={errors.address0?.message}
                  placeholder="Enter your House no/Unit no"
                />
              </div>
              <div>
                <Label htmlFor="input">Address line 1</Label>
                <Input
                  type="text"
                  register={{ ...register("address1") }}
                  error={errors.address1}
                  hint={errors.address1?.message}
                  placeholder="Address line 1"
                />
              </div>
              <div>
                <Label htmlFor="input">Address line 2</Label>
                <Input
                  type="text"
                  register={{ ...register("address2") }}
                  error={errors.address2}
                  hint={errors.address2?.message}
                  placeholder="Address line 2"
                />
              </div>
            </ComponentCard>
          </form>
          <div className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-2 mt-5">
            <DropzoneComponent title="Upload Image" />

            <ComponentCard
              className="!mt-[0px] pt-[0px]"
              title="Upload Documents"
            >
              <FileUploader
                title="Upload file"
                removeFile={removeFile}
                setUploadQueue={setUploadQueue}
                uploadQueue={uploadQueue}
              />
            </ComponentCard>
          </div>
          <div className="flex w-full flex-row gap-5 mt-10">
            <Link
              to={`/organization/${id}/project/${project_id}`}
              className="flex items-center justify-center px-3 py-2 rounded-md bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
            >
              Cancel
            </Link>
            <Button
              size="sm"
              variant="primary"
              disabled={isSubmitting}
              type="submit"
              form="projectForm"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}{" "}
              Update
            </Button>
          </div>
        </div>
      )}
      {activeTabIndex == 1 && (
        <div className="grid grid-cols-1">
          <form
            onSubmit={form2.handleSubmit(onSubmit2)}
            className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-1"
            id="projectForm2"
          >
            <ComponentCard
              title="Tower Information"
              rightComponent={
                <Button
                  size="sm"
                  type="button"
                  variant="primary"
                  onClick={() => openModal()}
                >
                  Add Tower
                </Button>
              }
            >
              <div>
                <TowersTable towers={towers} removeTower={removeTower} />
              </div>
            </ComponentCard>
            <ComponentCard title="Basement Information">
              <div>
                <Label htmlFor="inputTwo">
                  Basement Levels <span className="text-error-500">*</span>{" "}
                </Label>
                <Select
                  options={basementOptions}
                  placeholder="Select type"
                  className="dark:bg-dark-900"
                  register={{ ...form2.register("numBasementLevels") }}
                  error={form2Status.errors.numBasementLevels}
                  hint={form2Status.errors.numBasementLevels?.message}
                />
              </div>
            </ComponentCard>
          </form>
          <div className="flex w-full flex-row gap-5 mt-10">
            <Link
              to={`/organization/${id}/project/${project_id}`}
              className="flex items-center justify-center px-3 py-2 rounded-md bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
            >
              Cancel
            </Link>
            <Button
              size="sm"
              variant="primary"
              disabled={form2Status.isSubmitting}
              type="submit"
              form="projectForm2"
            >
              {form2Status.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}{" "}
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
