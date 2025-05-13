import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import Input from "../../../components/ui/input";
import { useState } from "react";
import { PublicWrapper } from "@/components/public-wrapper";
import { useNavigate } from "react-router";
import { signInForm } from "@/lib/interface";
import { signinValidattion } from "@/lib/validations";
import { FormikHelpers, useFormik } from "formik";
import { useUserActions } from "@/_recoil/actions";

export const SignIn = (): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const userAction = useUserActions();

    const initialValues = {
        email: '',
        password: ''
    }
    const formik = useFormik<signInForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: signinValidattion,
        onSubmit: async (
            values: signInForm,
            _formikHelpers: FormikHelpers<signInForm>,
        ) => {
            userAction.login(values.email, values.password, navigate)
        },
    });

    // Navigation menu items
    return (
        <PublicWrapper>
            <div className="flex justify-center items-center mt-10">
                <Card className="w-[40%] min-w-[400px] bg-white shadow-shadow rounded-lg">
                    <CardHeader className="text-center space-y-1">
                        <CardTitle className="text-3xl font-bold text-blue-900 dark:text-blue-400">
                            Sign In
                        </CardTitle>
                        <CardDescription className="text-base font-normal text-gray-500 dark:text-gray-300">
                            Enter your email and password to sign in!
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

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-blue-900 dark:text-blue-400"
                            >
                                Password*
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={!showPassword ? "password" : "text"}
                                    placeholder="Minimum 8 characters"
                                    className="bg-gray-50 border-gray-300 font-leading-tight-text-sm-font-normal text-gray-800 pr-10"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.errors.password}
                                    hint={formik.errors.password}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    aria-label="Toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeIcon className="w-[22px] h-[22px] text-gray-500" /> : <EyeClosedIcon className="w-[22px] h-[22px] text-gray-500" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="keep-logged-in"
                                    defaultChecked
                                    className="w-[18.5px] h-[18.5px] bg-colors-primary-700 border-colors-primary-700 rounded data-[state=checked]:bg-colors-primary-700"
                                />
                                <label
                                    htmlFor="keep-logged-in"
                                    className="text-xs leading-none text-[#111928] font-leading-none-text-xs-font-normal dark:text-gray-200"
                                >
                                    Keep me logged in
                                </label>
                            </div>

                            <button
                                onClick={() => {
                                    navigate("/forgot-password")
                                }}
                                type="button"
                                className="text-xs leading-none text--primary-700 font-leading-none-text-xs-font-medium dark:text-gray-200"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Button
                            onClick={() => formik.handleSubmit()}
                            disabled={!formik.values.email || !formik.values.password || Object.keys(formik.errors).length > 0}
                            className="w-full bg-[#1a56db] text-white font-text-base-font-semibold py-3">
                            Sign In
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
            </div>
        </PublicWrapper>
    );
};
