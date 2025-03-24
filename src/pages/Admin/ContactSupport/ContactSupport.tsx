import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import TextArea from "../../../components/form/input/TextArea";
import FileInput from "../../../components/form/input/FileInput";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router";

export default function ContactSupport() {
  const navigate = useNavigate();
  const options = [
    {
      label: "Login related issue",
      value: "Login related issue",
    },
    {
      label: "Defect related issue",
      value: "Defect related issue",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  return (
    <div>
      <PageMeta title="Proprly | Admin" description="" />
      <PageBreadcrumb pageTitle="Contact Support" />
      <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
        <>
          <div className="px-10 py-10">
            <div>
              <Label>Select Issue</Label>
              <Select
                options={options}
                placeholder="Select an issue"
                // onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
            <div>
              <Label>Description</Label>
              <TextArea
                //   value={message}
                //   onChange={(value) => setMessage(value)}
                rows={6}
              />
            </div>
            <div>
              <Label>Upload file</Label>
              <FileInput className="custom-class" />
            </div>
            <div className="flex w-full flex-row gap-5 mt-10">
              <Button size="sm" variant="primary" type="submit" form="orgform">
                Submit
              </Button>
              <Button variant="gray" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
