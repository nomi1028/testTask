const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
// const { check } = require("express-validator");
// const auth = require("../../middlewares/auth");
const {
  register,
  signin,
  verfied,
  registerManager,
  updateProfile,
  testing,
} = require("../../controllers/auth/auth");
const checkAdmin = require("../../middleware/checkAdmin");
const auth = require("../../middleware/checkauth");

router.route("/register").post(register);

router.route("/manager-register").post(auth, checkAdmin, registerManager);
router.route("/signin").post(signin);
router.route("/activate/:token").get(verfied);
router.route("/update-profile").post(auth, updateProfile);
module.exports = router;
