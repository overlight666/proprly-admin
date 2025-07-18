
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
    const [selectedType, setSelectedType] = useState<string>(values.userType || "builder");

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
        setFieldValue("userType", type);
    };

    return (
        <div className="w-full min-w-[500px] justify-center items-center flex flex-col">
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-200">
                    Select Organization Type
                </h1>
            </div>

            {/* User Type Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                    { key: 'builder', label: 'Builder' },
                    { key: 'developer', label: 'Developer' },
                    { key: 'strata', label: 'Strata' },
                    { key: 'subcontractor', label: 'Subcontractor' },
                    { key: 'salesAgent', label: 'Sales Agent' },
                    { key: 'consultant', label: 'Consultant' },
                    { key: 'auditor', label: 'Auditor' }
                ].map((type) => (
                    <button
                        key={type.key}
                        type="button"
                        onClick={() => handleTypeSelect(type.key)}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                            selectedType === type.key
                                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                        }`}
                    >
                        <div className="text-sm font-medium dark:text-gray-200">{type.label}</div>
                    </button>
                ))}
            </div>

            {/* Continue Button */}
            <Button
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
                Continue
            </Button>

            {/* Type Selection */}
            <div className="space-y-4 mb-8 w-[300px]">
                {/* Company Option */}
                <div
                    className={`w-full p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400`}
                    onClick={() => handleTypeSelect("Company")}
                >
                    <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selectedType === "Company"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300 dark:border-gray-500"
                            }`}>
                            {selectedType === "Company" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            )}
                        </div>
                        <span className="text-gray-900 font-medium dark:text-gray-200">Company</span>
                    </div>
                </div>

                {/* Individual Option */}
                <div
                    className={`w-full p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400`}
                    onClick={() => handleTypeSelect("Individual")}
                >
                    <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selectedType === "Individual"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300 dark:border-gray-500"
                            }`}>
                            {selectedType === "Individual" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            )}
                        </div>
                        <span className="text-gray-900 font-medium dark:text-gray-200">Individual</span>
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
                <span className="text-gray-600 dark:text-gray-400">
                    Already registered?{" "}
                </span>
                <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Click here to Log In
                </a>
            </div>
        </div>
    );
};
