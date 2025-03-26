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
import React from "react";
import { getIcons, ticketColoring } from "../_helpers/textIcons";
import { selectedTicketAtom } from "../_state";
import { ucword } from "../_helpers";
import { PDFIcon } from "../icons";

export default function SupportTicketModal({ isOpen, closeModal }: any) {
  const ticket = useRecoilValue(selectedTicketAtom);
  console.log(ticket);
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[90%] p-6 lg:p-10 relative overflow-auto"
      >
        <div className="flex flex-col px-2 overflow-auto custom-scrollbar">
          <div className="flex items-center">
            <div
              className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                    ${ticketColoring(ticket?.status, true)}
                    `}
            >
              {getIcons(ticket?.status)}
              <span className="text-[12px]">{ucword(ticket?.status)}</span>
            </div>
          </div>
          <div className="mt-8 space-y-3 grid grid-cols-1 md:grid-cols-12 gap-2">
            <ComponentCard title="Ticket Information" className="col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="input">Ticket No</Label>
                  <Input
                    type="text"
                    id="input"
                    value={ticket?.ticketNo}
                    readOnly={true}
                  />
                </div>
                {ticket?.property && (
                  <div>
                    <Label htmlFor="input">Name</Label>
                    <Input
                      type="text"
                      id="input"
                      value={ticket && ticket?.user && ticket?.user?.fullName}
                      readOnly={true}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="input">Email Address</Label>
                  <Input
                    type="text"
                    id="input"
                    value={ticket && ticket?.user && ticket?.user?.email}
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label htmlFor="input">Phone No</Label>
                  <Input
                    type="text"
                    id="input"
                    value={ticket && ticket?.user && ticket?.user?.mobile}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Issue Type</Label>
                  <Input
                    type="text"
                    id="input"
                    value={ticket?.supportsIssuesTypes?.title}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="input">Status</Label>
                  <Input
                    type="text"
                    id="input"
                    value={ucword(ticket?.status)}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="mb-5">
                  <Label>Evidence Uploaded</Label>
                  <div className="flex gap-2 flex-wrap mt-5 flex-row">
                    {ticket?.images?.map((img, index) => {
                      return img?.url?.includes(".pdf") ? (
                        <div className="flex flex-col items-center">
                          <a
                            href={img?.url}
                            target="_blank"
                            download={img?.url}
                            rel="noreferrer"
                            className="cursor-pointer"
                            data-tooltip-id="tooltip"
                            data-tooltip-content={img?.key}
                          >
                            <PDFIcon className="size-15" />
                          </a>
                          <span className="text-black dark:text-gray-200 text-[12px]">
                            {img.name}
                          </span>
                        </div>
                      ) : (
                        <img key={index} src={img.url} className="h-32 w-32" />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label>Proprly Admin Evidence</Label>
                  <TextArea
                    value={ticket?.comment}
                    rows={2}
                    readOnly={true}
                    placeholder="N/A"
                  />
                </div>
              </div>
            </ComponentCard>
            <ComponentCard
              title="Activity Logs"
              className="col-span-4  !mt-[0px] !max-h-[98%] overflow-auto"
            >
              <div className="gap-2 ">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                  {ticket?.activityLogs &&
                    ticket?.activityLogs.map((activity, index) => {
                      return (
                        <li className="mb-4 ms-4" key={index}>
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {moment(ticket?.createdAt).format("LLL")}
                          </time>
                          <div className="flex">
                            <div
                              className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                                  ${ticketColoring(activity?.status, true)}
                                  `}
                            >
                              {getIcons(activity?.status)}
                              <span className="text-[12px]">
                                {ucword(activity?.status)}
                              </span>
                            </div>
                          </div>
                          <div className="text-black dark:text-white">
                            {ticket?.description}
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
                        </li>
                      );
                    })}
                </ol>
              </div>
            </ComponentCard>
          </div>
        </div>
      </Modal>
    </>
  );
}
