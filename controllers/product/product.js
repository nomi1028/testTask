const User = require("../../model/User");
require("dotenv/config");
const GenerateToken = require("../../middleware/generteToken");
const transporter = require("../../middleware/sendmail");
const bcrypt = require("bcrypt");

exports.addProduct = async (req, res) => {
  try {
    return res.status(200).json({ msg: "hitting" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
