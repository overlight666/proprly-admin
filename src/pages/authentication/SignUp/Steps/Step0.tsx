
import { Button } from "@/components/ui/button";
import { signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { useState } from "react";

type Step0Props = {
    values: signUpForm;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
    handleNext: () => void;
};

export const Step0 = ({ values, setFieldValue, handleNext }: Step0Props) => {
    const [selectedType, setSelectedType] = useState<string>(values.userType || "Company");

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
        setFieldValue("userType", type);
    };

    return (
        <div className="w-full min-w-[500px] justify-center items-center flex flex-col">
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-300">
                    Select type
                </h1>
            </div>

            {/* Type Selection */}
            <div className="space-y-4 mb-8 w-[300px]">
                {/* Company Option */}
                <div
                    className={`w-full p-4 border-2 rounded-lg cursor-pointer transition-all`}
                    onClick={() => handleTypeSelect("Company")}
                >
                    <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selectedType === "Company"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300"
                            }`}>
                            {selectedType === "Company" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            )}
                        </div>
                        <span className={`text-gray-900 font-medium dark:text-gray-200`}>Company</span>
                    </div>
                </div>

                {/* Individual Option */}
                <div
                    className={`w-full p-4 border-2 rounded-lg cursor-pointer transition-all`}
                    onClick={() => handleTypeSelect("Individual")}
                >
                    <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center dark:text-gray-300 ${selectedType === "Individual"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300"
                            }`}>
                            {selectedType === "Individual" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            )}
                        </div>
                        <span className={`text-gray-900 font-medium dark:text-gray-200`}>Individual</span>
                    </div>
                </div>
            </div>

            {/* Next Button */}
            <Button
                size="lg"
                onClick={handleNext}
                className="w-[400px] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
                Next
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm mt-6">
                <span className="text-gray-600">
                    Already registered?{" "}
                </span>
                <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800">
                    Click here to Log In
                </a>
            </div>
        </div>
    );
};
