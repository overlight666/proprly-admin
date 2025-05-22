import {
    CalendarCheck,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecoilState } from "recoil";
import { ItpTaskIcon } from "@/icons";
import { ITPMenuAtom } from "@/_recoil/states";

export const ITPHeader = (): JSX.Element => {
    const [ITPMenu, setITPMenu] = useRecoilState(ITPMenuAtom);
    // Navigation items data
    const navigationItems = [
        {
            id: "manage",
            label: "Manage",
            icon: <CalendarCheck className="w-4 h-4" />,
            alt: "Column",
        },
        {
            id: "itpTask",
            label: "ITP Task Status",
            icon: <ItpTaskIcon className="w-4 h-4" />,
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
                                onClick={() => setITPMenu(item.id)}
                                className={`flex flex-col items-start justify-center pr-5 pb-[2px] rounded-md relative flex h-auto ${item.id === "manage" ? "pl-0" : ""
                                    }`}
                            >
                                <div className={`inline-flex items-center gap-1 flex ${ITPMenu == item?.id
                                    ? "text-primary-600"
                                    : "dark:text-gray-300 text-gray-600"
                                    }`}>
                                    {item.icon}
                                    <div
                                        className={`relative w-fit !text-lg font-medium whitespace-nowrap ${ITPMenu == item?.id
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
