import React from "react";
import { Helmet } from "react-helmet-async";
import ResetPasswordComponent from "../../components/auth/ResetPassword";
import "../../components/auth/resetpassword.css";

function ResetPassword() {
  return (
    <React.Fragment>
      <div className="signup-first reset-pw">
        <Helmet title="Reset Password" />
        <ResetPasswordComponent />
      </div>
    </React.Fragment>
  );
}

export default ResetPassword;
