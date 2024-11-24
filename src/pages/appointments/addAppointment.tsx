/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Label, Radio } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ErrorHandler from "../../components/error";

import { FaAngleDown, FaAngleUp, FaChevronLeft } from "react-icons/fa6";
import { Datepicker } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import type { commonAreaItemType, userData } from "../../types";
import {
  type AppState,
  type OrgState,
  type ProjectState,
  type Property,
  type PropertyState,
  type ReducerTypes,
} from "../../types";
import { useNavigate, useParams } from "react-router";
import AsyncSelect from "react-select/async";
import {
  bookAppointmentReducer,
  getCommonAreaByProjectArrayReducer,
  getProperties,
  listUserByRoleReducer,
} from "../../store/features/reducers";
import moment from "moment";

export interface AppointmentType {
  propertyId?: number;
  commonAreaId?: number;
  type: string;
  appointmentDate: string;
  appointmentTimeslot: string;
  description: string;
  userId?: number;
  tradeCodeId?: number;
}

const AddAppointment: FC = function () {
  const { selectedOrganization }: OrgState = useSelector(
    (state: any) => state.organization
  );
  const { selectedProject, commonAreaArray }: ProjectState = useSelector(
    (state: any) => state.project
  );
  const { propertyData, appointmentResponse }: PropertyState = useSelector(
    (state: any) => state.property
  );

  const { projectAuditors }: AppState = useSelector(
    (state: ReducerTypes) => state.application
  );

  const { project_id }: any = useParams();
  const [chooseValue, setChooseValue] = useState("property");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>([]);
  const [selectedProperty, setSelectedProperty] = useState<
    Property | undefined
  >(undefined);
  const [selectedCommonArea, setSelectedCommonArea] = useState<
    commonAreaItemType | undefined
  >(undefined);
  const [selectedAuditor, setSelectedAuditor] = useState<userData | undefined>(
    undefined
  );
  const [description, setDescription] = useState("");
  const [appointmentType, setInspectionType] = useState("inspection");
  const [timeSlotStart, setTimeSlotStart] = useState("08:00");
  const [timeSlotEnd, setTimeSlotEnd] = useState("18:00");
  const [inspectionStatus, setInspectionStatus] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(
    `${moment().format("MMMM")} ${moment().format("DD")}, ${moment().format(
      "YYYY"
    )} `
  );
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(true);

  let didInit = false;

  useEffect(() => {
    if (!didInit) {
      dispatch(getProperties(project_id));
      dispatch(listUserByRoleReducer("project_auditor"));
      didInit = true;
    }
  }, []);

  const chooseHandler = (e) => {
    setChooseValue(e);
    if (e === "property") {
      dispatch(getProperties(project_id));
    } else {
      dispatch(getCommonAreaByProjectArrayReducer(project_id));
    }
  };

  const optionItem = (): any => {
    return propertyData?.map((p) => {
      return {
        ...p,
        label: p.unitNo,
        value: p.id,
      };
    });
  };

  const optionItem2 = (): any => {
    return commonAreaArray?.map((p) => {
      return {
        ...p,
        label: p.lotNo,
        value: p.id,
      };
    });
  };

  const auditorItems = (): any => {
    return projectAuditors?.map((p) => {
      return {
        ...p,
        label: p.fullName,
        value: p.id,
      };
    });
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    callback(optionItem());
  };

  const loadOptions2 = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    callback(optionItem2());
  };

  const loadAuditors = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    callback(auditorItems());
  };

  const bookAppointment = () => {
    const params: AppointmentType = {
      type: appointmentType,
      appointmentDate: moment(appointmentDate).format("YYYY/DD/MM"),
      appointmentTimeslot: `${timeSlotStart}_${timeSlotEnd}`,
      description: description,
    };
    if (chooseValue == "property") {
      params.propertyId = selectedProperty?.id;
      params.userId = selectedAuditor?.id;
    }
    if (chooseValue == "common-area") {
      params.commonAreaId = selectedCommonArea?.id;
    }
    dispatch(bookAppointmentReducer(params));
  };

  useEffect(() => {
    console.log(appointmentResponse);
    if (appointmentResponse && appointmentResponse.error) {
      toast.warning(appointmentResponse.error);
    } else if (appointmentResponse && !appointmentResponse.error) {
      toast.info("Appointment successfully added");
    }
  }, [appointmentResponse]);
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
                      onChange={(e) => {
                        setInspectionStatus("");
                        chooseHandler(e.target.value);
                      }}
                    />
                    <Label htmlFor="choose">Property</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="common-area"
                      name="choose"
                      value="common-area"
                      checked={chooseValue == "common-area"}
                      onChange={(e) => {
                        setInspectionStatus("");
                        chooseHandler(e.target.value);
                      }}
                    />
                    <Label htmlFor="choose">Common Area</Label>
                  </div>
                </fieldset>
                <div className="grid w-[50%] grid-cols-1 gap-5">
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      {chooseValue === "property" ? "Unit No." : "CA Lot No."}
                      <span className="text-[red]">*</span>
                    </Label>
                    {chooseValue === "property" && propertyData && (
                      <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        onChange={(e) => {
                          setInspectionStatus(e.status);
                          setSelectedProperty(e);
                        }}
                      />
                    )}
                    {chooseValue === "common-area" && commonAreaArray && (
                      <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions2}
                        defaultOptions
                        onChange={(e) => {
                          setInspectionStatus(e.status);
                          setSelectedCommonArea(e);
                        }}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      {chooseValue === "property"
                        ? "Property Status"
                        : "CA Status"}
                      <span className="text-[red]">*</span>
                    </Label>
                    <select
                      id="uploadType"
                      name="uploadType"
                      value={inspectionStatus}
                      disabled
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="" selected>
                        Status
                      </option>
                      <option value="pre_settlement">Pre-Settlement</option>
                      <option value="handover">Handover</option>
                      <option value="post_handover">Post-Handover</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Appointment Type <span className="text-[red]">*</span>
                    </Label>
                    <select
                      id="appointmentType"
                      name="appointmentType"
                      value={appointmentType}
                      onChange={(e) => setInspectionType(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="inspection">Inspection Appointment</option>
                      <option value="defect">Defect Appointment</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Appointment Date <span className="text-[red]">*</span>
                    </Label>
                    <Datepicker
                      value={appointmentDate}
                      onSelectedDateChanged={(e) =>
                        setAppointmentDate(
                          `${moment(e).format("MMMM")} ${moment(e).format(
                            "DD"
                          )}, ${moment(e).format("YYYY")} `
                        )
                      }
                      minDate={
                        new Date(
                          moment().year(),
                          moment().month(),
                          moment().date()
                        )
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Appointment Time Slot{" "}
                      <span className="text-[red]">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <div className="w-[50%]">
                        <label
                          htmlFor="start-time"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Start time:
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5">
                            <svg
                              className="h-4 w-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            value={timeSlotStart}
                            onChange={(e) => setTimeSlotStart(e.target.value)}
                            type="time"
                            id="start-time"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            min="09:00"
                            max="18:00"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-[50%]">
                        <label
                          htmlFor="end-time"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          End time:
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5">
                            <svg
                              className="h-4 w-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            value={timeSlotEnd}
                            onChange={(e) => setTimeSlotEnd(e.target.value)}
                            type="time"
                            id="end-time"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            min="09:00"
                            max="18:00"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex ">
                      <input
                        type="time"
                        id="time"
                        className="block w-full flex-1 rounded-md rounded-s-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        min="09:00"
                        max="18:00"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 pt-[20px]">
                    <Label htmlFor="organization">
                      Description
                      <span className="text-[red]">*</span>
                    </Label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
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
                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadAuditors}
                      defaultOptions
                      onChange={(e) => setSelectedAuditor(e)}
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
                    {selectedProperty &&
                      selectedProperty.user &&
                      selectedProperty.user.map((u, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            <th
                              scope="row"
                              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {u.fullName}
                            </th>
                            <td className="px-6 py-4">{u.mobile}</td>
                            <td className="px-6 py-4">{u.email}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="my-10 flex">
            <Button
              className="mx-1"
              color="primary"
              onClick={() => bookAppointment()}
              disabled={
                !selectedProperty ||
                !description ||
                (chooseValue == "property" && !selectedAuditor)
              }
            >
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
