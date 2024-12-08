/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

export const useUploadForm = (url: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (formData: FormData) => {
    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: any) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent: any) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
        console.log(progress);
        setProgress(progress);
      },
    });
    setIsSuccess(true);
  };

  return { uploadForm, isSuccess, progress };
};
