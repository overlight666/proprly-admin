/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import TradeCodeTable from "./TradeCodeTable";
import { useRecoilValue, useSetRecoilState } from "recoil";


import AddTradeCodeModal from "./AddTradeCodeModal";
import { toast } from "react-toastify";
import { allProjectsAtom, organizationsAtom, regionsAtom, tradeCodesAtom, tradeCodesResponseAtom } from "@/_recoil/states";
import { Project } from "@/lib/interface";
import { useCountriesAction, useDefect, useOrganization, useProject, useTrade } from "@/_recoil/actions";
import { useModal } from "@/helpers/useModal";
import { Label } from "flowbite-react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TradeCodeManagement() {
  const [isType, setIsType] = useState("");
  const orglist: any = useRecoilValue(organizationsAtom);
  const projectList: Project[] = useRecoilValue(allProjectsAtom);
  const regionList: any[] = useRecoilValue(regionsAtom);
  const tradeCodeList: any[] = useRecoilValue(tradeCodesAtom);

  const tradeCodeResponse: any = useRecoilValue(tradeCodesResponseAtom);
  const orgAction = useOrganization();
  const projectAction = useProject();
  const regionAction = useCountriesAction();
  const tradeAction = useTrade();
  const defectAction = useDefect();
  const setTradeCodes = useSetRecoilState(tradeCodesAtom);
  const [selectedId, setSelectedId] = useState<any>();
  const [sortedList, setSortedList] = useState<any[]>([]);
  const { isOpen, openModal, closeModal } = useModal();

  function dynamicSort(property) {
    return function (a, b) {
      return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    };
  }

  useEffect(() => {
    orgAction.getOrganizations();
    projectAction.getAllProjects();
    regionAction.getRegions();
  }, []);

  useEffect(() => {
    if (isType) {
      const params =
        isType === "project"
          ? `?projectId=${selectedId}&onlyWithoutTradecode=true`
          : isType === "organization"
            ? `?organizationId=${selectedId}&onlyWithoutTradecode=true`
            : isType === "region"
              ? `?regionId=${selectedId}&onlyWithoutTradecode=true`
              : "?onlyWithoutTradecode=true";
      if (selectedId || isType === "default") {
        tradeAction.getTradeCodes(params);
        // tradeAction.getAllTradeCodes();
        defectAction.getDefectCodesSelect(params);
      }
    }
  }, [isType, selectedId, tradeCodeResponse]);

  useEffect(() => {
    if (tradeCodeList) {
      const copyList = [...tradeCodeList];
      copyList.sort(dynamicSort("id"));
      setSortedList(copyList);
    }
  }, [tradeCodeList]);
  const addTradeCode = (name: any, code: any, defectList: any) => {
    const params: any = {
      tradeName: name,
      tradeCode: code,
      defectCodes: defectList,
    };
    if (isType === "project") {
      params.projectId = selectedId;
    } else if (isType === "organization") {
      params.organizationId = selectedId;
    } else if (isType === "region") {
      params.regionId = selectedId;
    }
    tradeAction
      .addTradeCode(params)
      .then(() => {
        toast.info("New trade code has been created!");
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
                setTradeCodes([]);
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
                    (organization: any) => {
                      return (
                        <option value={organization?.id}>
                          {organization?.name}
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
        <Button
          onClick={() => openModal()}
          disabled={isType !== "default" && !selectedId}
          type="button"

        >
          <div className="flex items-center">
            <PlusIcon />
            Add New Trade Code
          </div>
        </Button>
      </div>

      <TradeCodeTable
        tableData={sortedList?.map((codes, index) => {
          return [
            index + 1,
            codes.tradeName,
            codes.tradeCode,
            codes?.defectCode?.map((c) => c?.defectCode).join(", "),
            codes,
            codes,
          ];
        })}
      />
      <AddTradeCodeModal
        isOpen={isOpen}
        closeModal={closeModal}
        addTradeCode={addTradeCode}
      />
    </div>
  );
}
