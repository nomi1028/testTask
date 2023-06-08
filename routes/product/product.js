const express = require("express");

const router = express.Router();

const {
  addProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  restokeProductById,
} = require("../../controllers/product/product");
const auth = require("../../middleware/checkauth");
router.route("/addProduct").post(auth, addProduct);
router.route("/getProduct/:id").post(auth, getProductById);
router.route("/getAllProduct").post(auth, getAllProduct);
router.route("/UpdateProduct/:id").post(auth, updateProductById);
router.route("/restokeProduct/:id").post(auth, restokeProductById);
module.exports = router;
