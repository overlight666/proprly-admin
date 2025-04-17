/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { PDFIcon, TrashBinIcon } from "../icons";
import { useUploadForm } from "../_helpers/uploadLoader";
import { truncateString } from "../_helpers";
import React from "react";
interface UploadTypes {
  file: File;
  removeThis: any;
  getUploadedFile?: any;
  group?: string;
}
export default function ImageProgress({
  file,
  removeThis,
  getUploadedFile,
  group,
}: UploadTypes) {
  const { uploadForm, progress, uploadedFile } = useUploadForm();

  useEffect(() => {
    uploadForm(file);
  }, []);

  useEffect(() => {
    if (uploadedFile) {
      try {
        if (typeof getUploadedFile !== "undefined") {
          getUploadedFile({ group: group, file: uploadedFile });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [uploadedFile]);

  const getFileSizeFromUrl = (size: any) => {
    return size
      ? `${(size / 1000000).toPrecision(3)}mb`
      : `${Math.floor(Math.random() * 100)}mb`;
  };

  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-3 items-center">
        <PDFIcon />
        <div className="flex flex-col">
          <span className="text-black dark:text-gray-400 text-sm">
            {truncateString(file.name, 40)}
          </span>
          <span className="text-black dark:text-gray-400 text-xs">
            {getFileSizeFromUrl(file.size)}{" "}
            <span
              className={`${progress < 50
                ? "text-red-400"
                : progress < 90 && progress > 50
                  ? "text-green-400"
                  : progress == 100
                    ? "text-blue-500"
                    : "text-red-500"
                } text-sm ml-5`}
            >
              {progress && typeof progress != "string"
                ? `${progress.toFixed(2)}%`
                : progress}
            </span>
          </span>
        </div>
      </div>
      <TrashBinIcon
        onClick={() => removeThis(file.name, file)}
        className="size-5 text-red-700 cursor-pointer"
        data-tooltip-id="tooltip"
        data-tooltip-content="Delete"
      />
    </div>
  );
}
