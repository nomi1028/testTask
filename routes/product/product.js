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
const checkManager = require("../../middleware/checkManager");
router.route("/addProduct").post(auth, checkManager, addProduct);
router.route("/getProduct/:id").post(auth, getProductById);
router.route("/getAllProduct").post(auth, getAllProduct);
router.route("/UpdateProduct/:id").post(auth, checkManager, updateProductById);
router
  .route("/restokeProduct/:id")
  .post(auth, checkManager, restokeProductById);
module.exports = router;
