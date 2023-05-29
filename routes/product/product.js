const express = require("express");

const router = express.Router();

const { addProduct } = require("../../controllers/product/product");
const auth = require("../../middleware/checkauth");
router.route("/addProduct").post(auth, addProduct);

module.exports = router;
