/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "./instance";
import { useDispatch } from "react-redux";
import { updateWarrantyResponse } from "../store/features/imageSlice";

export const useUploadForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState({
    name: "",
    progress: 0,
  });
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const uploadForm = async (file: any, group: any) => {
    const formData = new FormData();
    formData.append("files", file);
    setFileName(file.name);
    await api({
      method: "post",
      url: "/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent: any) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        const params = {
          name: file.name,
          progress,
          group,
        };
        setProgress(params);
      },
      onDownloadProgress: (progressEvent: any) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
        const params = {
          name: file.name,
          progress,
          group,
        };
        setProgress(params);
      },
    })
      .then((response) => {
        dispatch(updateWarrantyResponse({ ...response.data[0], group }));
      })
      .catch((error) => {
        // log request error if any
        return error;
      });
    setIsSuccess(true);
  };

  return { uploadForm, isSuccess, progress, fileName };
};
