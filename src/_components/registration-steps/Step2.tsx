/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { OptionType } from "../../_types";
import { useRecoilValue } from "recoil";
import { countriesAtom } from "../../_state";
import React from "react";
export default function Step2({ onSubmitStep2 }: any) {
  const [options, setOption] = useState<OptionType[]>();
  const [timezoneOption, setTimezoneOption] = useState<OptionType[]>();
  const countries = useRecoilValue(countriesAtom);

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

  const validationSchema = Yup.object().shape({
    organizationCountryCode: Yup.string().required("Country is required"),
    organizationName: Yup.string().required("Organization is required"),
    organizationTimezone: Yup.string().required("Timezone is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, watch } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  const hasCode = watch("organizationCountryCode");

  useEffect(() => {
    if (hasCode) {
      const selectedCountry = countries.find((c) => c.countryCode === hasCode);
      const zoneHandler = selectedCountry?.timezone.map((tz) => {
        return {
          value: tz.name,
          label: tz.name,
        };
      });
      setTimezoneOption(zoneHandler);
    }
  }, [hasCode]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitStep2)}>
        <div className="space-y-5">
          <div>
            <Label>
              Select Country<span className="text-error-500">*</span>
            </Label>
            <Select
              options={options && options.length ? options : []}
              placeholder="Select an option"
              className="dark:bg-dark-900"
              register={{ ...register("organizationCountryCode") }}
              error={errors.organizationCountryCode}
              hint={errors.organizationCountryCode?.message}
            />
          </div>
          <div>
            <Label>
              Select Timezone<span className="text-error-500">*</span>
            </Label>
            <Select
              options={
                timezoneOption && timezoneOption.length ? timezoneOption : []
              }
              placeholder="Select an option"
              className="dark:bg-dark-900"
              register={{ ...register("organizationTimezone") }}
              error={errors.organizationTimezone}
              hint={errors.organizationTimezone?.message}
            />
          </div>
          <div>
            <Label>
              Organization Name<span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              register={{ ...register("organizationName") }}
              error={errors.organizationName}
              hint={errors.organizationName?.message}
              placeholder="Enter your organization name"
            />
          </div>

          <div>
            <button
              disabled={isSubmitting}
              className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 ${
                isSubmitting && "!bg-gray-400"
              }`}
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}{" "}
              Next
            </button>
          </div>
        </div>
      </form>

      <div className="mt-5">
        <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
          Already have an account?
          <Link
            to="/signin"
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
