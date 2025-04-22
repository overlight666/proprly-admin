/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { ucword } from "../../../_helpers";
import { DefectSumissionType } from "../../../_types";
import ComponentCard from "../../../components/common/ComponentCard";
import DefectResolutionModal from "../../../_components/DefectResolutionModal";
import { useModal } from "../../../hooks/useModal";
import { useOrganization } from "../../../_actions/organizations.actions";
import React from "react";
import { getIcons, textColoring } from "../../../_helpers/textIcons";
import Icon from '@mdi/react';
import * as apIcon from '@mdi/js';
// Define the table data using the interface
interface DefectItemBox {
  keyValue: any;
  defect: DefectSumissionType;
}
export default function DefectItem({ keyValue, defect, openModal }: any) {
  const orgAction = useOrganization();
  const mutateIcon = (name: any) => {
    const splitName = name.split("-");
    let newName = "mdi"
    splitName?.map((names) => {
      newName = newName + ucword(names)
    })
    return newName
  }
  return (
    <div key={keyValue}>

      <ComponentCard
        title={""}
        noHeader={true}
        className="overflow-hidden w-full my-3 min-w-[260px] max-w-[260px]"
        subClass="sm:!p-3"
      >
        <div
          className="flex flex-col gap-2 cursor-pointer"
          onClick={() => {
            orgAction.getDefectSubmission(defect.id, openModal);
          }}
        >
          <div className="w-full h-[150px] overflow-hidden">
            <img
              src={defect?.images[0].url}
              alt=""
              className="w-full h-[150px] object-fit rounded-md"
            />
          </div>
          <div className="flex flex-col gap-0 overflow-auto">
            <div className="p-1 rounded-lg">
              <div className="flex items-center">
                <div
                  style={{ backgroundColor: defect?.bgColor }}
                  className={`flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all`}
                >
                  <div className="flex h-full align-top">
                    {/* {getIcons(defect?.subStatus)} */}
                    <Icon path={apIcon[mutateIcon(defect?.icon?.appIcon)]} size={0.5} style={{
                      color: defect?.color
                    }} />
                  </div>
                  <span
                    style={{
                      color: defect?.color
                    }}
                    className={`text-[14px] ml-1`}>{defect?.subStatus}</span>
                </div>
              </div>
            </div>
            <span className="text-black dark:text-gray-300 text-sm">{`${defect?.property?.unitNo || defect?.commonArea?.lotNo || ''}, ${defect?.checklistZone?.name || defect?.commonAreaCategory?.name} - ${defect?.checklistElement?.name}`}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Defect Code:{" "}
              <span className="text-xs text-gray-600 dark:text-gray-200">
                {`${defect?.defectCode?.defectCode} - ${defect?.defectCode?.defectName}`}
              </span>
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {defect?.property?.projectTower?.name} -
              <span className="text-xs text-gray-600 dark:text-gray-200">
                {` Floor ${defect?.property?.floor}`}
              </span>
            </span>
            <hr className="my-1 text-gray-400" />
            <div className="flex gap-1">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">Type</span>
                <span className="text-xs dark:text-gray-200 text-gray-600">
                  {ucword(defect?.stage)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">Logged by</span>
                <span className="text-xs dark:text-gray-200 text-gray-600">
                  {defect?.userRole && defect?.userRole?.roleName
                    ? defect?.userRole?.roleName
                    : ""}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">Date</span>
                <span className="text-xs dark:text-gray-200 text-gray-600">
                  {moment(defect?.createdAt).format("DD MMM YY")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
