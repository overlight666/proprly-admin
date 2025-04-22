/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Radio from "../../components/form/input/Radio";
import Label from "../../components/form/Label";
import { useDefectResolution } from "../../_actions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { appointmentTradeCodesAtom, selectedProjectAtom } from "../../_state";
import { defectResolutionAtom } from "../../_state/atoms/defectResolution";
import { DefectSumissionType } from "../../_types";
import DefectItem from "./components/DefectBox";
import DefectHeader from "./components/DefectHeader";
import React from "react";
import { reloadDefectsAtom } from "../../_state/atoms/defects";
import { useParams } from "react-router";

// Define the table data using the interface

export default function DefectResolution() {
  const [selectedValue, setSelectedValue] = useState<any>("all");
  const [filter, setFilter] = useState<any>("Filter by");
  const [option, setOption] = useState<any>([]);
  const [label, setLabel] = useState("");
  const [filterValue, setFilterValue] = useState<any>();
  const tradeCodes = useRecoilValue(appointmentTradeCodesAtom);
  const { project_id } = useParams();
  const defectResolutionAction = useDefectResolution();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const defects = useRecoilValue(defectResolutionAtom);
  const setDefects = useSetRecoilState(defectResolutionAtom);
  const isReload = useRecoilValue(reloadDefectsAtom);
  const setIsReload = useSetRecoilState(reloadDefectsAtom);

  const [search, setSearch] = useState("");
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
    if (selectedValue == "all") {
      setDefects([]);
      defectResolutionAction.getAllDefectResolutions(project_id);
    } else {
      setDefects([]);
      defectResolutionAction.getDefectResolutions(
        project_id,
        selectedValue
      );
    }
  }, [selectedValue, project_id]);

  useEffect(() => {
    if (isReload) {
      if (selectedValue == "all") {
        setDefects([]);
        defectResolutionAction.getAllDefectResolutions(project_id);
      } else {
        setDefects([]);
        defectResolutionAction.getDefectResolutions(
          project_id,
          selectedValue
        );
      }
      setIsReload(false)
    }

  }, [isReload])
  useEffect(() => {
    setFilterValue("");
    setOption([]);
    if (filter == "Logged By") {
      setLabel("Select logged by");
      const opt = [
        {
          label: "Auditor",
          value: "auditor",
        },
        {
          label: "Owner",
          value: "owner",
        },
        {
          label: "Subcontractor",
          value: "subcontractor",
        },
        {
          label: "Tenant",
          value: "tenant",
        },
        {
          label: "Property Agent",
          value: "property agent",
        },
      ];
      setOption(opt);
    } else if (filter == "Trade Category") {
      setLabel("Select trade category");
      setOption(
        tradeCodes?.map((au: any) => {
          return {
            label: au.tradeName,
            value: au.id,
          };
        })
      );
    } else if (filter == "Defect Type") {
      setLabel("Select defect type");
      const opt = [
        {
          label: "Under-Construction",
          value: "under_construction",
        },
        {
          label: "Pre-settlement",
          value: "pre_settlement",
        },
        {
          label: "Handover",
          value: "handover",
        },
        {
          label: "Post-Handover",
          value: "post_handover",
        },
      ];
      setOption(opt);
    }
  }, [filter]);

  useEffect(() => {
    let pendings: any = defects?.filter((d) => d.status === "logged");
    let disputed: any = defects?.filter((d) => d.status === "disputed");
    let in_progress: any = defects?.filter((d) => d.status === "in_progress");
    let resolved: any = defects?.filter((d) => d.status === "resolved");
    if (search.trim().length > 0) {
      pendings = pendings?.filter(
        (defect) => search !== "" && defect?.property?.unitNo === search
      );
      disputed = disputed?.filter(
        (defect) => search !== "" && defect?.property?.unitNo === search
      );
      in_progress = in_progress?.filter(
        (defect) => search !== "" && defect?.property?.unitNo === search
      );
      resolved = resolved?.filter(
        (defect) => search !== "" && defect?.property?.unitNo === search
      );
    }
    if (filter != "Filter by" && filterValue !== "") {
      if (filter == "Logged By") {
        pendings = pendings?.filter(
          (defect) =>
            defect?.userRole?.roleName?.toLowerCase() ==
            filterValue?.toLowerCase()
        );
        disputed = disputed?.filter(
          (defect) =>
            defect?.userRole?.roleName?.toLowerCase() ==
            filterValue?.toLowerCase()
        );
        in_progress = in_progress?.filter(
          (defect) =>
            defect?.userRole?.roleName?.toLowerCase() ==
            filterValue?.toLowerCase()
        );
        resolved = resolved?.filter(
          (defect) =>
            defect?.userRole?.roleName?.toLowerCase() ==
            filterValue?.toLowerCase()
        );
      } else if (filter == "Trade Category") {
        pendings = pendings?.filter((defect) =>
          defect?.defectCode?.tradeCode?.find(
            (trade) => trade.id == filterValue
          )
        );
        disputed = disputed?.filter((defect) =>
          defect?.defectCode?.tradeCode?.find(
            (trade) => trade.id == filterValue
          )
        );
        in_progress = in_progress?.filter((defect) =>
          defect?.defectCode?.tradeCode?.find(
            (trade) => trade.id == filterValue
          )
        );
        resolved = resolved?.filter((defect) =>
          defect?.defectCode?.tradeCode?.find(
            (trade) => trade.id == filterValue
          )
        );
      } else if (filter == "Defect Type") {
        pendings = pendings?.filter(
          (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
        );
        disputed = disputed?.filter(
          (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
        );
        in_progress = in_progress?.filter(
          (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
        );
        resolved = resolved?.filter(
          (defect) => defect?.stage?.toLowerCase() == filterValue?.toLowerCase()
        );
      }
    }

    setDisputedDefects(disputed);
    setPendingDefects(pendings);
    setInprogressDefects(in_progress);
    setResolvedDefects(resolved);
  }, [defects, search, filter, filterValue]);

  return (
    <div className="overflow-hidden mt-5 w-full">
      <DefectHeader
        setSearch={setSearch}
        setFilter={setFilter}
        filter={filter}
        option={option}
        label={label}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <div className="flex flex-wrap items-center gap-3 mb-3 flex-row w-full">
        <span className="text-black dark:text-white mr-5">Show Only:</span>
        <Radio
          id="radio3"
          name="options1"
          value="all"
          checked={selectedValue === "all"}
          onChange={(e) => setSelectedValue(e)}
          label="All"
        />
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
                <DefectItem
                  key={index}
                  keyValue={index + "pending"}
                  defect={defects}
                />
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
                <DefectItem
                  key={index}
                  keyValue={index + "progress"}
                  defect={defects}
                />
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
                <DefectItem
                  key={index}
                  keyValue={index + "disputed"}
                  defect={defects}
                />
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
                <DefectItem
                  key={index}
                  keyValue={index + "resolved"}
                  defect={defects}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
