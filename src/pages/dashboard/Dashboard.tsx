
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BuildingIcon, UserIcon, ReportsIcon, ItpIcon } from "@/icons";
import { useNavigate } from "react-router-dom";
import { usePersistor } from "@/helpers/persistor";

export const Dashboard = (): JSX.Element => {
    const navigate = useNavigate();
    const persist = usePersistor();
    const authUser = persist.getValues("authUser");
    const isAdmin = persist.getValues("isAdmin");

    const dashboardCards = [
        {
            title: "Organizations",
            description: "Manage your organizations and projects",
            icon: <BuildingIcon className="w-8 h-8" />,
            path: "/",
            color: "bg-blue-500",
        },
        {
            title: "Users",
            description: "Manage users and permissions",
            icon: <UserIcon className="w-8 h-8" />,
            path: "/users",
            color: "bg-green-500",
        },
        {
            title: "Reports",
            description: "View and generate reports",
            icon: <ReportsIcon className="w-8 h-8" />,
            path: "/reports",
            color: "bg-purple-500",
        },
        {
            title: "ITP Management",
            description: "Inspection and test plans",
            icon: <ItpIcon className="w-8 h-8" />,
            path: "/itp",
            color: "bg-orange-500",
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {authUser?.user?.fullName || 'User'}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Here's what's happening with your projects today.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Total Organizations</p>
                                <p className="text-3xl font-bold">12</p>
                            </div>
                            <BuildingIcon className="w-8 h-8 text-blue-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Active Projects</p>
                                <p className="text-3xl font-bold">24</p>
                            </div>
                            <ReportsIcon className="w-8 h-8 text-green-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Total Users</p>
                                <p className="text-3xl font-bold">156</p>
                            </div>
                            <UserIcon className="w-8 h-8 text-purple-200" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100">Pending Tasks</p>
                                <p className="text-3xl font-bold">8</p>
                            </div>
                            <ItpIcon className="w-8 h-8 text-orange-200" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardCards.map((card, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(card.path)}>
                        <CardContent className="p-6">
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${card.color} text-white mb-4`}>
                                {card.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {card.description}
                            </p>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <Card className="mt-8">
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    New organization "Sunset Heights" was created
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Project "Marina Bay" inspection completed
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    5 new defects reported in "Ocean View"
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
