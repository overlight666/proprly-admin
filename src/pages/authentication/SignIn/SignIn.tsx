
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
import { Alert, AlertDescription } from "../../../components/ui/alert";
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
    const [authError, setAuthError] = useState<string>("");
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
            try {
                setAuthError("");
                await userAction.login(values.email, values.password, navigate);
            } catch (error) {
                setAuthError("Incorrect username or password");
            }
        },
    });

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" 
             style={{ backgroundImage: "url('/images/authentication/login.jpg')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            {/* Header */}
            <div className="relative z-10 flex justify-between items-center p-6">
                <div className="flex items-center gap-2">
                    <div className="text-white text-2xl font-bold">Proprly.</div>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">Proprly</a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">Contact Us</a>
                    <Button 
                        onClick={() => navigate("/sign-up")} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-120px)] px-6">
                <Card className="w-full max-w-md bg-white shadow-2xl rounded-lg">
                    <CardHeader className="text-center space-y-2 pb-4">
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Sign In
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Enter your email and password to sign in!
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {/* Error Alert */}
                        {authError && (
                            <Alert variant="destructive" className="border-red-200 bg-red-50">
                                <AlertDescription className="text-red-800 text-sm">
                                    {authError}
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email*
                                </label>
                                <Input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    name="email"
                                    type="email"
                                    className="w-full"
                                    placeholder="name@company.com"
                                    error={formik.errors.email}
                                    hint={formik.errors.email}
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password*
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={!showPassword ? "password" : "text"}
                                        placeholder="Minimum 8 characters"
                                        className="w-full pr-10"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.errors.password}
                                        hint={formik.errors.password}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        aria-label="Toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="keep-logged-in"
                                        defaultChecked
                                        className="w-4 h-4"
                                    />
                                    <label
                                        htmlFor="keep-logged-in"
                                        className="text-sm text-gray-600"
                                    >
                                        Keep me logged in
                                    </label>
                                </div>

                                <button
                                    onClick={() => navigate("/forgot-password")}
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={!formik.values.email || !formik.values.password || Object.keys(formik.errors).length > 0}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sign In
                            </Button>

                            <div className="text-center pt-2">
                                <span className="text-sm text-gray-600">
                                    Not registered yet?{" "}
                                </span>
                                <a
                                    href="/sign-up"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Create an account
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-center text-white text-sm py-4">
                © 2024 Proprly. All Rights Reserved.
            </div>
        </div>
    );
};
