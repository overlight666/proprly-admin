import { useUserActions } from "@/_recoil/actions";
import { authAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { EyeCloseIcon } from "@/icons";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { Breadcrumb, Label } from "flowbite-react";
import { EyeIcon } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";

const AccountSettingsPage: FC = function () {


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
                        <Breadcrumb.Item>Account Settings</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Account Settings
                    </h1>
                </div>


            </div>
            <div className="p-5">
                <ChangePassword />
            </div>
        </NavbarSidebarLayout>
    );
};


const ChangePassword: FC = function () {
    const userDetails = useRecoilValue(authAtom);
    const navigate = useNavigate()
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
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
        </div>

    );
};
export default AccountSettingsPage