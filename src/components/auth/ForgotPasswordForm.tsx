/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import Label from "../form/Label";;
import Button from "../ui/button/Button";
import { useUserActions } from "../../_actions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { forgottenAtom } from "../../_state";

export default function ForgotPasswordForm() {
  const userActions = useUserActions();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    apiError: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const [hasError, setHasError] = useState("");
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();
  const isForgotten = useRecoilValue(forgottenAtom);
  const setForgotten = useSetRecoilState(forgottenAtom);
  function onSubmit({ email }: any) {
    setTimeout(() => {
      userActions.forgotPassword(email).then(() => {
        setForgotten(true);
      }).catch((error: any) => {
        toast.warn(error)
        setHasError(error)
        setError("apiError", { message: error });
      });
    }, 500);

  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        {!isForgotten && <div className="bg-white dark:border-gray-800 dark:bg-gray-800 p-10 rounded-md">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email to reset your password!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="form-group">
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    id="email"
                    placeholder="****@gmail.com"
                    register={{ ...register("email") }}
                    error={errors.email}
                    hint={errors.email?.message}
                  />
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={isSubmitting}>
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}{" "}
                    Forgot Password
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
        </div>}
        {isForgotten && <div className="bg-white dark:border-gray-800 dark:bg-gray-800 p-10 rounded-md">
          <div className="flex items-center justify-center flex-col gap-5">
            <p className="text-md text-gray-500 dark:text-gray-400">
              {!hasError && 'Reset password link has been sent to your email.' || hasError}
            </p>
            <span className="text-blue-800 cursor-pointer" onClick={() => {
              navigate(-1)
            }}>Back to login</span>
          </div>
        </div>}
      </div>
    </div>

  );
}
