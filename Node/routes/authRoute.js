var express = require("express");
const authController = require("../controller/authController");

var authRoute = express.Router();
authRoute.route("/signup").post(authController.signup);
authRoute.route("/login").post(authController.login);
// authRoute.route("/logout").get(authController.logout);
authRoute
  .route("/personal")
  .get(authController.protect, authController.personal);
module.exports = authRoute;
