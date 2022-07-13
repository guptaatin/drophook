import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import {
  Alert as MuiAlert,
  AlertProps,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { spacing } from "@mui/system";
import { useEffect } from "react";
import "./signin.css";
import { AuthSignInService } from "../../services/AuthorizationService";
import { VendorRequestByEmailService } from "../../services/VendorRequestService";
import { UpdateSingleUserByIdService } from "../../services/UserService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const TextField = styled(MuiTextField)<{ my?: number }>(spacing);
export default function SignIn() {
  const navigate = useNavigate();
  var currentdate = new Date(Date.now());
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  var datetime = currentdate.toLocaleDateString("us-PT", options);
  const [open, setOpen] = React.useState(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const [checked, setChecked] = React.useState(false);
  const handleRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [userData, setUserData] = React.useState<any>({
    email: "",
    password: "",
    accessToken: "",
  });
  const [authServe, setAuthServe] = React.useState<any>();
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    if (checked) {
      localStorage.setItem("remember", "true")
      localStorage.setItem("remember_email", userData.email)
    } else {
      localStorage.removeItem("remember")
      localStorage.removeItem("remember_email")
    }
    const json = {
      email: userData.email,
      password: userData.password,
    };
    try {
    const result = await AuthSignInService(json);
    if (result) {
      localStorage.setItem("role", result.roles);
      if (result.accessToken) {
        localStorage.setItem("accesstoken", result.accessToken);
        localStorage.setItem("isLoggedIn", "true");
        setUserData({
          ...userData,
          accessToken: result.accessToken,
        });
        if (
          result.roles === "ROLE_ADMINISTRATOR" ||
          result.roles === "ROLE_SUPER ADMINISTRATOR"
        ) {
          navigate("/dashboardtemp/default");
          document.body.classList.remove("singin-cls");
          localStorage.setItem("userid", result.id);
        } else if (result.roles === "ROLE_VENDOR ADMINISTRATOR") {
          localStorage.setItem("userinvendorid", result.id);
          localStorage.setItem("userid", result.vendor_id);
          // const result1 = await VendorRequestByEmailService(userData.email);
          // if (result1) {
            if (result.logged_in === null) {
              navigate(`/auth/reset-password/${result.id}`);
              document.body.classList.remove("singin-cls");
            } else {
              const json = {
                logged_in: datetime,
              };
              const result2 = await UpdateSingleUserByIdService(
                result.id,
                json
              );
              if (result2) {
                navigate("/pages/profile");
              }
              document.body.classList.remove("singin-cls");
            }
          // }
        } else {
          document.body.classList.remove("singin-cls");
          localStorage.setItem("user_first_name", result.first_name);
          localStorage.setItem("user_last_name", result.last_name);
          localStorage.setItem("userid", result.id);
          if (result.logged_in === null) {
            navigate(`/auth/reset-password/${result.id}`);
          } else {
            navigate("/pages/profile");
          }
        }
      }
    }
    } catch (e:any) {
      setAuthServe("User Authorization are currently unavailable. Please try again after few minutes.")
      if (e.response && e.response.status === 401){
        setAuthServe("User not found with this Email!!")
      }
      setOpen(true);
    }
  };
  useEffect(() => {
    document.body.classList.add("singin-cls");
    var x:any = localStorage.getItem("remember_email")
    // localStorage.clear();
    if (localStorage.getItem("remember")) {
      setUserData({
        ...userData,
        email: localStorage.getItem("remember_email"),
      });
      localStorage.setItem("userSignInEmail",x)
      setChecked(true);
    }
  }, []);

  return (
    <div>
      <React.Fragment>
        <form onSubmit={handleSignIn}>
          <TextField
            size="small"
            margin="dense"
            required
            fullWidth
            className="top-label"
            id="email"
            label="Email"
            placeholder="Email"
            name="email"
            InputLabelProps={{ shrink: true }}
            autoComplete="email"
            autoFocus
            value={userData.email}
            onChange={(e) => {
              localStorage.setItem("userSignInEmail", e.target.value);
              setUserData({
                ...userData,
                email: e.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            size="small"
            required
            fullWidth
            className="top-label"
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            id="password"
            InputLabelProps={{ shrink: true }}
            autoComplete="current-password"
            value={userData.password}
            onChange={(e) => {
              setUserData({
                ...userData,
                password: e.target.value,
              });
            }}
          />
          <FormControlLabel
            control={<Checkbox checked={checked} value="remember" onChange={handleRemember} color="primary" />}
            label="Remember me"
          />
          <Button
            className="mt-0"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "#fff", backgroundColor: "#ff0e2a" }}
          >
            Sign in
          </Button>
        </form>
        <Button
          onClick={() => {
            document.body.classList.remove("singin-cls");
            localStorage.setItem("forgot-password", "yes");
          }}
          component={Link}
          to="/auth/forgot-password"
          fullWidth
          color="primary"
        >
          Forgot password
        </Button>
        <Button
          component={Link}
          to="/auth/sign-up"
          fullWidth
          color="primary"
          onClick={() => {
            document.body.classList.remove("singin-cls");
            localStorage.setItem("signup-option", "yes");
          }}
        >
          Create an Account
        </Button>
      </React.Fragment>
      <br />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        className="snack-user"
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {authServe}
        </Alert>
      </Snackbar>
    </div>
  );
}
