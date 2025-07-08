
import { PublicWrapper } from "@/components/public-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FormikHelpers, useFormik } from 'formik';
import { signUpForm } from "@/lib/interface";
import { signUpValidattion } from "@/lib/validations";
import { Step0 } from "./Steps/Step0";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";
import { Step4 } from "./Steps/Step4";
import { Step5 } from "./Steps/Step5";
import { useCountriesAction } from "@/_recoil/actions/countries.actions";
import { useRegistration } from "@/_recoil/actions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const SignUp = (): JSX.Element => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const countriesAction = useCountriesAction();
    const registrationAction = useRegistration();
    const navigate = useNavigate();

    useEffect(() => {
        countriesAction.getCountries();
    }, []);

    const initialValues: signUpForm = {
        userType: 'Company',
        userRole: '',
        organizationName: '',
        uniqueId: '',
        organizationCountryCode: '',
        organizationTimezone: '',
        address: '',
        buildingNumber: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        agreed: true,
    }

    const formik = useFormik<signUpForm>({
        enableReinitialize: true,
        initialValues,
        validationSchema: signUpValidattion,
        onSubmit: async (
            values: signUpForm,
            _formikHelpers: FormikHelpers<signUpForm>,
        ) => {
            registrationAction.registerLead(values).then((e: any) => {
                if (e?.id) {
                    setActiveStep(3); // Move to email verification
                }
            }).catch((error) => {
                toast.error("Registration failed. Please try again.");
            });
        },
    });

    const verifyEmail = (otpString: string) => {
        // Mock email verification - replace with actual API call
        setSuccessMessage("Email verified successfully!");
        setTimeout(() => {
            setSuccessMessage("");
            setActiveStep(4); // Move to mobile verification
        }, 1500);
    };

    const verifyMobile = (otpString: string, id: any) => {
        registrationAction.verifyOtp({ otp: otpString }, id).then((e: any) => {
            if (e && e?.verified) {
                setSuccessMessage("OTP sent successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                    setActiveStep(5); // Move to success screen
                }, 1500);
            } else {
                setErrorMessage("Incorrect OTP!");
            }
        }).catch(() => {
            setErrorMessage("Verification failed. Please try again.");
        });
    };

    const resendEmailOTP = () => {
        // Mock resend email OTP - replace with actual API call
        toast.success("Email OTP sent successfully!");
    };

    const clearMessage = () => {
        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleNext = () => {
        const stepNum = Math.min(activeStep + 1, 5);
        setActiveStep(stepNum);
    };

    const renderProgressSteps = () => {
        if (activeStep === 0 || activeStep === 5) return null;

        const steps = [
            { number: 1, label: "Basic Info", key: "basic" },
            { number: 2, label: "Personal Info", key: "personal" },
            { number: 3, label: "Verify", key: "verify" }
        ];

        return (
            <div className="flex items-center justify-between w-full mb-8">
                {steps.map((step, index) => (
                    <div key={step.key} className="flex items-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                activeStep > index + 1 
                                    ? "bg-blue-600 text-white" 
                                    : activeStep === index + 1 
                                        ? "bg-blue-600 text-white" 
                                        : "bg-gray-200 text-gray-500"
                            }`}>
                                {activeStep > index + 1 ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.number
                                )}
                            </div>
                            <div className={`text-xs font-medium ${
                                activeStep >= index + 1 ? "text-blue-600" : "text-gray-500"
                            }`}>
                                {step.label}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 ${
                                activeStep > index + 1 ? "bg-blue-600" : "bg-gray-200"
                            }`} />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" 
             style={{ backgroundImage: "url('/images/Background.png')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            {/* Header */}
            <div className="relative z-10 flex justify-between items-center p-6">
                <div className="flex items-center gap-2">
                    <div className="text-white text-2xl font-bold">Proprly.</div>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">Proprly</a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">Contact Us</a>
                    <button 
                        onClick={() => navigate("/sign-in")} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium"
                    >
                        Login
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-120px)] px-6">
                <Card className="w-auto shadow-2xl rounded-lg bg-white">
                    <CardContent className="p-8">
                        <div className="flex flex-col items-center justify-center gap-8">
                            {/* Progress Steps */}
                            {renderProgressSteps()}

                            {/* Form Content */}
                            {activeStep === 0 && (
                                <Step0
                                    values={formik.values}
                                    setFieldValue={formik.setFieldValue}
                                    handleNext={handleNext}
                                />
                            )}
                            
                            {activeStep === 1 && (
                                <Step1
                                    canNext={!formik.values.organizationName || 
                                             !formik.values.userRole ||
                                             !formik.values.uniqueId ||
                                             !formik.values.organizationCountryCode ||
                                             !formik.values.address}
                                    values={formik.values}
                                    handleChange={formik.handleChange}
                                    setFieldValue={formik.setFieldValue}
                                    errors={formik.errors}
                                    handleNext={handleNext}
                                />
                            )}
                            
                            {activeStep === 2 && (
                                <Step2
                                    canNext={!formik.values.fullName ||
                                             !formik.values.email ||
                                             !formik.values.mobileNumber ||
                                             !formik.values.password ||
                                             !formik.values.confirmPassword}
                                    values={formik.values}
                                    handleChange={formik.handleChange}
                                    setFieldValue={formik.setFieldValue}
                                    errors={formik.errors}
                                    onSubmit={formik.handleSubmit}
                                />
                            )}
                            
                            {activeStep === 3 && (
                                <Step3
                                    values={formik.values}
                                    verifyEmail={verifyEmail}
                                    resendEmailOTP={resendEmailOTP}
                                    canNext={false}
                                />
                            )}
                            
                            {activeStep === 4 && (
                                <Step4
                                    verify={verifyMobile}
                                    values={formik.values}
                                    handleChange={formik.handleChange}
                                    setFieldValue={formik.setFieldValue}
                                    errors={formik.errors}
                                    canNext={false}
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                    onClearMessage={clearMessage}
                                />
                            )}
                            
                            {activeStep === 5 && <Step5 />}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-center text-white text-sm py-4">
                © 2024 Proprly. All Rights Reserved.
            </div>
        </div>
    );
};
