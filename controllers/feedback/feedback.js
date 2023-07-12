const Feedback = require("../../model/Feedback");
const Order = require("../../model/Order");
const Product = require("../../model/Product");
const User = require("../../model/User");

exports.addFeedback = async (req, res) => {
  try {
    if (
      !req.body.customer ||
      !req.body.product ||
      !req.body.order_id ||
      !req.body.rating ||
      !req.body.comment
    )
      return res.status(400).json({
        message:
          "Customer_id & Order_id && Product_id && rating && comment are required parameters for request",
      });
    let checkProduct = await Product.findById(req.body.product);

    if (!checkProduct)
      return res.status(200).json({
        message: `product with this name ${req.body.name} not exist`,
      });
    let checkOrder = Order.findById(req.body.order_id);

    if (!checkOrder) {
      return res.status(200).json({
        message: "Order against this id not exist",
      });
    }

    let feedback = Feedback.create({
      customer: req.body.customer,
      order_id: req.body.order_id,
      product: req.body.product,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    return res
      .status(200)
      .json({ data: feedback, message: "feedback added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
