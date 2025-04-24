import React, { useEffect } from "react";
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

export default function Profile() {
    const userDetails = useRecoilValue(authAtom);
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().required("Email is required"),
        mobileNumber: Yup.string().required("Phone is required"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (userDetails) {
            try {
                const expandedUser = JSON.parse(userDetails)
                setValue("fullName", expandedUser?.user?.fullName)
                setValue("email", expandedUser?.user?.email)
                setValue("mobileNumber", expandedUser?.user?.mobile)

            } catch (error) {
                console.log(error)
            }

        }
    }, [userDetails])

    const onSubmit = (props: any) => {
        console.log(props)
    }

    return (
        <div>
            <PageMeta
                title="Proprly | Profile"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Edit Profile" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <form className="flex gap-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label htmlFor="input">Name</Label>
                            <Input
                                type="text"
                                register={{ ...register("fullName") }}
                                error={errors.fullName}
                                hint={errors.fullName?.message}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="input">Email Address</Label>
                            <Input
                                type="text"
                                register={{ ...register("email") }}
                                error={errors.email}
                                hint={errors.email?.message}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <Label htmlFor="input">Mobile</Label>
                            <Input
                                type="text"
                                register={{ ...register("mobileNumber") }}
                                error={errors.mobileNumber}
                                hint={errors.mobileNumber?.message}
                                placeholder="Enter your mobile number"
                            />
                        </div>
                        <div className="flex w-full flex-row gap-5 mt-10">
                            <Button
                                size="sm"
                                variant="primary"
                                type="button"
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

                </div>

            </div>
        </div>
    );
}
