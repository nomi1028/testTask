const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  Remaining_quantity: {
    type: Number,
  },
  // image_url: {
  //   type: String,
  //   required: true,
  // },

  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("product", ProductSchema);
