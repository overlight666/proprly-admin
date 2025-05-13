import { useRegistration } from "@/_recoil/actions";
import { signupLeadsAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input_otp";
import { signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

type RoleDetailsFormProps = {
    verify: any;
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    description?: string;
    nameError?: string;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
};

export const Step3 = ({
    verify,
    canNext,
    values }: RoleDetailsFormProps) => {
    const [otpString, setOtpString] = useState<any>(['', '', '', '', '', ''])
    const registrationAction = useRegistration();
    const signUpLead = useRecoilValue(signupLeadsAtom);
    const [isComplete, setComplete] = useState(false)
    return (
        <div className="w-full max-w-[364px]">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold text-blue-900 mb-2 dark:text-blue-400">
                    Verify your Mobile Number
                </h1>
                <p className="text-gray-500-duplicate dark:text-gray-200">
                    We sent you a six-digit code to xxxxx{values.mobileNumber.substring(values.mobileNumber.length - 3)}. Enter the code to confirm
                    your mobile number.
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 w-full flex flex-col justify-center items-center">
                <div className="flex-col items-start gap-2 flex-[0_0_auto] flex relative">
                    <label className="relative self-stretch mt-[-1.00px] font-text-sm-font-medium font-sm text-gray-900 text-md tracking-[var(--text-sm-font-medium-letter-spacing)] leading-[var(--text-sm-font-medium-line-height)] [font-style:var(--text-sm-font-medium-font-style)] dark:text-gray-200">
                        OTP
                    </label>

                    <InputOTP maxLength={6} className="w-full justify-between">
                        {[...Array(6)].map((_, index) => (
                            <InputOTPGroup
                                key={index}
                                className={`border-primary-600`}
                            >
                                <InputOTPSlot
                                    index={index}
                                    onChange={(e) => {
                                        otpString[index] = e;
                                        setOtpString(otpString)
                                        const isComplete = otpString.filter((e: any) => e == null || e == '' || e == 'null');
                                        if (isComplete?.length == 0) {
                                            setComplete(true)
                                        }
                                    }}
                                    className={`w-9 h-9 bg-gray-50 rounded-lg font-extrabold`}
                                />
                            </InputOTPGroup>
                        ))}
                    </InputOTP>

                    <p className="relative self-stretch font-leading-tight-text-sm-font-normal font-[number:var(--leading-tight-text-sm-font-normal-font-weight)] text-gray-500 text-[length:var(--leading-tight-text-sm-font-normal-font-size)] tracking-[var(--leading-tight-text-sm-font-normal-letter-spacing)] leading-[var(--leading-tight-text-sm-font-normal-line-height)] [font-style:var(--leading-tight-text-sm-font-normal-font-style)]">
                        Enter a number between 0 and 9
                    </p>
                </div>


                {/* Submit Button */}
                <Button
                    disabled={canNext || !isComplete}
                    onClick={() => verify(otpString.join(""), signUpLead?.id)}
                    className="w-full bg-[#1a56db] hover:bg-[#1a56db]/90 text-white py-3">
                    Next
                </Button>

                {/* Login Link */}
                <div className="text-center text-xs mt-4" onClick={() => registrationAction.resendOTP(signUpLead?.id).then((e: any) => {
                    if (e && e?.sent) {
                        toast.success("OTP sent successfully!")
                    } else {
                        toast.error("Failed to resend OTP!")
                    }
                })}>
                    <span className="text-[#1a56db] font-semibold dark:text-blue-200 cursor-pointer">
                        Resend OTP
                    </span>
                </div>
            </div>
        </div>
    )
}