const express = require("express");

const router = express.Router();

const { addOrder } = require("../../controllers/order/order");
const auth = require("../../middleware/checkauth");
router.route("/addorder").post(auth, addOrder);

module.exports = router;
