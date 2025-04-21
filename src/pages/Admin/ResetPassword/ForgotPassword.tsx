import ForgotPasswordForm from "../../../components/auth/ForgotPasswordForm";
import React from "react";
import AuthLayout from "../../AuthPages/AuthPageLayout";

export default function ForgotPassword() {
  return (
    <>
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
}
