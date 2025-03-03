/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";

import { Property } from "../../../_types";
import { useRecoilValue } from "recoil";
import { propertiesAtom } from "../../../_state";
import { TableCell } from "../../../components/ui/table";
import { ucword } from "../../../_helpers";
import Badge from "../../../components/ui/badge/Badge";
import { DocsIcon, PageIcon, PencilIcon, TaskIcon } from "../../../icons";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import moment from "moment";
import { toast } from "react-toastify";
import Checkbox from "../../../components/form/input/Checkbox";
import { useModal } from "../../../hooks/useModal";
import ExportPropertyReportModal from "../../Properties/components/ExportPropertyReportModal";
import React from "react";
DataTable.use(DT);

// Define the table data using the interface

export default function PropertyTable({
  tableRef,
  selected,
  setSelected,
}: any) {
  const [tableData, setTableData] = useState<any>([]);
  const properties = useRecoilValue(propertiesAtom);
  const navigate = useNavigate();
  const { id, project_id } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const [propertyReportId, setPropertyReportId] = useState<any>(undefined);

  useEffect(() => {
    if (properties) {
      const tb = properties.map((prop: Property) => {
        return [
          {
            selected: selected.includes(prop.id),
            selectedValues: selected,
            ...prop,
          },
          prop.lotNo,
          prop.unitNo,
          prop?.user &&
            prop?.user
              .map((u) => {
                return u.fullName;
              })
              .join(", "),
          prop.status && ucword(prop.status),
          `${prop.projectTower && prop.projectTower.name}, ${
            prop.projectTower &&
            prop.projectTower.floorList.find((f) => f.key == prop.floor)?.value
          }`,
          prop.warrantyStatus && prop.warrantyStatus,
          moment(prop.createdAt).format("lll"),
          prop.id,
        ];
      });
      setTableData(tb);
    }
  }, [properties, selected]);

  const onCheckAll = (e: any) => {
    if (e) {
      setSelected([]);
      if (properties && properties.length > 0) {
        properties.map((props: Property | any) => {
          if (
            props?.warrantyStatus != "uploaded" &&
            props?.warrantyStatus != "in_progress"
          ) {
            setSelected((oldArray: any) => [...oldArray, props.id]);
          }
        });
      }
    } else {
      setSelected([]);
    }
  };

  const getSelected = (id: number, status: any, selectedValue: any) => {
    if (status != "uploaded" && status != "in_progress") {
      const isPresent = selectedValue.includes(id);
      if (isPresent) {
        const remover = selectedValue.filter((e: any) => e != id);
        setSelected(remover);
      } else {
        setSelected((oldArray: any) => [...oldArray, id]);
      }
    } else {
      toast.warning("This property has already warranty files uploaded.");
    }
  };

  const setOpenModal = (data: any) => {
    setPropertyReportId(data);
    openModal();
  };

  return (
    <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mx-5 ">
      <div className="max-w-full overflow-x-auto ">
        <div className="">
          <DataTable
            ref={tableRef}
            className="compact stripe"
            data={tableData}
            options={{
              // order: [[1, "asc"]],
              destroy: true,
              paging: true,
              searching: true,
              columnDefs: [
                { type: "dom-checkbox", targets: 0, orderable: false },
                { searchable: true, targets: [1, 2, 3, 4, 5, 6, 7] },
                {
                  className:
                    "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400",
                  targets: "_all",
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
                <TableCell className=" text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Checkbox
                    className="w-5 h-5"
                    checked={_data.selected}
                    onChange={() =>
                      getSelected(
                        _data.id,
                        _data.warrantyStatus,
                        _data.selectedValues
                      )
                    }
                  />
                </TableCell>
              ),

              6: (_data: any, _row: any) => (
                <Badge
                  variant="light"
                  color={
                    _data == "pending" || _data == "under_construction"
                      ? "warning"
                      : _data == "rejected"
                      ? "error"
                      : _data == "in_progress"
                      ? "info"
                      : "success"
                  }
                >
                  {ucword(_data)}
                </Badge>
              ),

              8: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex gap-2">
                    <PencilIcon
                      onClick={() =>
                        navigate(
                          `/organization/${id}/project/${project_id}/property/${_data}`
                        )
                      }
                      className="size-5 text-white cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Edit"
                      data-tooltip-place="left"
                    />
                    <DocsIcon
                      onClick={() => setOpenModal(_data)}
                      className="size-5 text-blue-700 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Export Property Report"
                      data-tooltip-place="top"
                    />
                    <TaskIcon
                      className="size-5 text-blue-700 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Report History"
                      data-tooltip-place="top"
                    />
                    <PageIcon
                      className="size-5 text-green-700 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Export Logbook"
                      data-tooltip-place="top"
                    />
                  </div>
                </TableCell>
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
                    className="w-5 h-5 ml-1"
                    onChange={(e) => onCheckAll(e)}
                  />
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Lot No
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Unit No
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Owner Name
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Property Status
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Warranty Status
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Date Created
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
          </DataTable>
        </div>
      </div>
      <ExportPropertyReportModal
        isOpen={isOpen}
        closeModal={closeModal}
        id={propertyReportId}
      />
    </div>
  );
}
