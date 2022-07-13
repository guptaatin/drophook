module.exports = app => {
  const vendors = require("../controllers/vendor.controller.js");
  var router = require("express").Router();
  // Create a new vendors
  router.post("/", vendors.create);
  // Retrieve all Vendors
  router.get("/", vendors.findAll);
  // Update a Tutorial with id
  router.put("/:vendor_id", vendors.update);
  app.use('/api/vendors', router);
};