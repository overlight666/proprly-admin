import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../_state";
import { useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon, LockIcon } from "../../icons";
import { useUserActions } from "../../_actions";
import { toast } from "react-toastify";

export default function AccountSettings() {
    const userDetails = useRecoilValue(authAtom);
    const navigate = useNavigate()
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const userAction = useUserActions();

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required("Current Password is required"),
        newPassword: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const tabsData = [
        {
            label: "Change Password",
            icon: <LockIcon />,
        }
    ];

    const onSubmit = (props: any) => {
        userAction.changePassword(props).then(() => {
            toast.success("Password has been successfully updated");
            setValue("currentPassword", "");
            setValue("newPassword", "");
            setValue("confirmPassword", "");
        }).catch((e) => {
            toast.error(e)
        })
    }

    return (
        <div>
            <PageMeta
                title="Proprly | Account Settings"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Account Settings" />
            <div className="min-h-screen rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:pb-12 overflow-hidden">
                <div className="flex dark:text-white text-black border-b-[0.1px] border-gray-200">
                    {/* Loop through tab data and render button for each. */}
                    {tabsData?.map((tab, idx) => {
                        return (
                            <button
                                key={idx}
                                className={`transition-colors duration-300 ${idx === activeTabIndex
                                    ? "bg-blue-100 px-6 py-4 text-blue-600"
                                    : "border-transparent hover:border-gray-200 px-6 py-4"
                                    }`}
                                // Change the active tab on click.
                                onClick={() => setActiveTabIndex(idx)}
                            >
                                <div className="flex flex-row items-center justify-center gap-2">
                                    {tab?.icon}
                                    {tab?.label}
                                </div>
                            </button>
                        );
                    })}
                </div>
                {tabsData[activeTabIndex]?.label === "Change Password" && (<div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-5 mt-5">
                    <form className="flex gap-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label htmlFor="input">Current Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type={showOldPassword ? "text" : "password"}
                                    register={{ ...register("currentPassword") }}
                                    error={errors.currentPassword}
                                    hint={errors.currentPassword?.message}
                                />
                                <span
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4 ${errors.currentPassword ? "top-5" : "top-1/2"
                                        }`}
                                >
                                    {showOldPassword ? (
                                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                    ) : (
                                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="input">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    register={{ ...register("newPassword") }}
                                    error={errors.newPassword}
                                    hint={errors.newPassword?.message}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4 ${errors.newPassword ? "top-5" : "top-1/2"
                                        }`}
                                >
                                    {showPassword ? (
                                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                    ) : (
                                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                    )}
                                </span>
                            </div>

                        </div>

                        <div>
                            <Label htmlFor="input">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    register={{ ...register("confirmPassword") }}
                                    error={errors.confirmPassword}
                                    hint={errors.confirmPassword?.message}
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4 ${errors.confirmPassword ? "top-5" : "top-1/2"
                                        }`}
                                >
                                    {showConfirmPassword ? (
                                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                    ) : (
                                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex w-full flex-row gap-5 mt-10">
                            <Button
                                size="sm"
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>

                </div>)}

            </div>
        </div>
    );
}
