import HttpRequest from "./HttpRequest";

const baseUrl = 'https://vp-services-auth.azurewebsites.net';//process.env.REACT_APP_BASE_URL_AUTH;

export const AuthSignUpService = async (data: any) => {
  return await HttpRequest("POST", `${baseUrl}/api/auth/signup`, data);
};

export const AuthSignInService = async (data: any) => {
  return await HttpRequest("POST", `${baseUrl}/api/auth/signin`, data);
};
