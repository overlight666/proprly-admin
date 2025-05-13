/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
} from "flowbite-react";
import { useEffect, type FC } from "react";
import {
    HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { useNavigate, useParams } from "react-router";
import { organizationDashboardAtom, organizationMenuAtom, selectedOrgAtom } from "@/_recoil/states";
import { useRecoilState, useRecoilValue } from "recoil";
import { TableHeader } from "../components/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/icons";
import { MetricCardsSection } from "../sections/metricCardsSection";
import { TimelineDefectsSection } from "../sections/timelineDefectsSection";
import DefectsChart from "../sections/defectChart";
import OrganizationProjectTable from "../tables/OrganizationProjectTable";
import DefectResolutionModal from "@/components/modals/defectResolutionModal";
import { useModal } from "@/helpers/useModal";


const ViewOrganization: FC = function () {
    const params = useParams();
    const [organizationMenu, setOrganizationMenu] = useRecoilState(organizationMenuAtom)
    const { id } = params;
    const dashboardData = useRecoilValue(organizationDashboardAtom);
    const navigate = useNavigate();
    const selectedOrganization = useRecoilValue(selectedOrgAtom);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        setOrganizationMenu("dashboard")
    }, [id])

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
                            <Breadcrumb.Item >{selectedOrganization?.name}</Breadcrumb.Item>
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
                            {selectedOrganization?.name}
                        </h1>
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-y-6 px-4 pt-4">
                    <TableHeader />
                    {organizationMenu == 'dashboard' ? <>
                        <MetricCardsSection />
                        <TimelineDefectsSection openModal={openModal} />
                        <div className="grid grid-cols-12 gap-4 md:gap-6">
                            <div className="col-span-12 space-y-6 xl:col-span-6">
                                <DefectsChart
                                    title={"Property Defects by Trade"}
                                    keyId="odt"
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
                                    keyId="oadt"
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
                    </> : <OrganizationProjectTable />}

                </div>
            </>

        </NavbarSidebarLayout>
    );
};


export default ViewOrganization;
