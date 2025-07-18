
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
        <div className="w-full min-w-[500px]">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-200">
                    Let's get started
                </h1>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                    Fill in your basic details
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* User Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        User Type<span className="text-red-500">*</span>
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
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Company Name<span className="text-red-500">*</span>
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
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Unique ID<span className="text-red-500">*</span>
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

                {/* Company Logo */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Company Logo<span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setFieldValue("companyLogo", file);
                            }}
                            className="hidden"
                            id="company-logo-upload"
                        />
                        <label
                            htmlFor="company-logo-upload"
                            className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            Choose file
                        </label>
                        <div className="flex-1 px-3 py-2 border-t border-r border-b border-gray-300 dark:border-gray-600 rounded-r-md bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                            {values.companyLogo ? values.companyLogo.name : "No file chosen"}
                        </div>
                    </div>
                    {errors.companyLogo && (
                        <p className="text-sm text-red-500">{errors.companyLogo}</p>
                    )}
                </div>

                {/* Country */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Country<span className="text-red-500">*</span>
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
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Address<span className="text-red-500">*</span>
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
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
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
                    <span className="text-gray-600 dark:text-gray-400">
                        Already registered?{" "}
                    </span>
                    <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Click here to Log In
                    </a>
                </div>
            </div>
        </div>
    );
};
