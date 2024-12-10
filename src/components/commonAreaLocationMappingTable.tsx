/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

// import OrgTableData from "./datatable/orgtable";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "../extension.css";
import { Dropdown, Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { CommonAreaConfigModal } from "./modals/commonAreaConfigModal";
import { useState } from "react";

const CommonAreaLocationMappingTable = function ({
  towers,
  basements,
  id,
}: any) {
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<any>();
  return (
    <>
      <table
        id="common-area-config-table"
        className="!w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              TOWER NAME
            </th>
            <th scope="col" className="px-6 py-3">
              FLOOR/LEVEL
            </th>
            <th scope="col" className="px-6 py-3">
              STATUS
            </th>

            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {towers &&
            towers.map((c, index) => {
              return (
                <tr key={index}>
                  <td>{c.name}</td>
                  <td>{c.numFloors}</td>
                  <td>
                    <div className="flex">
                      <div
                        className={`flex w-auto items-center justify-center rounded-md border border-transparent px-2.5  py-0.5 text-sm shadow-sm transition-all ${
                          c.commonAreaConfigurationStatus.toLowerCase() ==
                          "pending"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {c.commonAreaConfigurationStatus}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex w-full flex-row-reverse">
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <Button color="gray" className="w-[50px]">
                            <div className="flex items-center gap-x-2 text-xs">
                              <BsThreeDots />
                            </div>
                          </Button>
                        )}
                      >
                        <Dropdown.Item
                          onClick={() => {
                            setData(c);
                            setOpen(true);
                          }}
                        >
                          Update
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              );
            })}
          {basements && (
            <tr>
              <td>Basements</td>
              <td>{basements.length}</td>
              <td>
                <div className="flex">
                  <div
                    className={`flex w-auto items-center justify-center rounded-md border border-transparent px-2.5  py-0.5 text-sm shadow-sm transition-all ${
                      basements[0].commonAreaConfigurationStatus.toLowerCase() ==
                      "pending"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {basements[0].commonAreaConfigurationStatus}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex w-full flex-row-reverse">
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <Button color="gray" className="w-[50px]">
                        <div className="flex items-center gap-x-2 text-xs">
                          <BsThreeDots />
                        </div>
                      </Button>
                    )}
                  >
                    <Dropdown.Item
                      onClick={() => {
                        setData(basements);
                        setOpen(true);
                      }}
                    >
                      Update
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <CommonAreaConfigModal
        isOpen={isOpen}
        setOpen={setOpen}
        data={data}
        id={id}
      />
    </>
  );
};

export default CommonAreaLocationMappingTable;
