import React from "react";
import { useRoutes, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { create } from "jss";
import { ThemeProvider } from "styled-components/macro";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
// import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/lab";
import StylesProvider from "@mui/styles/StylesProvider";
import jssPreset from "@mui/styles/jssPreset";
// import AuthLayout from "./layouts/Auth";
import "./i18n";
import createTheme from "./theme";
import routes from "./routes";
import useTheme from "./hooks/useTheme";
import { store } from "./redux/store";
import { AuthProvider } from "./contexts/JWTContext";
// import SignIn from "./components/auth/SignIn";
import styled from "styled-components/macro";
import { CssBaseline } from "@mui/material";
import GlobalStyle from "./components/GlobalStyle";
import SignIn from "./pages/auth/SignIn";
// import SignUp from "./pages/auth/SignUp";
// import ForgotPassword from "./components/auth/ForgotPassword";
// import { CreatePassword } from "./components/auth/createPassword";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
// import { AuthProvider } from "./contexts/Auth0Context";
// import { AuthProvider } from "./contexts/CognitoContext";

// @ts-ignore
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")!,
});

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

function App() {
  var accessToken = localStorage.getItem("accesstoken");
  // var signUpUOption = localStorage.getItem("signup-option");
  // var forgotPassword = localStorage.getItem("forgot-password");
  const content = useRoutes(routes);
  const { theme } = useTheme();
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Drophook" defaultTitle="Drophook" />
        <Provider store={store}>
          {/*
        // @ts-ignore */}
          <StylesProvider jss={jss}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StyledEngineProvider injectFirst>
                <MuiThemeProvider theme={createTheme(theme)}>
                  {/* {accessToken ? ( */}
                    <ThemeProvider theme={createTheme(theme)}>
                      <AuthProvider>{content}</AuthProvider>
                    </ThemeProvider>
                  {/* ) : (
                  <>
                    <Root>
                      <CssBaseline />
                      <GlobalStyle />
                      <SignIn/>
                      <Outlet />
                    </Root>
                  </>
                )} */}
                {/* <Routes>
                  <Route path="/create-password" element={<AuthLayout />}>
                    <Route path="" element={<CreatePassword />} />
                  </Route>
                </Routes> */}
                </MuiThemeProvider>
              </StyledEngineProvider>
            </LocalizationProvider>
          </StylesProvider>
        </Provider>
      </HelmetProvider>
    </React.Fragment>
  );
}

export default App;
