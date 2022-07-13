import HttpRequest from "./HttpRequest";
import HttpRequestImages from "./HttpRequestImages";

const baseUrl = 'https://vp-services-users.azurewebsites.net'; //process.env.REACT_APP_BASE_URL_USERS;

export const GetAllUsersService = async () => {
  return await HttpRequest("GET", `${baseUrl}/api/getAllUsers`, null);
};

export const GetSingleUserByIdService = async (id: any) => {
  return await HttpRequest(
    "GET",
    `${baseUrl}/api/getSingleUser/SU/${id}`,
    null
  );
};

export const UpdateSingleUserByIdService = async (id: any, data: any) => {
  return await HttpRequest("PUT", `${baseUrl}/api/auth/${id}`, data);
};

export const ResetPasswordService = async (id: any, data: any) => {
  return await HttpRequest(
    "PUT",
    `${baseUrl}/api/auth/resetPassword/${id}`,
    data
  );
};

export const ValidateEmailService = async (data: any) => {
  return await HttpRequest("POST", `${baseUrl}/api/validateEmail`, data);
};

export const GetProfileImageService = async (id: any) => {
  return await HttpRequest("GET", `${baseUrl}/getImage/${id}`, null);
};

export const UploadProfileImageService = async (data: any) => {
  return await HttpRequestImages("POST", `${baseUrl}/upload`, data);
};

export const UpdateProfileImageService = async (id: any, data: any) => {
  return await HttpRequestImages("PUT", `${baseUrl}/updateImage/${id}`, data);
};

export const DeleteProfileImageService = async (id: any) => {
  return await HttpRequestImages(
    "DELETE",
    `${baseUrl}/deleteImage/${id}`,
    null
  );
};
