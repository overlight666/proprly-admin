import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import { signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router";

type RoleDetailsFormProps = {
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    description?: string;
    nameError?: string;
    handleNext: any;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
};

export const Step1 = ({
    errors,
    canNext,
    values,
    handleChange,
    setFieldValue,
    handleNext
}: RoleDetailsFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-[364px]">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold text-blue-900 mb-2 dark:text-blue-400">
                    Lets get started
                </h1>
                <p className="text-gray-500-duplicate dark:text-gray-200">
                    Sign Up for your new account!
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Full name*
                    </label>
                    <Input
                        value={values.fullName}
                        name="fullName"
                        className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                        placeholder="Please enter your full name"
                        onChange={handleChange}
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Email*
                    </label>
                    <Input
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                        placeholder="Please enter your email address"
                        error={errors.email}
                        hint={errors.email}
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Password*
                    </label>
                    <div className="relative">
                        <Input
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            type={!showPassword ? "password" : "text"}
                            className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate pr-10"
                            placeholder="Minimum 8 characters"
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

                {/* Mobile Number */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Mobile number*
                    </label>
                    <PhoneInput
                        country={"au"}
                        containerClass="w-full"
                        inputClass="!h-11 !w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:!bg-gray-900 dark:!text-white/90 dark:!placeholder:text-white/30 dark:!border-gray-700"
                        onChange={(phone) => {
                            setFieldValue("mobileNumber", `+${phone}`)
                        }}
                    />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center gap-2">

                    <Checkbox
                        id="keep-logged-in"
                        checked={values.agreed}
                        onCheckedChange={(e) => setFieldValue("agreed", e)}
                        className="w-[18.5px] h-[18.5px] bg-colors-primary-700 border-colors-primary-700 rounded data-[state=checked]:bg-colors-primary-700"
                    />

                    <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-200">
                            I agree to the{" "}
                        </span>
                        <span className="text-[#1f2a37] underline dark:text-blue-200">
                            Terms of Service
                        </span>
                        <span className="text-gray-500 dark:text-gray-200"> and </span>
                        <span className="text-[#1f2a37] underline font-medium dark:text-blue-200">
                            Privacy Policy
                        </span>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    disabled={canNext}
                    onClick={handleNext}
                    className="w-full bg-[#1a56db] hover:bg-[#1a56db]/90 text-white py-3">
                    Get Started
                </Button>

                {/* Login Link */}
                <div className="text-center text-xs mt-4">
                    <span className="text-[#233876] dark:text-blue-400">
                        Already registered?{" "}
                    </span>
                    <span className="text-[#1a56db] font-semibold dark:text-blue-200 cursor-pointer" onClick={() => {
                        navigate("/sign-in")
                    }}>
                        Click here to Log In
                    </span>
                </div>
            </div>
        </div>
    )
}