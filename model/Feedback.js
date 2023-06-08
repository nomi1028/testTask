const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
  rating: Number,
  comment: String,
});

module.exports = mongoose.model("feedback", FeedbackSchema);
