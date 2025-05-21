/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, type FC } from "react";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { commonAreaMenuAtom, selectedOrgAtom, selectedProjectAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import CommonArea from "./commonArea";
import { CommonAreaHeader } from "./components/common-area-header";
import DefectPagination from "./tabs/defect-resolution/components/pagination";
import DefectResolution from "./tabs/defect-resolution/pages/defectResolution";

export const CommonAreaPage: FC = function () {
    const selectedProject = useRecoilValue(selectedProjectAtom);
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const navigate = useNavigate();
    const dashboardMenu = useRecoilValue(commonAreaMenuAtom);
    const [pageRow, setPageRow] = useState<any>('all')
    const [totalRows, setTotalRows] = useState<any>(0)
    const [itemOffset, setItemOffset] = useState(0);
    const params = useParams();
    const { id } = params;


    const handlePageClick = (event) => {
        if (pageRow != "all") {
            const newOffset = (event.selected * pageRow) % totalRows;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        } else {
            setItemOffset(0);
        }

    };



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
                            <Breadcrumb.Item >Common Areas</Breadcrumb.Item>
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
                        {selectedProject?.name}
                    </h1>
                </div>
                {/* Organization Card */}
                <div className="grid grid-cols-1 gap-y-1 px-1 pt-1">
                    <CommonAreaHeader />
                    {
                        dashboardMenu == 'manage' ?
                            <CommonArea />
                            :
                            <DefectResolution setTotalRows={setTotalRows} setPageRow={setPageRow} itemOffset={itemOffset} pageRow={pageRow} />
                    }
                    {
                        totalRows > 0 && dashboardMenu == 'defect-resolution' && <div className="mt-5">
                            <DefectPagination setItemOffset={setItemOffset} itemOffset={itemOffset} pageRow={pageRow} setPageRow={setPageRow} totalRows={totalRows} handlePageClick={handlePageClick} />

                        </div>
                    }
                </div>
            </main>
        </NavbarSidebarLayout>
    );
};

