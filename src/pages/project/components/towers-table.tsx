/* eslint-disable @typescript-eslint/no-explicit-any */
import EditTowerModal from "@/components/modals/editTowerModal";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ucword } from "@/helpers";
import { getIcons, textColoring } from "@/helpers/textIcons";
import { useModal } from "@/helpers/useModal";
import { TrashBinIcon } from "@/icons";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function TowersTable({ towers, removeTower }: any) {
    const currentPage = window.location.pathname;
    const { isOpen, openModal, closeModal } = useModal();
    const [currentTower, setCurrentTower] = useState<any>();
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <EditTowerModal
                isOpen={isOpen}
                closeModal={closeModal}
                currentTower={currentTower}
            />
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Tower Name
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Floors
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {towers &&
                                towers.length > 0 &&
                                towers.map((tower: any, index: any) => (
                                    <TableRow key={index}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-white">
                                            {tower.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-white">
                                            {tower.numFloors}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-white flex">
                                            <div
                                                className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                                                                ${textColoring(tower.status ?? "under_construction", true)}
                                                                `}
                                            >
                                                {getIcons(tower.status ?? "under_construction")}
                                                <span className="text-[12px]">{ucword(tower.status ?? "under_construction")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-[13px]">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="!text-[red]"
                                                    onClick={() => removeTower(tower)}
                                                >
                                                    <TrashBinIcon
                                                        className="size-5 cursor-pointer"
                                                        data-tooltip-id="tooltip"
                                                        data-tooltip-content="Delete"
                                                    />

                                                </div>
                                                {currentPage.includes("/project/edit") && <div
                                                    onClick={() => {
                                                        setCurrentTower(tower);
                                                        openModal();
                                                    }}
                                                >
                                                    <Edit
                                                        className="size-5 cursor-pointer"
                                                        data-tooltip-id="tooltip"
                                                        data-tooltip-content="Edit"
                                                    />

                                                </div>}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
