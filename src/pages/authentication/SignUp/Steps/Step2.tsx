
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
        <div className="w-full max-w-[400px]">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Personal Info
                </h1>
                <p className="text-gray-500 text-sm">
                    Fill in your personal details
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Full Name*
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
                    <label className="text-sm font-medium text-gray-700">
                        Mobile Number*
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
                    <label className="text-sm font-medium text-gray-700">
                        Email Address*
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
                    <label className="text-sm font-medium text-gray-700">
                        Password*
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
                    <label className="text-sm font-medium text-gray-700">
                        Confirm Password*
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                    <span className="text-gray-600">
                        Already registered?{" "}
                    </span>
                    <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800">
                        Click here to Log In
                    </a>
                </div>
            </div>
        </div>
    );
};
