var express = require("express");
var router = express.Router();
const AuthController = require("../../controllers/authController");
const OtherController = require("../../controllers/otherController");
const authorization = require("../../middlewares/authorization");
const auth = require("../../middlewares/auth");

router.get("/", function (req, res, next) {
  res.send("Welcome to v1 APIs...");
});
router.post("/register", AuthController.register);
router.get("/admin/getUserList", auth, OtherController.getUserList);
router.delete("/admin/deleteUser", auth, OtherController.deleteUser);
router.patch(
  "/admin/updateUser",
  auth,
  authorization("admin"),
  OtherController.updateUser
);

module.exports = router;
