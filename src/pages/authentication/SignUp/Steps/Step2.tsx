import { countriesAtom } from "@/_recoil/states";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { OptionType, signUpForm } from "@/lib/interface";
import { FormikErrors } from "formik";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

type RoleDetailsFormProps = {
    onSubmit: any;
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    description?: string;
    handleNext: any;
    nameError?: string;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
};

export const Step2 = ({
    onSubmit,
    errors,
    canNext,
    values,
    handleChange,
    setFieldValue,
}: RoleDetailsFormProps) => {
    const [options, setOption] = useState<OptionType[]>();
    const [timezoneOption, setTimezoneOption] = useState<OptionType[]>();
    const countries = useRecoilValue(countriesAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (countries) {
            const countryOptions = countries.map((country) => {
                return {
                    label: country.countryName,
                    value: country.countryCode,
                };
            });
            setOption(countryOptions);
        }
    }, [countries]);

    useEffect(() => {
        if (values.organizationCountryCode) {
            const selectedCountry = countries.find((c) => c.countryCode === values.organizationCountryCode);
            const zoneHandler = selectedCountry?.timezone.map((tz: any) => {
                return {
                    value: tz.name,
                    label: tz.name,
                };
            });
            setTimezoneOption(zoneHandler);
        }
    }, [values]);

    return (
        <div className="w-full max-w-[364px]">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold text-blue-900 mb-2 dark:text-blue-400">
                    Organization Info
                </h1>
                <p className="text-gray-500-duplicate dark:text-gray-200">
                    Sign Up for your new account!
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
                {/* Country */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Select Country*
                    </label>
                    <Select
                        options={options && options.length ? options : []}
                        // defaultValue={values.organizationCountryCode}
                        // name="organizationCountryCode"
                        className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                        placeholder="Select country"
                        onChange={(e) => setFieldValue("organizationCountryCode", e)}
                        error={errors.organizationCountryCode}
                        hint={errors.organizationCountryCode}
                    />
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Select Time-Zone*
                    </label>
                    <Select
                        options={
                            timezoneOption && timezoneOption.length ? timezoneOption : []
                        }
                        placeholder="Select Time-Zone"
                        className="dark:bg-dark-900"
                        onChange={(e) => setFieldValue("organizationTimezone", e)}
                        error={errors.organizationTimezone}
                        hint={errors.organizationTimezone}
                    />
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-900 dark:text-blue-400">
                        Organization Name*
                    </label>
                    <Input
                        value={values.organizationName}
                        name="organizationName"
                        className="bg-colors-gray-50 border-colors-gray-300 placeholder:text-gray-500-duplicate"
                        placeholder="Please enter organization name"
                        onChange={handleChange}
                        error={errors.organizationName}
                        hint={errors.organizationName}
                    />
                </div>


                {/* Submit Button */}
                <Button
                    disabled={canNext}
                    onClick={() => onSubmit()}
                    className="w-full bg-[#1a56db] hover:bg-[#1a56db]/90 text-white py-3">
                    Next
                </Button>

                {/* Login Link */}
                <div className="text-center text-xs mt-4">
                    <span className="text-[#233876] dark:text-blue-400">
                        Already registered?{" "}
                    </span>
                    <span className="text-[#1a56db] font-semibold dark:text-blue-200 cursor-pointer" onClick={() => {
                        navigate("/sign-in")
                    }}>
                        Click here to Log In
                    </span>
                </div>
            </div>
        </div>
    )
}