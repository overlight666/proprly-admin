/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileInput, Label } from "flowbite-react";
import { Key, useState } from "react";
import React from "react";
import ImageProgress from "./image-process";
interface UploadTypes {
    title: string;
    removeFile?: any;
    uploadQueue?: any;
    setUploadQueue?: any;
    getUploadedFile?: any;
    group?: string;
    accept?: string;
    setWhatType?: any;
    fileType?: string;
    limit?: number;
}
export default function FileUploader2({
    title,
    removeFile,
    uploadQueue,
    setUploadQueue,
    getUploadedFile,
    group,
    accept = "application/pdf",
    setWhatType,
    fileType = "file",
    limit = 0
}: UploadTypes) {
    const [value, setValue] = useState<any>();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWhatType(fileType)
        const file = event.target.files?.[0];
        if (file) {
            setUploadQueue((oldArray: any) => [...oldArray, file]);
            setValue("");
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

    return (
        <div>
            <Label>{title}</Label>
            <FileInput
                value={value}
                onChange={handleFileChange}
                className="custom-class"
                accept={accept}
                disabled={limit > 0 && (uploadQueue && uploadQueue.length >= limit)}
            />
            <div className="max-h-[250px] overflow-auto">
                {uploadQueue &&
                    uploadQueue.length > 0 &&
                    uploadQueue.map((q: File, index: Key | null | undefined) => {
                        return (
                            <ImageProgress
                                file={q}
                                key={title + "-" + index}
                                removeThis={removeThis}
                                getUploadedFile={getUploadedFile}
                                group={group}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
