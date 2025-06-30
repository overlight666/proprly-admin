import { tokenAtom } from '@/_recoil/states';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, FileInput, Label, Progress } from "flowbite-react";
import axios from "axios";

interface UploadTypes {
    updateImageId?: any;
    currentImage?: any;
    isDrop?: any;
    setIsSignature?: any;
}

function FileUploader({ isDrop, currentImage, updateImageId, setIsSignature }: UploadTypes) {

    // const [file, setFile] = useState<any>(null);
    const [loader, setLoader] = useState(0);
    const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
    const auth = useRecoilValue<any>(tokenAtom);
    const [image, setImage] = useState<any>();

    useEffect(() => {
        if (currentImage) {
            setImage(currentImage)
        }
    }, [currentImage])
    const handleFileChange = (event: any) => {
        // setFile(event.target.files[0]);
        handleUpload(event.target.files[0]);
    };

    const handleUpload = async (file: any) => {
        setIsSignature(false);
        const formData = new FormData();
        formData.append('files', file);

        try {
            const response = await axios({
                method: "post",
                url: `${baseUrl}/upload`,
                data: formData,
                headers: { Authorization: `Bearer ${auth}` },
                onUploadProgress: (progressEvent: any) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setLoader(percentage);
                },
            });

            if (response.status == 200) {
                setImage(response?.data[0])
                updateImageId(response?.data[0]?.id)
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

    return (
        <div className='h-full'>
            {/* <input type="file" onChange={handleFileChange} className='hidden' /> */}
            {/* <button onClick={handleUpload} disabled={!file}>
                Upload
            </button> */}
            {isDrop ? <Card className="flex flex-col h-full items-center justify-around gap-2.5 bg-gray-50 rounded-lg border-2 border-dashed">
                <div className="flex w-full items-center justify-center">
                    <Label
                        htmlFor="dropzone-file"
                        className="flex w-full"
                    >
                        {!image ? <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                        </div> :
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <img
                                    src={image.url || image}
                                    className='w-full object-cover'
                                />
                            </div>}
                        <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} accept='image/*' />
                    </Label>
                </div>
            </Card> : <>
                {loader > 0 && (

                    <Progress progress={loader} labelProgress color='green' size={"lg"} style={{
                        width: "100%"
                    }} />
                )}
            </>}

        </div>
    );
}

export default FileUploader;