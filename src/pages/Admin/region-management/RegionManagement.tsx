/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import RegionHeader from "./header/RegionHeader";
import RegionTable from "./table/RegionTable";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function RegionManagement() {
  const tableRef = useRef<any>(null);

  const onSearch = (value: any) => {
    tableRef?.current?.dt().search(value).draw();
  };

  return (
    <NavbarSidebarLayout>
      <main className="flex flex-col w-full gap-[22px] pb-5 px-5">
        <section className="flex flex-col gap-6 pt-6 rounded-t-lg">
          <header className="flex items-center w-full">
            <h1 className="text-[24px] font-bold text-[#111928] dark:text-gray-100 leading-[24px]">
              Region Management
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

        {/* Organization Card */}
        <>
          <RegionHeader onSearch={onSearch} />

          <div className="px-5 py-2">
            <RegionTable tableRef={tableRef} />
          </div>
        </>
      </main>
    </NavbarSidebarLayout>

  );
}
