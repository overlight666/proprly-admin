/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { Button } from "@/components/ui/button";
import { FileExport, FilterIcon, GridIcon, OrderedListIcon, SearchIcon } from "@/icons";
import { Plus } from "lucide-react";
import { useRecoilValue } from "recoil";
import { organizationsAtom } from "@/_recoil/states";
import { Organization } from "@/lib/interface";
import Input from "@/components/ui/input";
import OrgGrid from "./components/orgGrid";
import OrgTable from "./tables/orgTable";
import { replace, useNavigate } from "react-router";

export const OrganizationPage: FC = function () {
    const organizationsList = useRecoilValue(organizationsAtom);
    const [search, setSearch] = useState("");
    const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
    const [isGrid, setIsGrid] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (search.trim().length > 0) {
            const filtered = organizationsList?.filter((org: Organization) => JSON.stringify(org).toLowerCase().includes(search))
            setFilteredOrganizations(filtered)
        } else {
            setFilteredOrganizations(organizationsList)
        }
    }, [search, organizationsList])

    return (
        <NavbarSidebarLayout>
            <main className="flex flex-col w-full gap-[22px] pb-5 px-5">
                <section className="flex flex-col gap-6 pt-6 rounded-t-lg">
                    <header className="flex items-center w-full">
                        <h1 className="text-[24px] font-bold text-[#111928] dark:text-gray-100 leading-[24px]">
                            Organizations
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
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="h-full w-[46px] rounded-l-none rounded-r-lg bg-[#1a56db]"
                                >
                                    <SearchIcon className="w-4 h-4 text-white" />
                                </Button>
                            </div>

                            {/* Filter button */}
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 py-2 px-3"
                            >
                                <FilterIcon className="text-blue-800 size-6 dark:text-white/90" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Filter
                                </span>
                            </Button>

                            {/* Export CSV button */}
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 py-2 px-3"
                            >
                                <FileExport className="text-blue-800 size-6 dark:text-white/90" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Export CSV
                                </span>
                            </Button>

                            {/* Grid view toggle */}
                            <Button variant="outline" className={`p-3 ${isGrid && 'bg-blue-700'}`} onClick={() => setIsGrid(true)}>
                                <GridIcon className={`${isGrid ? 'text-blue-100' : 'text-blue-800'} size-6 dark:text-white/90`} />
                            </Button>

                            {/* List view toggle */}
                            <Button variant="outline" className={`p-3 ${!isGrid && 'bg-blue-700'}`} onClick={() => setIsGrid(false)}>
                                <OrderedListIcon className={`${!isGrid ? 'text-blue-100' : 'text-blue-800'} size-5 dark:text-white/90`} />
                            </Button>
                        </div>

                        {/* Add Organization button */}
                        <Button className="flex items-center gap-2 py-2 px-3 bg-[#1a56db]" onClick={() => navigate("/organization/new", { replace: true })}>
                            <Plus className="text-white size-6 dark:text-white/90" />
                            <span className="text-sm font-medium text-white">
                                Add Organization
                            </span>
                        </Button>
                    </div>

                </section>

                {/* Organization Card */}
                {
                    isGrid ? <OrgGrid filteredOrganizations={filteredOrganizations} /> : <OrgTable filteredOrganizations={filteredOrganizations} />
                }

            </main>
        </NavbarSidebarLayout>
    );
};

