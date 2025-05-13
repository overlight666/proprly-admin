/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
} from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import {
    HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { useNavigate, useParams } from "react-router";
import { projectDashboardAtom, projectMenuAtom, propertiesAtom, selectedOrgAtom, selectedProjectAtom } from "@/_recoil/states";
import { useRecoilState, useRecoilValue } from "recoil";
import { TableHeader } from "./components/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/icons";
import { MetricCardsSection } from "./sections/metricCardsSection";
import { TimelineDefectsSection } from "./sections/timelineDefectsSection";
import DefectsChart from "./sections/defectChart";
import DefectResolutionModal from "@/components/modals/defectResolutionModal";
import { useModal } from "@/helpers/useModal";
import PropertiesPage from "./tabs/PropertiesPage";
import BulkImportComponent from "./components/bulk-import-component";
import CommonArea from "./tabs/common-area/pages/commonArea";
import DefectResolution from "./tabs/defect-resolution/pages/defectResolution";
import DefectPagination from "./tabs/defect-resolution/components/pagination";
import Appointments from "./tabs/appointments/pages/appointments";
import { Users } from "./tabs/users/pages/Users";
import { Reports } from "./tabs/reports/pages/Reports";


export const ProjectPage: FC = function () {
    const params = useParams();
    const [dashboardMenu, setProjectMenu] = useRecoilState(projectMenuAtom)
    const { id } = params;
    const dashboardData = useRecoilValue(projectDashboardAtom);
    const navigate = useNavigate();
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const selectedProject = useRecoilValue(selectedProjectAtom);
    const { isOpen, openModal, closeModal } = useModal();
    const [showBulk, setShowBulk] = useState(false);
    const [propertyUploadQueue, setPropertyUploadQueue] = useState<any>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const properties = useRecoilValue(propertiesAtom);
    const [pageRow, setPageRow] = useState<any>('all')
    const [totalRows, setTotalRows] = useState<any>(0)
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        if (!dashboardMenu) {
            setProjectMenu("dashboard")
        }
    }, [id])

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
            <>
                <DefectResolutionModal
                    isOpen={isOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                />
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
                    <div className="col-span-full flex items-center justify-between">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item href="/">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Organizations</span>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href={`/organization/view/${selectedOrganization?.id}`}>{selectedOrganization?.name}</Breadcrumb.Item>
                            <Breadcrumb.Item >{selectedProject?.name}</Breadcrumb.Item>
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
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            {selectedProject?.name}
                        </h1>
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-4">
                    <TableHeader />
                    {dashboardMenu == 'dashboard' ? <>
                        <MetricCardsSection />
                        <TimelineDefectsSection openModal={openModal} />
                        <div className="grid grid-cols-12 gap-4 md:gap-6">
                            <div className="col-span-12 space-y-6 xl:col-span-6">
                                <DefectsChart
                                    title={"Property Defects by Trade"}
                                    keyId="pdt"
                                    data={
                                        dashboardData &&
                                        dashboardData?.propertyDefectsByStatusAndTrade
                                    }
                                    totalTitle="Total Property Defects"
                                    totalValue={
                                        dashboardData &&
                                        dashboardData?.defectsByProperty &&
                                        dashboardData?.defectsByProperty?.total
                                    }
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <DefectsChart
                                    title={"Common Area Defects by Trade"}
                                    keyId="cadt"
                                    data={
                                        dashboardData &&
                                        dashboardData?.commonAreaDefectsByStatusAndTrade
                                    }
                                    totalTitle="Total Common Area Defects"
                                    totalValue={
                                        dashboardData &&
                                        dashboardData?.defectsByCommonArea &&
                                        dashboardData?.defectsByCommonArea?.total
                                    }
                                />
                            </div>
                        </div>
                    </> :
                        dashboardMenu == 'properties' ?
                            !showBulk ?
                                <PropertiesPage setShowBulk={bulkUploadHandler} setSelected={setSelected} selected={selected} />
                                :
                                <BulkImportComponent
                                    selected={propertyUploadQueue}
                                    setShowBulk={setShowBulk}
                                    clear={setSelected}
                                />
                            :
                            dashboardMenu == 'common-areas' ?
                                <CommonArea />
                                :
                                dashboardMenu == 'defect-resolution' ?
                                    <DefectResolution setTotalRows={setTotalRows} setPageRow={setPageRow} itemOffset={itemOffset} pageRow={pageRow} />
                                    :
                                    dashboardMenu == 'appointments' ?
                                        <Appointments />
                                        :
                                        dashboardMenu == 'users' ?
                                            <Users />
                                            :
                                            <Reports />

                    }

                    {
                        totalRows > 0 && dashboardMenu == 'defect-resolution' && <div className="mt-5">
                            <DefectPagination setItemOffset={setItemOffset} itemOffset={itemOffset} pageRow={pageRow} setPageRow={setPageRow} totalRows={totalRows} handlePageClick={handlePageClick} />

                        </div>
                    }
                </div>
            </>

        </NavbarSidebarLayout>
    );
};

