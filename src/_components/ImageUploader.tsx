/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useState } from "react";
import Label from "../components/form/Label";
import FileInput from "../components/form/input/FileInput";
import ImageProgress from "./ImageProgess";
import React from "react";
interface UploadTypes {
  title: string;
  removeFile?: any;
  uploadQueue?: any;
  setUploadQueue?: any;
  getUploadedFile?: any;
  group?: string;
  accept?: string;
}
export default function FileUploader({
  title,
  removeFile,
  uploadQueue,
  setUploadQueue,
  getUploadedFile,
  group,
  accept = "application/pdf",
}: UploadTypes) {
  const [value, setValue] = useState<any>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadQueue((oldArray: any) => [...oldArray, file]);
      setValue("");
    }
  };

  const removeThis = (name: string) => {
    const fileHandler: File =
      uploadQueue &&
      uploadQueue.length > 0 &&
      uploadQueue.find((q: File) => q.name === name);
    const newQue =
      uploadQueue &&
      uploadQueue.length > 0 &&
      uploadQueue.filter((q: File) => q.name !== name);
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
      />
      <div className="max-h-[250px] overflow-auto">
        {uploadQueue &&
          uploadQueue.length > 0 &&
          uploadQueue.map((q: File, index: Key | null | undefined) => {
            return (
              <ImageProgress
                file={q}
                key={index}
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
