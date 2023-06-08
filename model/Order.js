const mongoose = require("mongoose");
const Feedback = require("./Feedback");

const OrderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "checkedOut", "completed"],
    default: "pending",
  },
  address: {
    type: String,
    default: null,
  },
  deleted: { type: Boolean, default: false },
});

OrderSchema.virtual("feedback", {
  ref: Feedback,
  foreignField: "order_id",
  localField: "_id",
});

OrderSchema.set("toObject", { virtuals: true });
OrderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("order", OrderSchema);
