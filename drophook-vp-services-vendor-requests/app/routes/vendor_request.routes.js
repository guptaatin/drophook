module.exports = app => {
  const vendor_requests = require("../controllers/vendor_request.controller.js");
  var router = require("express").Router();
  // Create a new vendor request
  router.post("/", vendor_requests.create);
  // Retrieve all Vendor requests
  router.get("/", vendor_requests.findAll);
  router.get("/status", vendor_requests.findAllVendor);
  router.get("/:id", vendor_requests.findOne);
  // Delete a vendor request  with id
  router.put("/:id", vendor_requests.update);

  router.delete("/:id", vendor_requests.delete);
  router.get("/joinVendors/:id",vendor_requests.oneToOne);
router.get("/VI/getVendorIds",vendor_requests.findVendorIds);
router.get("/VI/getAllVendorApproved",vendor_requests.findAllVendorApproved);


  app.use('/api/vendor_requests', router);
};