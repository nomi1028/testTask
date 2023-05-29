const express = require("express");

const router = express.Router();
// const { check } = require("express-validator");
// const auth = require("../../middlewares/auth");
const { register, signin } = require("../../controllers/auth/auth");

router.route("/register").post(register);
router.route("/signin").post(signin);
module.exports = router;
