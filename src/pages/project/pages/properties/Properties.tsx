/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, type FC } from "react";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { propertiesAtom, propertyMenuAtom, selectedOrgAtom, selectedProjectAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";
import PropertiesPage from "./PropertiesPage";
import BulkImportComponent from "./components/bulk-import-component";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { PropertyHeader } from "./components/property-header";
import DefectResolution from "./tabs/defect-resolution/pages/defectResolution";
import DefectPagination from "./tabs/defect-resolution/components/pagination";

export const Properties: FC = function () {
    const selectedProject = useRecoilValue(selectedProjectAtom);
    const [showBulk, setShowBulk] = useState(false);
    const [propertyUploadQueue, setPropertyUploadQueue] = useState<any>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const properties = useRecoilValue(propertiesAtom);
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const dashboardMenu = useRecoilValue(propertyMenuAtom);
    const [pageRow, setPageRow] = useState<any>('all')
    const [totalRows, setTotalRows] = useState<any>(0)
    const [itemOffset, setItemOffset] = useState(0);
    const navigate = useNavigate();
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

    const bulkUploadHandler = (value: boolean) => {
        if (value) {
            const propertyQueue =
                selected &&
                selected?.map((id: any) => {
                    return properties.find((pr) => pr.id == id);
                });
            setPropertyUploadQueue(propertyQueue);
            setShowBulk(true);
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
                            <Breadcrumb.Item >Properties</Breadcrumb.Item>
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
                    <div className="w-full col-span-full">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Property Management
                        </h1>
                    </div>

                </div>
                {/* Organization Card */}
                <div className="grid grid-cols-1 gap-y-1 px-1 pt-1">
                    <PropertyHeader />
                    {
                        dashboardMenu == 'manage' ?
                            !showBulk ?
                                <PropertiesPage setShowBulk={bulkUploadHandler} setSelected={setSelected} selected={selected} />
                                :
                                <BulkImportComponent
                                    selected={propertyUploadQueue}
                                    setShowBulk={setShowBulk}
                                    clear={setSelected}
                                />
                            : <DefectResolution setTotalRows={setTotalRows} setPageRow={setPageRow} itemOffset={itemOffset} pageRow={pageRow} />
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

