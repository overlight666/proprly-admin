/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC } from "react";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { selectedOrgAtom, selectedProjectAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export const ItpPage: FC = function () {
    const selectedProject = useRecoilValue(selectedProjectAtom);

    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

    return (
        <NavbarSidebarLayout>
            <main className="flex flex-col w-full gap-[22px] pb-5 px-5">
                {/* Header */}
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
                    <div className="col-span-full flex items-center justify-between">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="/">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Organizations</span>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href={`/organization/view/${id}`}>
                                <span className="dark:text-white">{selectedOrganization?.name}</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href={`/organization/${id}/project/view/${selectedProject?.id}`}>
                                <span className="dark:text-white">{selectedProject?.name}</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >ITPs</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-1.5"
                                onClick={() => navigate(-1)}
                            >
                                <ChevronLeftIcon className="w-2.5 h-2.5 dark:text-gray-500" />
                                <span className="font-medium text-gray-500 text-sm">Back</span>
                            </Button>
                        </div>

                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        {selectedProject?.name} - ITPs
                    </h1>
                </div>
                {/* Organization Card */}

            </main>
        </NavbarSidebarLayout>
    );
};

