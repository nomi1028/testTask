const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  block: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "customer"],
    default: "customer",
  },
  verified: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("user", UserSchema);
