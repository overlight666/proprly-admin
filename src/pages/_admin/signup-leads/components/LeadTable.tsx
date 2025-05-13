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
    CheckLineIcon,
    CloseIcon,
} from "../../../../icons";
import moment from "moment";
import { toast } from "react-toastify";
import { getIcons, textColoring } from "@/helpers/textIcons";
import { confirm } from "@/components/ui/confirm-dialog";
import { isLoadingAtom, sidebarIndexAtom, signupLeadsListAtom } from "@/_recoil/states";
import { useUserActions } from "@/_recoil/actions";
import { Leads } from "@/lib/interface";
import { ucword } from "@/helpers";

DataTable.use(DT);

// Define the table data using the interface

export default function LeadTable({ tableRef }: any) {
    const [tableData, setTableData] = useState<any>([]);
    const leads = useRecoilValue(signupLeadsListAtom);
    const userActions = useUserActions();
    const setIsLoading = useSetRecoilState(isLoadingAtom);
    const setZindex = useSetRecoilState(sidebarIndexAtom);

    useEffect(() => {
        setIsLoading(true);
        userActions.getLeads().then(() => {
            setIsLoading(false)
        });
    }, []);

    useEffect(() => {
        if (leads) {
            const tb = leads.map((proj: Leads) => {
                return [
                    proj.fullName,
                    proj.mobileNumber,
                    proj.email,
                    proj.organizationName,
                    proj.organizationCountryCode,
                    proj.status,
                    moment(proj.createdAt).format("lll"),
                    proj,
                ];
            });
            setTableData(tb);
        }
    }, [leads]);

    const confirmAlertSubmit = async (_data: any) => {
        setZindex("z-9")
        const proceed = await confirm({
            confirmText: "CONFIRM",
            confirmation:
                "You are about to confirm the registration of this lead. Please confirm to continue!",
        })
        if (proceed) {
            setZindex("z-10")
            userActions
                .convertLead({ id: _data.id }, userActions)
                .then(() => {
                    toast.info("Lead converted");
                })
                .catch((e: any) => {
                    toast.error(e);
                });
        } else {
            setZindex("z-10")
        }
    };

    const rejectAlertSubmit = async (_data: any) => {
        setZindex("z-9");
        const proceed = await confirm({
            confirmText: "REJECT",
            confirmVariant: "destructive",
            confirmation:
                "You are about to rejects the registration of this lead. Please confirm to continue!",
        })

        if (proceed) {
            setZindex("z-10")
            userActions
                .rejectLead({ id: _data.id }, userActions)
                .then(() => {
                    toast.warning("Lead rejected");
                })
                .catch((e: any) => {
                    toast.error(e);
                });
        } else {
            setZindex("z-10")
        }
    };

    return (
        <div className="overflow-hidden rounded-md px-5 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                                { searchable: true, targets: [0, 2, 3, 1, 4] },
                                {
                                    className:
                                        "text-gray-500 text-start text-theme-sm dark:text-gray-100",
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
                            1: (_data: any, _row: any) => (
                                <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                                    {_data}
                                </TableCell>
                            ),
                            5: (_data: any, _row: any) => (
                                <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                                    <div
                                        className={`my-1 mr-2 flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-sm shadow-sm transition-all
                    ${textColoring(_data, true)}
                    `}
                                    >
                                        {getIcons(_data)}
                                        <span className="text-[12px]">{ucword(_data)}</span>
                                    </div>
                                </TableCell>
                            ),
                            7: (_data: any, _row: any) => (
                                <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                                    <div className="flex flex-row gap-5">
                                        {_data.status !== "accepted" && (
                                            <CheckLineIcon
                                                className={`size-5 cursor-pointer text-green-600 ${_data.status == "rejected" && "text-yellow-600"
                                                    }`}
                                                data-tooltip-id="tooltip"
                                                data-tooltip-content="Convert"
                                                onClick={() => confirmAlertSubmit(_data)}
                                            />
                                        )}
                                        {_data.status !== "accepted" &&
                                            _data.status !== "rejected" && (
                                                <CloseIcon
                                                    className="size-5 cursor-pointer text-red-600"
                                                    data-tooltip-id="tooltip"
                                                    data-tooltip-content="Reject"
                                                    onClick={() => rejectAlertSubmit(_data)}
                                                />
                                            )}
                                    </div>
                                </TableCell>
                            ),
                        }}
                    >
                        <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                            <tr>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    FULL NAME
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    PHONE
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    EMAIL ADDRESS
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    ORGANIZATION NAME
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    COUNTRY
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    STATUS
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    LEAD CREATED
                                </th>

                                <th className="px-5 py-3 text-sm text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
