/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */

import type { Property, PropertyState } from "../types";
import { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectProperty } from "../store/features/propertySlice";
// import OrgTableData from "./datatable/orgtable";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "../extension.css";
import { toast } from "react-toastify";
import {
  getPropertyReportsHistoryReducer,
  getSingleProperty,
} from "../store/features/reducers";
import moment from "moment";
DataTable.use(DT);
const PropertyTable = function ({ properties, selected, setSelected }) {
  const { id, project_id }: any = useParams();
  const { selectedProperty }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const [openModal, setOpenModal] = useState(false);
  const [reportHistory, setReportHistory] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAll, setIsAll] = useState(false);

  const getStatus = (value) => {
    let val = "";
    try {
      val =
        value &&
        value
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          });
    } catch (error) {
      val = "";
    }
    return val;
  };

  const openReportHistory = (proj: any) => {
    // dispatch(getPropertyReportsHistoryReducer(proj.id));
    dispatch(getSingleProperty(proj.id));
    setOpenModal(true);
  };

  const onCheckAll = (e) => {
    if (e) {
      properties &&
        properties.length > 0 &&
        properties.map((props: Property | any) => {
          if (
            props.warrantyStatus != "uploaded" &&
            props.warrantyStatus != "in_progress"
          ) {
            setSelected((oldArray) => [...oldArray, props.id]);
          }
        });
    } else {
      setSelected([]);
    }
  };

  const getSelected = (id, status) => {
    if (status != "uploaded" && status != "in_progress") {
      const isPresent =
        selected && selected.length > 0 && selected.find((e) => e == id);
      if (isPresent) {
        const remover =
          selected && selected.length > 0 && selected.filter((e) => e != id);
        setSelected(remover);
      } else {
        setSelected((oldArray) => [...oldArray, id]);
      }
    } else {
      toast.warning("This property has already warranty files uploaded.");
    }
  };
  useEffect(() => {
    setReportHistory([]);
    if (selectedProperty) {
      const p =
        selectedProperty &&
        selectedProperty.report &&
        selectedProperty.report.length > 0 &&
        selectedProperty.report.map((rep) => {
          return [
            rep.id,
            `${selectedProperty.name}_${moment
              .utc(rep.createdAt)
              .format("YYYY-DD-MM_HH_ss")}`,
            moment.utc(rep.createdAt).format("YYYY-DD-MM HH:mm:ss"),
            rep.reportUrl,
          ];
        });
      setReportHistory(p);
    }
  }, [selectedProperty]);

  return (
    <>
      <table
        id="organization-property-table"
        className="!w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  onChange={(e) => onCheckAll(e.target.checked)}
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              LOT NO
            </th>
            <th scope="col" className="px-6 py-3">
              UNIT NO
            </th>
            <th scope="col" className="px-6 py-3">
              OWNER NAME
            </th>
            <th scope="col" className="px-6 py-3">
              PROPERTY STATUS
            </th>
            <th scope="col" className="px-6 py-3">
              LOCATION
            </th>
            <th scope="col" className="px-6 py-3">
              WARRANTY STATUS
            </th>

            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {properties &&
            properties.length > 0 &&
            properties.map((props: Property | any, index) => {
              return (
                <tr
                  key={index}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        checked={
                          selected &&
                          selected.length > 0 &&
                          selected.find((e) => e == props.id)
                        }
                        id="checkbox-table-search-1"
                        name={props?.id}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        onChange={(e) =>
                          getSelected(props.id, props.warrantyStatus)
                        }
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
                    {props && props?.lotNo ? props?.lotNo : ""}
                  </th>
                  <th className="px-6 py-4">{props.unitNo}</th>
                  <th className="px-6 py-4">
                    {props.user &&
                      props.user
                        .map((u) => {
                          return u.fullName;
                        })
                        .join(", ")}
                  </th>
                  <th className="px-6 py-4">
                    {props.status && getStatus(props.status)}
                  </th>
                  <th className="px-6 py-4">
                    {`${props.projectTower && props.projectTower.name}, ${
                      props.projectTower &&
                      props.projectTower.floorList.find(
                        (f) => f.key == props.floor
                      )?.value
                    }`}
                  </th>

                  <th className="px-6 py-4">
                    <div
                      className={`flex w-auto items-center justify-center rounded-md border border-transparent  px-2.5 py-0.5 text-sm  shadow-sm transition-all ${
                        props.warrantyStatus == "pending" ||
                        props.warrantyStatus == "under_construction"
                          ? "bg-red-100 text-red-800"
                          : props.warrantyStatus == "rejected"
                          ? "bg-red-100 text-red-800"
                          : props.warrantyStatus == "in_progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {props.warrantyStatus && getStatus(props.warrantyStatus)}
                    </div>
                  </th>

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
                        onClick={() => {
                          dispatch(selectProperty(undefined));
                          navigate(
                            `/organization/${id}/project/${project_id}/properties/${props.id}`
                          );
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          openReportHistory(props);
                        }}
                      >
                        Export Property Report
                      </Dropdown.Item>
                      <Dropdown.Item>Report History</Dropdown.Item>
                      <Dropdown.Item>Export Logbook</Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="7xl">
        <Modal.Header>Property Report History</Modal.Header>
        <Modal.Body className="max-h-[500px]">
          <DataTable
            className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
            slots={{
              3: (data: any, row: any) => (
                <div>
                  <a
                    href={row[3]}
                    target="_blank"
                    download={`${row[2]}.pdf`}
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-md p-3 shadow-md"
                  >
                    Download
                  </a>
                </div>
              ),
            }}
            data={reportHistory}
            options={{
              destroy: true,
              paging: false,
              searching: false,
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
          >
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr No
                </th>
                <th scope="col" className="px-6 py-3">
                  Property Report Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Created
                </th>

                <th></th>
              </tr>
            </thead>
          </DataTable>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyTable;
