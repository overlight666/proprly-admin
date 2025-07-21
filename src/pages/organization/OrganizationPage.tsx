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

    const mockProject = {
        id: 1,
        name: "The Artisan",
        subtitle: "70 Ocean Drive, NSW",
        location: "Perth, AUSTRALIA",
        status: "Active",
        projectStatus: "11%",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop&crop=center",
        resolvedDefects: 0,
        minorDefects: 0,
        properties: 3,
        openDefects: 6
    };

    useEffect(() => {
        if (search.trim().length > 0) {
            const filtered = organizationsList?.filter((org: Organization) => JSON.stringify(org).toLowerCase().includes(search))
            setFilteredOrganizations(filtered)
        } else {
            setFilteredOrganizations(organizationsList)
        }
    }, [search, organizationsList])

    const handleProjectClick = (projectId: number) => {
        navigate(`/projects/${projectId}/configure`);
    };

    const handleAddNewProject = () => {
        navigate('/projects/new');
    };


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
                                    {/* Dummy Project Card */}
                                    <div className="mb-6">
                                        <div onClick={() => handleProjectClick(mockProject.id)} className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-sm cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
                                            {/* Header */}
                                            <div className="p-4 pb-3">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 text-lg mb-1">The Atrium</h3>
                                                        <p className="text-sm text-gray-600 mb-0.5">70 Church Street, NSW</p>
                                                        <p className="text-xs text-gray-500 mb-1">AEST; UTC+10:00</p>
                                                        <p className="text-xs text-gray-600 font-medium">Under Warranty</p>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-gray-600 p-1">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* Project Setup Progress */}
                                                <div className="mb-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm text-gray-600">Project Setup</span>
                                                        <span className="text-sm text-gray-600 font-medium">15%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Project Image */}
                                            <div className="px-4 pb-4">
                                                <div className="relative">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=240&fit=crop&crop=building"
                                                        alt="The Atrium"
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />
                                                </div>
                                            </div>

                                            {/* Status Badges */}
                                            <div className="px-4 pb-4">
                                                <div className="flex gap-2 flex-wrap">
                                                    <div className="bg-red-50 border border-red-200 rounded-full px-3 py-2 flex items-center">
                                                        <span className="text-xs font-medium text-red-700">Requested Defects: 0</span>
                                                    </div>
                                                    <div className="bg-green-50 border border-green-200 rounded-full px-3 py-2 flex items-center">
                                                        <span className="text-xs font-medium text-green-700">Resolved Defects: 0</span>
                                                    </div>
                                                    <div className="bg-blue-50 border border-blue-200 rounded-full px-3 py-2 flex items-center">
                                                        <span className="text-xs font-medium text-blue-700">Properties: 5</span>
                                                    </div>
                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-full px-3 py-2 flex items-center">
                                                        <span className="text-xs font-medium text-yellow-700">Open Defects: 8</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Existing Organizations Grid/Table */}
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