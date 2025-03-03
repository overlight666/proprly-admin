/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import OtpInput from "react-otp-input";
import React from "react";
export default function Step3({ onSubmitStep3, onResend }: any) {
  const [otp, setOtp] = useState("");
  return (
    <div>
      <div className="space-y-5 relative">
        <div className="space-y-1 text-center">
          <h1 className="text-[22px] text-blue-900">
            Verify your Mobile Number
          </h1>
          <span className="text-sm text-gray-400 font-normal">
            We sent you a six-digit code to xxxxxx 243. Enter the code to
            confirm your mobile number.
          </span>
        </div>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={`!max-w-[4rem] !min-w-[3rem] rounded-md`}
          containerStyle={
            "!flex !w-full !relative !items-center !justify-center"
          }
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
        <div>
          <button
            onClick={() => onSubmitStep3(otp)}
            className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 `}
          >
            Verify & Proceed
          </button>
        </div>
        <div className="flex justify-center">
          <span
            className="text-blue-600 text-center cursor-pointer"
            onClick={() => onResend()}
          >
            Resend OTOP
          </span>
        </div>
      </div>
    </div>
  );
}
