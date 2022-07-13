import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { Paper, Typography } from "@mui/material";
import SignInComponent from "../../components/auth/SignIn";
import { ReactComponent as logo } from "../../components/sidebar/assets/logo.svg";

const Brand = styled(logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function SignIn() {
  return (
    <React.Fragment>
      <Brand className="brand-drophook" />
      <Wrapper className="signin-wrapper box-shadow">
        <Helmet title="Sign In" />
        <Typography component="h2" variant="body1" align="center">
          Sign in to your account to continue
        </Typography>
        <SignInComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
