/* eslint-disable @typescript-eslint/no-explicit-any */
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { useRef } from "react";
import SupportTicketsTable from "./tables/SupportTicketsTable";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function SupportTickets() {
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
                            Support Tickets
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
                                    className="h-full w-[46px] rounded-l-none rounded-r-lg bg-[#1a56db]"
                                >
                                    <SearchIcon className="w-4 h-4 text-white" />
                                </Button>
                            </div>
                        </div>


                    </div>
                </section>

                {/* Organization Card */}
                <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
                    <>
                        {/* <SupportTicketsHeader onSearch={onSearch} /> */}
                        <div className="px-5 py-2">
                            <SupportTicketsTable tableRef={tableRef} />
                        </div>
                    </>
                </div>
            </main>
        </NavbarSidebarLayout>

    );
}
