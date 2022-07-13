module.exports = app => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();

  router.post("/", products.create); // product create
  router.get("/:vendor_id", products.findAllProducts); // get all products with same vendor id
  router.get("/",products.getAllProducts); // get all products
  router.post("/product_shipping",products.insertProductShipping); // product shipping create
  router.post("/product_options",products.insertProductOptions); // product options create
  router.post("/product_variants",products.insertProductOptionVariant); // product variant create
  router.get("/getProductImages/:id",products.joinProductImage); 

  router.get("/getProductShipping/:id",products.joinProductShipping); // get product shipping data
  router.get("/getProductOptions/:id",products.joinProductOptions); // get product option data
  router.get("/getProductVariants/:id",products.joinProductVariants); // get product variant data

  router.post("/product_category", products.insertProductCategory); // product category create
  router.get("/product_category/getProductCategory",products.getAllProductCategories); // get all product category 

  router.post("/product_type", products.insertProductType); // product type create
  router.get("/product_type/getProductType",products.getAllProductType); // get all product type
  
  router.post("/product_theme", products.insertProductTheme); // product type create
  router.get("/product_theme/getProductTheme",products.getAllProductThemes); // get all product type
  
  router.put("/:id", products.update); // update product data


  app.use('/api/products', router);
};