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
  useDefect,
  useOrganization,
  useProject,
} from "../../../../_actions";
import { useRecoilValue } from "recoil";
import {
  allProjectsAtom,
  //   checklistZoneListAtom,
  commonAreaChecklistElementListAtom,
  organizationsAtom,
  regionsAtom,
} from "../../../../_state";
import { confirm } from "../../../../components/dialog/ConfirmDialog";
import { useModal } from "../../../../hooks/useModal";
import ChecklistZoneModal from "./ChecklistZoneModal";
import { toast } from "react-toastify";
import ChecklistElementModal from "./ChecklistElementModal";
import { Project } from "../../../../_types";
import Label from "../../../../components/form/Label";
import EditChecklistElementModal from "./EditChecklistElementModal";
import AttachDefectCodes from "./AttachDefectCodes";

export default function ChecklistManagement() {
  const checklistAction = useChecklist();
  //   const checklistZones = useRecoilValue(checklistZoneListAtom);
  const [selectedEditElement, setSelectedEditElement] =
    useState<any>(undefined);
  const checklistElements = useRecoilValue(commonAreaChecklistElementListAtom);
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
  const defectAction = useDefect();

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

  const getDefectCodes = () => {
    const params =
      isType === "project"
        ? `?projectId=${selectedId}&onlyWithoutTradecode=true`
        : isType === "organization"
        ? `?organizationId=${selectedId}&onlyWithoutTradecode=true`
        : isType === "region"
        ? `?regionId=${selectedId}&onlyWithoutTradecode=true`
        : "?onlyWithoutTradecode=true";
    if (selectedId || isType === "default") {
      defectAction.getDefectCodesSelect(params);
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
      getDefectCodes();
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
        .saveCommonAreaCategory(params)
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
        .updateCommonAreaCategory(selectedCategory?.id, params)
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

  function onSubmitEditElement(props: any) {
    checklistAction
      .updateChecklistElement(selectedEditElement?.id, props)
      .then(() => {
        toast.info("Element has been updated!");
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
        .deleteCommonAreaCategory(zone.id)
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
        .restorePropertyChecklistCategory(zone.id)
        .then(() => {
          toast.success(`${zone.name} has been restored!`);
          getChecklist();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const restoreElement = async (element: any) => {
    if (
      await confirm({
        confirmText: "Restore",
        confirmVariant: "green",
        confirmation:
          "You are about to restore this element. Please confirm to continue!",
      })
    ) {
      checklistAction
        .restorePropertyChecklistElement(element.id)
        .then(() => {
          toast.success(`${element.name} has been restored!`);
          getChecklist();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const deleteElement = async (element: any) => {
    if (
      await confirm({
        confirmText: "Delete",
        confirmVariant: "danger",
        confirmation:
          "You are about to delete this element. Please confirm to continue!",
      })
    ) {
      checklistAction
        .deletePropertyChecklistElement(element.id)
        .then(() => {
          toast.warning(`${element.name} has been deleted!`);
          getChecklist();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const onSubmitAttachDefect = (props) => {
    if (props && props?.length > 0) {
      const params = {
        defectCodes: props,
        action: "attach",
      };
      checklistAction
        .attachDetachDefectCode(
          selectedElement?.elements[defaultSelectedElement]?.id,
          params
        )
        .then(() => {
          toast.info(
            `${selectedElement?.elements[defaultSelectedElement]?.name} defect codes has been updated!`
          );
          getChecklist();
          closeModal();
        });
    } else {
      toast.error("Please select at least 1 defect code");
    }
  };

  const detachDefect = async (defect: any) => {
    const params = {
      defectCodes: [defect?.id],
      action: "detach",
    };
    if (
      await confirm({
        confirmText: "Detach",
        confirmVariant: "danger",
        confirmation:
          "You are about to detatch this defect code. Please confirm to continue!",
      })
    ) {
      checklistAction
        .attachDetachDefectCode(
          selectedElement?.elements[defaultSelectedElement]?.id,
          params
        )
        .then(() => {
          toast.warning(`${defect?.defectName} has been detached!`);
          getChecklist();
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
          <ChecklistZoneModal
            isEdit={isEdit}
            isOpen={isOpen}
            closeModal={closeModal}
            title={modalTitle}
            onSubmit={onSubmitZone}
            selectedCategory={selectedCategory}
          />
        )}
        {modalType === 1 && (
          <ChecklistElementModal
            isOpen={isOpen}
            closeModal={closeModal}
            title={modalTitle}
            onSubmit={onSubmitElement}
          />
        )}
        {modalType === 2 && (
          <EditChecklistElementModal
            isOpen={isOpen}
            isEdit={isEdit}
            closeModal={closeModal}
            title={modalTitle}
            selectedElement={selectedEditElement}
            onSubmit={onSubmitEditElement}
          />
        )}
        {modalType === 3 && (
          <AttachDefectCodes
            isOpen={isOpen}
            closeModal={closeModal}
            title={modalTitle}
            attachDefects={onSubmitAttachDefect}
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
                      <span
                        className={`${
                          !element.isActive && "line-through text-red-900"
                        }`}
                      >
                        {element.name}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {element.isActive && (
                        <div className="flex gap-2">
                          <PencilIcon
                            className="text-green-600 cursor-pointer"
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Edit"
                            onClick={() => {
                              setIsEdit(true);
                              setModalType(2);
                              setModalTitle("Edit Element");
                              setSelectedEditElement(element);
                              openModal();
                            }}
                          />
                          <TrashBinIcon
                            className="text-red-600 cursor-pointer"
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Delete"
                            onClick={() => {
                              deleteElement(element);
                            }}
                          />
                        </div>
                      )}
                      {!element.isActive && (
                        <div className="flex gap-2">
                          <CheckLineIcon
                            className="text-green-600 cursor-pointer"
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Restore"
                            onClick={() => {
                              restoreElement(element);
                            }}
                          />
                        </div>
                      )}
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
                                <div className="flex w-full justify-between pr-1">
                                  <span
                                    className={`${
                                      !subs.isActive &&
                                      "line-through text-red-900"
                                    }`}
                                  >
                                    {subs.name}
                                  </span>

                                  {subs.isActive && (
                                    <div className="flex gap-2">
                                      <PencilIcon
                                        className="text-green-600 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Edit"
                                        onClick={() => {
                                          setIsEdit(true);
                                          setModalType(2);
                                          setModalTitle("Edit Sub Element");
                                          setSelectedEditElement(subs);
                                          openModal();
                                        }}
                                      />
                                      <TrashBinIcon
                                        className="text-red-600 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Delete"
                                        onClick={() => {
                                          deleteElement(subs);
                                        }}
                                      />
                                    </div>
                                  )}
                                  {!subs.isActive && (
                                    <div className="flex gap-2">
                                      <CheckLineIcon
                                        className="text-green-600 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Restore"
                                        onClick={() => {
                                          restoreElement(element);
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
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
                  if (isType) {
                    setModalTitle("Attach Defect");
                    setModalType(3);
                    openModal();
                  }
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
                    <TrashBinIcon
                      className="text-red-600 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Delete"
                      onClick={() => detachDefect(element)}
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
