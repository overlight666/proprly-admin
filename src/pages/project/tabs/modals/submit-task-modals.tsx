/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ImageType } from "@/lib/interface";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ItpSubmissionPreviewAtom, tokenAtom, uploadResponseAtom } from "@/_recoil/states";
import { useITPAction } from "@/_recoil/actions";
import { useParams } from "react-router";
import SubmissionComponent from "./submission-component";

export default function SubmitTaskModal({
    isOpen,
    closeModal,
    selectedTask,
    locationKey,
    tradeId,
    status,
    submissionType,
    closeParent,
    setReload
}: any) {
    // const [imageId, updateImageId] = useState("");
    const [fileContainer, setFileContainer] = useState<ImageType[]>([]);
    const [uploadQueue, setUploadQueue] = useState<any>([]);
    const [uploadQueue2, setUploadQueue2] = useState<any>([]);
    const [imageContainer, setImageContainer] = useState<ImageType[]>([]);
    const [comment, setComment] = useState("");
    const uploadResponse: any = useRecoilValue(uploadResponseAtom);
    const [whatType, setWhatType] = useState("");
    const setUploadResponse = useSetRecoilState(uploadResponseAtom);
    const itpAction = useITPAction();
    const sigCanvas = useRef<any>(null);
    const token = useRecoilValue<any>(tokenAtom);
    const params = useParams();
    const { project_id } = params;
    const taskSubmission = useRecoilValue(ItpSubmissionPreviewAtom)

    useEffect(() => {
        if (uploadResponse && whatType === "file") {
            if (fileContainer && fileContainer.length > 0) {
                setFileContainer((oldArray: any) => [...oldArray, uploadResponse]);
            } else {
                setFileContainer([uploadResponse]);
            }
            setUploadResponse(undefined);
        } else if (uploadResponse && whatType === "image") {
            if (imageContainer && imageContainer.length > 0) {
                setImageContainer((oldArray: any) => [...oldArray, uploadResponse]);
            } else {
                setImageContainer([uploadResponse]);
            }
            setUploadResponse(undefined);
        }
    }, [uploadResponse, whatType]);


    const dataURLtoFile = (dataurl: string, filename: string) => {
        var arr: any = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const removeFile = (file: File) => {
        const newFiles: any =
            fileContainer &&
            fileContainer.length > 0 &&
            fileContainer.filter((e) => e.name !== file.name);
        setFileContainer(newFiles);
    };

    const removeFile2 = (file: File) => {
        const newFiles: any =
            imageContainer &&
            imageContainer.length > 0 &&
            imageContainer.filter((e) => e.name !== file.name);
        setImageContainer(newFiles);
    };

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const onSubmit = () => {
        if (imageContainer?.length == 0 && submissionType != "statusChange") {
            toast.error("Please upload an image")
        } else if (fileContainer?.length == 0) {
            toast.error("Please upload at least 1 file")
        }
        // else if (!signature && submissionType != "statusChange") {
        //     toast.error("Please upload your signature")
        // } 
        else {

            if (submissionType === "resubmit") {
                itpAction.uploadSignature(dataURLtoFile(sigCanvas?.current?.toDataURL(), makeid(20)), token).then((res: any) => {
                    if (res) {
                        const params = {
                            "subStatusCode": status,
                            "comment": comment || "",
                            "documentIds": fileContainer.map((file) => file.id),
                            "imageIds": uploadQueue2.map((file) => file.id),
                            "signatureImageId": res?.id,
                        }
                        itpAction.taskResubmission(taskSubmission?.id, params).then((res) => {
                            if (res) {
                                toast.success("Task has been successfully submitted");
                                setTimeout(() => {
                                    setReload(makeid(10));
                                }, 1000);

                                closeModal();
                                closeParent();

                            }
                        })
                    } else {
                        toast.error("Failed to upload signature");
                    }

                })

            } else if (submissionType === "statusChange") {
                const params = {
                    "subStatusCode": status,
                    "comment": comment || "",
                    "documentIds": fileContainer.map((file) => file.id),
                    "imageIds": uploadQueue2.map((file) => file.id),
                }
                itpAction.taskResubmission(taskSubmission?.id, params).then((res) => {
                    if (res) {
                        toast.success("Task has been successfully submitted");
                        setTimeout(() => {
                            setReload(makeid(10));
                        }, 1000);

                        closeModal();
                        closeParent();

                    }
                })
            } else {
                itpAction.uploadSignature(dataURLtoFile(sigCanvas?.current?.toDataURL(), makeid(20)), token).then((res: any) => {
                    console.log("Signature Response", res);
                    if (res) {
                        const params = {
                            "comment": comment || "",
                            "documentIds": fileContainer.map((file) => file.id),
                            "itpTaskId": selectedTask?.id,
                            "projectId": project_id,
                            "imageIds": uploadQueue2.map((file) => file.id),
                            "tradeCodeId": tradeId,
                            "signatureImageId": res?.id,
                            "locationKey": locationKey
                        }
                        itpAction.taskSubmission(params).then((res) => {
                            if (res) {
                                toast.success("Task has been successfully submitted")
                                setTimeout(() => {
                                    setReload(makeid(10));
                                }, 1000);

                                closeModal();

                            }
                        })
                    } else {
                        toast.error("Failed to upload signature");
                    }
                })

            }

        }

    }


    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className="max-w-[700px] max-h-[500px] p-6 lg:p-10 mt-[5vh] overflow-auto"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            {submissionType === "statusChange" ? "Change Status" : "Submit Task"}
                        </h5>
                    </div>
                    <div className="mt-1 space-y-3">
                        <div className="space-y-2">
                            <SubmissionComponent
                                setWhatType={setWhatType}
                                removeFile={removeFile}
                                removeFile2={removeFile2}
                                setUploadQueue={setUploadQueue}
                                uploadQueue={uploadQueue}
                                setUploadQueue2={setUploadQueue2}
                                uploadQueue2={uploadQueue2}
                                // updateImageId={updateImageId}
                                comment={comment}
                                setComment={setComment}
                                sigCanvas={sigCanvas}
                                dataURLtoFile={dataURLtoFile}
                                submissionType={submissionType}
                            />
                        </div>

                        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start">
                            <Button
                                onClick={() => onSubmit()}
                                type="button"
                                variant="default"
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={closeModal}
                                type="button"
                                variant="outline"
                            >
                                Cancel
                            </Button>

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
