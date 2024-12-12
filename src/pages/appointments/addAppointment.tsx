/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Label, Radio } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ErrorHandler from "../../components/error";

import { FaAngleDown, FaAngleUp, FaChevronLeft } from "react-icons/fa6";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import type { OrgState, ProjectState } from "../../types";
import { useNavigate } from "react-router";
import Select from "react-select";

const AddAppointment: FC = function () {
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { selectedProject }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const [chooseValue, setChooseValue] = useState("property");
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>([]);
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);
  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer position="bottom-right" />
      <div className="mb-6 grid grid-cols-1 gap-y-6 bg-[#ffffff] px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:gap-4">
        <div className="col-span-full">
          <div className="flex w-full items-center justify-between">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="/organization">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Organizations</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/organization/${selectedOrganization?.id}`}
              >
                {selectedOrganization?.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/organization/${selectedOrganization?.id}/project/${selectedProject?.id}`}
              >
                {selectedProject?.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/organization/${selectedOrganization?.id}/project/${selectedProject?.id}/appointments`}
              >
                Appointments
              </Breadcrumb.Item>
              <Breadcrumb.Item>Add</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="mr-1 flex cursor-pointer items-center gap-2 text-gray-500"
              onClick={() => {
                navigate(-1);
              }}
            >
              <FaChevronLeft />
              Back
            </div>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Add Appointment
          </h1>
        </div>
        <ErrorHandler errors={errors} setErrors={setErrors} />

        <div className="flex w-full flex-col">
          <div
            className="flex w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard1(!showCard1)}
          >
            <h1 className="font-bold">Basic Information</h1>
            {showCard1 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          <div className="grid w-full grid-cols-2">
            {showCard1 && (
              <div className="flex flex-col gap-4">
                <fieldset className="mt-5 flex flex-row gap-4">
                  <span>Choose:</span>

                  <div className="flex items-center gap-2">
                    <Radio
                      id="property"
                      name="choose"
                      value="property"
                      checked={chooseValue == "property"}
                      onChange={(e) => setChooseValue(e.target.value)}
                    />
                    <Label htmlFor="choose">Property</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="common-area"
                      name="choose"
                      value="common-area"
                      checked={chooseValue == "common-area"}
                      onChange={(e) => setChooseValue(e.target.value)}
                    />
                    <Label htmlFor="choose">Common Area</Label>
                  </div>
                </fieldset>
                <div className="grid w-[50%] grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      CA Lot No. <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={[]}
                      // isSearchable={true}
                      defaultValue={[]}
                      id="status"
                      name="status"
                      // value={country}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      CA Status <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={[]}
                      // isSearchable={true}
                      defaultValue={[]}
                      id="status"
                      name="status"
                      // value={country}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Appointment Type <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={[]}
                      // isSearchable={true}
                      defaultValue={[]}
                      id="status"
                      name="status"
                      // value={country}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Appointment Date <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={[]}
                      // isSearchable={true}
                      defaultValue={[]}
                      id="status"
                      name="status"
                      // value={country}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Appointment Time Slot{" "}
                      <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={[]}
                      // isSearchable={true}
                      defaultValue={[]}
                      id="status"
                      name="status"
                      // value={country}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Description
                      <span className="text-[red]">*</span>
                    </Label>
                    <textarea
                      id="compose-mail"
                      rows={4}
                      className="block w-full rounded-md border-0 bg-gray-100 p-3 text-base text-gray-900 focus:ring-0 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                      placeholder="Write a description"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Auditor
                      <span className="text-[red]">*</span>
                    </Label>
                    <Select
                      // className="basic-single"
                      // menuPosition="fixed"
                      classNamePrefix="select"
                      options={[]}
                      // isSearchable={true}
                      defaultValue={[]}
                      id="status"
                      name="status"
                      // value={country}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="flex !w-full items-center justify-between border-b-[1px]"
            onClick={() => setShowCard2(!showCard2)}
          >
            <h1 className="font-bold">
              {chooseValue === "property"
                ? "Owner Information"
                : "Strata Information"}
            </h1>
            {showCard2 ? (
              <FaAngleUp className="h-[50px] cursor-pointer" />
            ) : (
              <FaAngleDown className="h-[50px] cursor-pointer" />
            )}
          </div>
          {showCard2 && (
            <div className="grid w-full grid-cols-1">
              <div className="relative mt-10 w-full overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        FULL NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                          PHONE
                          <a href="#">
                            <svg
                              className="ms-1.5 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                          EMAIL ADDRESS
                          <a href="#">
                            <svg
                              className="ms-1.5 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </a>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      ></th>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="my-10 flex">
            <Button className="mx-1" color="primary">
              Book Appointment
            </Button>
            <Button
              className="mx-1"
              onClick={() => {
                navigate(-1);
              }}
              color="gray"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default AddAppointment;
