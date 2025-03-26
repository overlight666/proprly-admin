/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Label from "../../../components/form/Label";
import TextArea from "../../../components/form/input/TextArea";

import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router";
import FileUploader from "../../../_components/ImageUploader";
import { ImageType } from "../../../_types";
import { uploadResponseAtom } from "../../../_state/atoms/dropzone";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Select from "../../../components/form/Select";
import { authAtom } from "../../../_state";
import { useUserActions } from "../../../_actions";
import { toast } from "react-toastify";

export default function ContactSupport() {
  const currentUser = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const [fileContainer, setFileContainer] = useState<ImageType[]>([]);
  const [uploadQueue, setUploadQueue] = useState<any>([]);
  const uploadResponse: any = useRecoilValue(uploadResponseAtom);
  const setUploadResponse = useSetRecoilState(uploadResponseAtom);
  const [description, setDescription] = useState<any>("");
  const [descriptionError, setDescriptionError] = useState<any>("");
  const validationSchema = Yup.object().shape({
    issueId: Yup.string().required("Issue type is required"),
  });
  const userAction = useUserActions();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (uploadResponse) {
      if (fileContainer && fileContainer.length > 0) {
        setFileContainer((oldArray: any) => [...oldArray, uploadResponse]);
      } else {
        setFileContainer([uploadResponse]);
      }
      setUploadResponse(undefined);
    }
  }, [uploadResponse]);

  const removeFile = (file: File) => {
    const newFiles: any =
      fileContainer &&
      fileContainer.length > 0 &&
      fileContainer.filter((e) => e.name !== file.name);
    setFileContainer(newFiles);
  };

  const options = [
    {
      label: "Login related issue",
      value: "1",
    },
    {
      label: "Defect related issue",
      value: "2",
    },
    {
      label: "Others",
      value: "3",
    },
  ];

  const onSubmit = async (props: any) => {
    setDescriptionError("");
    const { issueId } = props;
    localStorage.getItem("");
    if (description.length == 0) {
      setDescriptionError("Description is required");
    } else {
      const params = {
        issueId,
        description,
        userId: JSON.parse(currentUser)?.user?.id,
        attachment: fileContainer.map((files) => files.id),
      };
      await userAction.submitSupportTikets(params).then(() => {
        toast.success("Support ticket has been submitted!");
        setTimeout(() => {
          navigate(-1);
        }, 500);
      });
    }
  };

  return (
    <div>
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb pageTitle="Contact Support" />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-10 py-10">
            <div>
              <Label>Select Issue</Label>
              <Select
                options={options}
                placeholder="Select an issue"
                register={{ ...register("issueId") }}
                error={errors.issueId}
                hint={errors.issueId?.message}
                className="dark:bg-dark-900"
              />
            </div>
            <div>
              <Label>Description</Label>
              <TextArea
                onChange={(value) => setDescription(value)}
                value={description}
                hint={descriptionError}
                error={descriptionError?.length > 0}
                rows={6}
              />
            </div>
            <div>
              <FileUploader
                title="Upload file"
                removeFile={removeFile}
                setUploadQueue={setUploadQueue}
                uploadQueue={uploadQueue}
                accept="*"
              />
            </div>
            <div className="flex w-full flex-row gap-5 mt-10">
              <Button
                disabled={isSubmitting}
                size="sm"
                variant="primary"
                type="submit"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}{" "}
                Submit
              </Button>
              <Button variant="gray" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
