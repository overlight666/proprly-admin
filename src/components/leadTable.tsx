/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useSelector } from "react-redux";
import type { Lead, LeadState, ReducerTypes } from "../types";
import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import moment from "moment";
import { Button, Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { LeadConfirmModal } from "./modals/leadsModal";
import { useNavigate } from "react-router";
// import OrgTableData from "./datatable/orgtable";

const LeadTable = function () {
  const [isOpen, setOpen] = useState(false);
  const [lead_id, setLeadId] = useState<string | number | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { leadList }: LeadState = useSelector(
    (state: ReducerTypes) => state.lead
  );
  console.log(leadList);

  useEffect(() => {
    if (document.getElementById("lead-project-table") && leadList) {
      try {
        const datatable = new DataTable("#lead-project-table", {
          searchable: false,
          fixedHeight: true,
          paging: true,
          perPage: 5,
          perPageSelect: [5, 10, 15, 20, 25],
          sortable: false,
          firstLast: true,
          nextPrev: true,
          classes: {
            selector:
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
            active: "[&>button]:text-white [&>button]:bg-blue-600",
            paginationListItemLink:
              "flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
            pagination: "datatable-pagination-test",
            paginationList:
              "inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse",
            bottom:
              "flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row",
            top: "flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row",
            table: "p-20",
          },
        });
        datatable.update();
        // OrgTableData(orgList);
        // console.log(orgList);
        // dataTable.insert(newData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [leadList]);

  return (
    <>
      <div className="relative overflow-x-auto px-2 shadow-md sm:rounded-lg">
        <table
          id="lead-project-table"
          className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        >
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                FULL NAME
              </th>
              <th scope="col" className="px-6 py-3">
                PHONE
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL ADDRESS
              </th>
              <th scope="col" className="px-6 py-3">
                ORG NAME
              </th>
              <th scope="col" className="px-6 py-3">
                COUNTRY
              </th>
              <th scope="col" className="px-6 py-3">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3">
                LEAD CREATED
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {leadList &&
              leadList.length > 0 &&
              leadList.map((lead: Lead, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {lead.fullName}
                    </th>
                    <td className="px-6 py-4">{lead.mobileNumber}</td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">{lead.organizationName}</td>
                    <td className="px-6 py-4">
                      {lead.organizationCountryCode}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex w-auto items-center rounded-md border border-transparent bg-yellow-100 px-2.5 py-0.5 text-sm text-yellow-800 shadow-sm transition-all">
                        Pending
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {moment(lead.createdAt).format("DD MMM YYYY")}
                    </td>
                    <td className="px-6 py-4">
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
                          onClick={() => navigate("/signup-leads/view")}
                        >
                          View
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setStatus("convert");
                            setLeadId(lead.id);
                            setOpen(true);
                          }}
                        >
                          Convert
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setStatus("reject");
                            setLeadId(lead.id);
                            setOpen(true);
                          }}
                        >
                          Reject
                        </Dropdown.Item>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <LeadConfirmModal
        setOpen={setOpen}
        isOpen={isOpen}
        status={status}
        lead_id={lead_id}
      />
    </>
  );
};

export default LeadTable;
