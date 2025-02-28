/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "../../../components/form/input/InputField";
import { FileIcon, PlusIcon, SearchIcon } from "../../../icons";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export default function PropertyHeader({
  onSearch,
  canUpload,
  setShowBulk,
}: any) {
  const { id, project_id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between flex-row items-center px-5 py-5">
        <div
          className="flex space-x-2 w-full
      "
        >
          <div className="relative w-[40%]">
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
          <Button
            onClick={() => setShowBulk(true)}
            disabled={!canUpload}
            className="w-[25%]"
            size="sm"
            variant="white"
            startIcon={<FileIcon />}
          >
            Bulk Import Warranties
          </Button>
        </div>
        <Button
          className="w-[25%]"
          onClick={() =>
            navigate(`/organization/${id}/project/${project_id}/property/new`)
          }
          size="sm"
          variant="primary"
          startIcon={<PlusIcon />}
        >
          Add New Property
        </Button>
      </div>
    </>
  );
}
