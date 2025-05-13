/* eslint-disable jsx-a11y/anchor-is-valid */
import { selectedTicketAtom, supportTicketsAtom } from "@/_recoil/states";
import SupportTicketModal from "@/components/modals/supportTicketModal";
import { truncateString, ucword } from "@/helpers";
import { useModal } from "@/helpers/useModal";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { Checkbox, Label, Table } from "flowbite-react";
import moment from "moment";
import { type FC } from "react";
import {
    HiChevronLeft,
    HiChevronRight,
    HiTrash,
} from "react-icons/hi";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SupportTickets: FC = function () {
    return (
        <NavbarSidebarLayout isFooter={false}>
            <Menu />
            <Inbox />
        </NavbarSidebarLayout>
    );
};

const Menu: FC = function () {
    return (
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
            <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
                <div className="pr-3">
                    <Label htmlFor="checkbox-all" className="sr-only">
                        Select all
                    </Label>
                    <Checkbox id="checkbox-all" name="checkbox-all" />
                </div>
                <div className="flex space-x-2 px-0 sm:px-2">
                    <a
                        href="#"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Delete</span>
                        <HiTrash className="text-2xl" />
                    </a>

                </div>

            </div>
            <div className="hidden items-center space-x-0 space-y-3 sm:flex sm:space-x-3 sm:space-y-0">

                <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <span className="sr-only">Previous</span>
                    <HiChevronLeft className="text-2xl" />
                </a>
                <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <span className="sr-only">Next</span>
                    <HiChevronRight className="text-2xl" />
                </a>
                <span className="font-normal text-gray-500 dark:text-gray-400 sm:text-xs md:text-sm">
                    Show&nbsp;
                    <span className="font-semibold text-gray-900 dark:text-white">
                        1-25
                    </span>
                    &nbsp;of&nbsp;
                    <span className="font-semibold text-gray-900 dark:text-white">
                        2290
                    </span>
                </span>
            </div>
        </div>
    );
};

const Inbox: FC = function () {
    const tickets = useRecoilValue(supportTicketsAtom);
    const { isOpen, openModal, closeModal } = useModal();
    const setSelectedTicket = useSetRecoilState(selectedTicketAtom);
    //   const userAction = useUserActions();
    return (
        <div className="flex flex-col">
            <SupportTicketModal
                isOpen={isOpen}
                closeModal={closeModal}
                openModal={openModal}
            />
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        <Table className="min-w-full divide-y divide-gray-200">
                            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {
                                    tickets?.map((ticket: any, index: any) => {
                                        return (
                                            <Table.Row key={index}
                                                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 cursor-pointer ">
                                                <Table.Cell className="w-4 p-4 !rounded-none">
                                                    <div className="inline-flex items-center space-x-4">
                                                        <div>
                                                            <input
                                                                id="checkbox-1"
                                                                aria-describedby="checkbox-1"
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                            />
                                                            <label htmlFor="checkbox-1" className="sr-only">
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell onClick={() => {
                                                    setSelectedTicket(ticket);
                                                    openModal();
                                                }}
                                                    className="relative flex items-center space-x-4 whitespace-nowrap p-4">
                                                    <span

                                                        className="text-base font-semibold text-gray-900 after:absolute after:inset-0 dark:text-white"
                                                    >
                                                        {`${ucword(ticket?.user?.fullName)} | ${ticket?.supportsIssuesTypes?.title}`}
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell onClick={() => {
                                                    setSelectedTicket(ticket);
                                                    openModal();
                                                }}
                                                    className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-white xl:max-w-screen-md 2xl:max-w-screen-lg">
                                                    {truncateString(ticket?.description, 50)}
                                                </Table.Cell>
                                                <Table.Cell
                                                    onClick={() => {
                                                        setSelectedTicket(ticket);
                                                        openModal();
                                                    }}
                                                    className="!rounded-none whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                                    {moment(ticket?.createAt).format("lll")}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }

                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SupportTickets;
