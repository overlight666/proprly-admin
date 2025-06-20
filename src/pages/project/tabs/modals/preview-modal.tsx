/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from "recoil";
import { ItpSubmissionPreviewAtom, ItpSubmissionSubStatusAtom, SelectedItpTaskAtom } from "@/_recoil/states";
import { Modal } from "@/components/ui/modal";
import { getIcons, ticketColoring } from "@/helpers/textIcons";
import { ucword } from "@/helpers";
import { PDFIcon } from "@/icons";
import PhotoViewer from "photoviewer";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useITPAction } from "@/_recoil/actions";
import { useEffect, useState } from "react";
import SubmitTaskModal from "./submit-task-modals";
import { useModal } from "@/helpers/useModal";
import { Label } from "flowbite-react";
import Select from "@/components/ui/select";
import { toast } from "react-toastify";

export default function PreviewModal({
    isOpen,
    closeModal,
    locationKey,
    tradeId,
    setReload
}: any) {
    const itp: any = useRecoilValue(SelectedItpTaskAtom);
    const taskSubmission = useRecoilValue(ItpSubmissionPreviewAtom)
    const taskSubStatus = useRecoilValue(ItpSubmissionSubStatusAtom)
    const itpAction = useITPAction();
    const subModal = useModal();

    const [submissionType, setSubmissionType] = useState("");
    const [status, setStatus] = useState("");

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
                beforeOpen: function (_context) {
                    // closeModal();
                    // Will fire before modal is opened
                },

                beforeClose: function (_context) {
                    // openModal();
                },
            },
        };

        new PhotoViewer(items, options);
    };

    useEffect(() => {
        if (itp?.itpTaskSubmission) {
            itpAction.getItpSubmission(itp?.itpTaskSubmission?.id);
            itpAction.getItpSubmissionSubStatus(itp?.itpTaskSubmission?.id);
        }
    }, [itp?.itpTaskSubmission]);


    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    console.log("itp", itp);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className="max-w-[70%] max-h-[80%] p-6 lg:p-10 relative overflow-auto"
            >
                {taskSubmission && <div className="flex flex-col px-2">
                    <div className="flex gap-3">
                        <b className="dark:text-gray-200 text-xl">{itp?.itpTemplate?.name}</b>
                    </div>
                    <div className="mt-8 space-y-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="col-span-2">
                            <span className="dark:text-gray-200">Activity Logs</span>
                            <div className="gap-2 mt-5 max-h-[50vh] overflow-auto custom-scrollbar">
                                <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-2">
                                    {taskSubmission?.activityLogs &&
                                        taskSubmission?.activityLogs.map((activity, index) => {
                                            return (
                                                <li className="mb-4 ms-4" key={index}>
                                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                                    <div className="mb-1 text-sm font-normal leading-none text-gray-800 dark:text-gray-200">
                                                        <span>{ucword(activity?.user?.fullName)}</span>
                                                    </div>
                                                    {activity?.itpSubmissionDocument && activity?.itpSubmissionDocument.length > 0 && <span className="text-gray-600 dark:text-gray-400 text-sm mt-2">Submission Documents</span>}
                                                    {activity?.itpSubmissionDocument && activity?.itpSubmissionDocument.length > 0 && (
                                                        <div className="relative flex flex-wrap gap-2 bg-gray-200 dark:bg-gray-800 rounded-md p-2 my-2 custom-scrollbar">
                                                            {activity.itpSubmissionDocument.map((img, index) => {
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
                                                                            <PDFIcon className="size-10" />
                                                                        </a>
                                                                        <span className="text-black dark:text-gray-200 text-[12px]">
                                                                            {img.name}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <img
                                                                        key={index}
                                                                        src={img.url}
                                                                        onClick={() => viewImage(img)}
                                                                        className="object-scale-down object-center cursor-pointer w-[20%]"
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {activity?.itpSubmissionImage && activity?.itpSubmissionImage.length > 0 && <span className="text-gray-600 dark:text-gray-400 text-sm mt-2">Submission Image</span>}

                                                    {activity?.itpSubmissionImage && activity?.itpSubmissionImage.length > 0 && (
                                                        <div className="relative flex flex-wrap gap-2 bg-gray-200 dark:bg-gray-800 rounded-md p-2 my-2  custom-scrollbar">
                                                            {activity.itpSubmissionImage.map((img, index) => {
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
                                                                            <PDFIcon className="size-10" />
                                                                        </a>
                                                                        <span className="text-black dark:text-gray-200 text-[12px]">
                                                                            {img.name}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <img
                                                                        key={index}
                                                                        src={img.url}
                                                                        onClick={() => viewImage(img)}
                                                                        className="object-scale-down object-center cursor-pointer w-[20%]"
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                    {activity?.signatureImage && <span className="text-gray-600 dark:text-gray-400 text-sm mt-2">Signature</span>}
                                                    {activity?.signatureImage && (
                                                        <div className="relative flex flex-wrap gap-2 bg-gray-200 dark:bg-gray-800 rounded-md p-2 my-2  custom-scrollbar">
                                                            <img
                                                                key={activity?.signatureImage?.url}
                                                                src={activity?.signatureImage?.url}
                                                                onClick={() => viewImage(activity?.signatureImage)}
                                                                className="object-scale-down object-center cursor-pointer w-[20%]"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="flex mt-2">
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
                                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                        {moment(itp?.createdAt).format("LLL")}
                                                    </time>
                                                </li>
                                            );
                                        })}
                                </ol>
                            </div>
                        </div>
                        <div className="flex flex-col col-span-1 !mt-0">
                            <span className="dark:text-gray-200 mb-5">Task Information</span>
                            <div className="flex flex-col gap-5 bg-gray-200 dark:bg-gray-700 p-2 rounded-md  max-h-[40vh] overflow-auto">
                                {/* <div className="flex flex-col gap-1">
                                    <span className="font-normal text-gray-800 dark:text-gray-400">
                                        Task
                                    </span>
                                    <span className="dark:text-gray-100 text-gray-600 font-light"> {ucword(itp?.itpTask?.inspectionWorkActivity)}</span>

                                </div> */}
                                <div className="flex flex-col gap-1">
                                    <span className="font-normal text-gray-800 dark:text-gray-400">
                                        Timing/Frequency
                                    </span>
                                    <span className="dark:text-gray-100 text-gray-600 font-light"> {taskSubmission?.itpTask?.timingFrequency?.label}</span>

                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-normal text-gray-800 dark:text-gray-400">
                                        Method
                                    </span>
                                    <span className="dark:text-gray-100 text-gray-600 font-light"> {taskSubmission?.itpTask?.method?.label}</span>

                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-normal text-gray-800 dark:text-gray-400">
                                        Inpection/Verification done by
                                    </span>
                                    <span className="dark:text-gray-100 text-gray-600 font-light"> {taskSubmission?.user?.fullName}</span>

                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-normal text-gray-800 dark:text-gray-400">
                                        Verification type
                                    </span>
                                    <span className="dark:text-gray-100 text-gray-600 font-light"> {taskSubmission?.itpTask?.verificationType?.label}</span>

                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-normal text-gray-800 dark:text-gray-400">
                                        Acceptance Criteria
                                    </span>
                                    <span className="dark:text-gray-100 text-gray-600 font-light"> {taskSubmission?.itpTask?.acceptanceCriteria}</span>

                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-normal text-gray-800 dark:text-gray-400">
                                        References
                                    </span>
                                    <pre className="dark:text-gray-100 text-gray-600 font-light whitespace-pre-line">{taskSubmission?.itpTask?.reference}</pre>

                                </div>
                            </div>
                        </div>


                    </div>
                    <SubmitTaskModal setReload={setReload} isOpen={subModal.isOpen} closeModal={subModal.closeModal} selectedTask={itp} locationKey={locationKey} tradeId={tradeId} status={status} submissionType={submissionType} closeParent={closeModal} />
                    {itp?.itpTaskSubmission?.canReSubmit && <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start">

                        <Button variant="default"
                            onClick={() => {
                                subModal.openModal();
                                setStatus(taskSubStatus?.find((task) => task.text == "ITP resubmitted")?.code);
                                setSubmissionType("resubmit");
                                // closeModal();
                            }}
                            type="button"
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            Re-submit Task
                        </Button>


                    </div>}
                    {
                        !itp?.itpTaskSubmission?.canReSubmit && !itp?.itpTaskSubmission?.approvalNeededBy && <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start">
                            <div>
                                <Label htmlFor="inputTwo">
                                    Change Status <span className="text-red-500">*</span>{" "}
                                </Label>
                                <Select
                                    options={taskSubStatus?.map((task) => {
                                        return {
                                            label: task?.text,
                                            value: task?.code,
                                        };
                                    }) || []}
                                    placeholder="Select status"
                                    className="dark:bg-dark-900"
                                    onChange={(e) => {
                                        setStatus(e);
                                        setSubmissionType("statusChange");
                                        subModal.openModal();
                                        // closeModal();
                                    }}
                                />
                            </div>
                        </div>
                    }
                    {
                        itp?.itpTaskSubmission?.approvalNeededBy && <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start">
                            <Button variant="default"
                                onClick={() => {
                                    itpAction
                                        .taskSubmissionReopen(taskSubmission?.id, {
                                            feedback: "accept",
                                        }).then((res) => {
                                            if (res) {
                                                toast.success("Task submission has been accepted");
                                                setTimeout(() => {
                                                    setReload(makeid(10));
                                                }, 1000);

                                                closeModal();
                                            }

                                        })
                                        .catch((e) => {
                                            toast.error(e);
                                        });
                                }}
                                type="button"
                                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                            >
                                Accept Task
                            </Button>
                            <Button variant="destructive"
                                onClick={() => {
                                    itpAction
                                        .taskSubmissionReopen(taskSubmission?.id, {
                                            feedback: "reject",
                                        }).then((res) => {
                                            if (res) {
                                                toast.info("Task submission has been rejected");
                                                setTimeout(() => {
                                                    setReload(makeid(10));
                                                }, 1000);

                                                closeModal();
                                            }

                                        })
                                        .catch((e) => {
                                            toast.error(e);
                                        });
                                }}
                                type="button"
                                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                            >
                                Reject Task
                            </Button>
                        </div>
                    }
                    {/* <Button variant="default"
                        onClick={() => {
                            itpAction
                                .taskSubmissionReopen(taskSubmission?.id, {
                                    feedback: "reopen",
                                }).then(() => {
                                    toast.success("Task submission has been re-opened");
                                    setReload(makeid(10));
                                    closeModal();
                                })
                                .catch((e) => {
                                    toast.error(e);
                                });

                        }}
                        type="button"
                        className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                    >
                        Re-open Task
                    </Button> */}

                </div> ||
                    <div role="status" className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
            </Modal>
        </>
    );
}
