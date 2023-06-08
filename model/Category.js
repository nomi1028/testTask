const mongoose = require("mongoose");
const Product = require("./Product");
const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

  created_at: { type: Date, default: new Date() },
  deleted: { type: Boolean, default: false },
  updated_at: { type: Date, default: new Date() },
});

CategorySchema.virtual("products", {
  ref: Product,
  foreignField: "category_id",
  localField: "_id",
});
CategorySchema.set("toObject", { virtuals: true });
CategorySchema.set("toJSON", { virtuals: true });
mongoose.models = {};

module.exports = mongoose.model("category", CategorySchema);
