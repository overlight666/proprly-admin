/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Step1 from "../../_components/registration-steps/Step1";
import { useCountriesAction } from "../../_actions/countries.actions";
import Step2 from "../../_components/registration-steps/Step2";
import Step3 from "../../_components/registration-steps/Step3";
import { useRegistration } from "../../_actions";
import { resentOtpAtom, signupLeadsAtom, verifyResultAtom } from "../../_state";
import { useRecoilValue } from "recoil";
import Step4 from "../../_components/registration-steps/Step4";
import React from "react";
export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState<any>(undefined);
  const countriesAction = useCountriesAction();
  const registrationAction = useRegistration();
  const [hasError, setHasError] = useState<any>();
  const [hasSuccess, setHasSuccess] = useState<any>();
  const signUpLead = useRecoilValue(signupLeadsAtom);
  const verifyResult = useRecoilValue(verifyResultAtom);
  const isResent = useRecoilValue(resentOtpAtom);

  useEffect(() => {
    countriesAction.getCountries();
  }, []);

  function onSubmitStep1({ firstName, lastName, email, password }: any) {
    setMobileNumber(`+${mobileNumber?.phone}`);
    setPassword(password);
    setEmail(email);
    setFullName(`${firstName} ${lastName}`);
    setStep(2);
  }

  function onSubmitStep2({
    organizationCountryCode,
    organizationName,
    organizationTimezone,
  }: any) {
    return registrationAction
      .registerLead(
        {
          fullName,
          email,
          password,
          mobileNumber,
          organizationCountryCode,
          organizationName,
          organizationTimezone,
        },
        setStep
      )
      .catch((error: any) => {
        setHasError(error);
      });
  }

  function onSubmitStep3(otp: string) {
    if (otp.length < 6) {
      setHasError([
        {
          message: "Invalid OTP",
        },
      ]);
    } else {
      return registrationAction
        .verifyOtp(
          {
            otp: otp,
          },
          signUpLead.id
        )
        .catch((error: any) => {
          setHasError(error);
        });
    }
  }

  function onResend() {
    return registrationAction.resendOTP(signUpLead.id).catch((error: any) => {
      setHasError(error);
    });
  }

  useEffect(() => {
    if (verifyResult) {
      if (verifyResult.verified) {
        setStep(4);
        setHasError(undefined);
      } else {
        setHasError([
          {
            message: "Invalid OTP",
          },
        ]);
      }
    }
  }, [verifyResult]);

  useEffect(() => {
    if (isResent) {
      if (isResent.sent) {
        setHasSuccess("New OTP has been sent!");
      }
    }
  }, [isResent]);

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar ">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="p-10 bg-white rounded-md dark:border-gray-800 dark:bg-gray-800 !dark:text-white">
          <div className="mb-5 sm:mb-8">
            {step !== 5 && (
              <ol className="flex w-full items-center text-xs font-medium text-gray-900 sm:text-base">
                <li className="relative flex w-full text-gray-900  after:absolute  after:left-[90px] after:top-3  after:inline-block after:h-0.5 after:w-[50px] after:bg-gray-200 after:content-[''] lg:after:top-4">
                  <div className="z-10 block whitespace-nowrap">
                    {(step >= 1 && (
                      <svg
                        className="mx-auto mb-3 h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.1272 7.89384L18.2355 7.00102C18.0469 6.81332 17.9436 6.56305 17.9436 6.29789V5.03464C17.9436 3.39201 16.6071 2.05527 14.9648 2.05527H13.7017C13.4406 2.05527 13.1844 1.949 12.9997 1.76428L12.107 0.871465C10.9453 -0.290488 9.0567 -0.290488 7.89495 0.871465L7.0003 1.76428C6.81561 1.949 6.55943 2.05527 6.29828 2.05527H5.03525C3.39291 2.05527 2.0564 3.39201 2.0564 5.03464V6.29789C2.0564 6.56305 1.95313 6.81332 1.76547 7.00102L0.872803 7.89284C0.309801 8.45594 0 9.20476 0 10.0002C0 10.7957 0.310793 11.5446 0.872803 12.1067L1.76447 12.9995C1.95313 13.1872 2.0564 13.4374 2.0564 13.7026V14.9659C2.0564 16.6085 3.39291 17.9452 5.03525 17.9452H6.29828C6.55943 17.9452 6.81561 18.0515 7.0003 18.2362L7.89296 19.13C8.47384 19.71 9.23642 20 9.99901 20C10.7616 20 11.5242 19.71 12.1051 19.129L12.9977 18.2362C13.1844 18.0515 13.4406 17.9452 13.7017 17.9452H14.9648C16.6071 17.9452 17.9436 16.6085 17.9436 14.9659V13.7026C17.9436 13.4374 18.0469 13.1872 18.2355 12.9995L19.1272 12.1077C19.6892 11.5446 20 10.7967 20 10.0002C20 9.20376 19.6902 8.45594 19.1272 7.89384ZM14.5229 8.84028L8.56519 12.8128C8.39738 12.925 8.20475 12.9796 8.0141 12.9796C7.75792 12.9796 7.50372 12.8803 7.31209 12.6886L5.32618 10.7024C4.93794 10.3141 4.93794 9.68642 5.32618 9.29811C5.71443 8.9098 6.34197 8.9098 6.73022 9.29811L8.14021 10.7083L13.4207 7.18773C13.8785 6.88284 14.4941 7.00598 14.7979 7.46282C15.1028 7.91966 14.9796 8.53639 14.5229 8.84028Z"
                          fill="#1A56DB"
                        />
                      </svg>
                    )) || (
                      <span className="mx-auto mb-3 flex h-6 w-6 items-center justify-center rounded-full border-none border-indigo-600 bg-none text-sm text-gray-600 lg:h-6 lg:w-6">
                        1
                      </span>
                    )}
                    <div className="flex !w-[100px] items-center justify-center text-center text-xs dark:text-white">
                      Personal Info
                    </div>
                  </div>
                </li>
                <li className="relative flex w-full text-gray-900  after:absolute  after:left-[130px] after:top-3  after:inline-block after:h-0.5 after:w-[50px] after:bg-gray-200 after:content-[''] lg:after:top-4">
                  <div className="z-10 ml-7 block whitespace-nowrap">
                    {(step >= 2 && (
                      <svg
                        className="mx-auto mb-3 h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.1272 7.89384L18.2355 7.00102C18.0469 6.81332 17.9436 6.56305 17.9436 6.29789V5.03464C17.9436 3.39201 16.6071 2.05527 14.9648 2.05527H13.7017C13.4406 2.05527 13.1844 1.949 12.9997 1.76428L12.107 0.871465C10.9453 -0.290488 9.0567 -0.290488 7.89495 0.871465L7.0003 1.76428C6.81561 1.949 6.55943 2.05527 6.29828 2.05527H5.03525C3.39291 2.05527 2.0564 3.39201 2.0564 5.03464V6.29789C2.0564 6.56305 1.95313 6.81332 1.76547 7.00102L0.872803 7.89284C0.309801 8.45594 0 9.20476 0 10.0002C0 10.7957 0.310793 11.5446 0.872803 12.1067L1.76447 12.9995C1.95313 13.1872 2.0564 13.4374 2.0564 13.7026V14.9659C2.0564 16.6085 3.39291 17.9452 5.03525 17.9452H6.29828C6.55943 17.9452 6.81561 18.0515 7.0003 18.2362L7.89296 19.13C8.47384 19.71 9.23642 20 9.99901 20C10.7616 20 11.5242 19.71 12.1051 19.129L12.9977 18.2362C13.1844 18.0515 13.4406 17.9452 13.7017 17.9452H14.9648C16.6071 17.9452 17.9436 16.6085 17.9436 14.9659V13.7026C17.9436 13.4374 18.0469 13.1872 18.2355 12.9995L19.1272 12.1077C19.6892 11.5446 20 10.7967 20 10.0002C20 9.20376 19.6902 8.45594 19.1272 7.89384ZM14.5229 8.84028L8.56519 12.8128C8.39738 12.925 8.20475 12.9796 8.0141 12.9796C7.75792 12.9796 7.50372 12.8803 7.31209 12.6886L5.32618 10.7024C4.93794 10.3141 4.93794 9.68642 5.32618 9.29811C5.71443 8.9098 6.34197 8.9098 6.73022 9.29811L8.14021 10.7083L13.4207 7.18773C13.8785 6.88284 14.4941 7.00598 14.7979 7.46282C15.1028 7.91966 14.9796 8.53639 14.5229 8.84028Z"
                          fill="#1A56DB"
                        />
                      </svg>
                    )) || (
                      <span className="mx-auto mb-3 flex h-6 w-6 items-center justify-center rounded-full border-none border-indigo-600 bg-none text-sm text-gray-600 lg:h-6 lg:w-6">
                        2
                      </span>
                    )}
                    <div className="flex !w-[100px] items-center justify-center text-center text-xs  dark:text-white">
                      Organization Info
                    </div>
                  </div>
                </li>
                <li className="relative flex w-full text-gray-900">
                  <div className="z-10 ml-12 block whitespace-nowrap">
                    {(step >= 3 && (
                      <svg
                        className="mx-auto mb-3 h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.1272 7.89384L18.2355 7.00102C18.0469 6.81332 17.9436 6.56305 17.9436 6.29789V5.03464C17.9436 3.39201 16.6071 2.05527 14.9648 2.05527H13.7017C13.4406 2.05527 13.1844 1.949 12.9997 1.76428L12.107 0.871465C10.9453 -0.290488 9.0567 -0.290488 7.89495 0.871465L7.0003 1.76428C6.81561 1.949 6.55943 2.05527 6.29828 2.05527H5.03525C3.39291 2.05527 2.0564 3.39201 2.0564 5.03464V6.29789C2.0564 6.56305 1.95313 6.81332 1.76547 7.00102L0.872803 7.89284C0.309801 8.45594 0 9.20476 0 10.0002C0 10.7957 0.310793 11.5446 0.872803 12.1067L1.76447 12.9995C1.95313 13.1872 2.0564 13.4374 2.0564 13.7026V14.9659C2.0564 16.6085 3.39291 17.9452 5.03525 17.9452H6.29828C6.55943 17.9452 6.81561 18.0515 7.0003 18.2362L7.89296 19.13C8.47384 19.71 9.23642 20 9.99901 20C10.7616 20 11.5242 19.71 12.1051 19.129L12.9977 18.2362C13.1844 18.0515 13.4406 17.9452 13.7017 17.9452H14.9648C16.6071 17.9452 17.9436 16.6085 17.9436 14.9659V13.7026C17.9436 13.4374 18.0469 13.1872 18.2355 12.9995L19.1272 12.1077C19.6892 11.5446 20 10.7967 20 10.0002C20 9.20376 19.6902 8.45594 19.1272 7.89384ZM14.5229 8.84028L8.56519 12.8128C8.39738 12.925 8.20475 12.9796 8.0141 12.9796C7.75792 12.9796 7.50372 12.8803 7.31209 12.6886L5.32618 10.7024C4.93794 10.3141 4.93794 9.68642 5.32618 9.29811C5.71443 8.9098 6.34197 8.9098 6.73022 9.29811L8.14021 10.7083L13.4207 7.18773C13.8785 6.88284 14.4941 7.00598 14.7979 7.46282C15.1028 7.91966 14.9796 8.53639 14.5229 8.84028Z"
                          fill="#1A56DB"
                        />
                      </svg>
                    )) || (
                      <span className="mx-auto mb-3 flex h-6 w-6 items-center justify-center rounded-full border-none border-indigo-600 bg-none text-sm text-gray-600 lg:h-6 lg:w-6">
                        3
                      </span>
                    )}
                    <div className="flex !w-[100px] items-center justify-center text-center text-xs  dark:text-white">
                      {step == 3 ? "Verify" : "Verify Mobile No"}
                    </div>
                  </div>
                </li>
              </ol>
            )}
          </div>
          {step === 1 ? (
            <Step1
              onSubmitStep1={onSubmitStep1}
              setMobileNumber={setMobileNumber}
            />
          ) : step === 2 ? (
            <Step2 onSubmitStep2={onSubmitStep2} />
          ) : step === 3 ? (
            <Step3
              onSubmitStep3={onSubmitStep3}
              onResend={onResend}
              mobileNumber={mobileNumber}
            />
          ) : (
            <Step4 />
          )}
          {hasError && (
            <div className="mt-5 flex justify-center items-center p-3 rounded-md w-full bg-red-100 text-red-600 flex-col">
              {hasError && hasError.length > 0
                ? hasError.map((m: any) => <span>{m.message}</span>)
                : hasError.message}
            </div>
          )}
          {hasSuccess && (
            <div className="mt-5 flex justify-center items-center p-3 rounded-md w-full bg-green-100 text-green-600 flex-col">
              {hasSuccess}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
