/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BoxIcon, DocsIcon, ErrorIcon, PencilIcon, TaskIcon } from "@/icons";
import { Organization } from "@/lib/interface";
import { useNavigate } from "react-router";

// Define the table data using the interface

export default function OrgGrid({ filteredOrganizations }: any) {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
            {
                filteredOrganizations?.map((organization: Organization, index: any) => {
                    return (
                        <Card key={`${organization.name}-${index}`} className="w-full p-4 bg-white shadow-md">
                            <CardHeader className="p-0">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                        {organization.name}
                                    </CardTitle>
                                    <PencilIcon className="dark:text-white text-gray-800 size-6 cursor-pointer" onClick={() => {
                                        navigate(`/organization/edit/${organization?.id}`)
                                    }} />
                                </div>
                            </CardHeader>

                            <CardContent className="p-0 mt-3 cursor-pointer" onClick={() => navigate(`/organization/view/${organization?.id}`)}>
                                <div className="w-full bg-white rounded-lg overflow-hidden">
                                    <img
                                        className="object-cover max-h-[200px] min-h-[200px] w-full"
                                        alt={organization?.name}
                                        src={organization?.image?.url}
                                    />
                                </div>

                                <div className="flex flex-col gap-3 mt-3">
                                    <div className="flex flex-col gap-[3px]">
                                        <div className="flex items-center gap-2.5">
                                            <p className="text-sm">
                                                <span className="font-medium text-[#111928] dark:text-gray-100">Country:</span>
                                                <span className="text-gray-500 dark:text-gray-200"> {organization?.region?.regionName}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <p className="text-sm">
                                                <span className="font-medium text-[#111928] dark:text-gray-100">Time Zone:</span>
                                                <span className="text-gray-500 dark:text-gray-200">
                                                    {" "}
                                                    {organization?.timezone?.name}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-[7px]">
                                        <Badge
                                            className={`flex items-center gap-1 py-0.5 px-2.5 bg-red-100 text-red-800`}
                                            variant="outline"
                                        >
                                            <ErrorIcon className="text-red-800 size-3" />
                                            <span className="text-xs font-medium whitespace-nowrap">
                                                Open Defects: {organization?.defectCounts?.open}
                                            </span>
                                        </Badge>
                                        <Badge
                                            className={`flex items-center gap-1 py-0.5 px-2.5 bg-green-100 text-green-800`}
                                            variant="outline"
                                        >
                                            <BoxIcon className="text-green-800 size-3" />
                                            <span className="text-xs font-medium whitespace-nowrap">
                                                Projects: {organization?.totalProjects}
                                            </span>
                                        </Badge>
                                        <Badge
                                            className={`flex items-center gap-1 py-0.5 px-2.5 bg-blue-100 text-blue-800`}
                                            variant="outline"
                                        >
                                            <DocsIcon className="text-blue-800 size-3" />
                                            <span className="text-xs font-medium whitespace-nowrap">
                                                Properties: {organization?.totalProperties}
                                            </span>
                                        </Badge>
                                        <Badge
                                            className={`flex items-center gap-1 py-0.5 px-2.5 bg-orange-100 text-orange-800`}
                                            variant="outline"
                                        >
                                            <TaskIcon className="text-orange-800 size-3" />
                                            <span className="text-xs font-medium whitespace-nowrap">
                                                Requested Defects: {organization?.defectCounts?.requested}
                                            </span>
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
            }

        </div>
    );
}
