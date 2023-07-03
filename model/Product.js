const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: null,
  },
  price: {
    type: Number,
    required: true,
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
    default: null,
  },
  Remaining_quantity: {
    type: Number,
    default: null,
  },
  // image_url: {
  //   type: String,
  //   required: true,
  // },

  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    default: null,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
    default: null,
  },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("product", ProductSchema);
