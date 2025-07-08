
import { useRegistration } from "@/_recoil/actions";
import { signupLeadsAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input_otp";
import { signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

type Step4Props = {
    verify: any;
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    successMessage?: string;
    errorMessage?: string;
    onClearMessage?: () => void;
};

export const Step4 = ({
    verify,
    canNext,
    values,
    successMessage,
    errorMessage,
    onClearMessage
}: Step4Props) => {
    const [otpString, setOtpString] = useState<string[]>(['', '', '', '', '', '']);
    const registrationAction = useRegistration();
    const signUpLead = useRecoilValue(signupLeadsAtom);
    const [isComplete, setComplete] = useState(false);

    const handleOTPChange = (index: number, value: string) => {
        const newOtp = [...otpString];
        newOtp[index] = value;
        setOtpString(newOtp);
        
        const isComplete = newOtp.every(digit => digit !== '');
        setComplete(isComplete);
        
        // Clear any existing messages when user starts typing
        if (onClearMessage) {
            onClearMessage();
        }
    };

    const handleResendOTP = () => {
        registrationAction.resendOTP(signUpLead?.id).then((e: any) => {
            if (e && e?.sent) {
                toast.success("OTP sent successfully!");
            } else {
                toast.error("Failed to resend OTP!");
            }
        });
    };

    return (
        <div className="w-full max-w-[400px]">
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Verify your Mobile Number
                </h1>
                <p className="text-gray-500 text-sm">
                    We sent you a six-digit code to{" "}
                    <span className="font-medium text-gray-900">
                        xxxxx{values.mobileNumber?.substring(values.mobileNumber.length - 3)}
                    </span>. Enter the code to confirm your mobile number.
                </p>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{successMessage}</span>
                    </div>
                    {onClearMessage && (
                        <button onClick={onClearMessage} className="text-green-600 hover:text-green-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {errorMessage && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{errorMessage}</span>
                    </div>
                    {onClearMessage && (
                        <button onClick={onClearMessage} className="text-red-600 hover:text-red-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

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
                    disabled={canNext || !isComplete}
                    onClick={() => verify(otpString.join(""), signUpLead?.id)}
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
