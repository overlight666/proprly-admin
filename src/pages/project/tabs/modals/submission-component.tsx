/* eslint-disable @typescript-eslint/no-explicit-any */
// import FileUploader from "@/components/ui/filteupload";
import FileUploader2 from "@/components/ui/fileupload2";
import { Label } from "flowbite-react";
import TextArea from "@/components/ui/text-area";
import SignatureCanvas from 'react-signature-canvas'
import FileUploader3 from "@/components/ui/fileupload3";


export default function SubmissionComponent({
    removeFile,
    removeFile2,
    setUploadQueue,
    uploadQueue,
    setUploadQueue2,
    uploadQueue2,
    comment,
    setComment,
    sigCanvas,
    submissionType,
    setWhatType
}: any) {


    return (
        <>

            <div className="space-y-2">
                <FileUploader3 isDrop={true} removeFile={removeFile2}
                    setUploadQueue={setUploadQueue2}
                    uploadQueue={uploadQueue2} accept="image/*" limit={6} />
                {/* <FileUploader2
                    title="Upload images"
                    removeFile={removeFile2}
                    setUploadQueue={setUploadQueue2}
                    uploadQueue={uploadQueue2}
                    setWhatType={setWhatType}
                    fileType="image"
                    accept="image/*"
                    limit={6}
                /> */}
            </div>
            <div className="space-y-2">
                <FileUploader2
                    title="Upload file"
                    removeFile={removeFile}
                    setUploadQueue={setUploadQueue}
                    uploadQueue={uploadQueue}
                    setWhatType={setWhatType}
                    fileType="file"
                    accept="*"
                    limit={3}
                />
            </div>
            <div className="space-y-2">
                <Label>Add Comment<span className="text-red-500">*</span></Label>
                <TextArea
                    value={comment}
                    rows={2}
                    onChange={(e) => setComment(e)}
                    placeholder="Comment"
                />
            </div>
            {submissionType !== "statusChange" && <div className="space-y-2">
                <Label>Signature<span className="text-red-500">*</span></Label>
                <SignatureCanvas penColor='black'
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas w-full border-dotted border-2' }} ref={sigCanvas} onEnd={() => {
                        setWhatType("signature");
                        // uploadForm(dataURLtoFile(sigCanvas?.current?.toDataURL(), makeid(20)))
                    }} />
            </div>}


        </>
    );
}
