/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { tokenAtom, uploadResponseAtom } from "@/_recoil/states";
import { useRecoilValue, useSetRecoilState } from "recoil";


export const useUploadForm = () => {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const token = useRecoilValue<any>(tokenAtom);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState<any>(0);
  const [uploadedFile, setUploadedFile] = useState<any>(undefined);
  const [fileName, setFileName] = useState("");
  const setUploadResponse = useSetRecoilState(uploadResponseAtom);

  const uploadForm = async (file: any) => {
    setUploadResponse(undefined);
    const formData = new FormData();
    formData.append("files", file);
    setFileName(file.name);
    await axios({
      method: "post",
      url: `${baseUrl}/upload`,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent: any) => {
        const progressValue =
          50 + (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progressValue);
      },
      onDownloadProgress: (progressEvent: any) => {
        const progressValue =
          50 + (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progressValue);
      },
    })
      .then((response: any) => {
        if (response.message) {
          setProgress(response.message);
        } else {
          setUploadResponse(response.data[0]);
        }
        setUploadedFile(response.data[0]);
        return { ...response.data[0] };
      })
      .catch((error: any) => {
        setProgress(error.message);
        return error;
      });
    setIsSuccess(true);
  };

  return { uploadForm, isSuccess, fileName, progress, uploadedFile };
};
