import React from "react";
import ResetPasswordForm from "../../../components/auth/ResetPasswordForm";
import AuthLayout from "../../AuthPages/AuthPageLayout";

export default function ResetPassword() {
  return (
    <>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
}
