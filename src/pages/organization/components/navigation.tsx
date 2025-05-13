import {
    FolderClosed,
    LayoutDashboard,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecoilState } from "recoil";
import { organizationMenuAtom } from "@/_recoil/states";

export const TableHeader = (): JSX.Element => {
    const [organizationMenu, setOrganizationMenu] = useRecoilState(organizationMenuAtom);
    // Navigation items data
    const navigationItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard className="w-3.5 h-3.5" />,
            alt: "Column",
        },
        {
            id: "project",
            label: "Projects",
            icon: <FolderClosed className="w-3.5 h-3.5" />,
            alt: "Folder outline",
        },
    ];

    return (
        <header
            className="flex flex-col items-start gap-2.5 p-2"
            data-model-id="1846:15300"
        >
            <nav className="flex flex-col items-start relative self-stretch w-full flex-1 border-b border-gray-200 dark:border-gray-600">
                <Tabs defaultValue="configure" className="w-full">
                    <TabsList className="flex items-center self-stretch w-full relative flex h-auto bg-transparent">
                        {navigationItems.map((item) => (
                            <TabsTrigger
                                key={item.id}
                                value={item.id}
                                onClick={() => setOrganizationMenu(item.id)}
                                className={`flex flex-col items-start justify-center pr-5 pb-[2px] rounded-md relative flex h-auto ${item.id === "dashboard" ? "pl-0" : ""
                                    }`}
                            >
                                <div className={`inline-flex items-center gap-1 flex ${organizationMenu == item?.id
                                    ? "text-primary-600"
                                    : "dark:text-gray-300 text-gray-600"
                                    }`}>
                                    {item.icon}
                                    <div
                                        className={`relative w-fit text-sm font-medium whitespace-nowrap ${organizationMenu == item?.id
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
