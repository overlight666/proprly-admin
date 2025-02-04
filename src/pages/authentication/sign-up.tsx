/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card } from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import PublicFooter from "../../components/public-footer";
import PublicNav from "../../components/public-nav";
import "react-phone-input-2/lib/style.css";
import RegistrationStep1 from "../../components/registration-components/step1";
import RegistrationStep2 from "../../components/registration-components/step2";
// import RegistrationStep3 from "../../components/registration-components/step3";
import RegistrationStep4 from "../../components/registration-components/step4";
import RegistrationStep5 from "../../components/registration-components/step5";
import { type OtpType, type leadRegistration } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import {
  registerLead,
  resendOtpVerify,
  VerifyOtp,
} from "../../store/features/reducers";
import type { LeadState, OtpState } from "../../types";
import ErrorHandler from "../../components/error";
import SuccessHandler from "../../components/success";
import {
  clearOtp,
  clearResendResponse,
} from "../../store/features/otpHandlingSlice";

const SignUpPage: FC = function () {
  const { isIdle, loading, leadData }: LeadState = useSelector(
    (state: any) => state.lead,
  );
  const { otpResponse, verifying, resendResponse }: OtpState = useSelector(
    (state: any) => state.otpVerifier,
  );
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [header, setHeader] = useState("Lets get started");
  const [subHeader, setSubHeader] = useState("Sign Up for your new account!");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isIdle && loading) {
      setIsTriggered(true);
    }
    if (isTriggered && isIdle && !loading) {
      try {
        if (leadData.id !== undefined && leadData.id > 0) {
          //go to success page
          setFormData((prevFormData) => ({
            ...prevFormData,
            ["step"]: prevFormData.step + 1,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [isIdle, isTriggered, leadData?.id, loading]);

  const [formData, setFormData] = useState<any>({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    agreed: false,
    step: 1,
    organization: "",
    country: "",
    timezone: "",
  });

  const [errors, setErrors] = useState<any>([]);
  const [success, setSuccess] = useState<any>([]);

  const resendOTP = () => {
    const params = {
      id: leadData.id,
      type: formData.step === 3 ? "email" : "mobile-number",
    };
    dispatch(resendOtpVerify(params));
  };

  useEffect(() => {
    if (resendResponse) {
      setErrors([]);
      setSuccess([]);
      if (resendResponse.data.sent) {
        setSuccess((oldArray) => [
          ...[...new Set(oldArray)],
          "OTP sent successfully!",
        ]);
        dispatch(clearResendResponse());
      } else {
        setErrors((oldArray) => [...oldArray, "Unable to resend OTP!"]);
      }
    }
  }, [resendResponse]);

  useEffect(() => {
    if (otpResponse) {
      console.log(formData.step);
      // if (formData.step === 3) {
      //   if (otpResponse && otpResponse.data.verified) {
      //   setHeader("Verify your Mobile Number");
      //   setSubHeader(` We sent you a six-digit code to xxxxxx
      //     ${
      //       formData.mobile &&
      //       formData.mobile.substr(formData.mobile.length - 3)
      //     }. Enter the code to confirm
      //     your mobile number.`);
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     ["step"]: prevFormData.step + 1,
      //   }));
      //   } else {
      //     if (otpResponse && !otpResponse.data.verified) {
      //       setErrors((oldArray) => [...oldArray, "Incorrect OTP!"]);
      //     }
      //   }
      // }
      if (formData.step === 3) {
        if (otpResponse && otpResponse.data.verified) {
          setHeader("");
          setSubHeader("");
          setFormData((prevFormData) => ({
            ...prevFormData,
            ["step"]: prevFormData.step + 1,
          }));
        } else {
          if (otpResponse && !otpResponse.data.verified) {
            setErrors((oldArray) => [...oldArray, "Incorrect OTP!"]);
          }
        }
      }
      dispatch(clearOtp());
    }
  }, [otpResponse]);

  useEffect(() => {
    if (errors.length > 0) {
      setSuccess([]);
    }
  }, [errors, setSuccess]);

  useEffect(() => {
    if (success.length > 0) {
      setErrors([]);
    }
  }, [success, setErrors]);

  const handleInputChange = (event: any) => {
    try {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "agreed" ? event.target.checked : value,
      }));
    } catch (error) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["mobile"]: event,
      }));
    }
  };

  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setSuccess([]);
    if (formData.step === 1) {
      let valid = true;
      if (formData.fullname === "") {
        valid = false;
        setErrors((oldArray) => [
          ...[...new Set(oldArray)],
          "Full name is required",
        ]);
      }
      if (formData.email === "") {
        valid = false;
        setErrors((oldArray) => [
          ...[...new Set(oldArray)],

          "Email is required",
        ]);
      }
      if (formData.mobile === "") {
        valid = false;
        setErrors((oldArray) => [
          ...[...new Set(oldArray)],
          "Mobile number is required",
        ]);
      }
      if (formData.password === "") {
        valid = false;
        setErrors((oldArray) => [
          ...[...new Set(oldArray)],
          "Password is required",
        ]);
      }
      if (formData.agreed === false) {
        valid = false;
        setErrors((oldArray) => [
          ...[...new Set(oldArray)],
          "Please agree to the Terms of Service and Private Policy",
        ]);
      }
      if (valid) {
        setHeader("Organization Info");
        setSubHeader("Sign Up for your new account!");
        setFormData((prevFormData) => ({
          ...prevFormData,
          ["step"]: prevFormData.step + 1,
        }));
      }
    } else if (formData.step === 2) {
      let valid = true;

      if (formData.organization === "") {
        valid = false;
        setErrors((oldArray) => [...oldArray, "Organization is required"]);
      }
      if (formData.country === "") {
        valid = false;
        setErrors((oldArray) => [...oldArray, "Country is required"]);
      }
      if (valid) {
        // setHeader("Verify your Email Address");
        // setSubHeader(`We emailed you a six-digit code to ${formData.email}. Enter the code below
        //       to confirm your email adress.`);
        setHeader("Verify your Mobile Number");
        setSubHeader(` We sent you a six-digit code to xxxxxx
          ${
            formData.mobile &&
            formData.mobile.substr(formData.mobile.length - 3)
          }. Enter the code to confirm
          your mobile number.`);
        setErrors([]);
        setSuccess([]);
        // setFormData((prevFormData) => ({
        //   ...prevFormData,
        //   ["step"]: prevFormData.step + 1,
        // }));

        const params: leadRegistration = {
          email: formData.email,
          fullName: formData.fullname,
          mobileNumber: formData.mobile,
          password: formData.password,
          organizationCountryCode: formData.country,
          organizationName: formData.organization,
          organizationTimezone: formData.timezone,
        };
        dispatch(registerLead(params));
      }
    }
  };

  const nextStepOtp = async (otp: any) => {
    setErrors([]);
    setSuccess([]);
    // if (formData.step === 3) {
    //   const otpParams: OtpType = {
    //     id: leadData.id,
    //     type: "email",
    //     otp: otp,
    //   };
    //   dispatch(VerifyOtp(otpParams));
    // }
    if (formData.step === 3) {
      const otpParams: OtpType = {
        id: leadData.id,
        type: "mobile-number",
        otp: otp,
      };
      dispatch(VerifyOtp(otpParams));
    }
  };

  return (
    <>
      <div className="h-auto bg-[url('/images/Background.png')] bg-cover">
        <PublicNav />
        <div className="flex items-center justify-center pt-32 max-lg:px-10">
          <Card
            horizontal
            imgAlt=""
            className="md:max-h-auto relative mt-[60px] min-h-[320px] w-full md:max-w-[500px] md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
          >
            {formData.step !== 5 && (
              <ol className="absolute left-2 top-5 flex w-full items-center text-xs font-medium text-gray-900 sm:text-base">
                <li className="relative flex w-full text-gray-900  after:absolute  after:left-[100px] after:top-3  after:inline-block after:h-0.5 after:w-[100px] after:bg-gray-200 after:content-[''] lg:after:top-4">
                  <div className="z-10 block whitespace-nowrap">
                    {(formData.step >= 1 && (
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
                    <div className="flex !w-[100px] items-center justify-center text-center text-xs">
                      Personal Info
                    </div>
                  </div>
                </li>
                <li className="relative flex w-full text-gray-900  after:absolute  after:left-[120px] after:top-3  after:inline-block after:h-0.5 after:w-[100px] after:bg-gray-200 after:content-[''] lg:after:top-4">
                  <div className="z-10 ml-7 block whitespace-nowrap">
                    {(formData.step >= 2 && (
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
                    <div className="flex !w-[100px] items-center justify-center text-center text-xs">
                      Organization Info
                    </div>
                  </div>
                </li>
                <li className="relative flex w-full text-gray-900">
                  <div className="z-10 ml-12 block whitespace-nowrap">
                    {(formData.step >= 3 && (
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
                    <div className="flex !w-[100px] items-center justify-center text-center text-xs">
                      {formData.step == 3 ? "Verify" : "Verify Mobile No"}
                    </div>
                  </div>
                </li>
              </ol>
            )}
            <h1 className="mt-10 text-center text-2xl font-bold text-blue-900 dark:text-white md:text-2xl">
              {header}
            </h1>
            <span className="-mt-3 mb-3 text-center text-[#6B7280]">
              {subHeader}
            </span>
            <SuccessHandler success={success} setSuccess={setSuccess} />
            <ErrorHandler errors={errors} setErrors={setErrors} />
            {formData.step === 1 && (
              <RegistrationStep1
                fullname={formData.fullname}
                email={formData.email}
                password={formData.password}
                mobile={formData.mobile}
                handleInputChange={handleInputChange}
                step={formData.step}
                agreed={formData.agreed}
                nextStep={nextStep}
              />
            )}
            {formData.step === 2 && (
              <RegistrationStep2
                country={formData.country}
                organization={formData.organization}
                handleInputChange={handleInputChange}
                step={formData.step}
                nextStep={nextStep}
                loading={loading}
              />
            )}
            {/* {formData.step === 3 && (
              <RegistrationStep3
                resendOTP={resendOTP}
                email={formData.email}
                handleInputChange={handleInputChange}
                step={formData.step}
                nextStep={nextStep}
                setErrors={setErrors}
                setSuccess={setSuccess}
                success={success}
                nextStepOtp={nextStepOtp}
                verifying={verifying}
              />
            )} */}
            {formData.step === 3 && (
              <RegistrationStep4
                resendOTP={resendOTP}
                mobile={formData.mobile}
                handleInputChange={handleInputChange}
                step={formData.step}
                nextStep={nextStep}
                setErrors={setErrors}
                setSuccess={setSuccess}
                success={success}
                nextStepOtp={nextStepOtp}
                verifying={verifying}
              />
            )}
            {formData.step === 4 && <RegistrationStep5 />}
          </Card>
        </div>
        <PublicFooter />
      </div>
    </>
  );
};

export default SignUpPage;
