const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 
  app.post("/api/validateEmail", controller.validateEmail);
  app.get("/api/getRoles", controller.findAllRoles);
  app.get("/api/getVendorRoles", controller.findVendorRoles);
  app.get("/api/getAllUsers", controller.findAllUsers);
  app.get("/api/getVendorUsers/:id", controller.findVendorUsers);
  app.put("/api/auth/resetPassword/:id", controller.update);
  app.put("/api/auth/:id", controller.updateUser);
  app.get("/api/getSingleUser/SU/:id", controller.findSingleUser);
  app.delete("/api/auth/:id", controller.deleteUser);
}