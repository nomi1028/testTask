const express = require("express");

const router = express.Router();

const {
  addCategory,
  getCategory,
} = require("../../controllers/category/category");
const auth = require("../../middleware/checkauth");
router.route("/addcategory").post(auth, addCategory);
router.route("/getcategory").get(auth, getCategory);
module.exports = router;
