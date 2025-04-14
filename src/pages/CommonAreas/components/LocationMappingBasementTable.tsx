/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  commonAreaCategoryResponseAtom,
  commonAreaChecklistAtom,
  commonAreaConfigAtom,
  selectedCommonAreaAtom,
  selectedProjectAtom,
} from "../../../_state";
import { useCommonArea } from "../../../_actions/commonArea.actions";
import Badge from "../../../components/ui/badge/Badge";
import Checkbox from "../../../components/form/input/Checkbox";
import Select2 from "../../../components/form/Select2";
import { PlusIcon } from "../../../icons";
import Button from "../../../components/ui/button/Button";
import { toast } from "react-toastify";
import { ucword } from "../../../_helpers";
DataTable.use(DT);
import React from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import { getIcons, textColoring } from "../../../_helpers/textIcons";
// Define the table data using the interface

export default function LocationMappingTable({
  hasCommonArea,
  setRawBasements,
  rawBasements,
}: any) {
  const [tableData, setTableData] = useState<any>([]);
  const commonAreaAction = useCommonArea();
  const selectedCommonArea = useRecoilValue(selectedCommonAreaAtom);
  const commonAreaConfig = useRecoilValue(commonAreaConfigAtom);
  const commonAreaChecklist = useRecoilValue(commonAreaChecklistAtom);
  const [selected, setSelected] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(undefined);
  const [isAllCHecked, setIsAllChecked] = useState(false);
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const [staticValue, setSelectedBasement] = useState("");
  const commonAreaCategoryResponse = useRecoilValue(
    commonAreaCategoryResponseAtom
  );
  const setCommonAreaCategoryStatus = useSetRecoilState(
    commonAreaCategoryResponseAtom
  );

  useEffect(() => {
    if (selectedCommonArea?.length != 0) {
      commonAreaAction.getCommonAreaConfig(selectedCommonArea[0]?.id);
    }
  }, [selectedCommonArea]);

  useEffect(() => {
    if (commonAreaCategoryResponse) {
      commonAreaAction.getCommonAreaConfig(selectedCommonArea[0]?.id);
      setCommonAreaCategoryStatus(undefined);
    }
  }, [commonAreaCategoryResponse]);

  useEffect(() => {
    if (staticValue) {
      setTableData([]);
      if (commonAreaConfig && hasCommonArea) {
        const basements = commonAreaConfig?.projectBasements?.map(
          (basement: any) => {
            return [
              {
                type: "basement",
                id: basement?.key,
                selectedValues: selected,
                configuration:
                  (basement?.configuration &&
                    basement?.configuration?.commonAreaCategory) ||
                  [],
              },

              basement.value,
              basement.commonAreaConfigurationStatus,
              (basement?.configuration &&
                basement?.configuration?.commonAreaCategory
                  .map((ca: any) => ca.name)
                  .join(", ")) ||
              "",
              basement?.configuration?.commonAreaCategory,
              selectedCommonArea[0]?.id,
              commonAreaChecklist,
              undefined
            ];
          }
        );
        if (basements) {
          const merged = [...basements];
          setTableData(merged);
        }
      } else {
        const basements = selectedProject?.basementList?.map(
          (basement: any) => {
            return [
              {
                type: "basement",
                id: basement?.key,
                selectedValues: selected,
                configuration:
                  (basement?.configuration &&
                    basement?.configuration?.commonAreaCategory) ||
                  [],
              },

              basement.value,
              basement.commonAreaConfigurationStatus || "pending",
              rawBasements
                ?.find((fl) => fl.basement == basement?.key)
                ?.commonAreaCategories.map(
                  (ca: any) =>
                    commonAreaChecklist.find((cac) => cac.id == ca)?.name
                )
                .join(", ") || "",
              rawBasements
                ?.find((fl) => fl.basement == basement?.key)
                ?.commonAreaCategories,
              selectedCommonArea[0]?.id,
              commonAreaChecklist,
              rawBasements
            ];
          }
        );
        if (basements) {
          const merged = [...basements];
          setTableData(merged);
        }
      }
    }
  }, [commonAreaConfig, selected, rawBasements, staticValue]);

  const selectAll = (e: any) => {
    setIsAllChecked(e);
    if (e) {
      if (hasCommonArea) {
        const basements = commonAreaConfig?.projectBasements?.map(
          (basement: any) => {
            return {
              type: "basement",
              id: basement.key,
              configuration:
                (basement?.configuration &&
                  basement?.configuration?.commonAreaCategory) ||
                [],
            };
          }
        );
        const merged = [...basements];
        setSelected(merged);
      } else {
        const basements = selectedProject?.basementList?.map(
          (basement: any) => {
            return {
              type: "basement",
              id: basement.key,
              configuration:
                (basement?.configuration &&
                  basement?.configuration?.commonAreaCategory) ||
                [],
            };
          }
        );
        const merged = [...basements];
        setSelected(merged);
      }
    } else {
      setSelected([]);
    }
  };

  const selectThis = (e: any, data: any) => {
    if (e) {
      setSelected((oldArray: any) => [
        ...oldArray,
        {
          type: data.type,
          id: data.id,
          configuration: data.configuration,
        },
      ]);
    } else {
      const filtered = data.selectedValues?.filter((s: any) => s.id != data.id);
      setSelected(filtered);
    }
  };

  const registerCategory = () => {
    if (hasCommonArea) {
      selected?.map((sv: any, index: any) => {
        const newArr = sv?.configuration.map((s: any) => s.id);
        newArr.push(parseInt(selectedCategory));
        const params = {
          commonAreaId: selectedCommonArea[0]?.id,
          basement: sv.id,
          commonAreaCategories: newArr,
        };
        commonAreaAction
          .addCommonAreaCategoryBasement(params, index == selected.length - 1)
          .then(() => {
            setSelected([]);
            setSelectedCategory(undefined);
            setIsAllChecked(false);
          })
          .catch((e: any) => {
            toast.error(e);
          });
      });
    } else {
      const basements: any = [];
      if (rawBasements.length == 0) {
        selected?.map((sv: any, index: any) => {
          const newArr = sv?.configuration.map((s: any) => s.id);
          newArr.push(parseInt(selectedCategory));

          const params = {
            basement: sv.id,
            commonAreaCategories: newArr,
          };

          basements.push(params);
        });
        setRawBasements(basements);
      } else {
        selected?.map((sv: any, index: any) => {
          const newArr = sv?.configuration.map((s: any) => s.id);
          newArr.push(parseInt(selectedCategory));
          const holder = rawBasements?.find((base) => base?.basement == sv.id);
          if (holder) {
            const filtered = rawBasements?.filter(
              (base) => base?.basement != sv.id
            );
            if (holder?.commonAreaCategories) {
              holder.commonAreaCategories = Array.from(
                new Set([
                  ...holder.commonAreaCategories,
                  parseInt(selectedCategory),
                ])
              );
            }

            setRawBasements([...filtered, holder]);
          } else {
            const filtered = rawBasements?.filter(
              (base) => base?.basement != sv.id
            );
            setRawBasements([
              ...filtered,
              {
                basement: sv.id,
                commonAreaCategories: [parseInt(selectedCategory)],
              },
            ]);
          }
        });
      }
    }
  };

  // const stringToColour = (str: string) => {
  //   let hash = 0;
  //   str.split("").forEach((char) => {
  //     hash = char.charCodeAt(0) + ((hash << 5) - hash);
  //   });
  //   let colour = "#";
  //   for (let i = 0; i < 3; i++) {
  //     const value = (hash >> (i * 8)) & 0xff;
  //     colour += value.toString(16).padStart(2, "0");
  //   }
  //   return colour;
  // };

  const detachBasement = (selected, caCat, catId, bs, checklist, rawBS) => {
    if (hasCommonArea) {
      const params = {
        commonAreaId: catId,
        basement: bs?.id,
        commonAreaCategories: caCat.filter((s) => s?.name?.trim()?.toLowerCase() == selected?.trim()?.toLowerCase()).map((cols) => cols?.id),
      };
      commonAreaAction.detachCommonAreaCategoryBasement(params)
    } else {
      const selectedOne = checklist?.find((s) => s?.name?.trim()?.toLowerCase() == selected?.trim()?.toLowerCase())
      const holder = rawBS?.find((base) => base?.basement == bs.id);
      const filtered = rawBS?.filter(
        (base) => base?.basement != bs.id
      );
      holder.commonAreaCategories = holder?.commonAreaCategories.filter((f) => f != selectedOne?.id);
      setRawBasements([...filtered, holder]);
    }
  }

  return (
    <ComponentCard
      className="mt-3"
      title="Attach Common Area Categories to Basement - Floors"
    >
      <div className="max-w-full overflow-x-auto">
        <>
          <div className="flex gap-5 space-y-5">
            <div className="flex gap-3 items-center">
              <Select2
                onChange={(e) => setSelectedBasement(e)}
                options={[
                  {
                    label: "Basement",
                    value: "basement",
                  },
                ]}
                placeholder="Please select"
                className="dark:bg-dark-900"
              />

              <Select2
                disabled={!staticValue || selected?.length == 0}
                onChange={(e) => setSelectedCategory(e)}
                options={
                  commonAreaChecklist?.map((cl: any) => {
                    return {
                      value: cl.id,
                      label: cl.name,
                    };
                  }) || []
                }
                placeholder="Please select"
                className="dark:bg-dark-900"
              />

              <Button
                type="button"
                disabled={
                  !staticValue || selected?.length == 0 || !selectedCategory
                }
                variant="primary"
                size="sm"
                className="cursor-pointer"
                onClick={() => registerCategory()}
              >
                Register
                <PlusIcon />
              </Button>
            </div>
          </div>
          <div>
            <DataTable
              className="compact stripe"
              data={tableData}
              options={{
                destroy: true,
                paging: true,
                searching: true,
                columnDefs: [
                  {
                    className:
                      "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400",
                    targets: "_all",
                  },
                  {
                    orderable: false,
                    targets: 0,
                  },
                ],
                layout: {
                  topStart: null,
                  topEnd: null,
                  bottomStart: {
                    pageLength: {
                      text: "Showing _START_-_END_ of _TOTAL_ Rows _MENU_",
                    },
                  },
                  bottomEnd: "paging",
                },
              }}
              slots={{
                0: (_data: any, _row: any) => (
                  <Checkbox
                    className="w-5 h-5 ml-1"
                    checked={_data.selectedValues?.find(
                      (s: any) => s.id == _data.id && s.type == _data.type
                    )}
                    onChange={(e) => selectThis(e, _data)}
                  />
                ),
                2: (_data: any, _row: any) => (
                  <div className="flex">
                    <div
                      className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                                  ${textColoring(
                        _data ? _data : "pending",
                        true
                      )}
                                  `}
                    >
                      {getIcons(_data ? _data : "pending")}
                      <span className="text-[12px]">
                        {ucword(_data ? _data : "pending")}
                      </span>
                    </div>
                  </div>
                ),
                3: (_data: any, _row: any) => (
                  <div className="flex flex-wrap gap-2">
                    {_data.split(",").map((col: any, index: any) => {
                      return (
                        col && <div key={index} className="flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800">
                          <span className="flex-initial">{col}</span>
                          <div className="flex flex-row-reverse flex-auto">
                            <div onClick={() => detachBasement(col, _row[4], _row[5], _row[0], _row[6], _row[7])} className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400">
                              <svg className="fill-current" role="button" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z">
                                </path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ),
              }}
            >
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
                  <th
                    scope="col"
                    className="text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    <Checkbox
                      checked={isAllCHecked}
                      className="w-5 h-5 ml-1"
                      onChange={(e) => selectAll(e)}
                    />
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Floor/Level
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    CA Categories
                  </th>
                </tr>
              </thead>
            </DataTable>
          </div>
        </>
      </div>
    </ComponentCard>
  );
}
