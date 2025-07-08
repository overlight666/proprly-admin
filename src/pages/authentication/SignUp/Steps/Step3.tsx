
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input_otp";
import { signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

type Step3Props = {
    values: signUpForm;
    verifyEmail: (otp: string) => void;
    resendEmailOTP: () => void;
    canNext: boolean;
};

export const Step3 = ({ values, verifyEmail, resendEmailOTP }: Step3Props) => {
    const [otpString, setOtpString] = useState<string[]>(['', '', '', '', '', '']);
    const [isComplete, setComplete] = useState(false);

    const handleOTPChange = (index: number, value: string) => {
        const newOtp = [...otpString];
        newOtp[index] = value;
        setOtpString(newOtp);
        
        const isComplete = newOtp.every(digit => digit !== '');
        setComplete(isComplete);
    };

    const handleResendOTP = () => {
        resendEmailOTP();
        toast.success("OTP sent successfully!");
    };

    return (
        <div className="w-full max-w-[400px]">
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Verify your Email Address
                </h1>
                <p className="text-gray-500 text-sm">
                    We emailed you a six-digit code to{" "}
                    <span className="font-medium text-gray-900">{values.email}</span>. Enter
                    the code below to confirm your email address.
                </p>
            </div>

            {/* OTP Section */}
            <div className="space-y-6">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        OTP
                    </label>
                    
                    <div className="flex justify-center">
                        <InputOTP maxLength={6} className="gap-2">
                            {[...Array(6)].map((_, index) => (
                                <InputOTPGroup key={index}>
                                    <InputOTPSlot
                                        index={index}
                                        onChange={(value) => handleOTPChange(index, value)}
                                        className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-600 focus:outline-none"
                                    />
                                </InputOTPGroup>
                            ))}
                        </InputOTP>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Enter a number between 0 and 9
                    </p>
                </div>

                {/* Verify Button */}
                <Button
                    disabled={!isComplete}
                    onClick={() => verifyEmail(otpString.join(""))}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                >
                    Verify & Proceed
                </Button>

                {/* Resend OTP */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};
