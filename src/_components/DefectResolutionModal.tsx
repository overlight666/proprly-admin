/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modal } from "../components/ui/modal";
import { organizationDefectAtom } from "../_state/atoms/organizations";
import Badge from "../components/ui/badge/Badge";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import ComponentCard from "../components/common/ComponentCard";
import moment from "moment";
import TextArea from "../components/form/input/TextArea";
import { globalConfigAtom } from "../_state";
import { Roles } from "../_types";
import { useDefect } from "../_actions/defects.actions";
import { defectFeedbackAtom } from "../_state/atoms/defects";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";

export default function DefectResolutionModal({ isOpen, closeModal }: any) {
  const defect = useRecoilValue(organizationDefectAtom);
  const config = useRecoilValue(globalConfigAtom);
  const defectFeedback = useRecoilValue(defectFeedbackAtom);
  const setDefectFeedback = useSetRecoilState(defectFeedbackAtom);
  const defectAction = useDefect();

  const [defectMessage, setDefectMessage] = useState("");

  useEffect(() => {
    if (defectFeedback) {
      toast.info(defectMessage);
      setDefectFeedback(undefined);
      setDefectMessage("");
    }
  }, [defectFeedback]);

  const getStatus = (value: any) => {
    let val = "";
    try {
      val =
        value &&
        value
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter: any) {
            return letter.toUpperCase();
          });
    } catch (error: any) {
      val = "";
    }
    return val;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[90%] p-6 lg:p-10 max-h-[90%] relative overflow-auto"
      >
        <div className="flex flex-col px-2 overflow-auto custom-scrollbar">
          <div>
            <Badge
              color="error"
              style={{
                color: defect?.color,
                backgroundColor: `${defect?.color}30`,
              }}
            >
              {defect && defect?.subStatus}
            </Badge>
          </div>
          <div className="mt-8 space-y-3 grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-2">
            <ComponentCard title="Defect Information" className="col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="input">Lot No</Label>
                  <Input
                    type="text"
                    id="input"
                    value={
                      defect && defect?.property && defect?.property?.lotNo
                    }
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Unit No</Label>
                  <Input
                    type="text"
                    id="input"
                    value={
                      defect && defect?.property && defect?.property?.unitNo
                    }
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Zone</Label>
                  <Input
                    type="text"
                    id="input"
                    value={
                      defect &&
                      defect?.checklistZone &&
                      defect?.checklistZone?.name
                    }
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Element</Label>
                  <Input
                    type="text"
                    id="input"
                    value={
                      defect &&
                      defect?.checklistElement &&
                      defect?.checklistElement?.name
                    }
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Logged By</Label>
                  <Input
                    type="text"
                    id="input"
                    value={
                      config?.roles && config.roles.length > 0
                        ? config.roles.find(
                            (k: Roles) => k.id == defect?.submittedUserRoleId
                          )?.roleName
                        : ""
                    }
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Date</Label>
                  <Input
                    type="text"
                    id="input"
                    value={moment(defect?.createdAt).format("DD-MM-YYYY")}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div>
                  <Label>Defect Code</Label>
                  <TextArea
                    value={`${
                      defect &&
                      defect.defectCode &&
                      defect.defectCode.defectCode
                    }, ${
                      defect &&
                      defect.defectCode &&
                      defect.defectCode.defectName
                    }`}
                    rows={2}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label>Comment</Label>
                  <TextArea
                    value={defect?.comment}
                    rows={2}
                    readOnly={true}
                    placeholder="N/A"
                  />
                </div>
              </div>
            </ComponentCard>
            <ComponentCard
              title="Activity Logs"
              className="col-span-4 row-span-4 !mt-[0px] !max-h-[98%] overflow-auto"
            >
              <div className="gap-2 ">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                  {defect?.activityLogs &&
                    defect.activityLogs.map((activity, index) => {
                      return (
                        <li className="mb-4 ms-4" key={index}>
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {config &&
                              config?.roles &&
                              config.roles.find(
                                (c) => c.id == activity?.loggedUserRoleId
                              )?.roleName}
                          </time>
                          <div className="mt-3">
                            <Badge
                              color="error"
                              style={{
                                color: activity?.color,
                                backgroundColor: `${activity?.color}20`,
                              }}
                            >
                              {activity.defectSubStatus}
                            </Badge>
                          </div>

                          {activity.images && activity.images.length > 0 && (
                            <div className="relative grid auto-rows-auto grid-cols-3 bg-gray-100 p-2">
                              {activity.images.map((img, index) => {
                                return (
                                  <img
                                    key={index}
                                    src={img.url}
                                    className="h-20 w-20 object-scale-down object-center"
                                  />
                                );
                              })}
                            </div>
                          )}

                          {activity.comment && (
                            <span className="text-[12px] text-gray-900 dark:text-gray-200">
                              <span className="font-semibold text-gray-800 dark:text-gray-400">
                                Comment
                              </span>
                              : {activity.comment}
                            </span>
                          )}
                          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 text-xs mt-3">
                            {moment(activity.createdAt).format(
                              "MMM DD, YYYY h:mm a"
                            )}
                          </p>
                        </li>
                      );
                    })}
                </ol>
              </div>
            </ComponentCard>
            <ComponentCard title="Property Information" className="col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="input">Property Status</Label>
                  <Input
                    type="text"
                    id="input"
                    value={getStatus(defect?.property?.status)}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Tower</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.projectTower?.name}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Floor</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.floor}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Bedroom</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.bedroom}
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label htmlFor="input">Bathroom</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.bathroom}
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label htmlFor="input">Ensuite</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.ensuite}
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label htmlFor="input">Study Room</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.studyRoom}
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label htmlFor="input">Storage</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.storage}
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label htmlFor="input">Parking Space</Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.parkingSpaces}
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label htmlFor="input">
                    Internal Area(m
                    <span className="align-super">2</span>)
                  </Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.internalArea}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">
                    External Area(m
                    <span className="align-super">2</span>)
                  </Label>
                  <Input
                    type="text"
                    id="input"
                    value={defect?.property.externalArea}
                    readOnly={true}
                  />
                </div>
              </div>
            </ComponentCard>
            {defect &&
              defect.subStatus &&
              defect.subStatus == "Pending Admin Approval" && (
                <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end col-span-12">
                  <button
                    onClick={() => {
                      defectAction.pushDefectFeedback(defect.id, {
                        feedback: "reject",
                      });
                      setDefectMessage("Defect has been rejected");
                    }}
                    type="button"
                    className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                  >
                    Reject Defect
                  </button>
                  <button
                    onClick={() => {
                      defectAction.pushDefectFeedback(defect.id, {
                        feedback: "accept",
                      });
                      setDefectMessage("Defect has been accepted");
                    }}
                    type="button"
                    className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                  >
                    Accept Defect
                  </button>
                </div>
              )}
            {defect &&
              defect.subStatus &&
              (defect.subStatus == "Defect Rejected by Admin" ||
                (defect.subStatus &&
                  defect.subStatus.toLowerCase() ==
                    "pending admin feedback")) && (
                <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end col-span-12">
                  <button
                    onClick={() => {
                      defectAction.pushDefectFeedback(defect.id, {
                        feedback: "close",
                      });
                      setDefectMessage("Defect has been closed");
                    }}
                    type="button"
                    className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                  >
                    Close Defect
                  </button>
                  <button
                    onClick={() => {
                      defectAction.pushDefectFeedback(defect.id, {
                        feedback: "reopen",
                      });
                      setDefectMessage("Defect has been reopened");
                    }}
                    type="button"
                    className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                  >
                    Re-open Defect
                  </button>
                </div>
              )}
          </div>
        </div>
      </Modal>
    </>
  );
}
