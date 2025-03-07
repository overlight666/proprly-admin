/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Radio from "../../components/form/input/Radio";
import Label from "../../components/form/Label";
import { useDefectResolution } from "../../_actions";
import { useRecoilValue } from "recoil";
import { selectedCommonAreaAtom, selectedProjectAtom } from "../../_state";
import { defectResolutionAtom } from "../../_state/atoms/defectResolution";
import { DefectSumissionType } from "../../_types";
import DefectItem from "./components/DefectBox";
import DefectHeader from "./components/DefectHeader";
import React from "react";
// Define the table data using the interface

export default function DefectResolution() {
  const [selectedValue, setSelectedValue] = useState<any>("property");
  const selectedCommonArea = useRecoilValue(selectedCommonAreaAtom);
  const defectResolutionAction = useDefectResolution();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const defects = useRecoilValue(defectResolutionAtom);
  const [pendingDefects, setPendingDefects] = useState<
    DefectSumissionType[] | []
  >([]);
  const [inprogressDefects, setInprogressDefects] = useState<
    DefectSumissionType[] | []
  >([]);
  const [disputedDefects, setDisputedDefects] = useState<
    DefectSumissionType[] | []
  >([]);
  const [resolvedDefects, setResolvedDefects] = useState<
    DefectSumissionType[] | []
  >([]);

  useEffect(() => {
    if (selectedValue == "commonArea") {
      defectResolutionAction.getDefectResolutions(
        selectedCommonArea[0]?.id,
        selectedValue
      );
    } else {
      defectResolutionAction.getDefectResolutions(
        selectedProject?.id,
        selectedValue
      );
    }
  }, [selectedValue]);

  useEffect(() => {
    const pendings: any = defects?.filter((d) => d.status === "logged");
    const disputed: any = defects?.filter((d) => d.status === "disputed");
    const in_progress: any = defects?.filter((d) => d.status === "in_progress");
    const resolved: any = defects?.filter((d) => d.status === "resolved");
    setDisputedDefects(disputed);
    setPendingDefects(pendings);
    setInprogressDefects(in_progress);
    setResolvedDefects(resolved);
  }, [defects]);

  return (
    <div className="overflow-hidden mt-5 w-full">
      <DefectHeader />
      <div className="flex flex-wrap items-center gap-3 mb-3 flex-row w-full">
        <span className="text-black dark:text-white mr-5">Show Only:</span>
        <Radio
          id="radio2"
          name="options1"
          value="property"
          checked={selectedValue === "property"}
          onChange={(e) => setSelectedValue(e)}
          label="Property Defects"
        />
        <Radio
          id="radio1"
          name="options1"
          value="commonArea"
          checked={selectedValue === "commonArea"}
          onChange={(e) => setSelectedValue(e)}
          label="Common Area Defects"
        />
      </div>
      <div className="flex flex-row mt-10 w-full gap-2">
        <div className="basis-[25%] gap-3">
          <Label className="text-[1rem] font-bold">
            Pending (<span className="mx-1">{pendingDefects?.length || 0}</span>
            )
          </Label>
          {pendingDefects &&
            pendingDefects?.length > 0 &&
            pendingDefects.map((defects, index) => {
              return (
                <DefectItem keyValue={index + "pending"} defect={defects} />
              );
            })}
        </div>
        <div className="basis-[25%] gap-3">
          <Label className="text-[1rem] font-bold">
            In Progress (
            <span className="mx-1">{inprogressDefects?.length}</span>)
          </Label>
          {inprogressDefects &&
            inprogressDefects?.length > 0 &&
            inprogressDefects.map((defects, index) => {
              return (
                <DefectItem keyValue={index + "progress"} defect={defects} />
              );
            })}
        </div>
        <div className="basis-[25%] gap-3">
          <Label className="text-[1rem] font-bold">
            Disputed (
            <span className="mx-1">{disputedDefects?.length || 0}</span>)
          </Label>
          {disputedDefects &&
            disputedDefects?.length > 0 &&
            disputedDefects.map((defects, index) => {
              return (
                <DefectItem keyValue={index + "disputed"} defect={defects} />
              );
            })}
        </div>
        <div className="basis-[25%] gap-3">
          <Label className="text-[1rem] font-bold">
            Resolved(
            <span className="mx-1">{resolvedDefects?.length || 0}</span>)
          </Label>
          {resolvedDefects &&
            resolvedDefects?.length > 0 &&
            resolvedDefects.map((defects, index) => {
              return (
                <DefectItem keyValue={index + "resolved"} defect={defects} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
