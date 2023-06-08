const express = require("express");

const router = express.Router();

const {
  addOrder,
  getallOrder,
  getallOrderofMananger,
  getallOrderofCustomer,
  removeProduct,
} = require("../../controllers/order/order");
const auth = require("../../middleware/checkauth");
router.route("/addorder").post(auth, addOrder);
router.route("/getAllOrder").get(auth, getallOrder);
router.route("/getallOrderofMananger/:id").get(auth, getallOrderofMananger);
router.route("/getallOrderofCustomer/:id").get(auth, getallOrderofCustomer);
router.route("/removeProduct").post(auth, removeProduct);
module.exports = router;
