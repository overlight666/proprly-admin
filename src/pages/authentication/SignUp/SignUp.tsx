import { PublicWrapper } from "@/components/public-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { FormikHelpers, useFormik } from 'formik';
import { signUpForm } from "@/lib/interface";
import { signUpValidattion } from "@/lib/validations";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { useCountriesAction } from "@/_recoil/actions/countries.actions";
import { Step3 } from "./Steps/Step3";
import { useRegistration } from "@/_recoil/actions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const SignUp = (): JSX.Element => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const countriesAction = useCountriesAction();
    const registrationAction = useRegistration();
    const navigate = useNavigate();

    useEffect(() => {
        countriesAction.getCountries();
    }, []);


    const initialValues: signUpForm = {
        agreed: false,
        fullName: '',
        email: '',
        password: '',
        mobileNumber: '',
        organizationName: '',
        organizationCountryCode: '',
        organizationTimezone: '',
    }

    const formik = useFormik<signUpForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: signUpValidattion,
        onSubmit: async (
            values: signUpForm,
            formikHelpers: FormikHelpers<signUpForm>,
        ) => {
            registrationAction.registerLead(values).then((e: any) => {
                if (e?.id) {
                    const stepNum = Math.min(activeStep + 1, 3);
                    setActiveStep(stepNum);
                }
            })
            // if (requestId) {
            //     updateRequestType(requestId, values)
            // } else {
            //     newRequestType(values)
            // }
        },
    });

    const verify = (otpString: any, id: any) => {
        registrationAction.verifyOtp({ otp: otpString }, id).then((e: any) => {
            if (e && e?.data && e?.data?.verified) {
                const stepNum = Math.min(activeStep + 1, 3);
                setActiveStep(stepNum);
            } else {
                toast.error("Verification Failed, Wrong OTP!")
            }
        })
    }

    const validateStepField = (fieldName: string) => {
        switch (fieldName) {
            case 'fullName': {
                formik.validateField(fieldName);
                return formik.errors.fullName;
            }
            case 'email': {
                formik.validateField(fieldName);
                return formik.errors.email;
            }
            case 'mobileNumber': {
                formik.validateField(fieldName);
                return formik.errors.mobileNumber;
            }
            case 'organizationCountryCode': {
                formik.validateField(fieldName);
                return formik.errors.organizationCountryCode;
            }
            case 'organizationName': {
                formik.validateField(fieldName);
                return formik.errors.organizationName;
            }
            case 'organizationTimezone': {
                formik.validateField(fieldName);
                return formik.errors.organizationTimezone;
            }
            case 'password': {
                formik.validateField(fieldName);
                return formik.errors.password;
            }
            default:
                return undefined;
        }
    };

    const handleNext = (fieldName?: string) => {
        const error = fieldName && validateStepField(fieldName);
        if (!fieldName || !error) {
            formik.setErrors({});
            const stepNum = Math.min(activeStep + 1, 3);
            setActiveStep(stepNum);
        }
    };

    return (
        <PublicWrapper>
            <div className="flex justify-center items-center h-full mb-5 ">
                <Card className="w-auto shadow-shadow rounded-lg px-10 bg-white">
                    <CardContent className="p-8">
                        {activeStep <= 2 ? <div className="flex flex-col items-center justify-center gap-[30px]">
                            {/* Progress Steps */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col items-center justify-center gap-[6px] w-[30%]">
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        <img
                                            className="w-5 h-5"
                                            alt="Badge check"
                                            src="https://c.animaapp.com/TkEj6uxX/img/badge-check.svg"
                                        />
                                    </div>
                                    <div className="font-medium text-[#1a56db] text-xs">
                                        Personal Info
                                    </div>
                                </div>

                                <img
                                    className="w-10 h-[1.02px]"
                                    alt="Line"
                                    src="https://c.animaapp.com/TkEj6uxX/img/line-1.svg"
                                />

                                <div className="flex flex-col items-center justify-center gap-[6px] w-[40%]">
                                    {
                                        activeStep >= 1 ?
                                            <div className="w-5 h-5 flex items-center justify-center">
                                                <img
                                                    className="w-5 h-5"
                                                    alt="Badge check"
                                                    src="https://c.animaapp.com/TkEj6uxX/img/badge-check.svg"
                                                />
                                            </div>
                                            :
                                            <div className="font-medium text-gray-500 text-sm">
                                                2
                                            </div>
                                    }
                                    <div className="font-medium text-gray-500 text-xs text-center">
                                        Organization Info
                                    </div>
                                </div>

                                <img
                                    className="w-10 h-[1.02px]"
                                    alt="Line"
                                    src="https://c.animaapp.com/TkEj6uxX/img/line-1.svg"
                                />

                                <div className="flex flex-col items-center justify-center gap-[6px] w-[30%]">
                                    {
                                        activeStep > 1 ?
                                            <div className="w-5 h-5 flex items-center justify-center">
                                                <img
                                                    className="w-5 h-5"
                                                    alt="Badge check"
                                                    src="https://c.animaapp.com/TkEj6uxX/img/badge-check.svg"
                                                />
                                            </div>
                                            :
                                            <div className="font-medium text-gray-500 text-sm">
                                                3
                                            </div>
                                    }
                                    <div className="font-medium text-gray-500 text-xs">
                                        Verify
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            {
                                activeStep == 0 && <Step1 canNext={!formik.values.fullName ||
                                    !formik.values.email ||
                                    !formik.values.mobileNumber ||
                                    !formik.values.agreed ||
                                    !formik.values.password}
                                    values={formik.values}
                                    handleChange={formik.handleChange}
                                    setFieldValue={formik.setFieldValue}
                                    errors={formik.errors}
                                    handleNext={handleNext}
                                />
                            }
                            {
                                activeStep == 1 && <Step2
                                    canNext={!formik.values.organizationCountryCode ||
                                        !formik.values.organizationName ||
                                        !formik.values.organizationTimezone}
                                    values={formik.values}
                                    handleChange={formik.handleChange}
                                    setFieldValue={formik.setFieldValue}
                                    errors={formik.errors}
                                    handleNext={handleNext}
                                    onSubmit={formik.handleSubmit}
                                />
                            }
                            {
                                activeStep == 2 && <Step3 canNext={!formik.values.organizationCountryCode ||
                                    !formik.values.organizationName ||
                                    !formik.values.organizationTimezone}
                                    values={formik.values}
                                    handleChange={formik.handleChange}
                                    setFieldValue={formik.setFieldValue}
                                    errors={formik.errors}
                                    verify={verify}
                                />
                            }
                        </div>
                            :
                            <div className="flex flex-col items-center justify-center gap-[30px] max-w-[400px]">
                                <div className="flex justify-center items-center w-full">
                                    <img src="../images/big_check.png" />
                                </div>
                                <div className="text-center mb-2">
                                    <h1 className="text-3xl font-bold text-blue-900 mb-2 dark:text-blue-400">
                                        Thank you for Signing Up!
                                    </h1>
                                    <p className="text-gray-500-duplicate dark:text-gray-200">
                                        One of our team members will contact you shortly.
                                        Please check your email for further updates
                                    </p>

                                </div>
                                <span className="cursor-pointer text-blue-400" onClick={() => {
                                    navigate("/sign-in")
                                }}>Back to Login</span>
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>
        </PublicWrapper>

    );
};
