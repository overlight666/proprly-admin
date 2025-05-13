import {
    Building2,
    Calendar1Icon,
    ClipboardList,
    FolderClosed,
    LayoutDashboard,
    Settings,
    User2,
    Users,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectMenuAtom } from "@/_recoil/states";
import { useRecoilState } from "recoil";
import { BugIcon } from "@/icons";

export const TableHeader = (): JSX.Element => {
    const [projectMenu, setProjectMenu] = useRecoilState(projectMenuAtom);
    // Navigation items data
    const navigationItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard className="w-3.5 h-3.5" />,
            alt: "Column",
        },
        {
            id: "properties",
            label: "Properties",
            icon: <FolderClosed className="w-3.5 h-3.5" />,
            alt: "Folder outline",
        },
        {
            id: "common-areas",
            label: "Common Areas",
            icon: <Building2 className="w-3.5 h-3.5" />

        },
        {
            id: "defect-resolution",
            label: "Defect Resolution",
            icon: <BugIcon className="w-3.5 h-3.5" />,
            alt: "Adjustments vertical",
        },
        {
            id: "appointments",
            label: "Appointments",
            icon: <Calendar1Icon className="w-3.5 h-3.5" />,
            alt: "Appointment settings",
        },
        {
            id: "users",
            label: "Users",
            icon: <User2 className="w-3.5 h-3.5" />,
            alt: "user outline",
        },
        {
            id: "reports",
            label: "Reports",
            icon: <ClipboardList className="w-3.5 h-3.5" />,
            alt: "Paste outline",
        },
    ];

    return (
        <header
            className="flex flex-col items-start gap-2.5 p-2"
            data-model-id="1846:15300"
        >
            <nav className="flex flex-col items-start relative self-stretch w-full flex-1 border-b border-gray-200">
                <Tabs defaultValue="configure" className="w-full">
                    <TabsList className="flex items-center self-stretch w-full relative flex h-auto bg-transparent">
                        {navigationItems.map((item) => (
                            <TabsTrigger
                                key={item.id}
                                value={item.id}
                                onClick={() => setProjectMenu(item.id)}
                                className={`flex flex-col items-start justify-center pr-5 pb-[2px] rounded-md relative flex h-auto ${item.id === "dashboard" ? "pl-0" : ""
                                    }`}
                            >
                                <div className={`inline-flex items-center gap-1 flex ${projectMenu == item?.id
                                    ? "text-primary-600"
                                    : "dark:text-gray-300 text-gray-600"
                                    }`}>
                                    {item.icon}
                                    <div
                                        className={`relative w-fit text-sm font-medium whitespace-nowrap ${projectMenu == item?.id
                                            ? "text-primary-600"
                                            : "dark:text-gray-300 text-gray-600"
                                            }`}
                                    >
                                        {item.label}
                                    </div>
                                </div>

                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </nav>
        </header>
    );
};
