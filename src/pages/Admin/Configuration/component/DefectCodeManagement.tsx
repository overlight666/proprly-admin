/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Label from "../../../../components/form/Label";
import { PlusIcon } from "../../../../icons";
import DefectCodeTable from "./DefectCodeTable";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allProjectsAtom,
  organizationsAtom,
  regionsAtom,
} from "../../../../_state";
import {
  useCountriesAction,
  useDefect,
  useOrganization,
  useProject,
} from "../../../../_actions";
import { Project } from "../../../../_types";
import {
  defectCodesAtom,
  defectCodesResponseAtom,
} from "../../../../_state/atoms/defects";
import AddDefectCodeModal from "./AddDefectCodeModal";
import { useModal } from "../../../../hooks/useModal";
import { toast } from "react-toastify";

export default function DefectCodeManagement() {
  const [isType, setIsType] = useState("");
  const orglist: any = useRecoilValue(organizationsAtom);
  const projectList: Project[] = useRecoilValue(allProjectsAtom);
  const regionList: any[] = useRecoilValue(regionsAtom);
  const defectCodeList: any[] = useRecoilValue(defectCodesAtom);
  const defectCodeResponse: any = useRecoilValue(defectCodesResponseAtom);
  const orgAction = useOrganization();
  const projectAction = useProject();
  const regionAction = useCountriesAction();
  const defectAction = useDefect();
  const setDefectCodes = useSetRecoilState(defectCodesAtom);
  const [selectedId, setSelectedId] = useState<any>();

  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    orgAction.getOrganizations();
    projectAction.getAllProjects();
    regionAction.getRegions();
  }, []);

  useEffect(() => {
    if (isType) {
      const params =
        isType === "project"
          ? `?projectId=${selectedId}`
          : isType === "organization"
          ? `?organizationId=${selectedId}`
          : isType === "region"
          ? `?regionId=${selectedId}`
          : "";
      if (selectedId || isType === "default") {
        defectAction.getDefectCodes(params);
      }
    }
  }, [isType, selectedId, defectCodeResponse]);

  const addDefectCode = (name: any, code: any) => {
    console.log(name, code);
    const params: any = {
      defectName: name,
      defectCode: code,
    };
    if (isType === "project") {
      params.projectId = selectedId;
    } else if (isType === "organization") {
      params.organizationId = selectedId;
    } else if (isType === "region") {
      params.regionId = selectedId;
    }
    defectAction
      .addDefectCode(params)
      .then(() => {
        toast.info("New defect code has been created!");
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <div>
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
                setDefectCodes([]);
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
        <button
          onClick={() => openModal()}
          disabled={isType !== "default" && !selectedId}
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto disabled:bg-gray-300 disabled:text-gray-100"
        >
          <div className="flex items-center">
            <PlusIcon />
            Add New Defect Code
          </div>
        </button>
      </div>

      <DefectCodeTable
        tableData={defectCodeList?.map((codes, index) => {
          return [index + 1, codes.defectName, codes.defectCode, codes];
        })}
      />
      <AddDefectCodeModal
        isOpen={isOpen}
        closeModal={closeModal}
        addDefectCode={addDefectCode}
      />
    </div>
  );
}
