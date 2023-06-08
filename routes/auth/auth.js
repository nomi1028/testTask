const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
// const { check } = require("express-validator");
// const auth = require("../../middlewares/auth");
const { register, signin, verfied } = require("../../controllers/auth/auth");

router.route("/register").post(register);
router.route("/signin").post(signin);
router.route("/activate/:token").get(verfied);
module.exports = router;
