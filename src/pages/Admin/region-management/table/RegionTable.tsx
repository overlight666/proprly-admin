/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TableCell } from "../../../../components/ui/table";
import { CheckLineIcon, CloseIcon, FolderIcon, PencilIcon } from "../../../../icons";
import AddRegionModal from "../modal/AddRegionModal";
import { toast } from "react-toastify";
import { allRegionAtom, selectedRegionAtom } from "@/_recoil/states";
import { useModal } from "@/helpers/useModal";
import { useUserActions } from "@/_recoil/actions";
import { confirm } from "@/components/ui/confirm-dialog";
DataTable.use(DT);

// Define the table data using the interface

export default function RegionTable({ tableRef }: any) {
  const regionList = useRecoilValue(allRegionAtom);
  const [tableData, setTableData] = useState<any>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const setSelectedRegion = useSetRecoilState(selectedRegionAtom);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const navigate = useNavigate();
  const userAction = useUserActions();

  useEffect(() => {
    if (regionList) {
      const regions = regionList?.map((region, index) => {
        return [index + 1, region?.regionName, "n/a", region];
      });
      setTableData(regions);
    }
  }, [regionList]);


  const deleteRegion = async (zone: any) => {
    if (
      await confirm({
        confirmText: "Delete",
        confirmVariant: "destructive",
        confirmation:
          "You are about to delete this region. Please confirm to continue!",
      })
    ) {
      userAction
        .deleteRegion(zone.id)
        .then(() => {
          toast.warning(`${zone.name} has been deleted!`);
          userAction.getAllRegions();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const restoreRegion = async (zone: any) => {
    if (
      await confirm({
        confirmText: "Restore",
        confirmVariant: "green",
        confirmation:
          "You are about to restore this region. Please confirm to continue!",
      })
    ) {
      userAction
        .restoreRegion(zone.id)
        .then(() => {
          toast.warning(`${zone.name} has been restored!`);
          userAction.getAllRegions();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  return (
    <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <AddRegionModal
        closeModal={closeModal}
        isOpen={isOpen}
        isEdit={isEdit}
        id={selectedId}
      />
      <div className="max-w-full overflow-x-auto">
        <div className="">
          <DataTable
            ref={tableRef}
            className="compact stripe"
            data={tableData}
            options={{
              destroy: true,
              paging: true,
              searching: true,
              columnDefs: [
                { searchable: true, targets: [0, 1, 2] },
                {
                  className:
                    "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]",
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
              1: (_data: any, _row: any) => (
                <span
                  className={`${!_row[3].isActive && "line-through text-red-900"
                    }`}
                >
                  {_data}
                </span>
              ),
              3: (_data: any, _row: any) => (
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                  <div className="flex flex-row gap-5">
                    <FolderIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="View"
                      onClick={() => {
                        navigate(`/region-management/${_data?.id}`);
                      }}
                    />
                    <PencilIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Edit"
                      onClick={() => {
                        setSelectedId(_data?.id);
                        setIsEdit(true);
                        openModal();
                      }}
                    />
                    {_data.isActive ? <CloseIcon
                      className="size-5 cursor-pointer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Deactivate"
                      onClick={() =>
                        deleteRegion(_data)
                      }
                    /> : <CheckLineIcon
                      className="size-5 cursor-pointer text-green-400"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Restore"
                      onClick={() =>
                        restoreRegion(_data)
                      }
                    />}
                  </div>
                </TableCell>
              ),
            }}
          >
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Sr No
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Country
                </th>

                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </th>

                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
          </DataTable>
        </div>
      </div>
    </div>
  );
}
