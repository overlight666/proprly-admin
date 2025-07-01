import { tokenAtom } from '@/_recoil/states';
import { useRecoilValue } from 'recoil';
import { Card, FileInput, Label } from "flowbite-react";
import axios from "axios";
import { expandPhoto } from '@/helpers';

interface UploadTypes {
    isDrop?: any;
    uploadQueue?: any;
    setUploadQueue?: any;
    removeFile?: any;
    accept?: string;
    limit?: number;
}

function FileUploader3({ uploadQueue, setUploadQueue, removeFile, accept, limit = 0 }: UploadTypes) {

    // const [file, setFile] = useState<any>(null);
    const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
    const auth = useRecoilValue<any>(tokenAtom);

    const handleFileChange = (event: any) => {
        // setFile(event.target.files[0]);
        handleUpload(event.target.files[0]);

    };

    const handleUpload = async (file: any) => {
        const formData = new FormData();
        formData.append('files', file, `${Date.now()}-${file.name}`);

        try {
            const response = await axios({
                method: "post",
                url: `${baseUrl}/upload`,
                data: formData,
                headers: { Authorization: `Bearer ${auth}` },
            });

            if (response.status == 200) {
                if (file) {
                    setUploadQueue((oldArray: any) => [...oldArray, response?.data[0]]);
                }
                // Handle successful upload
                console.log("File uploaded successfully");
            } else {
                // Handle error
                console.error("Upload failed");
            }
        } catch (error) {
            // Handle network errors
            console.error("Network error:", error);
        }
    };

    const removeThis = (name: string, file: any) => {
        const fileHandler: File =
            uploadQueue &&
            uploadQueue.length > 0 &&
            uploadQueue.find((q: any) => q.name == name && q?.id == file?.id);
        const newQue =
            uploadQueue &&
            uploadQueue.length > 0 &&
            uploadQueue.filter((q: any) => q?.name !== file?.name);
        setUploadQueue(newQue);
        removeFile(fileHandler);
    };
    console.log(uploadQueue)

    return (
        <div className='h-full'>
            <Card className="flex flex-col h-full items-center justify-around gap-2.5 bg-gray-50 rounded-lg border-2 border-dashed">
                <div className="flex w-full items-center justify-center">
                    <Label
                        htmlFor="dropzone-file"
                        className="flex w-full"
                    >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} accept={accept} disabled={limit > 0 && uploadQueue.length >= limit} />
                    </Label>
                </div>
            </Card>
            {
                <div className='flex w-full overflow-auto'>
                    {
                        uploadQueue && uploadQueue.length > 0 ? uploadQueue.map((file: any, index: number) => (
                            <div key={index} className='flex items-center gap-2 p-2 flex-col justify-center cursor-pointer' onClick={() => expandPhoto(file.url)}>
                                <img src={file.url} alt={file.name} className='w-16 h-16 object-cover' />
                                <div className='flex flex-col'>
                                    {/* <span className='text-sm font-semibold'>{file.name}</span> */}
                                    <span className='text-xs text-gray-500'>{(file.size / 1024).toFixed(2)} KB</span>
                                </div>
                                <button onClick={() => removeThis(file.name, file)} className='text-red-500 hover:text-red-700 text-sm'>Remove</button>
                            </div>
                        )) : null}
                </div>
            }
        </div>
    );
}

export default FileUploader3;