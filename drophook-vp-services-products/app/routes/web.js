const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
let routes = (app) => {
  router.post("/uploadImage", upload.array("file"), uploadController.uploadFiles); // upload image endpoint
  router.get("/getProductImage/:id", uploadController.getProductImage); // get all product images of a specific product id endpoint
  router.delete("/deleteImage/:id", uploadController.deleteImage); // delete product images using product id endpoint
  router.put("/updateImage/:id",upload.single("file"), uploadController.updateImage); // update product image endpoint
  router.get("/files", uploadController.getListFiles); // get all product images endpoint
  router.get("/files/:name", uploadController.getParticularImage); // display single product image endpoint
  return app.use("/", router);
};
module.exports = routes;