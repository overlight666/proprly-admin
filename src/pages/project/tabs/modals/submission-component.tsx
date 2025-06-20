/* eslint-disable @typescript-eslint/no-explicit-any */
import FileUploader from "@/components/ui/filteupload";
import FileUploader2 from "@/components/ui/fileupload2";
import { Label } from "flowbite-react";
import TextArea from "@/components/ui/text-area";
import SignatureCanvas from 'react-signature-canvas'


export default function SubmissionComponent({
    removeFile,
    setUploadQueue,
    uploadQueue,
    updateImageId,
    comment,
    setComment,
    sigCanvas,
    uploadForm,
    dataURLtoFile,
    submissionType
}: any) {

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (
        <>

            {submissionType !== "statusChange" && <div className="space-y-2">
                <FileUploader isDrop={true} currentImage={null} updateImageId={updateImageId} />
            </div>}
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
            {submissionType !== "statusChange" && <div className="space-y-2">
                <Label>Signature</Label>
                <SignatureCanvas penColor='green'
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas w-full border-dotted border-2' }} ref={sigCanvas} onEnd={() => {
                        uploadForm(dataURLtoFile(sigCanvas?.current?.toDataURL(), makeid(20)))
                    }} />
            </div>}


        </>
    );
}
