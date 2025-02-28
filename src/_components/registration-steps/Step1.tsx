/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
// import PhoneInput from "../../components/form/group-input/PhoneInput";
import Checkbox from "../../components/form/input/Checkbox";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Step1({ onSubmitStep1, setMobileNumber }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    // mobileNumber: Yup.string().required("Phone is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitStep1)}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* <!-- First Name --> */}
            <div className="sm:col-span-1">
              <Label>
                First Name<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                register={{ ...register("firstName") }}
                error={errors.firstName}
                hint={errors.firstName?.message}
                placeholder="Enter your first name"
              />
            </div>
            {/* <!-- Last Name --> */}
            <div className="sm:col-span-1">
              <Label>
                Last Name<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                register={{ ...register("lastName") }}
                error={errors.lastName}
                hint={errors.lastName?.message}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          {/* <!-- Email --> */}
          <div>
            <Label>
              Email<span className="text-error-500">*</span>
            </Label>
            <Input
              type="email"
              register={{ ...register("email") }}
              error={errors.email}
              hint={errors.email?.message}
              placeholder="Enter your email"
            />
          </div>
          {/* <!-- Password --> */}
          <div>
            <Label>
              Password<span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                register={{ ...register("password") }}
                error={errors.password}
                hint={errors.password?.message}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4 ${
                  errors.password ? "top-5" : "top-1/2"
                }`}
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>
          <div>
            <Label>
              Phone<span className="text-error-500">*</span>
            </Label>
            <PhoneInput
              country={"au"}
              containerClass="w-full"
              inputClass="!h-11 !w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              onChange={(phone) => setMobileNumber({ phone })}
              inputProps={{
                name: "mobileNumber",
                required: true,
              }}
            />
          </div>
          {/* <!-- Checkbox --> */}
          <div className="flex items-center gap-3">
            <Checkbox
              className="w-5 h-5"
              checked={isChecked}
              onChange={setIsChecked}
            />
            <p className="inline-block text-sm text-gray-500 dark:text-gray-400">
              I agree to the{" "}
              <span className="text-blue-800 dark:text-white/90 cursor-pointer">
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span className="text-blue-800 dark:text-white cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
          {/* <!-- Button --> */}
          <div>
            <button
              disabled={isSubmitting || !isChecked}
              className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 ${
                (!isChecked || isSubmitting) && "!bg-gray-400"
              }`}
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}{" "}
              Get Started
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
