import HttpRequest from "./HttpRequest";

const baseUrl1 = 'https://vp-services-vendors.azurewebsites.net';//process.env.REACT_APP_BASE_URL_VENDORS;
const baseUrl2 = 'https://vp-services-vendor-requests.azurewebsites.net'; //process.env.REACT_APP_BASE_URL_VENDOR_REQUESTS;
const baseUrl3 = 'https://vp-services-users.azurewebsites.net'; //process.env.REACT_APP_BASE_URL_USERS;

export const JoinVendorsService = async (userId: any) => {
  return await HttpRequest(
    "GET",
    `${baseUrl2}/api/vendor_requests/joinVendors/${userId}`,
    null
  );
};

export const GetVendorUsersService = async (id: any) => {
  return await HttpRequest("GET", `${baseUrl3}/api/getVendorUsers/${id}`, null);
};

export const GetAllVendorApprovedService = async () => {
  return await HttpRequest(
    "GET",
    `${baseUrl2}/api/vendor_requests/VI/getAllVendorApproved`,
    null
  );
};

export const GetVendorIdsService = async () => {
  return await HttpRequest(
    "GET",
    `${baseUrl2}/api/vendor_requests/VI/getVendorIds`,
    null
  );
};

export const VendorsService = async (data: any) => {
  return await HttpRequest("POST", `${baseUrl1}/api/vendors`, data);
};

export const UpdateVendorsService = async (id: any, data: any) => {
  return await HttpRequest("PUT", `${baseUrl1}/api/vendors/${id}`, data);
};
