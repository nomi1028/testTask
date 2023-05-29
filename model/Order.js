const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  feedback: {
    type: String,
  },
  status: {
    enum: ["pending", "checkout", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
