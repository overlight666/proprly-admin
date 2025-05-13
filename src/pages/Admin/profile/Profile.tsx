import { authAtom } from "@/_recoil/states";
import { ucword } from "@/helpers";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { Badge, Breadcrumb, Progress } from "flowbite-react";
import { EditIcon } from "lucide-react";
import moment from "moment";
import type { FC } from "react";
import { HiBriefcase, HiHome, HiMap } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

const ProfilePage: FC = function () {


    return (
        <NavbarSidebarLayout>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
                <div className="col-span-full mb-4 xl:mb-2">
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item href="/">
                            <div className="flex items-center gap-x-3">
                                <HiHome className="text-xl" />
                                <span className="dark:text-white">Organizations</span>
                            </div>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Profile
                    </h1>
                </div>
                <div className="col-span-full xl:col-auto">
                    <ProfileIntro />
                    <Skills />
                    <Hobbies />
                </div>
                <div className="col-span-2">
                    <GeneralInformation />
                    <ProgressBars />
                </div>
            </div>
        </NavbarSidebarLayout>
    );
};

const ProfileIntro: FC = function () {
    const currentUser = useRecoilValue(authAtom);
    const navigate = useNavigate();
    return (
        <div className="relative mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <EditIcon className="absolute top-1 right-1 dark:text-gray-200 p-1 cursor-pointer" onClick={() => {
                navigate("/profile/edit");
            }} />
            <div className="sm:flex sm:space-x-4 xl:block xl:space-x-0">
                <img
                    alt=""
                    src="../../images/default-user.png"
                    className="mb-2 h-20 w-20 rounded-lg"
                />
                <div>
                    <h2 className="text-xl font-bold dark:text-white">{ucword(JSON.parse(currentUser)?.user?.fullName)}</h2>
                    <ul className="mt-2 space-y-1">
                        <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                            <HiBriefcase className="mr-2 text-lg text-gray-900 dark:text-gray-100" />
                            No Information
                        </li>
                        <li className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                            <HiMap className="mr-2 text-lg text-gray-900 dark:text-gray-100" />
                            No Information
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sm:flex xl:block xl:space-y-4">
                <div className="sm:flex-1">
                    <address className="text-sm font-normal not-italic text-gray-500 dark:text-gray-400">
                        <div className="mt-4">Email address</div>
                        <a
                            className="text-sm font-medium text-gray-900 dark:text-white"
                            href="mailto:webmaster@flowbite.com"
                        >
                            {JSON.parse(currentUser)?.user?.email}
                        </a>
                        <div className="mt-4">Home address</div>
                        <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            No Information
                        </div>
                        <div className="mt-4">Phone number</div>
                        <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {JSON.parse(currentUser)?.user?.mobile || "No Information"}
                        </div>
                    </address>
                </div>
                <div className="hidden sm:flex-1">
                    <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
                        About
                    </h3>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        No Information
                    </p>
                </div>
            </div>
            <div>
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
                    Software Skill
                </h3>
                <div className="flex space-x-3 dark:text-gray-200">
                    No Information
                </div>
            </div>
        </div>
    );
};

const Skills: FC = function () {
    return (
        <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <div className="flow-root dark:text-gray-200">
                <h3 className="text-xl font-bold dark:text-white">Skills</h3>
                No Information
            </div>
        </div>
    );
};

const Hobbies: FC = function () {
    return (
        <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <div className="flow-root dark:text-gray-200">
                <h3 className="text-xl font-bold dark:text-white">Hobbies</h3>
                No Information
            </div>
        </div>
    );
};

const GeneralInformation: FC = function () {
    const currentUser = useRecoilValue(authAtom);
    return (
        <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <h3 className="mb-4 text-xl font-bold dark:text-white">
                General information
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <dt className="text-lg font-medium text-gray-900 dark:text-white">
                        About me
                    </dt>
                    <dd className="mt-1 max-w-prose space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        No Information
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Education
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        No Information
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Work History
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        No Information
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Join Date
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        {moment(JSON.parse(currentUser)?.user?.createdAt).format('ll') || "No Information"}
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Languages
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        No Information
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Organization
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        No Information
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Role
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        No Information
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Department
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        No Information
                    </dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Birthday
                    </dt>
                    <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                        No Information
                    </dd>
                </div>
            </dl>
        </div>
    );
};

const ProgressBars: FC = function () {
    return (
        <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16 lg:gap-8 2xl:gap-24">
                <div className="space-y-6">
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            Figma
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            Php
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            HTML
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            React
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            Vue
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            Marketing
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            Product Design
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                    <div>
                        <div className="mb-1 text-base font-medium text-gray-500 dark:text-gray-400">
                            Angular
                        </div>
                        <Progress progress={0} color="dark" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
