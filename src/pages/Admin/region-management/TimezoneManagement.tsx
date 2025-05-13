/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import TimezoneTable from "./table/TimezoneTable";
import TimezoneHeader from "./header/TimezoneHeader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { selectedRegionAtom } from "@/_recoil/states";
import { useUserActions } from "@/_recoil/actions";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Label } from "flowbite-react";

export default function TimezoneManagement() {
  const tableRef = useRef<any>(null);
  const selectedRegion = useRecoilValue(selectedRegionAtom);
  const userAction = useUserActions();
  const setSelectedRegion = useSetRecoilState(selectedRegionAtom);
  const onSearch = (value: any) => {
    tableRef?.current?.dt().search(value).draw();
  };
  const { regionId } = useParams();

  useEffect(() => {
    if (regionId) {
      setSelectedRegion(undefined);
      userAction.getRegionById(regionId);
    }
  }, [regionId]);

  return (
    <NavbarSidebarLayout>
      <main className="flex flex-col w-full gap-[22px] pb-5 px-5">
        <section className="flex flex-col gap-6 pt-6 rounded-t-lg">
          <header className="flex items-center w-full">
            <h1 className="text-[24px] font-bold text-[#111928] dark:text-gray-100 leading-[24px]">
              Timezone Management
            </h1>
          </header>

          <div className="flex items-center justify-between pb-5 border-b w-full">
            <div className="flex items-start gap-4">
              {/* SearchIcon bar with button */}
              <div className="flex h-[35px] w-[30vw] items-center">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="h-[35px] py-3 px-4 rounded-l-lg rounded-r-none border-r-0 bg-gray-50 text-gray-500 text-sm focus:!ring-0"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"

                >
                  <SearchIcon />
                </Button>
              </div>
            </div>


          </div>
        </section>

        <>
          <TimezoneHeader onSearch={onSearch} />
          <div className="grid grid-cols-1 md:grid-cols-2 px-5 py-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="input">Region Name</Label>
              <Input
                type="text"
                placeholder="Enter Region Name"
                value={selectedRegion?.regionName}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Region Code</Label>
              <Input
                type="text"
                placeholder="Enter Region Code"
                value={selectedRegion?.regionCode}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Currency</Label>
              <Input
                type="text"
                placeholder="Enter Currency"
                value={selectedRegion?.currency}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Date Format</Label>
              <Input
                type="text"
                placeholder="Enter Date Format"
                value={selectedRegion?.dateFormat}
                readOnly
              />
            </div>
          </div>
          <div className="px-5 py-2">
            <span className="text-gray-200 dark:text-gray-400">
              Timezones:{" "}
            </span>
            <TimezoneTable
              tableRef={tableRef}
              timezone={selectedRegion?.timezone}
            />
          </div>
        </>
      </main>
    </NavbarSidebarLayout>
  );
}
