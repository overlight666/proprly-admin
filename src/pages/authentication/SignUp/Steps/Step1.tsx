
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { signUpForm, OptionType } from "@/lib/interface";
import { FormikErrors } from "formik";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { countriesAtom } from "@/_recoil/states";

type Step1Props = {
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    handleNext: () => void;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
};

export const Step1 = ({
    errors,
    canNext,
    values,
    handleChange,
    setFieldValue,
    handleNext
}: Step1Props) => {
    const countries = useRecoilValue(countriesAtom);
    const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);

    useEffect(() => {
        if (countries) {
            const options = countries.map((country) => ({
                label: country.countryName,
                value: country.countryCode,
            }));
            setCountryOptions(options);
        }
    }, [countries]);

    const userTypeOptions = [
        { label: "Builder", value: "Builder" },
        { label: "Developer", value: "Developer" },
        { label: "Contractor", value: "Contractor" },
        { label: "Consultant", value: "Consultant" }
    ];

    return (
        <div className="w-full max-w-[400px]">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Let's get started
                </h1>
                <p className="text-gray-500 text-sm">
                    Fill in your basic details
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* User Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        User Type*
                    </label>
                    <Select
                        options={userTypeOptions}
                        placeholder="Builder"
                        value={values.userRole}
                        onChange={(value) => setFieldValue("userRole", value)}
                        className="w-full"
                        error={errors.userRole}
                        hint={errors.userRole}
                    />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Company Name*
                    </label>
                    <Input
                        value={values.organizationName}
                        name="organizationName"
                        className="w-full"
                        placeholder="Enter company name"
                        onChange={handleChange}
                        error={errors.organizationName}
                        hint={errors.organizationName}
                    />
                </div>

                {/* Unique ID */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Unique ID*
                    </label>
                    <Input
                        value={values.uniqueId}
                        name="uniqueId"
                        className="w-full"
                        placeholder="Enter ID"
                        onChange={handleChange}
                        error={errors.uniqueId}
                        hint={errors.uniqueId}
                    />
                </div>

                {/* Country */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Country*
                    </label>
                    <Select
                        options={countryOptions}
                        placeholder="Australia"
                        value={values.organizationCountryCode}
                        onChange={(value) => setFieldValue("organizationCountryCode", value)}
                        className="w-full"
                        error={errors.organizationCountryCode}
                        hint={errors.organizationCountryCode}
                    />
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Address*
                    </label>
                    <Input
                        value={values.address}
                        name="address"
                        className="w-full"
                        placeholder="Search for address"
                        onChange={handleChange}
                        error={errors.address}
                        hint={errors.address}
                    />
                </div>

                {/* Building No./Block No. */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Building No./Block No.
                    </label>
                    <Input
                        value={values.buildingNumber}
                        name="buildingNumber"
                        className="w-full"
                        placeholder="Enter building No/Floor No"
                        onChange={handleChange}
                    />
                </div>

                {/* Next Button */}
                <Button
                    disabled={canNext}
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-6"
                >
                    Next
                </Button>

                {/* Login Link */}
                <div className="text-center text-sm mt-4">
                    <span className="text-gray-600">
                        Already registered?{" "}
                    </span>
                    <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800">
                        Click here to Log In
                    </a>
                </div>
            </div>
        </div>
    );
};
