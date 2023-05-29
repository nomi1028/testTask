const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: Number,
  comment: String,
});
const Feedback = mongoose.model("Feedback", FeedbackSchema);
