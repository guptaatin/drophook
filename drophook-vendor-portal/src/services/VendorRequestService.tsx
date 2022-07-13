import HttpRequest from "./HttpRequest";

const baseUrl = 'https://vp-services-vendor-requests.azurewebsites.net'; //process.env.REACT_APP_BASE_URL_VENDOR_REQUESTS;

export const VendorRequestService = async () => {
  return await HttpRequest("GET", `${baseUrl}/api/vendor_requests`, null);
};

export const VendorRequestByEmailService = async (profileUserEmail: any) => {
  return await HttpRequest(
    "GET",
    `${baseUrl}/api/vendor_requests?email=${profileUserEmail}`,
    null
  );
};

export const VendorRequestsByIdService = async (id: any) => {
  return await HttpRequest("GET", `${baseUrl}/api/vendor_requests/${id}`, null);
};

export const VendorRequestsUpdateByIdService = async (id: any, data: any) => {
  return await HttpRequest("PUT", `${baseUrl}/api/vendor_requests/${id}`, data);
};

export const VendorRequestCreateService = async (data: any) => {
  return await HttpRequest("POST", `${baseUrl}/api/vendor_requests`, data);
};
