/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Label, Modal, Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import type { PropertyState, userData, UserState } from "../../types";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState } from "react";
import moment from "moment";

export const DefectSubmissionModal = function (props: any) {
  const { isOpen, setOpen } = props;
  const { defect }: PropertyState = useSelector((state: any) => state.property);
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);

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

  const textColoring = (defectSubStatus, hasBg) => {
    if (
      defectSubStatus == "Tradesman to be organised" ||
      defectSubStatus == "Materials & Tradesman to be organised" ||
      defectSubStatus == "Materials to be organised" ||
      defectSubStatus == "Pending Auditor feedback" ||
      defectSubStatus == "Resolution Rejected by Auditor" ||
      defectSubStatus == "Defect Re-opened By Auditor" ||
      defectSubStatus == "Pending Owner feedback" ||
      defectSubStatus == "Defect Re-opened" ||
      defectSubStatus == "Owner not at home" ||
      defectSubStatus == "Defect Accepted by Admin"
    ) {
      return hasBg ? "text-yellow-800 bg-yellow-100" : "text-yellow-400";
    } else if (
      defectSubStatus == "Defect logged" ||
      defectSubStatus == "Pending Admin feedback"
    ) {
      return hasBg ? "text-red-800 bg-red-100" : "text-red-400";
    } else if (
      defectSubStatus == "Defect Resolved" ||
      defectSubStatus == "Resolution Accepted by Auditor" ||
      defectSubStatus == "Resolution Accepted By Owner" ||
      defectSubStatus == "Defect Closed" ||
      defectSubStatus == "Defect Rejected by Admin"
    ) {
      return hasBg ? "text-green-800 bg-green-100" : "text-green-400";
    } else if (
      defectSubStatus == "Defect Resolution Disputed by Owner" ||
      defectSubStatus == "Warranty Issue" ||
      defectSubStatus == "Owner Defect" ||
      defectSubStatus == "Not a Defect"
    ) {
      return hasBg ? "text-cyan-800 bg-cyan-100" : "text-cyan-400";
    }
  };

  return (
    <>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="7xl">
        <Modal.Body>
          {(!defect && (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )) || (
            <div className="flex !max-h-[600px] flex-col overflow-hidden">
              <div className="relative flex w-full flex-row justify-between">
                <div
                  className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                    ${textColoring(defect?.subStatus, true)}
                    `}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M5 10C4.0111 10 3.0444 9.70675 2.22215 9.15735C1.3999 8.60794 0.759043 7.82705 0.380605 6.91342C0.00216642 5.99979 -0.0968502 4.99445 0.0960758 4.02455C0.289002 3.05465 0.765206 2.16373 1.46447 1.46447C2.16373 0.765206 3.05465 0.289002 4.02455 0.0960758C4.99445 -0.0968502 5.99979 0.00216642 6.91342 0.380605C7.82705 0.759043 8.60794 1.3999 9.15735 2.22215C9.70675 3.0444 10 4.0111 10 5C9.99854 6.32564 9.47129 7.59656 8.53393 8.53393C7.59656 9.47129 6.32564 9.99854 5 10ZM5 1C4.20888 1 3.43552 1.2346 2.77772 1.67412C2.11992 2.11365 1.60723 2.73836 1.30448 3.46927C1.00173 4.20017 0.92252 5.00444 1.07686 5.78036C1.2312 6.55629 1.61216 7.26902 2.17157 7.82843C2.73098 8.38784 3.44372 8.7688 4.21964 8.92314C4.99556 9.07748 5.79983 8.99827 6.53073 8.69552C7.26164 8.39277 7.88635 7.88008 8.32588 7.22228C8.7654 6.56449 9 5.79113 9 5C8.99881 3.9395 8.577 2.92278 7.82711 2.17289C7.07722 1.423 6.0605 1.00119 5 1Z"
                      fill="#9B1C1C"
                    />
                    <path
                      d="M5 6C4.86739 6 4.74022 5.94732 4.64645 5.85355C4.55268 5.75979 4.5 5.63261 4.5 5.5V3C4.5 2.86739 4.55268 2.74022 4.64645 2.64645C4.74022 2.55268 4.86739 2.5 5 2.5C5.13261 2.5 5.25979 2.55268 5.35355 2.64645C5.44732 2.74022 5.5 2.86739 5.5 3V5.5C5.5 5.63261 5.44732 5.75979 5.35355 5.85355C5.25979 5.94732 5.13261 6 5 6Z"
                      fill="#9B1C1C"
                    />
                    <path
                      d="M5 7.5C5.27614 7.5 5.5 7.27614 5.5 7C5.5 6.72386 5.27614 6.5 5 6.5C4.72386 6.5 4.5 6.72386 4.5 7C4.5 7.27614 4.72386 7.5 5 7.5Z"
                      fill="#9B1C1C"
                    />
                  </svg>
                  <span className="text-[12px]">{defect?.subStatus}</span>
                </div>
                <a onClick={() => setOpen(!isOpen)}>
                  <AiOutlineClose />
                </a>
              </div>
              <div className="relative grid !max-h-[550px] auto-rows-min grid-cols-3 gap-5 overflow-auto pb-10">
                <div className="col-span-2 flex flex-col">
                  <div className="col-span-2 col-start-1 row-start-1">
                    <div
                      className="flex w-full items-center justify-between border-b-[1px]"
                      onClick={() => setShowCard1(!showCard1)}
                    >
                      <h1 className="font-bold">Defect Information</h1>
                      {showCard1 ? (
                        <FaAngleUp className="h-[50px] cursor-pointer" />
                      ) : (
                        <FaAngleDown className="h-[50px] cursor-pointer" />
                      )}
                    </div>
                    {showCard1 && (
                      <div className="grid auto-rows-min grid-cols-3 gap-4 pt-5">
                        <div className="flex flex-col">
                          <Label htmlFor="lotno">Lot No</Label>
                          <TextInput
                            disabled={true}
                            id="lotno"
                            name="lotno"
                            value={defect?.property.lotNo}
                            placeholder="Enter lotno"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="unitNo">Unit No</Label>
                          <TextInput
                            disabled={true}
                            id="unitNo"
                            name="unitNo"
                            value={defect?.property.unitNo}
                            placeholder="Enter unitNo"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="zone">Zone</Label>
                          <TextInput
                            disabled={true}
                            id="zone"
                            name="zone"
                            value={defect?.checklistZone.name}
                            placeholder="Enter Zone"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="element">Element</Label>
                          <TextInput
                            disabled={true}
                            id="element"
                            name="element"
                            value={defect?.checklistElement.name}
                            placeholder="Enter element"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="defectcode">Defect Code</Label>
                          <TextInput
                            disabled={true}
                            id="defectcode"
                            name="defectcode"
                            value={defect?.defectCode.defectCode}
                            placeholder="Enter defectcode"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="comment">Comment</Label>
                          <TextInput
                            disabled={true}
                            id="comment"
                            name="comment"
                            value={defect?.comment}
                            placeholder="Enter comment"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="logged">Logged By</Label>
                          <TextInput
                            disabled={true}
                            id="logged"
                            name="logged"
                            value={getStatus(defect?.submittedBy)}
                            placeholder="Enter logged"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="date">Date</Label>
                          <TextInput
                            disabled={true}
                            id="date"
                            name="date"
                            value={moment(defect?.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                            placeholder="Enter date"
                            required
                          />
                        </div>
                        <div className="col-span-3 row-start-4 flex w-full flex-col">
                          <Label htmlFor="date">Defect Evidence</Label>
                          <div className="flex w-full items-center gap-2 bg-gray-100 ">
                            {defect?.images &&
                              defect?.images.map((img, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="h-full min-w-[25%] max-w-[25%] p-3"
                                  >
                                    <img
                                      src={img.url}
                                      className="h-40 w-40 object-scale-down object-center"
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 col-start-1 row-start-2">
                    <div
                      className="flex w-full items-center justify-between border-b-[1px]"
                      onClick={() => setShowCard2(!showCard2)}
                    >
                      <h1 className="font-bold">Property Information</h1>
                      {showCard2 ? (
                        <FaAngleUp className="h-[50px] cursor-pointer" />
                      ) : (
                        <FaAngleDown className="h-[50px] cursor-pointer" />
                      )}
                    </div>
                    {showCard2 && (
                      <div className="grid auto-rows-min grid-cols-3 gap-4 pt-5">
                        <div className="flex flex-col">
                          <Label htmlFor="status">Property Status</Label>
                          <TextInput
                            disabled={true}
                            id="status"
                            name="status"
                            value={getStatus(defect?.property.status)}
                            placeholder="Enter status"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="tower">Tower</Label>
                          <TextInput
                            disabled={true}
                            id="tower"
                            name="tower"
                            value={defect?.property.tower}
                            placeholder="Enter tower"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="floor">Floor</Label>
                          <TextInput
                            disabled={true}
                            id="floor"
                            name="floor"
                            value={defect?.property.floor}
                            placeholder="Enter Zone"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="bedroom">Bedroom</Label>
                          <TextInput
                            disabled={true}
                            id="bedroom"
                            name="bedroom"
                            value={defect?.property.bedroom}
                            placeholder="Enter bedroom"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="bathroom">Bathroom</Label>
                          <TextInput
                            disabled={true}
                            id="bathroom"
                            name="bathroom"
                            value={defect?.property.bathroom}
                            placeholder="Enter bathroom"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="ensuite">Ensuite</Label>
                          <TextInput
                            disabled={true}
                            id="ensuite"
                            name="ensuite"
                            value={defect?.property.ensuite}
                            placeholder="Enter ensuite"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="study">Study Room</Label>
                          <TextInput
                            disabled={true}
                            id="study"
                            name="study"
                            value={defect?.property.studyRoom}
                            placeholder="Enter study"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="storage">Storage</Label>
                          <TextInput
                            disabled={true}
                            id="storage"
                            name="storage"
                            value={defect?.property.storage}
                            placeholder="Enter storage"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="parking">Parking Space</Label>
                          <TextInput
                            disabled={true}
                            id="parking"
                            name="parking"
                            value={defect?.property.parkingSpaces}
                            placeholder="Enter parking"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="internal">
                            Internal Area (m
                            <span className="align-super">2</span>)
                          </Label>
                          <TextInput
                            disabled={true}
                            id="internal"
                            name="internal"
                            value={defect?.property.internalArea}
                            placeholder="Enter internal"
                            required
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label htmlFor="external">
                            External Area (m
                            <span className="align-super">2</span>)
                          </Label>
                          <TextInput
                            disabled={true}
                            id="external"
                            name="external"
                            value={defect?.property.externalArea}
                            placeholder="Enter external"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 col-start-1 row-start-3 pb-10">
                    <div
                      className="flex w-full items-center justify-between border-b-[1px]"
                      onClick={() => setShowCard3(!showCard3)}
                    >
                      <h1 className="font-bold">Owner Information</h1>
                      {showCard3 ? (
                        <FaAngleUp className="h-[50px] cursor-pointer" />
                      ) : (
                        <FaAngleDown className="h-[50px] cursor-pointer" />
                      )}
                    </div>
                    {showCard3 && (
                      <Table>
                        <Table.Head>
                          <Table.HeadCell>FULLNAME</Table.HeadCell>
                          <Table.HeadCell>PHONE</Table.HeadCell>
                          <Table.HeadCell>EMAIL ADDRESS</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          {defect?.property.user &&
                            defect?.property.user.map((u: userData, index) => {
                              return (
                                <Table.Row key={index}>
                                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                                    {u.fullName}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {u.mobile}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                                    {u.email}
                                  </Table.Cell>
                                </Table.Row>
                              );
                            })}
                        </Table.Body>
                      </Table>
                    )}
                  </div>
                </div>

                <div className="col-start-3 row-span-2 row-start-1">
                  <div className="bg-gray-100 p-4">
                    <span className="text-[14px] font-semibold">
                      Activity Log
                    </span>
                    <div className="flex flex-col">
                      {defect?.activityLogs &&
                        defect.activityLogs.map((activity, index) => {
                          return (
                            <div
                              key={index}
                              className={`flex flex-col pr-5 ${
                                index == 0 && "pt-5"
                              }`}
                            >
                              <div
                                className={`relative flex flex-col border-l-2 border-gray-200 ${
                                  index > 0 ? "py-3" : "pb-3"
                                } pl-5`}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 12 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`absolute left-[-8px] ${
                                    index > 0 ? "top-4" : ""
                                  }`}
                                >
                                  <path
                                    d="M11.5 5.35953C11.5 7.88636 9.10776 10.053 6 10.053C2.89224 10.053 0.5 7.88636 0.5 5.35953C0.5 2.83271 2.89224 0.666046 6 0.666046C9.10776 0.666046 11.5 2.83271 11.5 5.35953Z"
                                    fill="#E5E7EB"
                                    stroke="white"
                                  />
                                </svg>

                                <span
                                  className={`text-[14px] font-bold ${
                                    index == 0 && "mt-[-4px]"
                                  }`}
                                >
                                  {getStatus(activity.loggedBy)}
                                </span>
                                <span
                                  className={`text-[14px] ${textColoring(
                                    activity.defectSubStatus,
                                    false
                                  )}`}
                                >
                                  {activity.defectSubStatus}
                                </span>
                                {activity.images &&
                                  activity.images.length > 0 && (
                                    <div className="relative grid auto-rows-auto grid-cols-3 bg-gray-100 p-2">
                                      {activity.images.map((img, index) => {
                                        return (
                                          //   <div
                                          //     key={index}
                                          //     className="h-[50px] min-w-[25%] max-w-[25%] p-3"
                                          //   >
                                          <img
                                            key={index}
                                            src={img.url}
                                            className="h-20 w-20 object-scale-down object-center"
                                          />
                                          //   </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                {activity.comment && (
                                  <span className="text-[12px]">
                                    <span className="font-semibold">
                                      Comment
                                    </span>
                                    : {activity.comment}
                                  </span>
                                )}
                                <span className="text-[12px]">
                                  {moment(activity.createdAt).format(
                                    "MMM DD, YYYY h:mm a"
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
