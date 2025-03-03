import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import React from "react";

export default function SignUp() {
  return (
    <>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
