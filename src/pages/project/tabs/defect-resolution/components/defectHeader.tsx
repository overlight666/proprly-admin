/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/ui/input";
import { CloseIcon, SearchIcon } from "../../../../../icons";
import { useState } from "react";
import { Dropdown } from "@/components/ui/dropdown";
import { DropdownItem } from "@/components/ui/dropdown-item";
import Select from "@/components/ui/select";
import { FilterIcon } from "lucide-react";

export default function DefectHeader({
    setSearch,
    setFilter,
    filter,
    option,
    label,
    filterValue,
    setFilterValue,
}: any) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }
    return (
        <>
            <div className="flex justify-between flex-row items-center mb-5">
                <div
                    className="flex space-x-2 w-full
      "
                >
                    <div className="relative w-[40%]">
                        <Input
                            placeholder="Search by unit no"
                            type="text"
                            className="pl-[62px]"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                            <SearchIcon />
                        </span>
                    </div>

                    <div className="relative inline-block">
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                        >
                            <FilterIcon className="size-4" />
                            {filter}
                        </button>

                        <Dropdown
                            isOpen={isOpen}
                            onClose={closeDropdown}
                            className="w-40 p-2"
                        >
                            <DropdownItem
                                onItemClick={() => {
                                    setFilter("Logged By");
                                    closeDropdown();
                                }}
                                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                                Logged By
                            </DropdownItem>
                            <DropdownItem
                                onItemClick={() => {
                                    setFilter("Trade Category");
                                    closeDropdown();
                                }}
                                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                                Trade Category
                            </DropdownItem>
                            <DropdownItem
                                onItemClick={() => {
                                    setFilter("Defect Type");
                                    closeDropdown();
                                }}
                                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                                Defect Type
                            </DropdownItem>
                        </Dropdown>
                    </div>
                    {filter !== "Filter by" && option.length > 0 && (
                        <>
                            <div className="relative inline-block">
                                <Select
                                    onChange={(e) => setFilterValue(e)}
                                    options={option}
                                    placeholder={label}
                                    defaultValue={filterValue}
                                    className="dark:bg-dark-900"
                                />
                            </div>
                            <div className="relative inline-block">
                                <button
                                    data-tooltip-id="tooltip"
                                    data-tooltip-content="Clear filters"
                                    onClick={() => setFilter("Filter by")}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
