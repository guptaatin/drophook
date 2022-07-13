const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
let routes = (app) => {
  router.post("/upload", upload.single("file"), uploadController.uploadFiles); // upload profile image
  router.get("/getImage/:id", uploadController.userProfileImage); // get profile image
  router.delete("/deleteImage/:id", uploadController.deleteImage); // delete profile image
  router.put("/updateImage/:id",upload.single("file"), uploadController.updateImage); // update profile image
  router.get("/files", uploadController.getListFiles); // get all files
  router.get("/files/:name", uploadController.getParticularImage); // get single image
  return app.use("/", router);
};
module.exports = routes;