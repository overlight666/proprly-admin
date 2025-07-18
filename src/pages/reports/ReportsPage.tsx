
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReportsIcon, DownloadIcon, FilterIcon } from "@/icons";
import { useState } from "react";

export const ReportsPage = (): JSX.Element => {
    const [selectedPeriod, setSelectedPeriod] = useState("30");

    const reportTypes = [
        {
            title: "Project Reports",
            description: "Comprehensive project status and progress reports",
            icon: <ReportsIcon className="w-8 h-8" />,
            color: "bg-blue-500",
            count: 12,
        },
        {
            title: "Defect Reports",
            description: "Detailed defect tracking and resolution reports",
            icon: <ReportsIcon className="w-8 h-8" />,
            color: "bg-red-500",
            count: 24,
        },
        {
            title: "Property Reports",
            description: "Property inspection and compliance reports",
            icon: <ReportsIcon className="w-8 h-8" />,
            color: "bg-green-500",
            count: 18,
        },
        {
            title: "User Activity Reports",
            description: "User engagement and activity tracking",
            icon: <ReportsIcon className="w-8 h-8" />,
            color: "bg-purple-500",
            count: 6,
        },
    ];

    const recentReports = [
        {
            name: "Monthly Project Summary",
            type: "Project Report",
            date: "2024-01-15",
            size: "2.4 MB",
            status: "Generated",
        },
        {
            name: "Defect Resolution Q4",
            type: "Defect Report",
            date: "2024-01-14",
            size: "1.8 MB",
            status: "Generating",
        },
        {
            name: "Property Inspection Report",
            type: "Property Report",
            date: "2024-01-13",
            size: "3.2 MB",
            status: "Generated",
        },
        {
            name: "User Activity Analysis",
            type: "User Report",
            date: "2024-01-12",
            size: "890 KB",
            status: "Generated",
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Reports
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Generate and download comprehensive reports
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2">
                            <FilterIcon className="w-4 h-4" />
                            Filter
                        </Button>
                        <Button className="flex items-center gap-2">
                            <DownloadIcon className="w-4 h-4" />
                            Generate Report
                        </Button>
                    </div>
                </div>
            </div>

            {/* Report Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {reportTypes.map((report, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${report.color} text-white mb-4`}>
                                {report.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {report.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                {report.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {report.count}
                                </span>
                                <Button variant="outline" size="sm">
                                    Generate
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Reports */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Recent Reports
                        </h2>
                        <select 
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                        >
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                        Report Name
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                        Type
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                        Date Generated
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                        Size
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentReports.map((report, index) => (
                                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {report.name}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {report.type}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {report.date}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                            {report.size}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                report.status === 'Generated' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                {report.status === 'Generated' && (
                                                    <Button variant="outline" size="sm">
                                                        <DownloadIcon className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
