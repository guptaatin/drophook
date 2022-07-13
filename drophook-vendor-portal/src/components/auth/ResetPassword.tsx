import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import "./resetpassword.css";
import "../../pages/auth/signup.css";
import {
  ResetPasswordService,
  UpdateSingleUserByIdService,
} from "../../services/UserService";

interface State {
  showPassword: boolean;
}

function ResetPassword() {
  const navigate = useNavigate();
  const { vendorid } = useParams<{ vendorid?: string }>();
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  });
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorText, setErrorText] = useState("");
  var role = localStorage.getItem("role");
  var currentdate = new Date(Date.now());
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  var datetime = currentdate.toLocaleDateString("us-PT", options);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    if (!password) {
      setErrorText("Please Enter Password");
    } else if (!confirmPassword) {
      setErrorText("Please Enter Confirm Password");
    } else if (password !== confirmPassword) {
      setErrorText("Passwords do not match!!");
    } else {
      setErrorText("");
      const json = {
        password: password,
      };
      const result1 = await ResetPasswordService(vendorid, json);
      if (result1) {
        if (role === "ROLE_VENDOR ADMINISTRATOR") {
          navigate(`/auth/vendor-sign-up/${vendorid}`);
        } else {
          const jsonNew = {
            logged_in: datetime,
          };
          const result2 = await UpdateSingleUserByIdService(vendorid, jsonNew);
          if (result2) {
            navigate("/pages/profile");
          }
        }
      }
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleResetPassword}>
        <ul>
          <li>
            <h1>Enter your new password</h1>
          </li>
          <li>
            <Input
              fullWidth={true}
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              placeholder="New Password..."
            />
          </li>
          <li>
            <FormControl
              fullWidth
              variant="standard"
              className="reset-pw-field"
            >
              <FilledInput
                id="filled-adornment-password"
                placeholder="Confirm Password"
                type={values.showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e: any) => {
                  setConfirmPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </li>
          <li>
            <p className="validation-text">{errorText}</p>
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
        </ul>
      </form>
    </React.Fragment>
  );
}

export default ResetPassword;
