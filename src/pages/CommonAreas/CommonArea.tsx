/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRecoilValue } from "recoil";
import {
  globalConfigAtom,
  selectedCommonAreaAtom,
  selectedProjectAtom,
} from "../../_state";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../../components/form/Select";
import FileUploader from "../../_components/ImageUploader";
import { useEffect, useState } from "react";
import Button from "../../components/ui/button/Button";
import { useCommonArea } from "../../_actions/commonArea.actions";
import { toast } from "react-toastify";
import { HomeIcon } from "../../icons";
import LocationMappingTable from "./components/LocationMappingBasementTable";
import LocationMappingTowerTable from "./components/LocationMappingTowerTable";
// Define the table data using the interface
import React from "react";
// import { useParams } from "react-router";
export default function CommonArea() {
  // const { project_id } = useParams();
  const selectedCommonArea = useRecoilValue(selectedCommonAreaAtom);
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const globalConfig = useRecoilValue(globalConfigAtom);
  const commonAreaAction = useCommonArea();
  const [lifts, setLifts] = useState<any>([]);
  const [isConfigure, setIsConfigure] = useState<any>(false);
  const [garageDoor, setGarageDoor] = useState<any>([]);
  const [miscellaneous, setMiscellaneous] = useState<any>([]);
  const [rawTowers, setRawTowers] = useState<any>([]);
  const [selectedTower, setSelectedTower] = useState<any>(undefined);
  const [rawBasements, setRawBasements] = useState<any>([]);

  const [warrantyGroup, setWarrantyGroup] = useState<any>([
    {
      group: "lifts",
      files: [],
    },
    {
      group: "garage_door",
      files: [],
    },
    {
      group: "miscellaneous",
      files: [],
    },
  ]);

  const validationSchema = Yup.object().shape({
    lotNo: Yup.string().optional(),
    status: Yup.string().required("Common Area status is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (selectedCommonArea) {
      setValue(
        "lotNo",
        selectedCommonArea[0]?.lotNo == "0"
          ? "n/a"
          : selectedCommonArea[0]?.lotNo
      );
      setValue("status", selectedCommonArea[0]?.status);
      setLifts([]);
      setGarageDoor([]);
      setMiscellaneous([]);
      if (
        selectedCommonArea[0] &&
        selectedCommonArea[0]?.warranty &&
        selectedCommonArea[0]?.warranty?.length > 0
      ) {
        selectedCommonArea[0]?.warranty?.map((war: any) => {
          getOldWarranties(war);
        });
        assignIdToWarranties(selectedCommonArea[0]?.warranty);
      }
    }
  }, [selectedCommonArea]);

  const assignIdToWarranties = (warrantyWithId: any) => {
    const assignId = warrantyGroup.map((wg: any) => {
      wg.warrantyId =
        warrantyWithId &&
        warrantyWithId?.find((wi: any) => wi.group == wg.group)?.id;
      return wg;
    });
    setWarrantyGroup(assignId);
  };

  const getOldWarranties = (f: any) => {
    const newGroup = warrantyGroup.map((w: any) => {
      if (w.group == f.group && f?.files.length > 0) {
        w.files.push(...f.files.map((fs: any) => fs.id));
        w.files = [...new Set(w.files)];
        w.warrantyId = f.id;
        if (f.group == "lifts") {
          setLifts((oldArray: any) => [...oldArray, ...f.files]);
        }
        if (f.group == "garage_door") {
          setGarageDoor((oldArray: any) => [...oldArray, ...f.files]);
        }
        if (f.group == "miscellaneous") {
          setMiscellaneous((oldArray: any) => [...oldArray, ...f.files]);
        }
      }
      return w;
    });
    setWarrantyGroup(newGroup);
  };

  const removeLifts = (file: any) => {
    const newG = warrantyGroup?.map((war: any) => {
      if (war.group == "lifts") {
        war.files = war.files.filter((f: any) => f !== file?.id);
      }
      return war;
    });
    setWarrantyGroup(newG);
    const newFiles: any =
      lifts &&
      lifts.length > 0 &&
      lifts.filter((e: any) => e.name !== file.name);
    setLifts(newFiles);
  };

  const removeMiscellaneous = (file: any) => {
    const newG = warrantyGroup?.map((war: any) => {
      if (war.group == "miscellaneous") {
        war.files = war.files.filter((f: any) => f !== file?.id);
      }
      return war;
    });
    setWarrantyGroup(newG);
    const newFiles: any =
      miscellaneous &&
      miscellaneous.length > 0 &&
      miscellaneous.filter((e: any) => e.name !== file.name);
    setMiscellaneous(newFiles);
  };

  const removeGarageDoor = (file: any) => {
    const newG = warrantyGroup?.map((war: any) => {
      if (war.group == "garage_door") {
        war.files = war.files.filter((f: any) => f !== file?.id);
      }
      return war;
    });
    setWarrantyGroup(newG);
    const newFiles: any =
      garageDoor &&
      garageDoor.length > 0 &&
      garageDoor.filter((e: any) => e.name !== file.name);
    setGarageDoor(newFiles);
  };

  const getUploadedFile = (f: any) => {
    const newGroup = warrantyGroup.map((w: any) => {
      if (w.group == f.group) {
        w.files.push(f.file.id);
      }
      return w;
    });
    setWarrantyGroup(newGroup);
  };

  function onSubmit(props: any) {
    const params: any = {
      projectId: selectedProject?.id,
      ...props,
    };

    if (rawTowers?.length > 0) {
      params.configuration = {};
      const holder: any = [];
      rawTowers?.map((t: any) => {
        holder.push(...t.towers);
      });
      params.configuration.towers = holder;
    }

    if (rawBasements?.length > 0) {
      params.configuration.basements = rawBasements;
    }

    params.lotNo = params.lotNo == "n/a" ? 0 : params.lotNo;

    if (selectedCommonArea?.length != 0) {
      const warranties = {
        groups: warrantyGroup,
      };
      commonAreaAction
        .updateCommonArea(selectedCommonArea[0]?.id, params, warranties, toast)
        .catch((e: any) => {
          toast.error(e);
        });
    } else {
      commonAreaAction
        .saveCommonArea(params, warrantyGroup, toast)
        .catch((e: any) => {
          toast.error(e);
        });
    }
  }

  // useEffect(() => {
  //   if (selectedCommonArea?.length == 0) {
  //     const params = {
  //       projectId: project_id,
  //       lotNo: 0,
  //       status: "pre_settlement",
  //     };
  //     commonAreaAction
  //       .saveCommonArea(params, warrantyGroup, toast)
  //       .catch((e: any) => {
  //         toast.error(e);
  //       });
  //   }
  // }, []);

  const setTowers = (id: any, value: any) => {
    if (rawTowers.find((tower) => tower.id == id)) {
      const myTowers = rawTowers?.map((mt: any) => {
        if (mt.id == id) {
          mt.towers = value;
        }
        return mt;
      });
      setRawTowers(myTowers);
    } else {
      setRawTowers([
        ...rawTowers,
        {
          id: id,
          towers: value,
        },
      ]);
    }
  };

  return (
    <div className="overflow-hidden mt-5 ">
      {!isConfigure ? (
        <form
          className="max-w-full overflow-x-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mx-5">
            <ComponentCard
              title="Common Area Information"
              // rightComponent={
              //   selectedCommonArea?.length != 0 && (
              //     <Button
              //       onClick={() => setIsConfigure(!isConfigure)}
              //       variant="primary"
              //       className="text-black dark:text-white"
              //     >
              //       <GearIcon className="size-5 text-white" />
              //       Configure
              //     </Button>
              //   )
              // }
            >
              <div className="gap-2 grid grid-cols-1 xl:grid-cols-2">
                <div>
                  <Label htmlFor="input">Common Area Lot No</Label>
                  <Input
                    type="text"
                    register={{ ...register("lotNo") }}
                    error={errors.lotNo}
                    hint={errors.lotNo?.message}
                    placeholder="Enter Lot Number"
                  />
                </div>
                <div>
                  <Label htmlFor="inputTwo">
                    Common Area status <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Select
                    options={globalConfig?.propertyStatusList?.map((l: any) => {
                      return {
                        label: l.value,
                        value: l.key,
                      };
                    })}
                    placeholder="Select Status"
                    className="dark:bg-dark-900"
                    register={{ ...register("status") }}
                    error={errors.status}
                    hint={errors.status?.message}
                  />
                </div>
              </div>
            </ComponentCard>
            <div className="gap-2 grid grid-cols-1 xl:grid-cols-1 mt-5">
              <LocationMappingTowerTable
                hasCommonArea={selectedCommonArea?.length == 0}
                setRawTowers={setTowers}
                rawTowers={
                  rawTowers.find((t) => t.id == selectedTower)?.towers || []
                }
                setSelectedTower={setSelectedTower}
                selectedTower={selectedTower}
              />
              <LocationMappingTable
                hasCommonArea={selectedCommonArea?.length == 0}
                setRawBasements={setRawBasements}
                rawBasements={rawBasements}
              />
            </div>
            <ComponentCard title="Warranty Information" className="mt-5">
              <div className="gap-2 grid grid-cols-1 xl:grid-cols-1">
                <div className="space-y-6">
                  <FileUploader
                    title="Lifts"
                    group="lifts"
                    removeFile={removeLifts}
                    setUploadQueue={setLifts}
                    uploadQueue={lifts}
                    getUploadedFile={getUploadedFile}
                  />
                </div>
                <div className="space-y-6">
                  <FileUploader
                    group="garage_door"
                    title="Garage Door"
                    removeFile={removeGarageDoor}
                    setUploadQueue={setGarageDoor}
                    uploadQueue={garageDoor}
                    getUploadedFile={getUploadedFile}
                  />
                </div>
                <div className="space-y-6">
                  <FileUploader
                    group="miscellaneous"
                    title="Miscellaneous"
                    removeFile={removeMiscellaneous}
                    setUploadQueue={setMiscellaneous}
                    uploadQueue={miscellaneous}
                    getUploadedFile={getUploadedFile}
                  />
                </div>
              </div>
            </ComponentCard>
          </div>
          <div className="flex w-full flex-row gap-5 mt-10 ml-5">
            <Button
              size="sm"
              variant="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}{" "}
              {selectedCommonArea?.length != 0
                ? "Update Common Area"
                : "Save Common Area"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mx-5">
          <ComponentCard
            title=""
            rightComponent={
              selectedCommonArea?.length != 0 && (
                <Button
                  onClick={() => setIsConfigure(!isConfigure)}
                  variant="primary"
                  className="text-black dark:text-white"
                >
                  <HomeIcon className="size-5 text-white" />
                  Manage
                </Button>
              )
            }
          >
            <div className="gap-2 grid grid-cols-1 xl:grid-cols-">
              <LocationMappingTowerTable />
              <LocationMappingTable />
            </div>
          </ComponentCard>
        </div>
      )}
    </div>
  );
}
