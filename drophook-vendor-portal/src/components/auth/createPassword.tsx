import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Alert } from "@mui/material";
import "./resetpassword.css";
import "../../pages/auth/signup.css";
import {
  ResetPasswordService,
  UpdateSingleUserByIdService,
} from "../../services/UserService";

interface State {
  showPassword: boolean;
}

export const CreatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [createId, setCreateId] = useState<any>();
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  });
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
  var currentdate = new Date(Date.now());
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  var datetime = currentdate.toLocaleDateString("us-PT", options);
  useEffect(() => {
    setCreateId(window.location.href.split("create-password/")[1]);
  }, []);
  const handleCreatePassword = async (e: any) => {
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
      const result1 = await ResetPasswordService(createId, json);
      if (result1) {
        const jsonNew = {
          logged_in: datetime,
        };
        const result2 = await UpdateSingleUserByIdService(createId, jsonNew);
        if (result2) {
          navigate("/");
        }
      }
    }
  };
  return (
    <React.Fragment>
      <Helmet title="Create Password" />
      <form
        className="create-pass signup-first"
        onSubmit={handleCreatePassword}
      >
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
            {errorText !== "" ? (
              <Alert severity="error">{errorText}</Alert>
            ) : null}
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
};
