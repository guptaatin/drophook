import React, { useState } from "react";
import Input from "@mui/material/Input";
import { Helmet } from "react-helmet-async";
import { Button, Alert } from "@mui/material";
import "./forgotpassword.css";
import "../../pages/auth/signup.css";
import { ValidateEmailService } from "../../services/UserService";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    const json = {
      email: userEmail,
      html: "please click on the link https://proud-plant-00e480c10.1.azurestaticapps.net/",
    };
    const result = await ValidateEmailService(json);
    if (result) {
      if (result.accessToken) {
        setMessageError("");
        setMessage("Email has sent to the given mail");
      } else {
        setMessage("");
        setMessageError("User not exist");
      }
    }
  };
  return (
    <React.Fragment>
      <Helmet title="Forgot Password" />
      <form
        className="forgot-pass signup-first"
        onSubmit={handleForgotPassword}
      >
        <ul>
          <li>
            <h1>Enter your email</h1>
          </li>
          <li>
            <Input
              fullWidth={true}
              value={userEmail}
              onChange={(e: any) => {
                setUserEmail(e.target.value);
              }}
              placeholder="Enter email..."
            />
          </li>
          <li>
            <Button
              className="form-btn width-auto"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </li>
          <li>{message !== "" ? <Alert>{message}</Alert> : null}</li>
          <li>
            {messageError !== "" ? (
              <Alert severity="error">{messageError}</Alert>
            ) : null}
          </li>
        </ul>
      </form>
    </React.Fragment>
  );
}

export default ForgotPassword;
