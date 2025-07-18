
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Step2Props = {
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
    onSubmit: () => void;
};

export const Step2 = ({
    errors,
    canNext,
    values,
    handleChange,
    setFieldValue,
    onSubmit
}: Step2Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="w-full min-w-[500px]">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-200">
                    Personal Information
                </h1>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                    Please provide your personal details
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Full Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={values.fullName}
                        name="fullName"
                        className="w-full"
                        placeholder="Enter your full name"
                        onChange={handleChange}
                        error={errors.fullName}
                        hint={errors.fullName}
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email Address<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={values.email}
                        name="email"
                        type="email"
                        className="w-full"
                        placeholder="Enter your email address"
                        onChange={handleChange}
                        error={errors.email}
                        hint={errors.email}
                    />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Mobile Number<span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                        country="ae"
                        value={values.mobileNumber}
                        onChange={(phone) => setFieldValue("mobileNumber", phone)}
                        inputStyle={{
                            width: "100%",
                            height: "42px",
                            fontSize: "14px",
                            border: errors.mobileNumber ? "1px solid #ef4444" : "1px solid #d1d5db",
                            borderRadius: "6px",
                            paddingLeft: "48px",
                            backgroundColor: "white",
                            color: "#111827"
                        }}
                        buttonStyle={{
                            border: errors.mobileNumber ? "1px solid #ef4444" : "1px solid #d1d5db",
                            borderRadius: "6px 0 0 6px",
                            backgroundColor: "#f9fafb"
                        }}
                        containerClass="w-full"
                        inputClass="w-full"
                        placeholder="Enter your mobile number"
                    />
                    {errors.mobileNumber && (
                        <p className="text-sm text-red-500">{errors.mobileNumber}</p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Password<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            value={values.password}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full pr-12"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            error={errors.password}
                            hint={errors.password}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeClosedIcon className="h-4 w-4" />
                            ) : (
                                <EyeIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Confirm Password<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            value={values.confirmPassword}
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full pr-12"
                            placeholder="Confirm your password"
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            hint={errors.confirmPassword}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeClosedIcon className="h-4 w-4" />
                            ) : (
                                <EyeIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={canNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-6"
                >
                    Create Account
                </Button>

                {/* Login Link */}
                <div className="text-center text-sm mt-4">
                    <span className="text-gray-600 dark:text-gray-400">
                        Already registered?{" "}
                    </span>
                    <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Click here to Log In
                    </a>
                </div>
            </form>
        </div>
    );
};

type Step2Props = {
    onSubmit: () => void;
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
};

export const Step2 = ({
    onSubmit,
    errors,
    canNext,
    values,
    handleChange,
    setFieldValue,
}: Step2Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-full min-w-[500px] max-w-[500px]">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-200">
                    Personal Info
                </h1>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                    Fill in your personal details
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Full Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={values.fullName}
                        name="fullName"
                        className="w-full"
                        placeholder="John"
                        onChange={handleChange}
                        error={errors.fullName}
                        hint={errors.fullName}
                    />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Mobile Number<span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                        country={"au"}
                        containerClass="w-full"
                        inputClass="!h-11 !w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:!bg-gray-900 dark:!text-white/90 dark:!placeholder:text-white/30 dark:!border-gray-700"
                        value={values.mobileNumber}
                        onChange={(phone) => {
                            setFieldValue("mobileNumber", `+${phone}`)
                        }}
                    />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email Address<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        className="w-full"
                        placeholder="test@test.com"
                        error={errors.email}
                        hint={errors.email}
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Password<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            type={!showPassword ? "password" : "text"}
                            className="w-full pr-10"
                            placeholder="xxxxxxxxxxxxx"
                            error={errors.password}
                            hint={errors.password}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Confirm Password<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            type={!showConfirmPassword ? "password" : "text"}
                            className="w-full pr-10"
                            placeholder="xxxxxxxxxxxxx"
                            error={errors.confirmPassword}
                            hint={errors.confirmPassword}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Get Started Button */}
                <Button
                    disabled={canNext}
                    onClick={onSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-6"
                >
                    Get Started
                </Button>

                {/* Login Link */}
                <div className="text-center text-sm mt-4">
                    <span className="text-gray-600 dark:text-gray-400">
                        Already registered?{" "}
                    </span>
                    <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Click here to Log In
                    </a>
                </div>
            </div>
        </div>
    );
};
