/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  CheckLineIcon,
  PencilIcon,
  PlusIcon,
  TrashBinIcon,
} from "../../../../icons";
import {
  useChecklist,
  useCountriesAction,
  useOrganization,
  useProject,
} from "../../../../_actions";
import { useRecoilValue } from "recoil";
import {
  allProjectsAtom,
  checklistElementListAtom,
  // checklistZoneListAtom,
  organizationsAtom,
  regionsAtom,
} from "../../../../_state";
import { confirm } from "../../../../components/dialog/ConfirmDialog";
import { useModal } from "../../../../hooks/useModal";
import { toast } from "react-toastify";
import { Project } from "../../../../_types";
import Label from "../../../../components/form/Label";
import PropertylistZoneModal from "./PropertylistZoneModal";
import PropertylistElementModal from "./PropertylistElementModal";

export default function PropertylistManagement() {
  const checklistAction = useChecklist();
  // const checklistZones = useRecoilValue(checklistZoneListAtom);
  const checklistElements = useRecoilValue(checklistElementListAtom);
  const [selectedElement, setSelectedElement] = useState<any>(undefined);
  const [selectedDefect, setSelectedDefect] = useState<any>(undefined);
  const [defaultSelectedZone, setDefaultSelectedZone] = useState(0);
  const [defaultSelectedElement, setDefaultSelectedElement] = useState(0);
  const [defaultSelectedSubElement, setDefaultSelectedSubElement] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();
  const orglist: any = useRecoilValue(organizationsAtom);
  const projectList: Project[] = useRecoilValue(allProjectsAtom);
  const regionList: any[] = useRecoilValue(regionsAtom);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedId, setSelectedId] = useState<any>();
  const orgAction = useOrganization();
  const projectAction = useProject();
  const regionAction = useCountriesAction();
  const [isType, setIsType] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const getChecklist = () => {
    const params =
      isType === "project"
        ? `?projectId=${selectedId}`
        : isType === "organization"
        ? `?organizationId=${selectedId}`
        : isType === "region"
        ? `?regionId=${selectedId}`
        : "";
    if (selectedId || isType === "default") {
      checklistAction.getCommonAreaElement(params);
    }
  };

  useEffect(() => {
    // checklistAction.getChecklistZone();
    orgAction.getOrganizations();
    projectAction.getAllProjects();
    regionAction.getRegions();
  }, []);

  useEffect(() => {
    if (checklistElements) {
      setSelectedElement(checklistElements[defaultSelectedZone]);
    }
  }, [defaultSelectedZone, checklistElements]);

  useEffect(() => {
    if (selectedElement) {
      setSelectedDefect(
        selectedElement?.elements[defaultSelectedElement]?.defectCode
      );
    }
  }, [selectedElement, defaultSelectedElement]);

  useEffect(() => {
    if (isType) {
      getChecklist();
    }
  }, [isType, selectedId]);

  //   useEffect(() => {
  //     if (checklistZones?.length > 0) {
  //       checklistAction.getChecklistElement(
  //         checklistZones[defaultSelectedZone]?.id
  //       );
  //     }
  //   }, [checklistZones]);

  function onSubmitZone(props: any) {
    if (!isEdit) {
      const params: any = {
        ...props,
      };

      if (isType == "default") {
        params.isDefault = true;
      }
      if (isType == "region") {
        params.regionId = selectedId;
      }
      if (isType == "project") {
        params.projectId = selectedId;
      }
      if (isType == "organization") {
        params.organizationId = selectedId;
      }
      checklistAction
        .savePropertyChecklistCategory(params)
        .then(() => {
          getChecklist();
          checklistAction.getChecklistZone();
          closeModal();
        })
        .catch((e) => toast.error(e));
    } else {
      const params: any = {
        ...props,
      };
      checklistAction
        .updatePropertyChecklistCategory(selectedCategory?.id, params)
        .then(() => {
          getChecklist();
          checklistAction.getChecklistZone();
          closeModal();
        })
        .catch((e) => toast.error(e));
    }
  }

  function onSubmitElement(props: any) {
    const params = {
      commonAreaCategoryId: checklistElements[defaultSelectedZone]?.id,
      elements: [props],
    };
    checklistAction
      .saveChecklistElement(params)
      .then(() => {
        checklistAction.getChecklistZone();
        getChecklist();
        closeModal();
      })
      .catch((e) => toast.error(e));
  }

  const deleteCategory = async (zone: any) => {
    if (
      await confirm({
        confirmText: "Delete",
        confirmVariant: "danger",
        confirmation:
          "You are about to delete this category. Please confirm to continue!",
      })
    ) {
      checklistAction
        .deletePropertyChecklistCategory(zone.id)
        .then(() => {
          toast.warning(`${zone.name} has been deleted!`);
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const restoreCategory = async (zone: any) => {
    if (
      await confirm({
        confirmText: "Restore",
        confirmVariant: "green",
        confirmation:
          "You are about to restore this category. Please confirm to continue!",
      })
    ) {
      checklistAction
        .deleteCommonAreaCategory(zone.id)
        .then(() => {
          toast.warning(`${zone.name} has been restored!`);
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-1">
        <div className="flex flex-row items-center gap-5 w-[80%] flex-wrap">
          <div className="w-[45%]">
            <Label>
              Select Type<span className="text-error-500">*</span>
            </Label>
            <select
              id="timeslot"
              name="timeslot"
              value={isType}
              onChange={(e) => {
                setSelectedId(undefined);
                setIsType(e.target.value);
              }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="" selected>
                Please Select
              </option>
              <option value="default">Default</option>
              <option value="project">Project</option>
              <option value="organization">Organization</option>
              <option value="region">Region</option>
            </select>
          </div>
          <div className="w-[45%]">
            {isType === "project" && (
              <div className="flex flex-col">
                <Label>
                  Select Project<span className="text-error-500">*</span>
                </Label>
                <select
                  id="project"
                  name="project"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="" selected>
                    Please Select
                  </option>
                  {projectList?.map((project) => {
                    return <option value={project?.id}>{project.name}</option>;
                  })}
                </select>
              </div>
            )}
            {isType === "organization" && (
              <div className="flex flex-col">
                <Label>
                  Select Organization<span className="text-error-500">*</span>
                </Label>
                <select
                  id="organization"
                  name="organization"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="" selected>
                    Please Select
                  </option>
                  {orglist?.map(
                    (organization: {
                      id: string | number | readonly string[] | undefined;
                      name:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactPortal
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }) => {
                      return (
                        <option value={organization?.id}>
                          {organization.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            )}

            {isType === "region" && (
              <div className="flex flex-col">
                <Label>
                  Select Region<span className="text-error-500">*</span>
                </Label>
                <select
                  id="region"
                  name="region"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="" selected>
                    Please Select
                  </option>
                  {regionList?.map((region) => {
                    return (
                      <option value={region?.id}>{region.regionName}</option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {modalType === 0 && (
          <PropertylistZoneModal
            isEdit={isEdit}
            isOpen={isOpen}
            closeModal={closeModal}
            title={modalTitle}
            onSubmit={onSubmitZone}
            selectedCategory={selectedCategory}
          />
        )}
        {modalType === 1 && (
          <PropertylistElementModal
            isOpen={isOpen}
            closeModal={closeModal}
            title={modalTitle}
            onSubmit={onSubmitElement}
          />
        )}

        <div className="rounded-lg border border-gray-300 shadow-theme-xs">
          <div className="flex justify-between p-2 items-center border-gray-300 shadow-theme-xs">
            <span className="font-bold">Common Area Categories</span>
            <div
              className={`cursor-pointer ${
                isType == "default" || (isType !== "default" && selectedId)
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => {
                if (
                  isType == "default" ||
                  (isType !== "default" && selectedId)
                ) {
                  setIsEdit(false);
                  setModalType(0);
                  setModalTitle("Add New Common Area Category");
                  openModal();
                }
              }}
            >
              <PlusIcon />
            </div>
          </div>
          <div className="max-h-[500px] overflow-auto">
            {checklistElements?.map((zone: any, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-between p-2 items-center ${
                    defaultSelectedZone === index &&
                    "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <div
                    className="w-[80%] cursor-pointer"
                    onClick={() => {
                      setDefaultSelectedZone(index);
                      setDefaultSelectedElement(0);
                    }}
                  >
                    <span
                      className={`${
                        !zone.isActive && "line-through text-red-900"
                      }`}
                    >
                      {zone.name}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {zone.isActive && (
                      <>
                        <PencilIcon
                          className="text-green-600 cursor-pointer"
                          data-tooltip-id="tooltip"
                          data-tooltip-content="Edit"
                          onClick={() => {
                            setIsEdit(true);
                            setModalType(0);
                            setModalTitle("Edit Common Area Category");
                            setSelectedCategory(zone);
                            openModal();
                          }}
                        />
                        <TrashBinIcon
                          className="text-red-600 cursor-pointer"
                          data-tooltip-id="tooltip"
                          data-tooltip-content="Delete"
                          onClick={() => {
                            deleteCategory(zone);
                          }}
                        />
                      </>
                    )}
                    {!zone.isActive && (
                      <>
                        <CheckLineIcon
                          className="text-green-600 cursor-pointer"
                          data-tooltip-id="tooltip"
                          data-tooltip-content="Restore"
                          onClick={() => {
                            restoreCategory(zone);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-lg border border-gray-300 shadow-theme-xs">
          <div className="flex justify-between p-2 items-center border-gray-300 shadow-theme-xs">
            <span className="font-bold">Elements</span>
            <div
              className={`cursor-pointer ${
                isType ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                if (isType) {
                  setModalType(1);
                  setModalTitle("Add New Element");
                  openModal();
                }
              }}
            >
              <PlusIcon />
            </div>
          </div>
          <div className="max-h-[500px] overflow-auto">
            {selectedElement?.elements?.map((element: any, index) => {
              return (
                <div key={index} className="flex w-full flex-col">
                  <div
                    className={`flex justify-between p-2 items-center ${
                      defaultSelectedElement === index &&
                      "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <div
                      className="w-[80%] cursor-pointer"
                      onClick={() => {
                        setDefaultSelectedSubElement(0);
                        setDefaultSelectedElement(index);
                      }}
                    >
                      <span>{element.name}</span>
                    </div>

                    <div className="flex gap-2">
                      <PencilIcon
                        className="text-green-600 cursor-pointer"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Edit"
                      />
                      <TrashBinIcon
                        className="text-red-600 cursor-pointer"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Delete"
                      />
                    </div>
                  </div>
                  {element?.subElements?.length > 0 && (
                    <div className="pl-10 my-1">
                      <ul className="list-disc">
                        {element?.subElements?.map(
                          (subs: any, subIndex: any) => {
                            return (
                              <li
                                className={`py-1 px-1 hover:bg-gray-200 hover:dark:bg-gray-700 cursor-pointer ${
                                  defaultSelectedSubElement === subIndex &&
                                  defaultSelectedElement === index &&
                                  "bg-gray-300 dark:bg-gray-800"
                                }`}
                                onClick={() => {
                                  setDefaultSelectedSubElement(subIndex);
                                  setDefaultSelectedElement(index);
                                }}
                              >
                                {subs.name}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-lg border border-gray-300 shadow-theme-xs">
          <div className="flex justify-between p-2 items-center border-gray-300 shadow-theme-xs">
            <span className="font-bold">Defects</span>
            <div
              className={`cursor-pointer ${
                isType ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => {
                if (isType) {
                  setModalTitle("Add New Defect");
                  openModal();
                }
              }}
            >
              <PlusIcon />
            </div>
          </div>
          <div className="max-h-[500px] overflow-auto">
            {selectedDefect?.map((element: any, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-between p-2 items-center `}
                >
                  <div className="w-[80%] cursor-pointer">
                    <span>{`${element?.defectCode} - ${element?.defectName}`}</span>
                  </div>

                  <div className="flex gap-2">
                    <PencilIcon
                      className="text-green-600 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Edit"
                    />
                    <TrashBinIcon
                      className="text-red-600 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Delete"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
