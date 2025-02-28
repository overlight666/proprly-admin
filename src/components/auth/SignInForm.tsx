/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
// import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useUserActions } from "../../_actions";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../_state";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const token = useRecoilValue(tokenAtom);
  const userActions = useUserActions();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    apiError: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();
  useEffect(() => {
    // redirect to home if already logged in
    if (token) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit({ email, password }: any) {
    return userActions.login(email, password, navigate).catch((error: any) => {
      setError("apiError", { message: error });
    });
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="bg-white dark:border-gray-800 dark:bg-gray-800 p-10 rounded-md">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span> */}
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={isSubmitting}>
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}{" "}
                    Sign in
                  </Button>
                </div>
                {errors.apiError && (
                  <div className="flex justify-center items-center p-3 rounded-md w-full bg-red-100 text-red-600">
                    {errors.apiError?.message}
                  </div>
                )}
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
