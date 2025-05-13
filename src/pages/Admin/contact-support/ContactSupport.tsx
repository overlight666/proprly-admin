/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { toast } from "react-toastify";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { authAtom, uploadResponseAtom } from "@/_recoil/states";
import { ImageType } from "@/lib/interface";
import { useUserActions } from "@/_recoil/actions";
import { Button } from "@/components/ui/button";
import { Label } from "flowbite-react";
import TextArea from "@/components/ui/text-area";
import FileUploader2 from "@/components/ui/fileupload2";
import Select2 from "@/components/ui/select2";

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
      await userAction.submitSupportTikets(params).then((res) => {
        if (res) {
          toast.success("Support ticket has been submitted!");
          setTimeout(() => {
            navigate("/support-tickets");
          }, 500);
        }

      });
    }
  };

  return (
    <NavbarSidebarLayout>
      <main className="flex flex-col w-full gap-[22px] pb-5 px-5">
        <section className="flex flex-col gap-6 pt-6 rounded-t-lg">
          <header className="flex items-center w-full">
            <h1 className="text-[24px] font-bold text-[#111928] dark:text-gray-100 leading-[24px]">
              Contact Support
            </h1>
          </header>
        </section>

        {/* Organization Card */}
        <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-10 py-10 gap-5 flex flex-col">
              <div>
                <Label>Select Issue</Label>
                <Select2
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
                <FileUploader2
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

                  type="submit"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/support-tickets")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </NavbarSidebarLayout>

  );
}
