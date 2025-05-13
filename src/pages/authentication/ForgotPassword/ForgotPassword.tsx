import { forgotForm } from "@/lib/interface";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import Input from "../../../components/ui/input";
import { PublicWrapper } from "@/components/public-wrapper";
import { FormikHelpers, useFormik } from "formik";
import { forgotValidattion } from "@/lib/validations";
import { useUserActions } from "@/_recoil/actions";
import { useState } from "react";

export const ForgotPassword = (): JSX.Element => {
    const userAction = useUserActions();
    const [isReset, setIsReset] = useState(false);
    const initialValues = {
        email: ''
    }
    const formik = useFormik<forgotForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: forgotValidattion,
        onSubmit: async (
            values: forgotForm,
            formikHelpers: FormikHelpers<forgotForm>,
        ) => {
            userAction.forgotPassword(values.email).then((e: any) => {
                if (e && e?.message) {
                    setIsReset(true)
                }
            })
        },
    });
    // Navigation menu items
    return (
        <PublicWrapper>
            <div className="flex justify-center items-center mt-10">
                {!isReset ? <Card className="w-[40%] min-w-[400px] bg-white shadow-shadow rounded-lg">
                    <CardHeader className="text-center space-y-1">
                        <CardTitle className="text-3xl font-bold text-blue-900 dark:text-blue-400">
                            Forgot Password?
                        </CardTitle>
                        <CardDescription className="text-base font-normal text-gray-500 dark:text-gray-300">
                            Enter your email to retrieve your password!
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block font-text-sm-font-medium text-blue-900 dark:text-blue-400"
                            >
                                Email*
                            </label>
                            <Input
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                name="email"
                                className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                                placeholder="Please enter your email address"
                                error={formik.errors.email}
                                hint={formik.errors.email}
                            />
                        </div>

                        <Button onClick={() => formik.handleSubmit()} disabled={!formik.values?.email || Object.keys(formik.errors).length > 0} className="w-full bg-[#1a56db] text-white font-text-base-font-semibold py-3">
                            Send Reset Instructions
                        </Button>

                        <div className="text-center">
                            <span className="text-xs font-leading-none-text-xs-font-medium text-[#233876] dark:text-blue-200">
                                Not registered yet?{" "}
                            </span>
                            <a
                                href="/sign-up"
                                className="text-xs font-leading-none-text-xs-font-semibold text-[#1a56db] dark:text-blue-400"
                            >
                                Create an account
                            </a>
                        </div>
                    </CardContent>
                </Card>
                    :
                    <Card className="w-[40%] min-w-[400px] bg-white shadow-shadow rounded-lg">
                        <CardHeader className="text-center space-y-1">
                            <CardTitle className="text-3xl font-bold text-blue-900 dark:text-blue-400">
                                Forgot Password?
                            </CardTitle>
                            <CardDescription className="text-base font-normal text-gray-500 dark:text-gray-300">
                                Your password reset instructions has been sent to {formik.values.email}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div className="text-center">
                                <a
                                    href="/sign-in"
                                    className="text-xs font-leading-none-text-xs-font-semibold text-[#1a56db] dark:text-blue-400"
                                >
                                    Back to Login
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                }
            </div>
        </PublicWrapper>
    );
};
