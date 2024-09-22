/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "flowbite-react";
import type { UserRegistration } from "./types";
import OTPInput from "../OTPInput";
import { useState } from "react";
const RegistrationStep3 = function (props: UserRegistration) {
  const { email } = props;
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
  const handleSubmit = () => {
    // handle api request here but I'm console logging it
    console.log(OTP.join(""));
  };

  return (
    <>
      <h1 className="mt-10 text-center text-2xl font-bold text-blue-900 dark:text-white md:text-2xl">
        Verify your Email Address
      </h1>
      <span className="-mt-3 mb-3 text-center text-[#6B7280]">
        We emailed you a six-digit code to {email}. Enter the code below to
        confirm your email adress.
      </span>
      {/* <form onSubmit={nextStep}> */}
      <div className="mb-4 flex flex-col gap-y-3">
        <span>OTP</span>
        <OTPInput
          setOTP={setOTP}
          OTP={OTP}
          length={6}
          //   onComplete={() => handleSubmit}
        />
        <span className="text-[14px] text-gray-600">
          Enter a number between 0 and 9
        </span>
      </div>
      <div className="mb-1">
        <Button onClick={() => handleSubmit()} className="w-full">
          Verify & Proceed
        </Button>
      </div>
      <p className="my-6 text-center text-sm text-gray-500 dark:text-gray-300">
        <a href="#" className="text-primary-600 dark:text-primary-300">
          Resend OTP
        </a>
      </p>
      {/* </form> */}
    </>
  );
};

export default RegistrationStep3;
