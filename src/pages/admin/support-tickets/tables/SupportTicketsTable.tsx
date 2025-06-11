/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TableCell } from "../../../../components/ui/table";
import {
    PencilIcon,
} from "../../../../icons";
import moment from "moment";
import { selectedTicketAtom, supportTicketsAtom } from "@/_recoil/states";
import { useModal } from "@/helpers/useModal";
import SupportTicketModal from "../modal/SupportTicketsModal";
import { getIcons, textColoring } from "@/helpers/textIcons";
import { ucword } from "@/helpers";

DataTable.use(DT);

// Define the table data using the interface

export default function SupportTicketsTable({ tableRef }: any) {
    const [tableData, setTableData] = useState<any>([]);
    const tickets = useRecoilValue(supportTicketsAtom);
    const { isOpen, openModal, closeModal } = useModal();
    const setSelectedTicket = useSetRecoilState(selectedTicketAtom);
    //   const userAction = useUserActions();

    useEffect(() => {
        if (tickets?.length > 0) {
            const ticketMutate = tickets?.map((ticket, index) => {
                return [
                    index + 1,
                    ticket?.ticketNo,
                    ticket?.supportsIssuesTypes?.title,
                    ticket?.status?.toUpperCase(),
                    moment(ticket?.createdAt).format("ll"),
                    ticket,
                ];
            });
            setTableData(ticketMutate);
        }
    }, [tickets]);

    return (
        <>
            <SupportTicketModal
                isOpen={isOpen}
                closeModal={closeModal}
                openModal={openModal}
            />
            <div className="overflow-hidden rounded-md p-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="">
                        <DataTable
                            ref={tableRef}
                            className="compact stripe"
                            data={tableData}
                            options={{
                                destroy: true,
                                paging: true,
                                searching: true,
                                columnDefs: [
                                    { searchable: true, targets: [0, 1, 2, 3, 4] },
                                    {
                                        className:
                                            "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400",
                                        targets: "_all",
                                    },
                                ],
                                layout: {
                                    topStart: null,
                                    topEnd: null,
                                    bottomStart: {
                                        pageLength: {
                                            text: "Showing _START_-_END_ of _TOTAL_ Rows _MENU_",
                                        },
                                    },
                                    bottomEnd: "paging",
                                },
                            }}
                            slots={{
                                3: (_data: any, _row: any) => (
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex">
                                            <div
                                                className={`my-1 mr-2 flex flex-row no-wrap justify-center items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                    ${textColoring(_data, true)}
                    `}
                                            >
                                                {getIcons(_data)}
                                                <span className="text-[12px] text-nowrap">
                                                    {ucword(_data)}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                ),
                                5: (_data: any, _row: any) => (
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex flex-row gap-5">
                                            <PencilIcon
                                                className="size-5 cursor-pointer"
                                                data-tooltip-id="tooltip"
                                                data-tooltip-content="Edit"
                                                onClick={() => {
                                                    //   userAction.getSelectedTicket(_data?.id);
                                                    setSelectedTicket(_data);
                                                    openModal();
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                ),
                            }}
                        >
                            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Sr No
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Ticket No
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Issue Type
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Ticket Created
                                    </th>

                                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
}
