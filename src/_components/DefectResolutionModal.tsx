/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modal } from "../components/ui/modal";
import { organizationDefectAtom } from "../_state/atoms/organizations";
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
import { getIcons, textColoring } from "../_helpers/textIcons";
import PhotoViewer from "photoviewer";
import Carousel from 'react-bootstrap/Carousel';

import Icon from '@mdi/react';
import * as apIcon from '@mdi/js';
import { ucword } from "../_helpers";

export default function DefectResolutionModal({
  isOpen,
  closeModal,
  openModal,
}: any) {
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
      val = "N/A";
    }
    return val ? val : "N/A";
  };

  const viewImage = (img: any) => {
    const items = [
      {
        src: img?.url, // path to image
        title: img?.name, // If you skip it, there will display the original image name(image1)
      },
    ];

    const options = {
      index: 0,

      callbacks: {
        beforeOpen: function (context) {
          closeModal();
          // Will fire before modal is opened
        },

        beforeClose: function (context) {
          openModal();
        },
      },
    };

    new PhotoViewer(items, options);
  };

  useEffect(() => {
    const nextElement = document.getElementsByClassName("carousel-control-next")
    for (let i = 0; i < nextElement.length; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.setAttribute('width', '20');
      svg.setAttribute('height', '20');
      svg.setAttribute('viewBox', '0 0 20 20');
      path.setAttribute('d', 'M6.68376 19C6.35484 18.9999 6.03332 18.8944 5.75986 18.6969C5.48639 18.4993 5.27325 18.2186 5.14739 17.8901C5.02152 17.5617 4.98859 17.2003 5.05274 16.8516C5.11689 16.5029 5.27525 16.1826 5.50779 15.9312L10.9851 10.011L5.50779 4.09092C5.34893 3.92508 5.22221 3.7267 5.13504 3.50737C5.04787 3.28803 5.00198 3.05212 5.00006 2.81341C4.99814 2.5747 5.04023 2.33797 5.12386 2.11703C5.2075 1.89609 5.331 1.69536 5.48718 1.52656C5.64335 1.35776 5.82906 1.22427 6.03348 1.13387C6.23789 1.04348 6.45692 0.997994 6.67777 1.00007C6.89863 1.00214 7.11689 1.05174 7.31982 1.14596C7.52275 1.24018 7.70629 1.37714 7.85973 1.54884L14.513 8.74001C14.8248 9.07714 15 9.53434 15 10.011C15 10.4878 14.8248 10.9449 14.513 11.2821L7.85973 18.4732C7.54787 18.8104 7.12486 18.9999 6.68376 19Z');
      path.setAttribute('fill', 'white');
      path.setAttribute('fill-opacity', '0.7');
      svg.appendChild(path)
      nextElement[i]?.classList?.add("absolute");
      nextElement[i]?.classList?.add("top-[50%]");
      nextElement[i]?.classList?.add("right-1");
      nextElement[i]?.appendChild(svg)
    }
    const prevElement = document.getElementsByClassName("carousel-control-prev")
    for (let i = 0; i < prevElement.length; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.setAttribute('width', '20');
      svg.setAttribute('height', '20');
      svg.setAttribute('viewBox', '0 0 20 20');
      path.setAttribute('d', 'M13.3162 1C13.6452 1.00008 13.9667 1.10555 14.2401 1.3031C14.5136 1.50065 14.7268 1.7814 14.8526 2.10986C14.9785 2.43831 15.0114 2.79973 14.9473 3.14842C14.8831 3.4971 14.7248 3.8174 14.4922 4.06883L9.0149 9.98895L14.4922 15.9091C14.6511 16.0749 14.7778 16.2733 14.865 16.4926C14.9521 16.712 14.998 16.9479 14.9999 17.1866C15.0019 17.4253 14.9598 17.662 14.8761 17.883C14.7925 18.1039 14.669 18.3046 14.5128 18.4734C14.3567 18.6422 14.1709 18.7757 13.9665 18.8661C13.7621 18.9565 13.5431 19.002 13.3222 18.9999C13.1014 18.9979 12.8831 18.9483 12.6802 18.854C12.4772 18.7598 12.2937 18.6229 12.1403 18.4512L5.487 11.26C5.17517 10.9229 5 10.4657 5 9.98895C5 9.51224 5.17517 9.05505 5.487 8.71792L12.1403 1.52675C12.4521 1.18958 12.8751 1.0001 13.3162 1Z');
      path.setAttribute('fill', 'white');
      path.setAttribute('fill-opacity', '0.7');
      svg.appendChild(path)
      prevElement[i]?.classList?.add("absolute");
      prevElement[i]?.classList?.add("top-[50%]");
      prevElement[i]?.classList?.add("left-1");
      prevElement[i]?.appendChild(svg)
    }
  })

  const mutateIcon = (name: any) => {
    const splitName = name.split("-");
    let newName = "mdi"
    splitName?.map((names) => {
      newName = newName + ucword(names)
    })
    return newName
  }


  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[80%] p-6 lg:p-10 max-h-[90%] relative overflow-auto"
      >
        <div className="flex flex-col px-2 overflow-auto custom-scrollbar">
          <div className="flex gap-3">
            <span className="dark:text-gray-200">{defect?.property ? `Unit No ${defect?.property?.unitNo}, ${defect?.property?.projectTower?.name} - Floor ${defect?.property?.floor}` : `CA Lot No ${defect?.commonArea?.lotNo}, ${defect?.projectTower?.name}`}</span>
          </div>
          <div className="mt-8 space-y-3 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="col-span-2">
              <span className="dark:text-gray-200">Activity Logs</span>
              <div className="gap-2 mt-5">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                  {defect?.activityLogs &&
                    defect?.activityLogs.map((activity: any, index) => {
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
                          <div className="flex">
                            <div
                              style={{
                                backgroundColor: activity?.bgColor
                              }}
                              className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all`}
                            >
                              {/* {getIcons(activity.defectSubStatus)} */}
                              <Icon path={apIcon[mutateIcon(activity?.icon?.appIcon)]} size={0.5} style={{
                                color: activity?.color
                              }} />
                              <span style={{
                                color: activity?.color
                              }} className={`text-[12px] ml-1`}>
                                {activity.defectSubStatus}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="flex flex-col">
                              {activity.comment ?
                                <span className="text-[12px] text-gray-900 dark:text-gray-200 ml-2">
                                  <span className="font-semibold text-gray-800 dark:text-gray-400">
                                    Comment
                                  </span>
                                  : {activity.comment}
                                </span>
                                : <span className="text-[12px] text-gray-900 dark:text-gray-200 ml-2">
                                  <span className="font-semibold text-gray-800 dark:text-gray-400">
                                    Comment
                                  </span>
                                  : N/A
                                </span>}
                              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 text-xs mt-3">
                                {moment(activity.createdAt).format(
                                  "MMM DD, YYYY h:mm a"
                                )}
                              </p>
                            </div>
                            {activity.images && activity.images.length > 0 && (
                              <Carousel className="p-3 dark:bg-gray-800 relative rounded-md bg-gray-100 flex justify-center items-center">
                                {activity.images.map((img, index) => {
                                  return (
                                    <Carousel.Item key={index}
                                    >
                                      <img
                                        className="d-block w-[350px] h-[200px] rounded-md"
                                        src={img.url}
                                        alt="First slide"
                                      />

                                    </Carousel.Item>
                                  );
                                })}
                              </Carousel>
                            )}

                          </div>

                        </li>
                      );
                    })}
                </ol>
              </div>
            </div>
            <div className="flex flex-col pl-2">
              <span className="dark:text-gray-200 mb-5">Defect Information</span>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="font-normal text-gray-800 dark:text-gray-400">
                    Type
                  </span>
                  <span className="dark:text-gray-100 text-gray-400 font-light"> {defect?.inspection ? `${ucword(defect?.inspection?.stage)} Inspection Defect` : ""}</span>

                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-normal text-gray-800 dark:text-gray-400">
                    Where is the Defect?
                  </span>
                  <span className="dark:text-gray-100 text-gray-400 font-light"> {defect?.checklistZone?.name}</span>

                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-normal text-gray-800 dark:text-gray-400">
                    Which Area has Defect?
                  </span>
                  <span className="dark:text-gray-100 text-gray-400 font-light"> {defect?.checklistElement?.name}</span>

                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-normal text-gray-800 dark:text-gray-400">
                    What Sub-area has Defect?
                  </span>
                  <span className="dark:text-gray-100 text-gray-400 font-light">N/A</span>

                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-normal text-gray-800 dark:text-gray-400">
                    What is the Defect?
                  </span>
                  <span className="dark:text-gray-100 text-gray-400 font-light"> {`${defect?.defectCode?.defectCode} - ${defect?.defectCode?.defectName}`}</span>

                </div>
              </div>
            </div>
          </div>
          <hr className="mt-5" />
          {
            defect?.approvalOptions?.length > 0 && <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start">
              {
                defect?.approvalOptions?.includes("close") && <button
                  onClick={() => {
                    defectAction.pushDefectFeedback(defect?.id, {
                      feedback: "close",
                    });
                    setDefectMessage("Defect has been closed");
                  }}
                  type="button"
                  className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                >
                  Close Defect
                </button>
              }
              {
                defect?.approvalOptions?.includes("reopen") && <button
                  onClick={() => {
                    defectAction
                      .pushDefectFeedback(defect?.id, {
                        feedback: "reopen",
                      })
                      .catch((e) => {
                        toast.error(e);
                      });
                    setDefectMessage("Defect has been reopened");
                  }}
                  type="button"
                  className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                >
                  Re-open Defect
                </button>
              }
            </div>
          }
        </div>

      </Modal>
    </>
  );
}
