/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import FileUploader from "@/components/ui/filteupload";
import FileUploader2 from "@/components/ui/fileupload2";
import { ImageType } from "@/lib/interface";
import { Label } from "flowbite-react";
import TextArea from "@/components/ui/text-area";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { uploadResponseAtom } from "@/_recoil/states";
import { useITPAction } from "@/_recoil/actions";
import SignatureCanvas from 'react-signature-canvas'
import { useUploadForm } from "@/helpers/uploadLoader";
import { useParams } from "react-router";

export default function SubmitTaskModal({
    isOpen,
    closeModal,
    selectedTask,
    locationKey,
    tradeId
}: any) {
    const [imageId, updateImageId] = useState("");
    const [fileContainer, setFileContainer] = useState<ImageType[]>([]);
    const [uploadQueue, setUploadQueue] = useState<any>([]);
    const [comment, setComment] = useState("");
    const uploadResponse: any = useRecoilValue(uploadResponseAtom);
    const setUploadResponse = useSetRecoilState(uploadResponseAtom);
    const itpAction = useITPAction();
    const sigCanvas = useRef<any>(null);
    const { uploadForm, uploadedFile } = useUploadForm();
    const [signature, setSignature] = useState<any>();
    const params = useParams();
    const { project_id } = params;

    useEffect(() => {
        if (uploadedFile) {
            setSignature(uploadedFile);
        }
    }, [uploadedFile])

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

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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

    const onSubmit = () => {
        if (!imageId) {
            toast.error("Please upload an image")
        } else if (fileContainer?.length == 0) {
            toast.error("Please upload at least 1 file")
        } else if (!signature) {
            toast.error("Please upload your signature")
        } else {
            const params = {
                "comment": comment || "",
                "documentIds": fileContainer.map((file) => file.id),
                "itpTaskId": selectedTask?.id,
                "projectId": project_id,
                "imageId": imageId,
                "tradeCodeId": tradeId,
                "signatureImageId": signature?.id,
                "locationKey": locationKey
            }
            itpAction.taskSubmission(params).then((res) => {
                if (res) {
                    toast.success("Task has been successfully submitted")
                    closeModal();
                }
            })
        }

    }


    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className="max-w-[700px] max-h-[600px] p-6 lg:p-10 overflow-auto"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            Submit Task
                        </h5>
                    </div>
                    <div className="mt-1 space-y-3">
                        <div className="space-y-2">
                            <FileUploader isDrop={true} currentImage={null} updateImageId={updateImageId} />
                        </div>
                        <div className="space-y-2">
                            <FileUploader2
                                title="Upload file"
                                removeFile={removeFile}
                                setUploadQueue={setUploadQueue}
                                uploadQueue={uploadQueue}
                                accept="*"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Add Comment</Label>
                            <TextArea
                                value={comment}
                                rows={2}
                                onChange={(e) => setComment(e)}
                                placeholder="Comment"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Signature</Label>
                            <SignatureCanvas penColor='green'
                                canvasProps={{ width: 500, height: 200, className: 'sigCanvas w-full border-dotted border-2' }} ref={sigCanvas} onEnd={() => {
                                    uploadForm(dataURLtoFile(sigCanvas?.current?.toDataURL(), makeid(20)))
                                }} />
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
