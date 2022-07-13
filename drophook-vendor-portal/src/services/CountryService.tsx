import HttpRequest from "./HttpRequest";

const baseUrl = 'https://vp-services-products.azurewebsites.net'; //process.env.REACT_APP_BASE_URL_PRODUCTS;

export const GetAllCountriesService = async () => {
  return await HttpRequest("GET", `${baseUrl}/api/countries`, null);
};
