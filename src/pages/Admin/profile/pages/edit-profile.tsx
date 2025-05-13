import { authAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { Breadcrumb, Label } from "flowbite-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";

const EditProfilePage: FC = function () {


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
                        <Breadcrumb.Item href="/profile">Profile</Breadcrumb.Item>
                        <Breadcrumb.Item>Edit</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Edit Profile
                    </h1>
                </div>


            </div>
            <div className="p-5">
                <ProfileIntro />
            </div>
        </NavbarSidebarLayout>
    );
};


const ProfileIntro: FC = function () {
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

                        type="button"
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

export default EditProfilePage