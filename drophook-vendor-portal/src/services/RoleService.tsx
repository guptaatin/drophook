import HttpRequest from "./HttpRequest";

const baseUrl = 'https://vp-services-users.azurewebsites.net'; //process.env.REACT_APP_BASE_URL_USERS;

export const GetRolesService = async () => {
  return await HttpRequest("GET", `${baseUrl}/api/getRoles`, null);
};

export const GetVendorRolesService = async () => {
  return await HttpRequest("GET", `${baseUrl}/api/getVendorRoles`, null);
};
