
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
import { useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
            <main className="flex flex-col w-full h-full bg-gray-50 dark:bg-gray-900">
                {/* Header Section */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4">
                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span>Projects</span>
                            <span className="mx-2">/</span>
                        </div>
                        
                        {/* Page Title */}
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Projects</h1>
                        
                        {/* Tabs */}
                        <Tabs defaultValue="projects" className="w-full">
                            <TabsList className="bg-transparent border-b border-gray-200 dark:border-gray-700 h-auto p-0 rounded-none">
                                <TabsTrigger 
                                    value="projects" 
                                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-6 py-3"
                                >
                                    Projects
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="invitations" 
                                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-6 py-3"
                                >
                                    Invitations
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="users" 
                                    className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-6 py-3"
                                >
                                    Users
                                </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="projects" className="mt-6">
                                {/* Controls Bar */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        {/* Search Bar */}
                                        <div className="flex h-10 w-80">
                                            <div className="relative flex-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="h-10 py-2 px-4 rounded-l-lg rounded-r-none border-r-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:!ring-0 border-gray-300 dark:border-gray-600"
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="h-10 w-12 rounded-l-none rounded-r-lg bg-blue-600 hover:bg-blue-700"
                                            >
                                                <SearchIcon className="w-4 h-4 text-white" />
                                            </Button>
                                        </div>

                                        {/* View Toggle Buttons */}
                                        <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                                            <Button 
                                                variant="ghost" 
                                                className={`h-10 w-10 rounded-none border-0 ${isGrid ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`} 
                                                onClick={() => setIsGrid(true)}
                                            >
                                                <GridIcon className="w-4 h-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                className={`h-10 w-10 rounded-none border-0 border-l border-gray-300 dark:border-gray-600 ${!isGrid ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`} 
                                                onClick={() => setIsGrid(false)}
                                            >
                                                <OrderedListIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Add Project Button */}
                                    <Button 
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2" 
                                        onClick={() => navigate("/organization/new", { replace: true })}
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add New Project
                                    </Button>
                                </div>

                                {/* Content Area */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                                    {isGrid ? (
                                        <OrgGrid filteredOrganizations={filteredOrganizations} />
                                    ) : (
                                        <OrgTable filteredOrganizations={filteredOrganizations} />
                                    )}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="invitations" className="mt-6">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                                    <p className="text-gray-500 dark:text-gray-400">Invitations content coming soon...</p>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="users" className="mt-6">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                                    <p className="text-gray-500 dark:text-gray-400">Users content coming soon...</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto py-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2024 Proprly. All rights reserved.
                    </p>
                </div>
            </main>
        </NavbarSidebarLayout>
    );
};
