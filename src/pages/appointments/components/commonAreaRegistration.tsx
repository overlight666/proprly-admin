/* eslint-disable @typescript-eslint/no-explicit-any */
import { ucword } from "../../../_helpers";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Property } from "../../../_types";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  appointmentTradeCodesAtom,
  remainingTimeSlotsAtom,
  selectedCommonAreaAtom,
  selectedProjectAtom,
} from "../../../_state";
import Input from "../../../components/form/input/InputField";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import { useAppointments } from "../../../_actions";
import { useParams } from "react-router";
import TextArea from "../../../components/form/input/TextArea";
import Radio from "../../../components/form/input/Radio";
import { toast } from "react-toastify";
import { CloseIcon } from "../../../icons";

export const CommonAreaEventRegistration = function ({
  closeModal,
  event,
  setCancel,
}: any) {
  const [dateValue, setDateValue] = useState<any>({
    startDate: event ? event?.appointmentDate : new Date(),
    endDate: event ? event?.appointmentDate : new Date(),
  });
  const MIN_DATE = new Date();
  MIN_DATE.setDate(MIN_DATE.getDate());
  const [description, setDescription] = useState("");
  const commonArea = useRecoilValue(selectedCommonAreaAtom);
  const remainingTimeslots = useRecoilValue(remainingTimeSlotsAtom);

  const appointmentAction = useAppointments();
  const tradeCodes = useRecoilValue(appointmentTradeCodesAtom);
  const [selectedValue, setSelectedValue] = useState<string>("auditor");
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { project_id } = useParams();
  const [descriptionError, setDescriptionError] = useState("");
  const appointmentOptions = [
    {
      label: "Inspection Appointment",
      value: "inspection",
    },
    {
      label: "Defect Appointment",
      value: "defect",
    },
  ];

  const validationSchema = Yup.object().shape({
    commonAreaId: Yup.string().required("Lot Number is required"),
    type: Yup.string().required("Appointment type is required"),
    appointmentTimeslot: Yup.string().required("Appointment type is required"),
    description: Yup.string().optional(),
    userId: Yup.string().required("User is required"),
    tradeCodeId: Yup.string().optional(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, watch, setValue } =
    useForm(formOptions);

  const { errors, isSubmitting } = formState;

  const propertyValue = commonArea?.find(
    (pr: Property) => pr.id == parseInt(watch("commonAreaId"))
  );
  const appointmentTypeValue = watch("type");

  const remainingContractors = selectedProject?.user?.filter((e: any) =>
    e?.tradeCodes?.find((tc: any) => tc.id == watch("tradeCodeId"))
  );

  const remainingAuditors = selectedProject?.user?.filter((e: any) =>
    e?.project_role?.find((r: any) => r?.roleKey == "project_auditor")
  );

  useEffect(() => {
    if (event) {
      setValue("commonAreaId", event?.commonAreaId);
      setValue("type", event?.type);
      setValue("description", event?.description);
      setValue("userId", event?.userId);
      setValue("tradeCodeId", event?.tradeCodeId || undefined);
      setDescription(event?.description);
      setValue("appointmentTimeslot", event?.appointmentTimeslot);
      if (event?.tradeCodeId) {
        setSelectedValue("sub_contractor");
      } else {
        setSelectedValue("auditor");
      }
    }
  }, [event]);

  useEffect(() => {
    if (dateValue.startDate) {
      appointmentAction.getRemainingTimeslots(
        project_id,
        moment(dateValue?.startDate).format("YYYY/DD/MM").replace(/\//g, "%2F")
      );
    }
  }, [dateValue]);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const onSubmit = (props: any) => {
    if (dateValue) {
      if (description?.trim().length == 0) {
        setDescriptionError("Description is required");
      } else {
        const params = {
          appointmentDate: moment(dateValue.startDate).format("YYYY/DD/MM"),
          description: description,
          ...props,
        };
        if (!event) {
          appointmentAction
            .saveAppointment(params, toast)
            .then(() => {
              appointmentAction.getAppointments(project_id);
              closeModal();
            })
            .catch((e: any) => {
              toast.error(e);
            });
        } else {
          appointmentAction
            .updateAppointment(event?.id, params, toast)
            .then(() => {
              appointmentAction.getAppointments(project_id);
              closeModal();
            })
            .catch((e: any) => {
              toast.error(e);
            });
        }
      }
    } else {
      closeModal();
      toast.warn("Appointment date is required!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="mt-3">
            <Label htmlFor="inputTwo">
              CA lot No. <span className="text-error-500">*</span>{" "}
            </Label>
            <Select
              disabled={event}
              options={commonArea?.map((l: any) => {
                return {
                  label: l.lotNo,
                  value: l.id,
                };
              })}
              placeholder="Select CA lot No"
              className="dark:bg-dark-900"
              register={{ ...register("commonAreaId") }}
              error={errors.commonAreaId}
              hint={errors.commonAreaId?.message}
            />
          </div>
          <div className="mt-3">
            <Label htmlFor="input">CA Status</Label>
            <Input
              disabled={event}
              type="text"
              value={ucword(propertyValue?.status || "")}
              readOnly
              placeholder="Status"
            />
          </div>
          <div className="mt-3">
            <Label htmlFor="inputTwo">
              Appointment Type <span className="text-error-500">*</span>{" "}
            </Label>
            <Select
              disabled={event}
              options={appointmentOptions}
              placeholder="Select Type"
              className="dark:bg-dark-900"
              register={{ ...register("type") }}
              error={errors.type}
              hint={errors.type?.message}
            />
          </div>
          <div className="mt-3">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Appointment Date <span className="text-error-500">*</span>
            </label>
            <div className="relative">
              <Datepicker
                minDate={MIN_DATE}
                asSingle={true}
                value={dateValue}
                onChange={(newValue: any) => setDateValue(newValue)}
              />
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="inputTwo">
              Appointment Timeslot <span className="text-error-500">*</span>{" "}
            </Label>
            <Select
              options={
                (remainingTimeslots &&
                  remainingTimeslots?.appointmentTimeSlotsListAmPm?.map(
                    (t: any) => {
                      return {
                        value: t.key,
                        label: t.value,
                      };
                    }
                  )) ||
                []
              }
              placeholder="Select Timeslot"
              className="dark:bg-dark-900"
              register={{ ...register("appointmentTimeslot") }}
              error={errors.appointmentTimeslot}
              hint={errors.appointmentTimeslot?.message}
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Description<span className="text-error-500">*</span>{" "}
          </label>
          <div className="relative">
            <TextArea
              disabled={event}
              rows={2}
              onChange={(value) => setDescription(value)}
              value={description}
              hint={descriptionError}
              error={descriptionError?.length > 0}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 mt-3">
          {appointmentTypeValue == "inspection" ? (
            <>
              <div className="col-span-4">
                <Label htmlFor="inputTwo">
                  Auditor <span className="text-error-500">*</span>{" "}
                </Label>
                <Select
                  disabled={event}
                  options={
                    remainingAuditors?.map((au: any) => {
                      return {
                        label: au.fullName,
                        value: au.id,
                      };
                    }) || []
                  }
                  placeholder="Select Auditor"
                  className="dark:bg-dark-900"
                  register={{ ...register("userId") }}
                  error={errors.userId}
                  hint={errors.userId?.message}
                />
              </div>
            </>
          ) : appointmentTypeValue == "defect" ? (
            <>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 col-span-4">
                <Radio
                  disabled={event}
                  id="usertype1"
                  name="usertypeOption"
                  value="auditor"
                  checked={selectedValue === "auditor"}
                  onChange={handleRadioChange}
                  label="Auditor"
                />
                <Radio
                  disabled={event}
                  id="usertype2"
                  name="usertypeOption"
                  value="sub_contractor"
                  checked={selectedValue === "sub_contractor"}
                  onChange={handleRadioChange}
                  label="Sub-Contractor"
                />
              </div>
              <div className="grid grid-cols-12 col-span-12 mt-4 gap-2">
                {selectedValue == "sub_contractor" && (
                  <div className="col-span-4">
                    <Label htmlFor="inputTwo">
                      Trade Category
                      <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Select
                      disabled={event}
                      options={tradeCodes?.map((au: any) => {
                        return {
                          label: au.tradeName,
                          value: au.id,
                        };
                      })}
                      placeholder="Select Trade Category"
                      className="dark:bg-dark-900"
                      register={{ ...register("tradeCodeId") }}
                      error={errors.tradeCodeId}
                      hint={errors.tradeCodeId?.message}
                    />
                  </div>
                )}
                <div className="col-span-4">
                  <Label htmlFor="inputTwo">
                    {selectedValue == "sub_contractor"
                      ? "Sub-Contractor"
                      : "Auditor"}{" "}
                    <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Select
                    disabled={event}
                    options={
                      selectedValue == "sub_contractor"
                        ? remainingContractors?.map((au: any) => {
                            return {
                              label: au.fullName,
                              value: au.id,
                            };
                          }) || []
                        : remainingAuditors?.map((au: any) => {
                            return {
                              label: au.fullName,
                              value: au.id,
                            };
                          }) || []
                    }
                    placeholder={`Select ${
                      selectedValue == "sub_contractor"
                        ? "Sub-Contractor"
                        : "Auditor"
                    }`}
                    className="dark:bg-dark-900"
                    register={{ ...register("userId") }}
                    error={errors.userId}
                    hint={errors.userId?.message}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {!event && (
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              // onClick={handleAddOrUpdateEvent}
              disabled={isSubmitting}
              type="submit"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}{" "}
              Add New Appointment
            </button>
          </div>
        )}
        {event && (
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <div
              className="flex w-full sm:justify-end text-red-500 mr-5 cursor-pointer"
              onClick={() => setCancel(true)}
            >
              <CloseIcon />
              <h1 className="text-red-500">Cancel Appointment</h1>
            </div>
            <button
              onClick={closeModal}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Close
            </button>
            <button
              // onClick={handleAddOrUpdateEvent}
              disabled={isSubmitting}
              type="submit"
              className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}{" "}
              Reschedule
            </button>
          </div>
        )}
      </form>
    </>
  );
};
