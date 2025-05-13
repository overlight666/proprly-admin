import {
    BellRingIcon,
    CalendarIcon,
    FolderPlusIcon,
    StoreIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { projectDashboardAtom } from "@/_recoil/states";
import { useRecoilValue } from "recoil";


export const MetricCardsSection = (): JSX.Element => {
    const dashboardData = useRecoilValue(projectDashboardAtom);

    const getTotal = () => {
        const count1 =
            dashboardData &&
                dashboardData?.defectsByProperty &&
                dashboardData?.defectsByProperty.in_progress
                ? dashboardData?.defectsByProperty.in_progress
                : 0;
        const count2 =
            dashboardData &&
                dashboardData?.defectsByCommonArea &&
                dashboardData?.defectsByCommonArea.in_progress
                ? dashboardData?.defectsByCommonArea.in_progress
                : 0;
        return count1 + count2;
    };

    const metricCards = [
        {
            icon: <BellRingIcon className="w-5 h-5" />,
            title: "Alerts - Needs Attention",
            value: dashboardData?.needAttention || 0,
            trend: {
                direction: "up",
                value: "0%",
                color: "#0e9f6e",
                period: "vs last 24h",
            },
        },
        {
            icon: <FolderPlusIcon className="w-5 h-5" />,
            title: "Defects In-Progress",
            value: getTotal() || 0,
            trend: {
                direction: "up",
                value: "0%",
                color: "#0e9f6e",
                period: "vs last 24h",
            },
        },
        {
            icon: <StoreIcon className="w-5 h-5" />,
            title: "Total Properties",
            value: dashboardData?.totalProperties || 0,
            trend: {
                direction: "down",
                value: "0%",
                color: "var(--colors-red-600)",
                period: "vs last 24h",
            },
        },
        {
            icon: <CalendarIcon className="w-5 h-5" />,
            title: "Total Open Defects",
            value: dashboardData?.totalOpenDefects || 0,
            trend: {
                direction: "up",
                value: "0%",
                color: "#0e9f6e",
                period: "vs last year",
            },
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {metricCards.map((card, index) => (
                <Card key={index} className="flex shadow-md rounded-lg">
                    <CardContent className="flex flex-col items-start gap-2 p-6 dark:text-gray-200">
                        {card.icon}
                        <div className="flex flex-col items-start">
                            <p className="text-base font-normal text-gray-500">
                                {card.title}
                            </p>
                            <p className="text-2xl font-bold text-[#111928] dark:text-gray-200">
                                {card.value}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                {card.trend.direction === "up" ? (
                                    <img
                                        className="w-2.5 h-2.5"
                                        alt="Arrow up"
                                        src="https://c.animaapp.com/KdkgTfL3/img/arrow-up.svg"
                                    />
                                ) : (
                                    <img
                                        className="w-2.5 h-2.5"
                                        alt="Arrow down"
                                        src="https://c.animaapp.com/KdkgTfL3/img/arrow-down-outline.svg"
                                    />
                                )}
                                <span
                                    className="font-text-sm-font-semibold"
                                    style={{ color: card.trend.color }}
                                >
                                    {card.trend.value}
                                </span>
                            </div>
                            <span className="font-leading-tight-text-base-font-normal text-gray-500">
                                {card.trend.period}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
