/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue, useSetRecoilState } from "recoil";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PhotoViewer from "photoviewer";
import { authAtom, selectedTicketAtom, uploadResponseAtom } from "@/_recoil/states";
import { ImageType } from "@/lib/interface";
import { useUserActions } from "@/_recoil/actions";
import { Modal } from "@/components/ui/modal";
import { getIcons, ticketColoring } from "@/helpers/textIcons";
import { ucword } from "@/helpers";
import ComponentCard from "@/components/ui/component-card";
import { Label } from "flowbite-react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/text-area";
import FileUploader2 from "@/components/ui/fileupload2";
import { Button } from "@/components/ui/button";
import { PDFIcon } from "@/icons";

export default function SupportTicketModal({
    isOpen,
    closeModal,
    openModal,
}: any) {
    const currentUser = useRecoilValue(authAtom);
    const ticket: any = useRecoilValue(selectedTicketAtom);
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [fileContainer, setFileContainer] = useState<ImageType[]>([]);
    const [uploadQueue, setUploadQueue] = useState<any>([]);
    const uploadResponse: any = useRecoilValue(uploadResponseAtom);
    const setUploadResponse = useSetRecoilState(uploadResponseAtom);
    const userAction = useUserActions();

    useEffect(() => {
        if (uploadResponse) {
            if (fileContainer && fileContainer.length > 0) {
                setFileContainer((oldArray: any) => [...oldArray, uploadResponse]);
            } else {
                setFileContainer([uploadResponse]);
            }
            setUploadResponse(undefined);
        }
    }, [uploadResponse]);

    const removeFile = (file: File) => {
        const newFiles: any =
            fileContainer &&
            fileContainer.length > 0 &&
            fileContainer.filter((e) => e.name !== file.name);
        setFileContainer(newFiles);
    };

    const onSubmit = async () => {
        if (description.trim().length == 0) {
            toast.error("Description is required");
        } else {
            const params: any = {
                issueId: ticket?.issueId,
                description,
                userId: JSON.parse(currentUser)?.user?.id,
                status: status,
            };

            if (fileContainer?.length > 0) {
                params.attachment = fileContainer.map((files) => files.id);
            }

            await userAction.updateSupportTikets(ticket?.id, params).then(() => {
                toast.success("Support ticket has been updated!");
                setFileContainer([]);
                setUploadQueue([]);
                setDescription("");
                setStatus("");
                closeModal();
            });
        }
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
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className="max-w-[90%] max-h-[90%] p-6 lg:p-10 relative overflow-auto"
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
                        <div className="flex flex-col gap-5 col-span-8">
                            <ComponentCard title="Ticket Information">
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
                                    {/* <div className="mb-5">
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
                </div> */}
                                </div>
                            </ComponentCard>
                            <ComponentCard title="Status" className="col-span-8">
                                <div className="flex flex-row gap-2 w-full">
                                    <Select
                                        options={[
                                            {
                                                label: "In Progress",
                                                value: "in_progress",
                                            },
                                            {
                                                label: "Resolved",
                                                value: "resolved",
                                            },
                                        ]}
                                        onChange={(e) => setStatus(e)}
                                        placeholder="Select any option"
                                        className="dark:bg-dark-900"
                                        containerClass="w-[100%]"
                                    />
                                </div>

                                {status !== "" && (
                                    <>
                                        <div className="mt-5">
                                            <Label>Proprly Admin Evidence</Label>
                                            <TextArea
                                                value={description}
                                                rows={2}
                                                onChange={(e) => setDescription(e)}
                                                placeholder="Comment/Description"
                                            />
                                        </div>
                                        <div>
                                            <FileUploader2
                                                title="Upload file"
                                                removeFile={removeFile}
                                                setUploadQueue={setUploadQueue}
                                                uploadQueue={uploadQueue}
                                                accept="*"
                                            />
                                        </div>
                                        <div className="flex w-full flex-row gap-5 mt-10">
                                            <Button
                                                size="sm"
                                                variant="default"
                                                type="button"
                                                onClick={() => onSubmit()}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </ComponentCard>
                        </div>
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
                                                    <div className="mb-1 text-sm font-normal leading-none text-gray-800 dark:text-gray-200">
                                                        <span>{ucword(activity?.user?.fullName)}</span>
                                                    </div>

                                                    {activity.images && activity.images.length > 0 && (
                                                        <div className="relative grid auto-rows-auto grid-cols-3 bg-gray-200 dark:bg-gray-800 rounded-md p-2">
                                                            {activity.images.map((img, index) => {
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
                                                                        className="object-scale-down object-center cursor-pointer"
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                    <div className="text-black dark:text-white mt-2">
                                                        {ticket?.description}
                                                    </div>
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
                                                        {moment(ticket?.createdAt).format("LLL")}
                                                    </time>
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
