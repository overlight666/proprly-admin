/* eslint-disable @typescript-eslint/no-explicit-any */
import { propertyReportsAtom } from "@/_recoil/states";
import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import { SearchIcon } from "lucide-react";
import { useRecoilValue } from "recoil";

export default function PropertyReportsHeader({
  onSearch,
  setSelectedValue,
  selectedValue,
}: any) {
  const propertReports = useRecoilValue(propertyReportsAtom);
  return (
    <>
      <div className="flex flex-col px-5 w-full gap-5">
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
        <div className="flex flex-wrap items-center gap-3 mb-3 flex-row w-full">
          <span className="text-black dark:text-white mr-5">
            Inspection Type:
          </span>
          {
            propertReports?.length > 0 && propertReports.map((rport, index) => <Radio
              id={rport?.key}
              key={index}
              name="propertyReport"
              value={rport?.key}
              checked={selectedValue === rport?.key}
              onChange={(e) => setSelectedValue(e)}
              label={rport?.shortLabel}
            />)

          }
        </div>
      </div>
    </>
  );
}
