import HttpRequest from "./HttpRequest";
import HttpRequestImages from "./HttpRequestImages";

const baseUrl = 'https://vp-services-products.azurewebsites.net'; //process.env.REACT_APP_BASE_URL_PRODUCTS;

export const ProductsService = async () => {
  return await HttpRequest("GET", `${baseUrl}/api/products`, null);
};

export const GetProductCategoryService = async () => {
  return await HttpRequest(
    "GET",
    `${baseUrl}/api/products/product_category/getProductCategory`,
    null
  );
};

export const AddProductCategoryService = async (data:any) => {
  return await HttpRequest(
    "POST",
    `${baseUrl}/api/products/product_category`,
    data
  );
};

export const GetProductTypeService = async () => {
  return await HttpRequest(
    "GET",
    `${baseUrl}/api/products/product_type/getProductType`,
    null
  );
};

export const AddProductTypeService = async (data:any) => {
  return await HttpRequest(
    "POST",
    `${baseUrl}/api/products/product_type`,
    data
  );
};

export const GetProductThemeService = async () => {
  return await HttpRequest(
    "GET",
    `${baseUrl}/api/products/product_theme/getProductTheme`,
    null
  );
};

export const AddProductThemeService = async (data:any) => {
  return await HttpRequest(
    "POST",
    `${baseUrl}/api/products/product_theme`,
    data
  );
};

export const ProductsDataService = async (data: any) => {
  return await HttpRequest("POST", `${baseUrl}/api/products`, data);
};

export const GetProductsImageService = async (id: any) => {
  return await HttpRequest("GET", `${baseUrl}/getProductImage/${id}`, null);
};

export const ProductsImageService = async (data: any) => {
  return await HttpRequestImages("POST", `${baseUrl}/uploadImage`, data);
};

export const ProductsShippingService = async (data: any) => {
  return await HttpRequest(
    "POST",
    `${baseUrl}/api/products/product_shipping`,
    data
  );
};

export const UpdateProductsByIdService = async (id: any, data: any) => {
  return await HttpRequest("PUT", `${baseUrl}/api/products/${id}`, data);
};

export const ProductsOptionsService = async (data: any) => {
  return await HttpRequest(
    "POST",
    `${baseUrl}/api/products/product_options`,
    data
  );
};

export const ProductsVariantsService = async (data: any) => {
  return await HttpRequest(
    "POST",
    `${baseUrl}/api/products/product_variants`,
    data
  );
};

export const GetProductShippingService = async (id: any) => {
  return await HttpRequest(
    "GET",
    `${baseUrl}/api/products/getProductShipping/${id}`,
    null
  );
};

export const GetProductOptionsService = async (id: any) => {
  return await HttpRequest(
    "GET",
    `${baseUrl}/api/products/getProductOptions/${id}`,
    null
  );
};
