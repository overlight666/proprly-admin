import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import React from "react";

export default function SignIn() {
  return (
    <>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
