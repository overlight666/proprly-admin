/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router";
import Label from "../form/Label";;
import { useUserActions } from "../../_actions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import React, { useEffect, useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Button from "../ui/button/Button";
import { userInterface } from "../../_types";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const userActions = useUserActions();
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [userDetails, setUserDetails] = useState<any>();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm password is required")
    .oneOf([Yup.ref('password')], 'Password and confirm password must be same'),
    apiError: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  useEffect(() => {
     userActions.getDcryptToken(token as string).then(dt => {
      setUserDetails(dt)
    })
  }, [token])

  function onSubmit({ password,  confirmPassword}: any) {
    if(!token) return;
    return userActions.resetPassword(password, confirmPassword, token, navigate).catch((error: any) => {
      setError("apiError", { message: error });
    });
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="bg-white dark:border-gray-800 dark:bg-gray-800 p-10 rounded-md">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userDetails?.fullName} - Enter your password and confirm password to reset your password!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
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
                    Confirm Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                      type={showPassword ? "text" : "password"}
                      register={{ ...register("confirmPassword") }}
                      error={errors.confirmPassword}
                      hint={errors.confirmPassword?.message}
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
                  <Button className="w-full" size="sm" disabled={isSubmitting}>
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}{" "}
                    Reset Password
                  </Button>
                </div>
                {errors.apiError && (
                  <div className="flex justify-center items-center p-3 rounded-md w-full bg-red-100 text-red-600">
                    {errors.apiError?.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
