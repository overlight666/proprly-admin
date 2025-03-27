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
    setTableData([]);
    if (commonAreaConfig && !hasCommonArea) {
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
          ];
        }
      );
      const merged = [...basements];
      setTableData(merged);
    } else {
      const basements = selectedProject?.basementList?.map((basement: any) => {
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
              (ca: any) => commonAreaChecklist.find((cac) => cac.id == ca)?.name
            )
            .join(", ") || "",
        ];
      });
      const merged = [...basements];
      setTableData(merged);
    }
  }, [commonAreaConfig, selected, rawBasements]);

  const selectAll = (e: any) => {
    setIsAllChecked(e);
    if (e) {
      if (!hasCommonArea) {
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
    if (!hasCommonArea) {
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
        });
      }
    }
  };

  const stringToColour = (str: string) => {
    let hash = 0;
    str.split("").forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }
    return colour;
  };

  return (
    <div className="overflow-hidden mt-5 rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <h1 className="pb-5 text-black dark:text-white text-[25px]">Basement</h1>
      <div className="max-w-full overflow-x-auto">
        <>
          <div className="flex gap-5 space-y-5">
            <div className="flex gap-3 items-center">
              <Select2
                disabled={selected?.length == 0}
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
                disabled={selected?.length == 0 || !selectedCategory}
                variant="primary"
                size="sm"
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
                  <Badge
                    color={
                      _data?.toLowerCase() == "pending"
                        ? "warning"
                        : _data
                            ?.toLowerCase()
                            .replace(/_/g, "")
                            .replace(/ /g, "") == "inprogress"
                        ? "info"
                        : "success"
                    }
                  >
                    {ucword(_data)}
                  </Badge>
                ),
                3: (_data: any, _row: any) => (
                  <div>
                    {_data.split(",").map((col: any, index: any) => {
                      return (
                        <span
                          key={index}
                          style={{
                            color: stringToColour(col + "proprly"),
                          }}
                        >
                          {`${col} `}
                        </span>
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
    </div>
  );
}
