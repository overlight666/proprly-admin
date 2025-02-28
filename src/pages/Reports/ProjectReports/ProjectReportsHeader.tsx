/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "../../../components/form/input/InputField";
import { SearchIcon } from "../../../icons";
import Button from "../../../components/ui/button/Button";
import { useReports } from "../../../_actions";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function ProjectReportsHeader({ onSearch }: any) {
  const reportAction = useReports();
  const { project_id } = useParams();
  return (
    <>
      <div className="flex flex-row items-center px-5 w-full justify-between">
        <div
          className="flex space-x-2 w-[40%]
      "
        >
          <div className="relative w-full">
            <Input
              placeholder="Search"
              type="text"
              className="pl-[62px] "
              onChange={(e) => onSearch(e.target.value)}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <SearchIcon className="size-6" />
            </span>
          </div>
        </div>
        <Button
          onClick={() => {
            reportAction.generateLatestProjectReport(project_id).then(() => {
              toast.success("New report generated!");
            });
          }}
          type="button"
          variant="white"
        >
          Generate Latest Report
        </Button>
      </div>
    </>
  );
}
